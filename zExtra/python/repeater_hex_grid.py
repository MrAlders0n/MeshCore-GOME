import pathlib
import yaml
from datetime import datetime
from collections import Counter
import json

def define_env(env):
    """Hook for mkdocs-macros-plugin."""
    project_dir = pathlib.Path(env. project_dir)

    # Define a filter to convert epoch to YYYY-MM-DD
    @env.filter
    def epoch_to_date(epoch_time):
        """Convert epoch timestamp to YYYY-MM-DD format."""
        if not epoch_time:
            return "N/A"
        
        try:  
            # Convert epoch to datetime and format as YYYY-MM-DD
            dt = datetime.fromtimestamp(int(epoch_time))
            return dt.strftime("%Y-%m-%d")
        except (ValueError, TypeError):
            return "Invalid date"

    # Load repeater list from YAML
    data_path = project_dir / "docs" / "deployment" / "data" / "repeaters.yml"
    data = yaml.safe_load(data_path.read_text(encoding="utf-8"))
    repeaters = data.get("repeaters", [])

    # Count occurrences of each ID (uppercase for consistency)
    id_list = [str(r["id"]).upper() for r in repeaters if "id" in r]
    id_counts = Counter(id_list)
    
    # Find duplicates
    duplicate_ids = {id_val for id_val, count in id_counts.items() if count > 1}
    
    # Used IDs (all IDs from YAML)
    used_ids = set(id_list)

    # Create a lookup dictionary for repeater info by ID
    repeater_info = {}
    backbone_reserved_ids = set()
    
    for r in repeaters:
        if "id" in r: 
            rid = str(r["id"]).upper()
            state = r.get("state", "Unknown")
            
            # Track BackboneReserved IDs separately
            if state == "BackboneReserved":
                backbone_reserved_ids.add(rid)
            
            name = r.get("name", "N/A")
            antenna = r.get("antenna", "N/A")
            location = r.get("location", "N/A")
            last_heard = epoch_to_date(r.get("last_heard"))
            contact_url = r.get("contact", "")
            
            # If duplicate, store in a list
            if rid not in repeater_info:
                repeater_info[rid] = []
            repeater_info[rid].append({
                "name": name,
                "state": state,
                "antenna":   antenna,
                "location":  location,
                "last_heard":   last_heard,
                "contact_url": contact_url
            })

    # Reserved IDs by MeshCore (always reserved, regardless of YAML)
    reserved_ids = {"00", "FF"}

    # All possible 1 byte IDs 00 - FF
    all_ids = [f"{i:02X}" for i in range(256)]

    # Free IDs are everything not in used_ids or reserved_ids
    free_ids = [i for i in all_ids if i not in used_ids and i not in reserved_ids]

    # Sort for nice output
    free_ids.sort(key=lambda x: int(x, 16))

    # Generate HTML hex table WITH WRAPPER AND UNIQUE ID
    html_table = '<div id="hex-modal" class="hex-modal"><div class="hex-modal-content"><span class="hex-modal-close">&times;</span><div id="hex-modal-body"></div></div></div>\n'
    html_table += '<div class="hex-grid-container">\n'
    html_table += '<table id="repeater-hex-grid" class="hex-table">\n'
    
    # Header row
    html_table += '  <tr>\n    <th></th>\n'
    for col in range(16):
        html_table += f'    <th>{col: X}</th>\n'
    html_table += '  </tr>\n'

    # Data rows
    for row in range(16):
        html_table += '  <tr>\n'
        html_table += f'    <th>{row:X}</th>\n'
        for col in range(16):
            cell_id = f"{row:X}{col:X}"
            
            # Check in priority order:  reserved > duplicate > backbone_reserved > used > free
            if cell_id in reserved_ids:
                css_class = "hex-reserved"
                html_table += f'    <td class="{css_class}" onclick="showReservedInfo()"><span class="hex-clickable">{cell_id}</span></td>\n'
            elif cell_id in duplicate_ids: 
                # DUPLICATES TAKE PRIORITY - even over backbone reserved
                css_class = "hex-duplicate"
                # Escape quotes in JSON data
                info_json = json.dumps(repeater_info[cell_id]).replace('"', '&quot;')
                html_table += f'    <td class="{css_class}" onclick=\'showDuplicateInfo("{cell_id}", {info_json})\'><span class="hex-clickable">{cell_id}</span></td>\n'
            elif cell_id in backbone_reserved_ids:
                css_class = "hex-backbone"
                info = repeater_info[cell_id][0]
                info_json = json.dumps(info).replace('"', '&quot;')
                html_table += f'    <td class="{css_class}" onclick=\'showBackboneInfo("{cell_id}", {info_json})\'><span class="hex-clickable">{cell_id}</span></td>\n'
            elif cell_id in used_ids: 
                css_class = "hex-used"
                info = repeater_info[cell_id][0]
                info_json = json.dumps(info).replace('"', '&quot;')
                html_table += f'    <td class="{css_class}" onclick=\'showRepeaterInfo("{cell_id}", {info_json})\'><span class="hex-clickable">{cell_id}</span></td>\n'
            else:
                # Must be free - call showKeygenModal instead of link
                css_class = "hex-free"
                html_table += f'    <td class="{css_class}" onclick="showKeygenModal(\'{cell_id}\')"><span class="hex-clickable">{cell_id}</span></td>\n'
        html_table += '  </tr>\n'

    html_table += '</table>\n'
    html_table += '</div>\n'

    # Expose variables to Jinja
    env.variables["repeaters"] = repeaters
    env. variables["unused_ids"] = free_ids
    env.variables["hex_table"] = html_table