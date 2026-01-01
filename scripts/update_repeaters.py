#!/usr/bin/env python3
"""
Helper script to extract height from location field and add as separate field.
Extracts heights like (~3.0 m), (~14 m), (~X.X m), (~X m) from location strings.
"""

import yaml
import re
import sys
from pathlib import Path

# Regex pattern to match heights in parentheses with tilde
# Matches: (~3.0 m), (~14 m), (~X.X m), (~X m), (~18m), etc.
HEIGHT_RE = re.compile(r"\(~\s*([0-9Xx\.]+)\s*m\s*\)")

def extract_height_from_location(location):
    """
    Extract height from location string and return cleaned location.
    
    Args:
        location: Location string that may contain height in format (~X m)
        
    Returns:
        tuple: (height_value, cleaned_location)
            - height_value: str or None - the extracted height value
            - cleaned_location: str - location with height removed and cleaned
    """
    if not location:
        return None, location
    
    # Search for height pattern
    match = HEIGHT_RE.search(location)
    if match:
        height = match.group(1)  # Extract the numeric/placeholder value
        # Remove the height pattern from location
        new_location = HEIGHT_RE.sub('', location).strip()
        # Remove any trailing commas, hyphens, semicolons, or extra spaces
        new_location = re.sub(r"[\-,;:\s]+$", '', new_location).strip()
        return height, new_location
    
    return None, location


def update_repeaters_yaml(yaml_path):
    """
    Update repeaters YAML file by extracting heights and cleaning locations.
    
    Args:
        yaml_path: Path to repeaters.yml file
    """
    print(f"Loading {yaml_path}...")
    
    # Load existing YAML
    with open(yaml_path, 'r') as f:
        data = yaml.safe_load(f)
    
    repeaters = data.get('repeaters', [])
    print(f"Found {len(repeaters)} repeater entries")
    
    # Track statistics
    heights_extracted = 0
    heights_null = 0
    
    # Process each repeater
    for repeater in repeaters:
        location = repeater.get('location', '')
        
        # Extract height from location
        height, cleaned_location = extract_height_from_location(location)
        
        # Update location
        repeater['location'] = cleaned_location
        
        # Add height field (as string or None)
        repeater['height'] = height
        
        if height:
            heights_extracted += 1
            print(f"  Extracted height '{height}' from: {location}")
        else:
            heights_null += 1
    
    # Write updated YAML back to file with custom formatting
    print(f"\nWriting updated YAML to {yaml_path}...")
    with open(yaml_path, 'w') as f:
        f.write("repeaters:\n")
        for repeater in repeaters:
            rep_id = repeater.get("id", "")
            f.write(f'  - id: "{rep_id}"\n')
            f.write(f'    name: "{repeater.get("name", "")}"\n')
            f.write(f'    antenna: "{repeater.get("antenna", "TBD")}"\n')
            f.write(f'    location: "{repeater.get("location", "TBD")}"\n')
            
            # Add height field right after location
            height_val = repeater.get('height')
            if height_val:
                f.write(f'    height: "{height_val}"\n')
            else:
                f.write(f'    height: null\n')
            
            # Add contact field
            contact = repeater.get('contact')
            if contact:
                f.write(f'    contact: "{contact}"\n')
            else:
                f.write(f'    contact: null\n')
            
            # Add state field if it exists
            if 'state' in repeater:
                f.write(f'    state: "{repeater["state"]}"\n')
            
            # Add hex_id field if it exists
            if 'hex_id' in repeater:
                hex_id_val = repeater["hex_id"]
                if hex_id_val:
                    f.write(f'    hex_id: "{hex_id_val}"\n')
                else:
                    f.write(f'    hex_id: null\n')
            
            # Add last_heard field if it exists
            if 'last_heard' in repeater:
                last_heard = repeater['last_heard']
                if last_heard:
                    f.write(f'    last_heard: {last_heard}\n')
                else:
                    f.write(f'    last_heard: null\n')
            
            f.write('\n')
    
    # Print summary
    print("\n" + "="*60)
    print("Summary:")
    print(f"  Total repeaters: {len(repeaters)}")
    print(f"  Heights extracted: {heights_extracted}")
    print(f"  Heights set to null: {heights_null}")
    print("="*60)
    print("\n✅ Update complete!")


def main():
    # Path to repeaters.yml
    script_dir = Path(__file__).parent
    repo_root = script_dir.parent
    yaml_path = repo_root / "docs" / "deployment" / "data" / "repeaters.yml"
    
    if not yaml_path.exists():
        print(f"Error: {yaml_path} not found!", file=sys.stderr)
        sys.exit(1)
    
    update_repeaters_yaml(yaml_path)


if __name__ == "__main__":
    main()
