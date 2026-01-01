import pathlib
import yaml
from datetime import datetime

def define_env(env):
    """Hook for mkdocs-macros-plugin."""
    project_dir = pathlib.Path(env.project_dir)

    # Define a filter to convert epoch to YYYY-MM-DD
    @env.filter
    def epoch_to_date(epoch_time):
        """Convert epoch timestamp to YYYY-MM-DD format."""
        if not epoch_time:
            return "N/A"
        
        try:  
            # Convert epoch to datetime and format as YYYY-MM-DD
            dt = datetime. fromtimestamp(int(epoch_time))
            return dt. strftime("%Y-%m-%d")
        except (ValueError, TypeError):
            return "Invalid date"

    # Load repeater list from YAML
    data_path = project_dir / "docs" / "deployment" / "data" / "repeaters.yml"
    data = yaml.safe_load(data_path.read_text(encoding="utf-8"))
    repeaters = data.get("repeaters", [])

    # Compute used IDs (uppercase for consistency with hex display)
    used_ids = {str(r["id"]).upper() for r in repeaters if "id" in r}

    # Reserved IDs by MeshCore
    reserved_ids = {"00", "FF"}

    # All possible 1 byte IDs 00 - FF
    all_ids = [f"{i: 02X}" for i in range(256)]

    # Free IDs are everything not in used_ids or reserved_ids
    free_ids = [i for i in all_ids if i not in used_ids and i not in reserved_ids]

    # Sort for nice output
    free_ids.sort(key=lambda x: int(x, 16))

    # Generate HTML hex table
    html_table = '<table class="hex-table">\n'
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
            
            # Determine cell type
            if cell_id in reserved_ids:
                css_class = "hex-reserved"
                html_table += f'    <td class="{css_class}" title="MeshCore&#10;Reserved">{cell_id}</td>\n'
            elif cell_id in free_ids:
                css_class = "hex-free"
                html_table += f'    <td class="{css_class}"><a href="https://gessaman.com/mc-keygen/?prefix={cell_id}" target="_blank">{cell_id}</a></td>\n'
            else:
                css_class = "hex-used"
                html_table += f'    <td class="{css_class}">{cell_id}</td>\n'
        html_table += '  </tr>\n'

    html_table += '</table>'

    # Expose variables to Jinja
    env.variables["repeaters"] = repeaters
    env.variables["unused_ids"] = free_ids
    env.variables["hex_table"] = html_table