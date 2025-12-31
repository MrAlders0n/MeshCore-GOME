# Overview

<!-- The repeater tables and ID list on this page are automatically generated from meshcore/data/repeaters.yml. 
     To add a new repeater, simply append it to that YAML file — MkDocs will populate the tables automatically. -->

This page lists all deployed and reserved repeater IDs in Ottawa, along with their current configurations.

!!! note "If you notice anything that should be updated"
    Please see our **[Contributing Guide](../community/contributing.md)**. You can also reach out to MrAlders0n on Discord or MeshCore, or contact any of the Knowledge Curators on the Discord server for assistance.

## Available Repeater IDs

The following MeshCore node identifiers are currently **unused** and available for future Ottawa repeaters:  
```{{ unused_ids | join(',') }}```
*({{ unused_ids | length }} remaining IDs)*

## Deployed Repeater IDs

| Identifier | State | Repeater Name   | Antenna   | Location / Height   | Last Heard | MeshCore Contact URL |
|-----------:|-------|-----------------|-----------|---------------------|------------|----------------------|
{% for r in repeaters -%}
| {{ r.id }} | {%- if r.state %} {{ r.state }} {%- else %} Unknown {%- endif %} | {{ r.name }} | {{ r. antenna }} | {{ r.location }} | {%- if r.last_heard %} {{ r.last_heard }} {%- else %} N/A {%- endif %} | {%- if r.contact %} [Contact]({{ r.contact }}) {%- else %} TBD {%- endif %} |
{% endfor %}

*If you spot an error in this repeater list or would like to add your own, please contact MrAlders0n on the Greater Ottawa Mesh Enthusiasts Discord.*
