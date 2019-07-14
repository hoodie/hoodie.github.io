+++
title = "nicht mehr unisono – call and response bitte"
layout = "post"

+++

<p>Angefangen hat alles mit meinem Umstieg auf <a href="http://www.archlinux.org">Archlinux</a> vor einigen Wochen. Wenn einer <a title="unison" href="http://www.cis.upenn.edu/~bcpierce/unison/">Unison</a> 2.32.52 auf Hardy Heron zum laufen kriegen sollte, oder unison 2.27.57 für Arch kompiliert kriegt, freu ich mich über jede Zuschrift.</p>
<p>Zumindest sind beide Versionen inkompatibel zueinander. Wer immer noch nicht weiß wovon ich rede, Unison ist ein eigentlich recht komfortables Werkzeug um Verzeichnisse (besonders zwischen mehreren Rechnern) zu synchronisieren und das in beide Richtungen. Ich hatte es mir bis lang so eingerichtet, dass ich gewisse Verzeichnisse, u.A. gnote-profile, workspace, Kalender und Adressbuch, auf meinen Lieblings-Uniserver <em>ganymed</em> hoch geladen habe. Somit konnte ich meinen Laptop und meinen PC jederzeit Synchronisieren, ohne zwangsläufig beide gleichzeitig anhaben zu müssen. Dazu muss allerdings auf auf dem Server ein Unison laufen, und da fängt das Problem an und hört schon wieder auf.</p>
<p>Intern arbeitet Unison mit Rsync, welches an sich ja schon sehr mächtig ist, jedoch nur zum synchronisieren in eine Richtung gedacht ist, also mit einer festen Quelle und einem festen Ziel. Dateien die nicht in der Quelle vorkommen werden aus dem Ziel gelöscht. Unison hat in diesem Falle vermittelt und dabei die Aktualität der Dateien in mit einbezogen. Dieses Feature vermisse ich besonders bei meiner 3 Punkte Synchronisierung.</p>
<p>Da ich allerdings in den letzten Wochen auch mehr mit dem source code management tool <a href="http://git-scm.com/">git</a> zu tun hatte kam ich auf die Idee, wenn ich schon nicht hin und her Synchronisieren kann, dann muss ich halt vorher mein lokales System updaten, wie man das bei jedem guten Softwareprojekt auch macht. Dazu hab ich mir ein kleines Bash Skript gebaut, welches genau das mittels rsync macht.<br />
<code></p>
<pre class="brush:shell">#!/bin/bash

root1=/home/username/pfad
root2=username@server:/pfad

paths[0]='.mozilla/'
paths[1]='Bilder/'

attributes='acvzpue ssh --delete'
checkpush(){
	for path in ${paths[*]} ;
	do rsync -n${attributes} ${root1}${path} ${root2}/${path} | grep delet
	done;
}
checkpull(){
	for path in ${paths[*]} ;
	do rsync -n${attributes} ${root2}${path} ${root1}/${path} | grep delet
	done;
}
pull(){
	for path in ${paths[*]} ;
	do
		if [ -d ${root1}${path} ] || [ -f ${root1}${path} ];
		then
			echo -en "\e[1;32mpull\t\t\e[00;37m${root1}\e[01;37m${path}\t\e[01;31m< - \e[00;37m${root2}\e[01;37m${path}\n\e[00;37m";
			rsync -${attributes} ${root2}${path} ${root1}/${path};
		else
			echo -en "\e[1;41m${root1}${path} existiert nicht\n\e[00;37m\e[00;40m"
		fi
	done;
}
push(){
	for path in ${paths[*]} ;
	do
		if [ -d ${root1}${path} ] || [ -f ${root1}${path} ];
		then
			echo -en "\e[1;32mpush\t\t\e[00;37m${root1}\e[01;37m${path}\t\e[01;31m-> \e[00;37m${root2}\e[01;37m${path}\n\e[00;37m";
			rsync -${attributes} ${root1}${path} ${root2}/${path};
		else
			echo -en "\e[1;41m${root1}${path} existiert nicht\n\e[00;37m\e[00;40m"
		fi
	done;
}

case $1 in
pull)
	checkpull
	echo -n "Proceed with pulling?  [Y/n]"
	read descision

	case "$descision" in
		Yes|yes|Y|y|"")
		pull;;
		No|no|N|n) echo "Cancel."
		           exit 1  ;;
		*) echo "Unknown Parameter" ;;
	esac;;

push)
	checkpush
	echo -n "Proceed with pushing? [Y/n]"
	read descision

	case "$descision" in
		Yes|yes|Y|y|"")
		push;;
		No|no|N|n) echo "Cancel."
		           exit 1  ;;
		*) echo "Unknown Parameter" ;;
	esac;;
spush)
	push;;
spull)
	pull;;
f)
	check= checkpush
	if [ check == 1 ] ;
		then echo "ja"
	fi
;;
	
*)
	echo "Ohhh Nooo!!!";;
esac</pre>
<p></code></p>
<p>Probiert&#8217;s mal aus. Hat noch wer Vorschläge?</p>
