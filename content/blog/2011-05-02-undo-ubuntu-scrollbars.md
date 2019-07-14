+++
title = "Undo Ubuntu Scrollbars"
layout = "post"

+++

<p>Neue <span class="ubuntu">Ubuntu</span> Versionen sind immer etwas feines, mindestens weil man endlich wieder neue Software bekommt. Schade ist immer nur, dass einem gewisse Interface Änderungen aufgezwungen werden. Unity oder Gnome3 muss man ja nicht mal benutzen, aber wenn auf einmal die Fensterknöpfe links sind oder die Scrollbars weg, dann möchte man doch eingreifen können.</p>
<p>Das letzte mal hatte ich schon eine <a title="I’m so Lucid" href="/2010/05/01/im-so-lucid/">Lösung zu dem Fensterknopfproblem gefunden</a>. Diesmal:</p>
<pre class="brush:bash">sudo apt-get remove overlay-scrollbar
sudo bash
echo "export LIBOVERLAY_SCROLLBAR=0" &gt; /etc/X11/Xsession.d/80-disableoverlayscrollbars</pre>
<p>Das sollte dafür sorgen, dass wir wieder alte Scrollbars bekommen.<br />
Vielen Dank an <a href="http://everflux.de/ubuntu-natty-scrollbars-in-gnome-classic-1815/">everflux.de</a></p>
