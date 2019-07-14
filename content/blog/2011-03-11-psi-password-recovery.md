+++
title = "Psi password recovery"
layout = "post"

+++

<p>Heute wollte ich mal <a href="http://swift.im/">SWIFT</a> ausprobieren und da bemerkte ich, dass ich mein Passwort vergessen hatte. Ich erinnerte mich, dass ich mal ein script gefunden hatte, welches die Passwörter aus der Psi account.xml decodiert. Es hat echt ne Weile gedauert, bis ich das Ding wieder gefunden hatte.</p>
<p>Damit andere nicht so lange danach suchen müssen, <a href="http://blogmal.42.org/rev-eng/psi-password.story">hier ist das perl script </a>und hier was ich daraus gemacht habe:</p>
<pre class="brush:bash">#!/bin/bash
n=0
grep -E '(password|^...\([^&lt;]*\).*|\1|g" -e "s|.*\([^&lt;]*\).*|\1|g" | while read line;
do
	if [ $n -eq 0  ]
		then
			jid=$line
			n=1
		else
			pw=$line
			n=0
			echo $jid
			perl -le '($jid,$pw)=@ARGV;$pw=~s/..(..)/chr hex$1/ge; print substr($pw^$jid,0,length$pw)' $jid $pw
	fi
done
</pre>
