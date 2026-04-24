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

    # Calculate 7 days ago timestamp for inactive detection
    from datetime import timedelta
    current_time = datetime.now()
    seven_days_ago = current_time - timedelta(days=7)

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
            height_metre = r.get("height_metre", "")
            power_watt = r.get("power_watt", "")
            last_heard_epoch = r.get("last_heard")
            last_heard = epoch_to_date(last_heard_epoch)
            contact_url = r. get("contact", "")
            
            # Determine if inactive (not heard in 7+ days)
            is_inactive = False
            if last_heard_epoch:
                try:
                    last_heard_dt = datetime.fromtimestamp(int(last_heard_epoch))
                    is_inactive = last_heard_dt < seven_days_ago
                except (ValueError, TypeError):
                    pass
            
            # If duplicate, store in a list
            if rid not in repeater_info:
                repeater_info[rid] = []
            repeater_info[rid].append({
                "name": name,
                "state": state,
                "antenna":  antenna,
                "location": location,
                "height_metre":  height_metre,
                "power_watt": power_watt,
                "last_heard":  last_heard,
                "contact_url": contact_url,
                "is_inactive": is_inactive
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
    
    # Outer full-width container (keeps page responsive and centers the wrapper)
    html_table += '<div class="hex-grid-container">\n'
    # Use the wrapper so the border & sizing match the inner table (fit-content)
    html_table += '  <div class="hex-table-wrapper">\n'
    
    # Add search box INSIDE the container
    html_table += '<div class="hex-search-container">\n'
    html_table += '  <div class="hex-search-wrapper">\n'
    html_table += '    <input type="text" id="hex-search" class="hex-search-input" placeholder="🔍 Search repeaters by name, location, antenna...">\n'
    html_table += '    <button id="hex-search-clear" class="hex-search-clear" style="display:  none;">✕</button>\n'
    html_table += '  </div>\n'
    html_table += '  <div id="hex-search-results" class="hex-search-results"></div>\n'
    html_table += '</div>\n'
    
    # Add the table
    html_table += '<table id="repeater-hex-grid" class="hex-table">\n'
    
    # Header row
    html_table += '  <tr>\n    <th></th>\n'
    for col in range(16):
        html_table += f'    <th>{col:X}</th>\n'
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
                # Check if any instance is inactive
                if any(info.get("is_inactive") for info in repeater_info[cell_id]):
                    css_class += " hex-inactive"
                # Escape quotes in JSON data
                info_json = json.dumps(repeater_info[cell_id]).replace('"', '&quot;')
                html_table += f'    <td class="{css_class}" onclick=\'showDuplicateInfo("{cell_id}", {info_json})\'><span class="hex-clickable">{cell_id}</span></td>\n'
            elif cell_id in backbone_reserved_ids:
                info = repeater_info[cell_id][0]
                css_class = "hex-backbone"
                # Add inactive class if backbone repeater hasn't been heard in 7+ days
                if info.get("is_inactive"):
                    css_class += " hex-inactive"
                info_json = json.dumps(info).replace('"', '&quot;')
                html_table += f'    <td class="{css_class}" onclick=\'showBackboneInfo("{cell_id}", {info_json})\'><span class="hex-clickable">{cell_id}</span></td>\n'
            elif cell_id in used_ids: 
                info = repeater_info[cell_id][0]
                css_class = "hex-used"
                # Add inactive class if repeater hasn't been heard in 7+ days
                if info.get("is_inactive"):
                    css_class += " hex-inactive"
                info_json = json.dumps(info).replace('"', '&quot;')
                html_table += f'    <td class="{css_class}" onclick=\'showRepeaterInfo("{cell_id}", {info_json})\'><span class="hex-clickable">{cell_id}</span></td>\n'
            else:
                # Must be free - call showKeygenModal instead of link
                css_class = "hex-free"
                html_table += f'    <td class="{css_class}" onclick="showKeygenModal(\'{cell_id}\')"><span class="hex-clickable">{cell_id}</span></td>\n'
        html_table += '  </tr>\n'

    html_table += '</table>\n'
    # close wrapper
    html_table += '  </div>\n'
    html_table += '</div>\n'  # Close hex-grid-container

    # Expose variables to Jinja
    env.variables["repeaters"] = repeaters
    env. variables["unused_ids"] = free_ids
    env.variables["hex_table"] = html_table
