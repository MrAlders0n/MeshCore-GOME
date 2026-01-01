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

The table below provides a **visual overview of all 256 possible repeater IDs** (00-FF). Each cell is color-coded to show its current status:

- 🟢 **Dark Green** — Available IDs (click to generate a new keypair with this ID)
- 🔴 **Dark Red** — Deployed repeaters (click to view details)
- 🔵 **Dark Blue** — Duplicate/conflicting IDs (click to see all conflicts)
- ⚫ **Grey** — MeshCore reserved IDs (00 and FF)

**Click any cell** to interact with it.  Available IDs link directly to the key generator, while used IDs display detailed repeater information including antenna type, location, and contact details.

{{ hex_table }}

*({{ unused_ids | length }} available IDs)*

