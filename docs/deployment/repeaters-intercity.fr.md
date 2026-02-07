<!-- docs/interlink/c-block-system.fr.md -->

# Système d'identifiants d'interliage C-Block de MeshCore

MeshCore utilise aujourd'hui des **identifiants de répéteur sur 1 octet**. Pour cette raison, lorsque deux villes se connectent, on rencontre souvent des **identifiants de répéteur en double**, ce qui rend impossible l'identification des chemins de messages.

Pour remédier à ce problème, Ottawa et Montréal ont réservé les **identifiants du bloc C** (`C0`-`CF`) pour les liaisons inter-villes. Lorsqu'un récepteur détecte un identifiant du bloc C dans le chemin d'un message, il sait exactement où se trouvent les frontières entre les villes et peut isoler les sauts locaux des sauts distants.

## Plages réservées du bloc C

| Plage | Corridor |
|-------|----------|
| `CC` - `CF` | Interliages Ottawa ↔ Montréal |
| `C6` - `CB` | Interliages Montréal ↔ Québec |
| `C0` - `C5` | Disponible pour de futurs corridors |

## Exemple : Ottawa → Montréal → Québec

Un utilisateur à Ottawa envoie un message. Celui-ci traverse les répéteurs locaux d'Ottawa, franchit l'interliage Ottawa-Montréal, passe par les répéteurs locaux de Montréal, franchit l'interliage Montréal-Québec, et arrive aux répéteurs locaux de Québec.

<div class="cblock-diagram" markdown="1">

<!-- Chemin brut -->
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

<!-- Gauche : Chemin visuel -->
<div class="cblock-path-col">

<div class="cblock-block cblock-block-ottawa">
  <div class="cblock-block-label cblock-label-ottawa">● Ottawa (origine)</div>
  <div class="cblock-repeater"><span class="cblock-id cblock-id-ottawa">AA</span> Répéteur, Ottawa</div>
  <div class="cblock-repeater"><span class="cblock-id cblock-id-ottawa">AB</span> Répéteur, Ottawa</div>
  <div class="cblock-repeater"><span class="cblock-id cblock-id-ottawa">AC</span> Répéteur, Ottawa</div>
</div>

<div class="cblock-connector">↓</div>

<div class="cblock-block cblock-block-interlink1">
  <div class="cblock-block-label cblock-label-interlink1">● Interliage : Ottawa ↔ Montréal (CC-CF)</div>
  <div class="cblock-repeater"><span class="cblock-id cblock-id-interlink1">CC</span> Répéteur d'interliage 1</div>
  <div class="cblock-repeater"><span class="cblock-id cblock-id-interlink1">CD</span> Répéteur d'interliage 2</div>
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
  <div class="cblock-block-label cblock-label-interlink2">● Interliage : Montréal ↔ Québec (C6-CB)</div>
  <div class="cblock-repeater"><span class="cblock-id cblock-id-interlink2">C8</span> Répéteur d'interliage 1</div>
  <div class="cblock-repeater"><span class="cblock-id cblock-id-interlink2">C9</span> Répéteur d'interliage 2</div>
</div>

<div class="cblock-connector">↓</div>

<div class="cblock-block cblock-block-quebec">
  <div class="cblock-block-label cblock-label-quebec">● Québec (local)</div>
  <div class="cblock-repeater"><span class="cblock-id cblock-id-quebec">AA</span> Répéteur, Québec</div>
  <div class="cblock-repeater"><span class="cblock-id cblock-id-quebec">AB</span> Répéteur, Québec</div>
  <div class="cblock-repeater"><span class="cblock-id cblock-id-quebec">AC</span> Répéteur, Québec</div>
</div>

</div>

<!-- Droite : Interprétation -->
<div class="cblock-interp-col">
<div class="cblock-interp-title">Comment un utilisateur à Québec interprète ce chemin</div>

<div class="cblock-step cblock-step-scan">
  <strong>01</strong> — Parcourir le chemin du message à la recherche d'<strong>identifiants du bloc C</strong>
</div>

<div class="cblock-step cblock-step-detect1">
  <strong>02</strong> — <code>CC</code>, <code>CD</code> détectés dans la <strong>plage CC-CF</strong>. Le message a traversé le corridor Ottawa ↔ Montréal. <span class="cblock-badge cblock-badge-origin">origine : ottawa</span>
</div>

<div class="cblock-step cblock-step-detect2">
  <strong>03</strong> — <code>C8</code>, <code>C9</code> détectés dans la <strong>plage C6-CB</strong>. Le message a également traversé le corridor Montréal ↔ Québec. <span class="cblock-badge cblock-badge-transit">transit : montréal</span>
</div>

<div class="cblock-step cblock-step-ignore">
  <strong>04</strong> — <strong>Ignorer tout ce qui précède la dernière frontière du bloc C.</strong> Tous les identifiants avant <code>C8</code>/<code>C9</code> appartiennent à Ottawa et Montréal. Les <code>AA</code>, <code>AB</code>, <code>AC</code> en double ne sont PAS locaux. <span class="cblock-badge cblock-badge-ignored">ignoré</span>
</div>

<div class="cblock-step cblock-step-focus">
  <strong>05</strong> — <strong>Se concentrer sur le chemin local après le dernier bloc C.</strong> <code>AA → AB → AC</code> après l'interliage C6-CB sont définitivement des répéteurs de Québec. <span class="cblock-badge cblock-badge-local">chemin local</span>
</div>

<div class="cblock-step cblock-step-info">
  <strong>ℹ️</strong> — La présence de <strong>deux plages du bloc C</strong> indique à l'utilisateur exactement combien de frontières de villes le message a traversées et à quel corridor chacune correspond. Une provenance complète dans un système d'identifiants sur 1 octet.
</div>

</div>
</div>
</div>