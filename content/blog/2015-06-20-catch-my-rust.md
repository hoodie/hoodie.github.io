+++
title = "Catch my Rust!"
layout = "post"

+++

After JavaScript, Ruby, C++ and Python I had to try out a new
programming language again.
 I’ve been wanting to play around with Mozilla’s Rust for quite a while
but when I looked into it a year ago the language seem too weird to get
a hold of its concepts. Rust felt like basically every syntactical
concept was done differently than I would have expected, knowing other
languages. Also, it was pretty inconvenient to get it to install on
archlinux.
 Especially after hearing about several major changes in the
architecture of the language and its objectives (moving away from
garbage collection and dropping of green threads) it seemed like there
was too much changing to get in now, so I waited.

With the launch of Rust 1.0, I had to give it another chance, the
language was being discussed all over the place. Some people claimed
rust would look and feel like ruby, I beg to differ. It was tremendously
harder to write a simple piece of software in rust than in ruby. At
least to me in the beginning. My objective was to reproduce my [catch my
bus](https://github.com/hoodie/catch-my-bus) script in rust. The cool
thing about rust was that it comes with a packagemanager/buildsystem
called cargo. It feels like a mix of cmake and ruby gems. Since there
were several high profile projects already on the move I could already
profit from a repository of crates (like gems in ruby) to help me in the
process.

Catch-my-bus is a bit like an advanced Hello World to me. It’s not meant
to be a full fletched tool, even though it has been turned
[into](http://catchmybus.kilian.io/)
[one](https://github.com/devmeepo/catch-my-bus-python).
 It calls a webservice, parses some json and produces regular reminders.
This can be done quite simply in ruby, using the right gems.
 In rust, the webservice and parsing part was relatively easy too, since
there are already libs like [hyper](https://hyper.rs/) and
[rustc-serialize](https://crates.io/crates/rustc-serialize). Since
Mozilla is developing Servo in Rust you can expect to find excellent
implementations for what ever a browser uses too. The missing component
was the notification part.

I researched into what had been done in that area and it seemed
unsatisfactory. Though some people already implemented
[bindings](https://github.com/nykac/rust-notify)
[to](https://crates.io/crates/libnotify-sys)
[libnotify](https://crates.io/crates/libnotify). So I decided to invest
some time and do [my own](https://crates.io/crates/notify-rust). Now
[there are 3 crates](https://xkcd.com/927/) on
[crates.io](https://crates.io/) that offer this functionality, however I
can savely say, mine is the best documented and also the only one that
does not rely on ffi bindings to C \\0/.

Since I released my crate it has become my main rust project for a
while, so my [catch-my-bus in
rust](https://github.com/hoodie/catch-my-rust) is still not where I
wanted it to be originally, but since the compeeding implementations by
[Kilian Koeltzsch](http://github.com/kiliankoe/catchmybus) and
[Ian](https://github.com/devmeepo/catch-my-bus-python) extended the
original functionality a little I am currently looking into system tray
icons in rust. This however is strictly a side-side-project, so don’t be
surprised if I drop that and stick with a clone of my original
catch-my-bus ᐛ

This was supposed to become a post about rust itself and what I think
about it, but, why not make it a series.

Later!

