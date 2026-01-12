---
hide:
  - toc
---

# Overview

<!-- The repeater tables and ID list on this page are automatically generated from meshcore/data/repeaters.yml.  
     To add a new repeater, simply append it to that YAML file — MkDocs will populate the tables automatically. -->

This page tracks Ottawa repeater IDs (00–FF), showing which are deployed, reserved, or available, along with current configs.

The table below shows all **256 repeater IDs**. Colors indicate status:

- 🟢 **Available** — click to generate a keypair
- 🔴 **Deployed** — click for repeater details (dimmed if inactive 7+ days)
- 🔵 **Duplicate/Conflict** — click to view conflicts (dimmed if inactive 7+ days)
- ⚫ **Backbone Reserved** — held for major links (dimmed if inactive 7+ days)

Click any cell to view details or take action.

{{ hex_table }}

*({{ unused_ids | length }} available IDs)*

!!! note "See something that needs updating?"
    Check the **[Contributing Guide](../community/contributing.md)**, or reach out to MrAlders0n or a Knowledge Curator on the GOME Discord / MeshCore.
