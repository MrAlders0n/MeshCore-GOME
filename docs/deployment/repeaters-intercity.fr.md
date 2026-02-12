---
hide:
  - toc
---

<h1>Syst&egrave;me de liaison inter-villes C-Block de MeshCore</h1>

<p>MeshCore utilise des <strong>identifiants de r&eacute;p&eacute;teur sur 1 octet</strong>. Lorsque deux villes se connectent, on rencontre souvent des <strong>identifiants de r&eacute;p&eacute;teur en double</strong>, ce qui rend impossible la lecture des chemins de messages.</p>

<p>Pour r&eacute;soudre ce probl&egrave;me, Ottawa et Montr&eacute;al ont r&eacute;serv&eacute; les <strong>identifiants du bloc C</strong> (<code>C0</code>-<code>CF</code>) pour les liaisons inter-villes. Lorsque le r&eacute;cepteur d&eacute;tecte un identifiant du bloc C dans le chemin du message, il sait exactement o&ugrave; se trouvent les fronti&egrave;res entre les villes et peut isoler les sauts locaux des sauts distants.</p>

<h2>Plages r&eacute;serv&eacute;es du bloc C</h2>

<table>
  <thead>
    <tr><th>Plage</th><th>Corridor</th></tr>
  </thead>
  <tbody>
    <tr><td><code>CC</code> - <code>CF</code></td><td>Liaisons Ottawa &harr; Montr&eacute;al</td></tr>
    <tr><td><code>C6</code> - <code>CB</code></td><td>Liaisons Montr&eacute;al &harr; Qu&eacute;bec</td></tr>
    <tr><td><code>C0</code> - <code>C5</code></td><td>Disponible pour de futurs corridors</td></tr>
  </tbody>
</table>

<h2>&Eacute;tape 1 : Ottawa &rarr; Montr&eacute;al</h2>

<p>Un utilisateur envoie un message depuis Ottawa. Le message traverse les r&eacute;p&eacute;teurs locaux de Ottawa, franchit la liaison Ottawa-Montr&eacute;al, et arrive aux r&eacute;p&eacute;teurs locaux de Montr&eacute;al.</p>

<div class="cblock-diagram">

<div class="cblock-raw-path">
  <span class="cblock-hop cblock-ottawa">AA</span><span class="cblock-arrow">&rarr;</span>
  <span class="cblock-hop cblock-ottawa">AB</span><span class="cblock-arrow">&rarr;</span>
  <span class="cblock-hop cblock-ottawa">AC</span><span class="cblock-arrow">&rarr;</span>
  <span class="cblock-hop cblock-interlink1">CC</span><span class="cblock-arrow">&rarr;</span>
  <span class="cblock-hop cblock-interlink1">CD</span><span class="cblock-arrow">&rarr;</span>
  <span class="cblock-hop cblock-montreal">AA</span><span class="cblock-arrow">&rarr;</span>
  <span class="cblock-hop cblock-montreal">AB</span><span class="cblock-arrow">&rarr;</span>
  <span class="cblock-hop cblock-montreal">AC</span>
</div>

<div class="cblock-grid">

<div class="cblock-path-col">

<div class="cblock-block cblock-block-ottawa">
  <div class="cblock-block-label cblock-label-ottawa">&#9679; Ottawa (origine)</div>
  <div class="cblock-repeater"><span class="cblock-id cblock-id-ottawa">AA</span> R&eacute;p&eacute;teur, Ottawa</div>
  <div class="cblock-repeater"><span class="cblock-id cblock-id-ottawa">AB</span> R&eacute;p&eacute;teur, Ottawa</div>
  <div class="cblock-repeater"><span class="cblock-id cblock-id-ottawa">AC</span> R&eacute;p&eacute;teur, Ottawa</div>
</div>

<div class="cblock-connector">&darr;</div>

<div class="cblock-block cblock-block-interlink1">
  <div class="cblock-block-label cblock-label-interlink1">&#9679; Liaison : Ottawa &harr; Montr&eacute;al (CC-CF)</div>
  <div class="cblock-repeater"><span class="cblock-id cblock-id-interlink1">CC</span> R&eacute;p&eacute;teur de liaison 1</div>
  <div class="cblock-repeater"><span class="cblock-id cblock-id-interlink1">CD</span> R&eacute;p&eacute;teur de liaison 2</div>
</div>

<div class="cblock-connector">&darr;</div>

<div class="cblock-block cblock-block-montreal">
  <div class="cblock-block-label cblock-label-montreal">&#9679; Montr&eacute;al (destination)</div>
  <div class="cblock-repeater"><span class="cblock-id cblock-id-montreal">AA</span> R&eacute;p&eacute;teur, Montr&eacute;al</div>
  <div class="cblock-repeater"><span class="cblock-id cblock-id-montreal">AB</span> R&eacute;p&eacute;teur, Montr&eacute;al</div>
  <div class="cblock-repeater"><span class="cblock-id cblock-id-montreal">AC</span> R&eacute;p&eacute;teur, Montr&eacute;al</div>
</div>

</div>

<div class="cblock-interp-col">
<div class="cblock-interp-title">Comment un utilisateur de Montr&eacute;al interpr&egrave;te ce chemin</div>

<div class="cblock-step cblock-step-scan">
  <strong>01</strong> &mdash; Parcourir le chemin du message pour trouver des <strong>identifiants du bloc C</strong>
</div>

<div class="cblock-step cblock-step-detect1">
  <strong>02</strong> &mdash; <code>CC</code>, <code>CD</code> d&eacute;tect&eacute;s dans la <strong>plage CC-CF</strong>. Le message a travers&eacute; le corridor Ottawa &harr; Montr&eacute;al. <span class="cblock-badge cblock-badge-origin">origine : ottawa</span>
</div>

<div class="cblock-step cblock-step-ignore">
  <strong>03</strong> &mdash; <strong>Ignorer tout ce qui pr&eacute;c&egrave;de la fronti&egrave;re du bloc C.</strong> Les identifiants <code>AA</code>, <code>AB</code>, <code>AC</code> au-dessus de la liaison sont les sauts locaux de Ottawa, pas ceux de Montr&eacute;al, m&ecirc;me si les identifiants sont identiques. <span class="cblock-badge cblock-badge-ignored">ignor&eacute;</span>
</div>

<div class="cblock-step cblock-step-focus">
  <strong>04</strong> &mdash; <strong>Se concentrer sur le chemin local apr&egrave;s le bloc C.</strong> Les identifiants <code>AA &rarr; AB &rarr; AC</code> apr&egrave;s la liaison CC-CF sont des r&eacute;p&eacute;teurs de Montr&eacute;al. <span class="cblock-badge cblock-badge-local">chemin local</span>
</div>

</div>
</div>
</div>

<h2>&Eacute;tape 2 : Le message continue vers Qu&eacute;bec</h2>

<p>Le m&ecirc;me message continue depuis Montr&eacute;al. Il traverse les r&eacute;p&eacute;teurs locaux de Montr&eacute;al, franchit la liaison Montr&eacute;al-Qu&eacute;bec, et arrive aux r&eacute;p&eacute;teurs locaux de Qu&eacute;bec.</p>

<div class="cblock-diagram">

<div class="cblock-raw-path">
  <span class="cblock-hop cblock-ottawa">AA</span><span class="cblock-arrow">&rarr;</span>
  <span class="cblock-hop cblock-ottawa">AB</span><span class="cblock-arrow">&rarr;</span>
  <span class="cblock-hop cblock-ottawa">AC</span><span class="cblock-arrow">&rarr;</span>
  <span class="cblock-hop cblock-interlink1">CC</span><span class="cblock-arrow">&rarr;</span>
  <span class="cblock-hop cblock-interlink1">CD</span><span class="cblock-arrow">&rarr;</span>
  <span class="cblock-hop cblock-montreal">AA</span><span class="cblock-arrow">&rarr;</span>
  <span class="cblock-hop cblock-montreal">AB</span><span class="cblock-arrow">&rarr;</span>
  <span class="cblock-hop cblock-montreal">AC</span><span class="cblock-arrow">&rarr;</span>
  <span class="cblock-hop cblock-interlink2">C8</span><span class="cblock-arrow">&rarr;</span>
  <span class="cblock-hop cblock-interlink2">C9</span><span class="cblock-arrow">&rarr;</span>
  <span class="cblock-hop cblock-quebec">AA</span><span class="cblock-arrow">&rarr;</span>
  <span class="cblock-hop cblock-quebec">AB</span><span class="cblock-arrow">&rarr;</span>
  <span class="cblock-hop cblock-quebec">AC</span>
</div>

<div class="cblock-grid">

<div class="cblock-path-col">

<div class="cblock-block cblock-block-ottawa">
  <div class="cblock-block-label cblock-label-ottawa">&#9679; Ottawa (origine)</div>
  <div class="cblock-repeater"><span class="cblock-id cblock-id-ottawa">AA</span> R&eacute;p&eacute;teur, Ottawa</div>
  <div class="cblock-repeater"><span class="cblock-id cblock-id-ottawa">AB</span> R&eacute;p&eacute;teur, Ottawa</div>
  <div class="cblock-repeater"><span class="cblock-id cblock-id-ottawa">AC</span> R&eacute;p&eacute;teur, Ottawa</div>
</div>

<div class="cblock-connector">&darr;</div>

<div class="cblock-block cblock-block-interlink1">
  <div class="cblock-block-label cblock-label-interlink1">&#9679; Liaison : Ottawa &harr; Montr&eacute;al (CC-CF)</div>
  <div class="cblock-repeater"><span class="cblock-id cblock-id-interlink1">CC</span> R&eacute;p&eacute;teur de liaison 1</div>
  <div class="cblock-repeater"><span class="cblock-id cblock-id-interlink1">CD</span> R&eacute;p&eacute;teur de liaison 2</div>
</div>

<div class="cblock-connector">&darr;</div>

<div class="cblock-block cblock-block-montreal">
  <div class="cblock-block-label cblock-label-montreal">&#9679; Montr&eacute;al (transit)</div>
  <div class="cblock-repeater"><span class="cblock-id cblock-id-montreal">AA</span> R&eacute;p&eacute;teur, Montr&eacute;al</div>
  <div class="cblock-repeater"><span class="cblock-id cblock-id-montreal">AB</span> R&eacute;p&eacute;teur, Montr&eacute;al</div>
  <div class="cblock-repeater"><span class="cblock-id cblock-id-montreal">AC</span> R&eacute;p&eacute;teur, Montr&eacute;al</div>
</div>

<div class="cblock-connector">&darr;</div>

<div class="cblock-block cblock-block-interlink2">
  <div class="cblock-block-label cblock-label-interlink2">&#9679; Liaison : Montr&eacute;al &harr; Qu&eacute;bec (C6-CB)</div>
  <div class="cblock-repeater"><span class="cblock-id cblock-id-interlink2">C8</span> R&eacute;p&eacute;teur de liaison 1</div>
  <div class="cblock-repeater"><span class="cblock-id cblock-id-interlink2">C9</span> R&eacute;p&eacute;teur de liaison 2</div>
</div>

<div class="cblock-connector">&darr;</div>

<div class="cblock-block cblock-block-quebec">
  <div class="cblock-block-label cblock-label-quebec">&#9679; Qu&eacute;bec (destination)</div>
  <div class="cblock-repeater"><span class="cblock-id cblock-id-quebec">AA</span> R&eacute;p&eacute;teur, Qu&eacute;bec</div>
  <div class="cblock-repeater"><span class="cblock-id cblock-id-quebec">AB</span> R&eacute;p&eacute;teur, Qu&eacute;bec</div>
  <div class="cblock-repeater"><span class="cblock-id cblock-id-quebec">AC</span> R&eacute;p&eacute;teur, Qu&eacute;bec</div>
</div>

</div>

<div class="cblock-interp-col">
<div class="cblock-interp-title">Comment un utilisateur de Qu&eacute;bec interpr&egrave;te ce chemin</div>

<div class="cblock-step cblock-step-scan">
  <strong>01</strong> &mdash; Parcourir le chemin du message pour trouver des <strong>identifiants du bloc C</strong>
</div>

<div class="cblock-step cblock-step-detect1">
  <strong>02</strong> &mdash; <code>CC</code>, <code>CD</code> d&eacute;tect&eacute;s dans la <strong>plage CC-CF</strong>. Le message a travers&eacute; le corridor Ottawa &harr; Montr&eacute;al. <span class="cblock-badge cblock-badge-origin">origine : ottawa</span>
</div>

<div class="cblock-step cblock-step-detect2">
  <strong>03</strong> &mdash; <code>C8</code>, <code>C9</code> d&eacute;tect&eacute;s dans la <strong>plage C6-CB</strong>. Le message a aussi travers&eacute; le corridor Montr&eacute;al &harr; Qu&eacute;bec. <span class="cblock-badge cblock-badge-transit">transit : montr&eacute;al</span>
</div>

<div class="cblock-step cblock-step-ignore">
  <strong>04</strong> &mdash; <strong>Ignorer tout ce qui pr&eacute;c&egrave;de la derni&egrave;re fronti&egrave;re du bloc C.</strong> Tous les identifiants avant <code>C8</code>/<code>C9</code> appartiennent aux villes de Ottawa et Montr&eacute;al. Les <code>AA</code>, <code>AB</code>, <code>AC</code> en double ne sont PAS locaux. <span class="cblock-badge cblock-badge-ignored">ignor&eacute;</span>
</div>

<div class="cblock-step cblock-step-focus">
  <strong>05</strong> &mdash; <strong>Se concentrer sur le chemin local apr&egrave;s le dernier bloc C.</strong> Les identifiants <code>AA &rarr; AB &rarr; AC</code> apr&egrave;s la liaison C6-CB sont des r&eacute;p&eacute;teurs de Qu&eacute;bec. <span class="cblock-badge cblock-badge-local">chemin local</span>
</div>

<div class="cblock-step cblock-step-info">
  <strong>&#8505;&#65039;</strong> &mdash; La pr&eacute;sence de <strong>deux plages du bloc C</strong> indique exactement combien de fronti&egrave;res le message a travers&eacute;es et quel corridor correspond. Une provenance compl&egrave;te dans un syst&egrave;me sur 1 octet.
</div>

</div>
</div>
</div>