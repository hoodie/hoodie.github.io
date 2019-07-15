+++
title = "Will Rust stick around?"
date = 2015-09-16T17:56:11+02:00
author = "Hendrik Sollich"
layout = "post"

+++


So I just finished listening to some almost ancient episodes of [CRE](https://cre.fm/)  (German) about interesting programming languages including [dylan](http://opendylan.org/), [erlang](http://www.erlang.org/) and [c++](http://isocpp.org/), and especially the episode on dylan made me wonder: **Why is this not more popular?**

Dylan is a functional language, derived from [LISP](http://common-lisp.net/) and has a lot of features you can find in [Ruby](https://ruby-lang.org) or [python](https://python.org) and also in [Rust](https://rust-lang.org).
For example the type system which I really like about Rust (and miss terribly in Ruby and python, now that I've gotten used to it ☺).
It does a whole lot of things better than the currently predominant languages and yet it stayed small.
I see a pattern there.
Apart from rather [esoteric programming languages](http://esolangs.org/) over time I heard from several people "*xyz is the new awesome language I discovered, I write all my code in it and it will change the world!*" and somehow it didn't.
**Is it the same with Rust?**

The thing is, many very smart and exited people keep putting together very excellent programming languages and invest entire lifetimes on building compilers and standard libraries and promoting their babies, and in the end those languages fail to become popular and to actually replace the common (and problematic) languages like c++ and java.
Many of them haven't even disappeared, they just lead the lives of hermits, with small user-bases, very special use-cases, and few projects written in the language.
**So will Rust in 10years be the language that is only maintained because mozilla uses it?**

Is is worth maintaining a compiler and stdlib for a unpopular languages? Their are security concerns as well. The resources to maintain the environment, find and eliminate bugs and vulnerabilities ought to be small compared to the amount of expertise in the field.
For the same reasons as I do not want to use a linux distro, that is developed and used only by a handful of enthusiasts I do not want to use a language that is unpopular.

![Rust logo](rust-logo-256x256.png)

## What is it about Rust that will keep history from repeating?

### Sound concept and real innovation

The awesome new feature of Rust is not just that the language is nice and clean.
It does have features you might find in "scripting languages" or functional languages,
some of which "high performance" languages like Java or C++ only just recently acquired:

* closures
* iterators
* pattern matching
* slices
* default immutability
* language build-in documentation conventions
* language build-in testing and benchmarking conventions
* a sound type system
* very meaningful error messages
* error handling
* UTF-8 handling 

The awesome new feature of Rust is it's memory management model,
which no other language has (e.g. memory safety without garbage collection).
Actually Rust doesn't actually manage memory,
it allows you to have as much control of your memory layout as c does,
it only makes sure at compiletime that nothing goes wrong by enforcing very [strict rules](http://doc.rust-lang.org/book/references-and-borrowing.html).

So actually it doesn't make your code safe - it makes you write the safe code.

### Backers

Rust already has a some big players involved.
The most prominent of which is mozilla - it is entirely possible that firefox's [Gecko](https://developer.mozilla.org/en-US/docs/Gecko) will be succeeded by [Servo](http://servo.org/).
This would mean that a large community of open source developers are going to be continuously developing in Rust,
therefore learning Rust and applying it to other problems in computing too.
Others are also already jumping on the train, in the academic area for example but also backend and game developers.

### Tools
Rust comes with a very modern toolchain and ecosystem (cargo, crates.io, rustdoc) as well as very good documentation.

Rust and Cargo make everything easier, mostly because they have conventions about most things.
Starting a new project with cargo is as easy as `cargo new`.
From here on out, most Rust projects look the same, there is `./src`, `./examples`, `./tests` etc,
so reading through other peoples projects is straight forward.

Using other peoples libs is as simple as using rubygems, because of cargo and [crates.io](http://crates.io/).
[Documentation](http://doc.rust-lang.org/stable/book/documentation.html), [testing](http://doc.rust-lang.org/stable/book/testing.html) and [benchmarking](http://doc.rust-lang.org/stable/book/benchmark-tests.html) are part of the language and not of some third party tool.

And the documentation written about the languages itself, especially the [book][book] and [rust by example][rbe] make it a very approachable language.

[book]: http://doc.rust-lang.org/stable/book/
[rbe]: http://rustbyexample.com/

### Audience
It actually plays in the same league as C++ performance wise,
as opposed to interpreted languages, jvm languages or even compiled that make use of a garbage collector.
Though, yes C++ still tends to be faster, but often only by allowing you to do things, that Rust considers unsafe.
You can do very unsafe things in Rust too, you only have to explicitly label the code `unsafe{...}` so Rust will let you.


So even though llvm makes it much easier to keep spitting out more, new, smart and exciting programming languages,
I personally think Rust still has a strong position in the programming languages arena.
I may be wrong, perhaps in 10years I'll have a job as Java coder because it will have finally taken over the world completely,
or as a C++ coder because nothing will really have changed.
Who knows.

**See you in 10years.**
