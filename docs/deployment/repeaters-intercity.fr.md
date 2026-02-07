# Système de liaison inter-villes C-Block de MeshCore

MeshCore utilise des **identifiants de répéteur sur 1 octet**. Lorsque deux villes se connectent, on rencontre souvent des **identifiants de répéteur en double**, ce qui rend impossible la lecture des chemins de messages.

Pour résoudre ce problème, Ottawa et Montréal ont réservé les **identifiants du bloc C** (`C0`-`CF`) pour les liaisons inter-villes. Lorsque le récepteur détecte un identifiant du bloc C dans le chemin du message, il sait exactement où se trouvent les frontières entre les villes et peut isoler les sauts locaux des sauts distants.

## Plages réservées du bloc C

| Plage | Corridor |
|-------|----------|
| `CC` - `CF` | Liaisons Ottawa ↔ Montréal |
| `C6` - `CB` | Liaisons Montréal ↔ Québec |
| `C0` - `C5` | Disponible pour de futurs corridors |

## Exemple : Ottawa → Montréal → Québec

Un utilisateur envoie un message depuis Ottawa. Le message traverse les répéteurs locaux de Ottawa, franchit la liaison Ottawa-Montréal, passe par les répéteurs locaux de Montréal, franchit la liaison Montréal-Québec, et arrive aux répéteurs locaux de Québec.

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
  <div class="cblock-block-label cblock-label-ottawa">● Ottawa (origine)</div>
  <div class="cblock-repeater"><span class="cblock-id cblock-id-ottawa">AA</span> Répéteur, Ottawa</div>
  <div class="cblock-repeater"><span class="cblock-id cblock-id-ottawa">AB</span> Répéteur, Ottawa</div>
  <div class="cblock-repeater"><span class="cblock-id cblock-id-ottawa">AC</span> Répéteur, Ottawa</div>
</div>

<div class="cblock-connector">↓</div>

<div class="cblock-block cblock-block-interlink1">
  <div class="cblock-block-label cblock-label-interlink1">● Liaison : Ottawa ↔ Montréal (CC-CF)</div>
  <div class="cblock-repeater"><span class="cblock-id cblock-id-interlink1">CC</span> Répéteur de liaison 1</div>
  <div class="cblock-repeater"><span class="cblock-id cblock-id-interlink1">CD</span> Répéteur de liaison 2</div>
</div>

<div class="cblock-connector">↓</div>

<div class="cblock-block cblock-block-montreal">
  <div class="cblock-block-label cblock-label-montreal">● Montréal (transit)</div>
  <div class="cblock-repeater"><span class="cblock-id cblock-id-montreal">AA</span> Répéteur, Montréal</div>
  <div class="cblock-repeater"><span class="cblock-id cblock-id-montreal">AB</span> Répéteur, Montréal</div>
  <div class="cblock-repeater"><span class="cblock-id cblock-id-montreal">AC</span> Répéteur, Montréal</div>
</div>

<div class="cblock-connector">↓</div>

<div class="cblock-block cblock-block-interlink2">
  <div class="cblock-block-label cblock-label-interlink2">● Liaison : Montréal ↔ Québec (C6-CB)</div>
  <div class="cblock-repeater"><span class="cblock-id cblock-id-interlink2">C8</span> Répéteur de liaison 1</div>
  <div class="cblock-repeater"><span class="cblock-id cblock-id-interlink2">C9</span> Répéteur de liaison 2</div>
</div>

<div class="cblock-connector">↓</div>

<div class="cblock-block cblock-block-quebec">
  <div class="cblock-block-label cblock-label-quebec">● Québec (local)</div>
  <div class="cblock-repeater"><span class="cblock-id cblock-id-quebec">AA</span> Répéteur, Québec</div>
  <div class="cblock-repeater"><span class="cblock-id cblock-id-quebec">AB</span> Répéteur, Québec</div>
  <div class="cblock-repeater"><span class="cblock-id cblock-id-quebec">AC</span> Répéteur, Québec</div>
</div>

</div>

<div class="cblock-interp-col">
<div class="cblock-interp-title">Comment un utilisateur de Québec interprète ce chemin</div>

<div class="cblock-step cblock-step-scan">
  <strong>01</strong> — Parcourir le chemin du message pour trouver des <strong>identifiants du bloc C</strong>
</div>

<div class="cblock-step cblock-step-detect1">
  <strong>02</strong> — <code>CC</code>, <code>CD</code> détectés dans la <strong>plage CC-CF</strong>. Le message a traversé le corridor Ottawa ↔ Montréal. <span class="cblock-badge cblock-badge-origin">origine : ottawa</span>
</div>

<div class="cblock-step cblock-step-detect2">
  <strong>03</strong> — <code>C8</code>, <code>C9</code> détectés dans la <strong>plage C6-CB</strong>. Le message a aussi traversé le corridor Montréal ↔ Québec. <span class="cblock-badge cblock-badge-transit">transit : montréal</span>
</div>

<div class="cblock-step cblock-step-ignore">
  <strong>04</strong> — <strong>Ignorer tout ce qui précède la dernière frontière du bloc C.</strong> Tous les identifiants avant <code>C8</code>/<code>C9</code> appartiennent aux villes de Ottawa et Montréal. Les <code>AA</code>, <code>AB</code>, <code>AC</code> en double ne sont PAS locaux. <span class="cblock-badge cblock-badge-ignored">ignoré</span>
</div>

<div class="cblock-step cblock-step-focus">
  <strong>05</strong> — <strong>Se concentrer sur le chemin local après le dernier bloc C.</strong> Les identifiants <code>AA → AB → AC</code> après la liaison C6-CB sont des répéteurs de Québec. <span class="cblock-badge cblock-badge-local">chemin local</span>
</div>

<div class="cblock-step cblock-step-info">
  <strong>ℹ️</strong> — La présence de <strong>deux plages du bloc C</strong> indique exactement combien de frontières le message a traversées et quel corridor correspond. Une provenance complète dans un système sur 1 octet.
</div>

</div>
</div>
</div>