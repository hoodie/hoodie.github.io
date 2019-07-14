+++
title = "Hendriks Singalong Book"
date = 2015-09-30T21:42:59+02:00
description = "no original music here, sorry"
author = "Hendrik Sollich"
layout = "post"
header-img = "backgrounds/guitars.jpg"

+++

## The Problem
When I'm asked to accompany somebody on the guitar, no big deal,
I can usually come up with the right chords to a song.
When it comes to actually singing along, now that is more of a problem.
I just have a better memory for chords and melodies than for actual lyrics.

Now some people tend to maintain a huge binder of songs they once learned and carry it around anywhere.
Others might just search for the lyrics on their phone.
Both solutions have their downsides:

1. I haven't connected my printer since two moves ago, so no printing for me
1. sometimes you are a place where there's instruments, but you forgot your huge binder, *dang*
1. unless you have a tablet a phone is not very practical, too small
1. you probably want to maintain a collection of songs you can play, because when you're asked you need a list of things you know, otherwise **I** know anything to play, on top of my head

<div class="well">

<em>We can solve this with software!</em>

</div>

I usually carry an old `[EBOOKREADER]` with me.
So why not make an ebook-songbook?

## How to create a Songbook?

### How to get the lyrics?

Well I most certainly don't want to google™ everything by hand and copy and paste the lyrics into some document file.
Word and it's competitors are way to have and complicated for this task, which was my original motivation for building the [ascii invoicer](https://github.com/ascii-dresden/ascii-invoicer).
I don't want to have to do anything more than just type in the song name and artist and be done with it.
Fortunately there are scrapers for this.
[nodycs](https://github.com/yeexel/nodycs) for example.

So something like this will fetch the lyrics and write them in a nice little markdown file, even with a heading ☺

```bash
#!/bin/bash
echo "## $2" > "songs/$1 - $2.md"
./nodycs/nodycs.js show "$1" "$2" >> "songs/$1 - $2.md"
echo "# $1" > "songs/$1 - 00header.md"
head "songs/$1 - $2.md"
```

Naming the file the same way also assures that the list of files will always be orderly.
It also creates (overwrites) a file called `Artist - 00header.md`, I will get to that.
The `head` at the end is just a quick manual check.

Calling this script "get" allows us to <kbd>./get "Flogging Molly" "Rare Ould Times"</kbd> and it will happily create a <samp> Flogging Molly - Rare Ould Times.md </samp>

High Five!

### How to make an (e)book?

Now we can gather a nice orderly collection of markdown files,
what do we do with them?
I recently heard about something like gitbook, I haven't tried that yet.
My favorite swiss-army-sledge-hammer for anything textdocument related is still [pandoc](http://pandoc.org/).

`pandoc songs/*.md -f markdown+hard_line_breaks -s -o songbook.epub`

or better: write a **Makefile**

```Makefile
SRC = songs/*.md
NAME= "songbook"
HTML= $(NAME).html
EPUB= $(NAME).epub
MOBI= $(NAME).mobi
PDF = $(NAME).pdf

default:  $(MOBI)

$(HTML): $(SRC)
	pandoc $(SRC)\
		-f markdown+hard_line_breaks\
		-s -t html5 -o $(HTML)\
		--section-divs

$(EPUB): $(HTML)
	pandoc $(HTML) -o $(EPUB)

songbook.pdf$(PDF): $(HTML)
	pandoc $(HTML) --chapters --toc -o $(PDF)

$(MOBI): $(EPUB)
	ebook-convert $(EPUB) $(MOBI)

.PHONY: clean
clean:
	rm -f $(EPUB) $(MOBI) $(HTML) $(PDF)

mobi:  $(MOBI)
pdf:  $(PDF)
html: $(HTML)
epub: $(EPUB)


```


The ebook-convert comes with [calibre](http://calibre-ebook.com/) and comes in handy since kindle[^kindle] does not support ePub.
Toss this on you reader and be done with.

[^kindle]: at least my old one

### How maintain, save, share everything?

Just run <kbd>git</kbd> already stupid!
<span class="glyphicon glyphicon-thumbs-up" aria-hidden="true"> </span>

## Conclusion
<ul class="list-unstyled">
<li><span class="glyphicon glyphicon-check" aria-hidden="true"> finding lyrics </span></li>
<li><span class="glyphicon glyphicon-check" aria-hidden="true"> saving and organizing lyrics collection </span></li>
<li><span class="glyphicon glyphicon-check" aria-hidden="true"> creating documents </span></li>
<li><span class="glyphicon glyphicon-check" aria-hidden="true"> store, sync, version control </span></li>
<li><span class="glyphicon glyphicon-unchecked" aria-hidden="true"> learn to sing </span></li>
</ul>
