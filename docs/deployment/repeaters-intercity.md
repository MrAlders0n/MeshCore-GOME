
---
hide:
  - toc
---

# MeshCore C-Block Interlink ID System

MeshCore supports **1-byte Repeater IDs** today. Because of this, when two cities connect you are often met with **overlapping Repeater IDs**, making it impossible to know message paths.

To combat this, Ottawa and Montreal have reserved the **C-block IDs** (`C0`-`CF`) for inter-city links. When a receiver sees a C-block ID in the message path, it knows exactly where city boundaries are and can isolate local hops from remote ones.

## Reserved C-Block Ranges

| Range | Corridor |
|-------|----------|
| `CC` - `CF` | Ottawa ↔ Montreal Interlinks |
| `C6` - `CB` | Montreal ↔ Quebec City Interlinks |
| `C0` - `C5` | Available for future corridors |

## Step 1: Ottawa → Montreal

A user in Ottawa sends a message. It traverses local Ottawa repeaters, crosses the Ottawa-Montreal interlink, and arrives at Montreal's local repeaters.

<div class="cblock-diagram">

<div class="cblock-raw-path">
  <span class="cblock-hop cblock-ottawa">AA</span><span class="cblock-arrow">→</span>
  <span class="cblock-hop cblock-ottawa">AB</span><span class="cblock-arrow">→</span>
  <span class="cblock-hop cblock-ottawa">AC</span><span class="cblock-arrow">→</span>
  <span class="cblock-hop cblock-interlink1">CC</span><span class="cblock-arrow">→</span>
  <span class="cblock-hop cblock-interlink1">CD</span><span class="cblock-arrow">→</span>
  <span class="cblock-hop cblock-montreal">AA</span><span class="cblock-arrow">→</span>
  <span class="cblock-hop cblock-montreal">AB</span><span class="cblock-arrow">→</span>
  <span class="cblock-hop cblock-montreal">AC</span>
</div>

<div class="cblock-grid">

<div class="cblock-path-col">

<div class="cblock-block cblock-block-ottawa">
  <div class="cblock-block-label cblock-label-ottawa">● Ottawa (origin)</div>
  <div class="cblock-repeater"><span class="cblock-id cblock-id-ottawa">AA</span> Repeater, Ottawa</div>
  <div class="cblock-repeater"><span class="cblock-id cblock-id-ottawa">AB</span> Repeater, Ottawa</div>
  <div class="cblock-repeater"><span class="cblock-id cblock-id-ottawa">AC</span> Repeater, Ottawa</div>
</div>

<div class="cblock-connector">↓</div>

<div class="cblock-block cblock-block-interlink1">
  <div class="cblock-block-label cblock-label-interlink1">● Interlink: Ottawa ↔ Montreal (CC-CF)</div>
  <div class="cblock-repeater"><span class="cblock-id cblock-id-interlink1">CC</span> Interlink Repeater 1</div>
  <div class="cblock-repeater"><span class="cblock-id cblock-id-interlink1">CD</span> Interlink Repeater 2</div>
</div>

<div class="cblock-connector">↓</div>

<div class="cblock-block cblock-block-montreal">
  <div class="cblock-block-label cblock-label-montreal">● Montreal (destination)</div>
  <div class="cblock-repeater"><span class="cblock-id cblock-id-montreal">AA</span> Repeater, Montreal</div>
  <div class="cblock-repeater"><span class="cblock-id cblock-id-montreal">AB</span> Repeater, Montreal</div>
  <div class="cblock-repeater"><span class="cblock-id cblock-id-montreal">AC</span> Repeater, Montreal</div>
</div>

</div>

<div class="cblock-interp-col">
<div class="cblock-interp-title">How a Montreal user reads this path</div>

<div class="cblock-step cblock-step-scan">
  <strong>01</strong> — Scan the message path for any <strong>C-block IDs</strong>
</div>

<div class="cblock-step cblock-step-detect1">
  <strong>02</strong> — Found <code>CC</code>, <code>CD</code> in the <strong>CC-CF range</strong>. The message crossed the Ottawa ↔ Montreal corridor. <span class="cblock-badge cblock-badge-origin">origin: ottawa</span>
</div>

<div class="cblock-step cblock-step-ignore">
  <strong>03</strong> — <strong>Ignore everything above the C-block boundary.</strong> The IDs <code>AA</code>, <code>AB</code>, <code>AC</code> above the interlink are Ottawa's local hops, not Montreal's, even though the IDs overlap. <span class="cblock-badge cblock-badge-ignored">ignored</span>
</div>

<div class="cblock-step cblock-step-focus">
  <strong>04</strong> — <strong>Focus on local path below the C-block.</strong> <code>AA → AB → AC</code> after the CC-CF interlink are definitively Montreal repeaters. <span class="cblock-badge cblock-badge-local">local path</span>
</div>

</div>
</div>
</div>

## Step 2: The message continues to Quebec City

That same message continues from Montreal. It traverses Montreal's local repeaters, crosses the Montreal-Quebec City interlink, and arrives at Quebec City's local repeaters.

<div class="cblock-diagram">

<div class="cblock-raw-path">
  <span class="cblock-hop cblock-ottawa">AA</span><span class="cblock-arrow">→</span>
  <span class="cblock-hop cblock-ottawa">AB</span><span class="cblock-arrow">→</span>
  <span class="cblock-hop cblock-ottawa">AC</span><span class="cblock-arrow">→</span>
  <span class="cblock-hop cblock-interlink1">CC</span><span class="cblock-arrow">→</span>
  <span class="cblock-hop cblock-interlink1">CD</span><span class="cblock-arrow">→</span>
  <span class="cblock-hop cblock-montreal">AA</span><span class="cblock-arrow">→</span>
  <span class="cblock-hop cblock-montreal">AB</span><span class="cblock-arrow">→</span>
  <span class="cblock-hop cblock-montreal">AC</span><span class="cblock-arrow">→</span>
  <span class="cblock-hop cblock-interlink2">C8</span><span class="cblock-arrow">→</span>
  <span class="cblock-hop cblock-interlink2">C9</span><span class="cblock-arrow">→</span>
  <span class="cblock-hop cblock-quebec">AA</span><span class="cblock-arrow">→</span>
  <span class="cblock-hop cblock-quebec">AB</span><span class="cblock-arrow">→</span>
  <span class="cblock-hop cblock-quebec">AC</span>
</div>

<div class="cblock-grid">

<div class="cblock-path-col">

<div class="cblock-block cblock-block-ottawa">
  <div class="cblock-block-label cblock-label-ottawa">● Ottawa (origin)</div>
  <div class="cblock-repeater"><span class="cblock-id cblock-id-ottawa">AA</span> Repeater, Ottawa</div>
  <div class="cblock-repeater"><span class="cblock-id cblock-id-ottawa">AB</span> Repeater, Ottawa</div>
  <div class="cblock-repeater"><span class="cblock-id cblock-id-ottawa">AC</span> Repeater, Ottawa</div>
</div>

<div class="cblock-connector">↓</div>

<div class="cblock-block cblock-block-interlink1">
  <div class="cblock-block-label cblock-label-interlink1">● Interlink: Ottawa ↔ Montreal (CC-CF)</div>
  <div class="cblock-repeater"><span class="cblock-id cblock-id-interlink1">CC</span> Interlink Repeater 1</div>
  <div class="cblock-repeater"><span class="cblock-id cblock-id-interlink1">CD</span> Interlink Repeater 2</div>
</div>

<div class="cblock-connector">↓</div>

<div class="cblock-block cblock-block-montreal">
  <div class="cblock-block-label cblock-label-montreal">● Montreal (transit)</div>
  <div class="cblock-repeater"><span class="cblock-id cblock-id-montreal">AA</span> Repeater, Montreal</div>
  <div class="cblock-repeater"><span class="cblock-id cblock-id-montreal">AB</span> Repeater, Montreal</div>
  <div class="cblock-repeater"><span class="cblock-id cblock-id-montreal">AC</span> Repeater, Montreal</div>
</div>

<div class="cblock-connector">↓</div>

<div class="cblock-block cblock-block-interlink2">
  <div class="cblock-block-label cblock-label-interlink2">● Interlink: Montreal ↔ Quebec City (C6-CB)</div>
  <div class="cblock-repeater"><span class="cblock-id cblock-id-interlink2">C8</span> Interlink Repeater 1</div>
  <div class="cblock-repeater"><span class="cblock-id cblock-id-interlink2">C9</span> Interlink Repeater 2</div>
</div>

<div class="cblock-connector">↓</div>

<div class="cblock-block cblock-block-quebec">
  <div class="cblock-block-label cblock-label-quebec">● Quebec City (destination)</div>
  <div class="cblock-repeater"><span class="cblock-id cblock-id-quebec">AA</span> Repeater, Quebec City</div>
  <div class="cblock-repeater"><span class="cblock-id cblock-id-quebec">AB</span> Repeater, Quebec City</div>
  <div class="cblock-repeater"><span class="cblock-id cblock-id-quebec">AC</span> Repeater, Quebec City</div>
</div>

</div>

<div class="cblock-interp-col">
<div class="cblock-interp-title">How a Quebec City user reads this path</div>

<div class="cblock-step cblock-step-scan">
  <strong>01</strong> — Scan the message path for any <strong>C-block IDs</strong>
</div>

<div class="cblock-step cblock-step-detect1">
  <strong>02</strong> — Found <code>CC</code>, <code>CD</code> in the <strong>CC-CF range</strong>. The message crossed the Ottawa ↔ Montreal corridor. <span class="cblock-badge cblock-badge-origin">origin: ottawa</span>
</div>

<div class="cblock-step cblock-step-detect2">
  <strong>03</strong> — Found <code>C8</code>, <code>C9</code> in the <strong>C6-CB range</strong>. The message also crossed the Montreal ↔ Quebec City corridor. <span class="cblock-badge cblock-badge-transit">transit: montreal</span>
</div>

<div class="cblock-step cblock-step-ignore">
  <strong>04</strong> — <strong>Ignore everything above the last C-block boundary.</strong> All IDs before <code>C8</code>/<code>C9</code> belong to Ottawa and Montreal. The overlapping <code>AA</code>, <code>AB</code>, <code>AC</code> are NOT local. <span class="cblock-badge cblock-badge-ignored">ignored</span>
</div>

<div class="cblock-step cblock-step-focus">
  <strong>05</strong> — <strong>Focus on local path below the last C-block.</strong> <code>AA → AB → AC</code> after the C6-CB interlink are definitively Quebec City repeaters. <span class="cblock-badge cblock-badge-local">local path</span>
</div>

<div class="cblock-step cblock-step-info">
  <strong>ℹ️</strong> — The presence of <strong>two C-block ranges</strong> tells the user exactly how many city boundaries the message crossed and which corridor each belongs to. Full provenance in a 1-byte ID system.
</div>

</div>
</div>
</div>