---
hide:
  - toc
---

# Overview

<!-- The repeater tables and ID list on this page are automatically generated from meshcore/data/repeaters.yml.  
     To add a new repeater, simply append it to that YAML file — MkDocs will populate the tables automatically. -->

This page lists all deployed and reserved repeater IDs in Ottawa, along with their current configurations.

! !! note "If you notice anything that should be updated"
    Please see our **[Contributing Guide](../community/contributing.md)**.  You can also reach out to MrAlders0n on Discord or MeshCore, or contact any of the Knowledge Curators on the Discord server.

## Repeater ID Visualization

The following table shows all possible repeater IDs (00-FF). **Dark green** cells indicate available IDs, while **dark red** cells indicate IDs that are currently in use. 

{{ hex_table }}

*({{ unused_ids | length }} available IDs)*

## Available Repeater IDs

The following MeshCore node identifiers are currently **unused** and available for future Ottawa repeaters:  
```{{ unused_ids | join(', ') }}```

## Deployed Repeater IDs

| Identifier | State | Repeater Name   | Antenna   | Location / Height   | Last Heard | MeshCore Contact URL |
|-----------:|-------|-----------------|-----------|---------------------|------------|----------------------|
{% for r in repeaters -%}
| {{ r. id }} | {%- if r.state %} {{ r.state }} {%- else %} Unknown {%- endif %} | {{ r.name }} | {{ r.antenna }} | {{ r.location }} | {{ r.last_heard | epoch_to_date }} | {%- if r.contact %} [Contact]({{ r.contact }}) {%- else %} N/A {%- endif %} |
{% endfor %}

*If you spot an error in this repeater list or would like to add your own, please contact MrAlders0n on the Greater Ottawa Mesh Enthusiasts Discord.*