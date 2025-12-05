import pathlib
import yaml

def define_env(env):
    """Hook for mkdocs-macros-plugin."""
    project_dir = pathlib.Path(env.project_dir)

    # Load repeater list from YAML
    data_path = project_dir / "data" / "meshcore" / "repeaters.yml"
    data = yaml.safe_load(data_path.read_text(encoding="utf-8"))
    repeaters = data.get("repeaters", [])

    # Compute used IDs (lowercase for consistency)
    used_ids = {r["id"].lower() for r in repeaters if "id" in r}

    # All possible 1 byte IDs 00 - ff
    all_ids = [f"{i:02x}" for i in range(256)]

    # Unused IDs are everything not in used_ids
    unused_ids = [i for i in all_ids if i not in used_ids]

    # Sort for nice output
    unused_ids.sort(key=lambda x: int(x, 16))

    # Expose variables to Jinja
    env.variables["repeaters"] = repeaters
    env.variables["unused_ids"] = unused_ids
