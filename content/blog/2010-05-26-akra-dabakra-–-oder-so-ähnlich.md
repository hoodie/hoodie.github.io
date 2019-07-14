+++
title = "Akra dabakra – oder so ähnlich"
layout = "post"

+++

<p>Wozu denn scripte schreiben? Ich liebe es, wenn ein Befehl seine eigene Subsprache mit bringen.<br />
Hatte mir schon nen kleinen 5 Zeiler in Bash gebaut, da erfahr ich, dass es noch kürzer geht:</p>
<pre class="brush:bash">
find original/ \( -type d -exec mkdir -p ziel/{}  \; \) -o \( -type f -exec ln {} ziel/{}  \; \)
</pre>
