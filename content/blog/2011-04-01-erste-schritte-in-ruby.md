+++
title = "erste Schritte in Ruby"
layout = "post"

+++

<p>Da ich in den letzten Wochen sehr viel Zeit in Zügen verbracht habe, hatte ich sehr viel Gelegenheit, mir sehr viele ausgaben von <a href="http://c3d2.de/podcast.html">Pentacast</a> und<a href="http://chaosradio.ccc.de/chaosradio_express.html"> Chaos Radio Express</a> anzuhören.</p>
<p>Besonders <a href="http://c3d2.de/news/pentacast-1-jabber.html">Pentacast Nº1</a> über jabber war sehr aufschlussreich, zumal ich mich schon seit längerem für dieses Protokoll sehr interessiere. Ursprünglich wollte ich etwas in python machen, doch nachdem ich mal einen Nachmittag lang in xmpppy, pyxmpp und twisted reingeschaut hatte — und keines davon wirklich geeignet schien entschied ich mich für xmpp4r.</p>
<p>So lernte ich also mal eben etwas Ruby. Das Projekt was aus meinen ersten Versuchen mit Ruby entstand war ein kleiner Jabberbot namens <a title="XXRB at github" href="https://github.com/hoodie/xxrb/">xxrb</a> (extensible XMPP ruby bot). Teile davon entstanden im Zug <img src="/smilies/icon_smile.gif" alt=":D" class="wp-smiley" style="height: 1em; max-height: 1em;" /></p>
<p>Der bot selbst kann in seiner Standardausführung nicht viel, er bietet ein Commandline interface und kann sich mit einem xmpp Server verbinden. Was macht ihn nun so extensible?</p>
<pre class="brush:ruby"># Original greeting function
xmpp_hello = RbCmd.new(:hello, .xmpp)
def xmpp_hello.action
	if @args
		result = "I'm not actually " + @args + " but his evil twin"
	else
		result = "hello yourself"
	end
end
def xmpp_hello.help
	result = '"hello" is only the first of many cool features'
end

bot = Xxrb.new
bot.add_cmd(xmpp_hello)</pre>
<p>Nachdem man den Bot initialisiert hat kann man ihm neue Commands beibringen indem man ihm RbCmd Objekte übergibt. Diese enthalten zwei Methoden: action und help. Action wird ausgeführt wenn man wie hier im Beispiel &#8220;hello&#8221; eingibt und Help wenn man &#8220;help hello&#8221; eingibt. Das zweite Symbol im Konstruktor bezeichnet ob der Befehl über Comandline oder Xmpp erwartet wird. Innerhalb der action stehen zudem @args, @jid des Benutzers (in cli des Bots selbst)  und @bot zur Verfügung.</p>
<p>Bislang kann mein Bot nur Haltestelleninfos zu Dresdner Straßenbahnen und Bussen zurück geben. Eine Testversion läuft auf dvb(ät)hoodie.de .</p>
<p>Da ich bereits etwas Erfahrung mit pyGTK sammeln konnte und die RubyGTK Schnittstelle sich nicht viel anders verhält, habe ich nun mit den Arbeiten an einem grafischen Tool begonnen. Da ich mit dem Funktionsumfang von Pidgin in Puncto Jabber noch nie zu Frieden war und bei Psi leider auch nicht viel passiert, habe ich mich daher entschlossen an einem eigenen Jabberclient zu arbeiten. Er wird wohl nach irgendwas zwischen Pidgin und Psi aussehen und in Ruby geschrieben sein. Da man mit Ruby ja auch in einem gewissem Rahmen Funktional programmieren kann dachte ich an ein Scripting interface. Benutzer können bestimmten events (zB ein Kontakt kommt online) eigene Aktionen in Form von Ruby hinzufügen und ausführen. Interessant ist auch Konversationen die man mit zwei Personen Parallel führt automatisch zu einem MUC zusammen zu fassen.</p>
<p>Jabber ist ja auch das Standard ChatProtokoll von facebook, daher würde ich auch einen bestimmten &#8220;Stalkermode&#8221; einbauen, mit dem man immer sofort die Statusupdates einer bestimmter Person &#8220;like&#8221;t oder sich für seine Exfreunding unsichtbar macht und deren gespräche mitliest.</p>
<p>Wie ihr seht steckt noch viel Potential in der Materie, ich habe also viel zu tun. Wenn ich mit etwas ranhalte sollte ich allerdings schon in etwa einer Woche den ersten Milestone vorstellen können, also seid gespannt.</p>
