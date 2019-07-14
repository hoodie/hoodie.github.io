+++
title = "Handpicked Rusty Crates"
date = 2016-04-30T01:49:23+02:00
description = "crates to make your coding worthwhile"
author = "Hendrik Sollich"
layout = "post"

[extra]
header_img = "header.jpg"
+++

I've been leaning Rust for a year now.
Yes, I'm [still learning](https://twitter.com/hoodie_de/status/725838737146535936), but I have in this time released[^notify-rust] and contributed[^contributions] to a number of crates.

But it is only because of some amazing crates that I was able to write the code that I wanted. And if they hadn't been there, I might have rage-quit Rust very early, because I would have had to write the myself.

If you are still learning Rust, like me, here are some crates that I enjoyed using or that have inspired me to try something new.

## [maplit](https://crates.io/crates/maplit) or [collect-mac](https://crates.io/crates/collect-mac)

Rust lacks a few syntactic features that other languages have.
One of which is built-in dictionary literals.
While languages like [swift](https://swift.org/) [have](http://www.tuicool.com/articles/yA7v6rA) these, in Rust you can help yourself with either [maplit](https://crates.io/crates/maplit) or [collect-mac](https://crates.io/crates/collect-mac).

[Maplit](https://crates.io/crates/maplit) offers a set of macros similar to Rust's built-in `vec![]` so you can write stuff like this:

```rust
let employees = hashmap!{
    "employees" => hashmap! {
        "employee  1" => hashmap!["attribute" => "value"],
        "employee  2" => hashmap!["attribute" => "value"],
        "employee  3" => hashmap!["attribute" => "value"],
        "employee  4" => hashmap!["attribute" => "value"],
        "employee  5" => hashmap!["attribute" => "value"],
        "employee  6" => hashmap!["attribute" => "value"],
        "employee  7" => hashmap!["attribute" => "value"],
        "employee  8" => hashmap!["attribute" => "value"],
        "employee  9" => hashmap!["attribute" => "value"],
        "employee 10" => hashmap!["attribute" => "value"],
        "employee 11" => hashmap!["attribute" => "value"],
        "employee 12" => hashmap!["attribute" => "value"],
        "employee 13" => hashmap!["attribute" => "value"],
        "employee 14" => hashmap!["attribute" => "value"],
        "employee 15" => hashmap!["attribute" => "value"],
        "employee 16" => hashmap!["attribute" => "value"],
        "employee 17" => hashmap!["attribute" => "value"],
        "employee 18" => hashmap!["attribute" => "value"],
        "employee 19" => hashmap!["attribute" => "value"],
        "employee 20" => hashmap!["attribute" => "value"],
    }
};
```

These little macros let you almost forget, they are not part of the stdlib.


## [multimap](https://crates.io/crates/multimap)

Another crate that provides functionality,
which should actually be built-in.
Brian Anderson compiled a [list of crates](https://github.com/brson/stdx) that feel like they should have been part of the std.

```rust
let mut map = MultiMap::new();

map.insert("key1", 42);
map.insert("key1", 1337);
map.insert("key2", 2332);

assert_eq!(map["key1"], 42);
assert_eq!(map.get("key1"), Some(&42));
assert_eq!(map.get_vec("key1"), Some(&vec![42, 1337]));
```

## command line argument parser

Aka: [clap](https://crates.io/crates/clap).
I started rewriting a command line application I had originally written in Ruby.
There I had used [Thor](http://whatisthor.com/) to configure the commands.
Clap is very different but not less cool,
for instance it lets you describe your interface in yaml,
which is then compiled into your binary.
Is also happens to be one of the best documented crates, with currently 19 elaborate examples.
This is I wanna see libraries documented.

## anything that starts with cargo-*

Cargo is already great itself, but it is also quite extensible and there are a number of tools that integrate with it.

1. [cargo-check](https://crates.io/crates/cargo-check) quickly checks your code without compiling. This combines well with...
2. [cargo-watch](https://crates.io/crates/cargo-watch), which repeats a command when you save a source file.
3. [cargo-add](https://crates.io/crates/cargo-add) adds new dependencies to your project while
4. [cargo-graph](https://crates.io/crates/cargo-graph) produces a graph of all your dependencies.
5. [cargo-clone](https://crates.io/crates/cargo-clone) clones the source repo of a crate.
6. [cargo-fmt](https://crates.io/crates/cargo-fmt) formats your code project
and by now there are many more, like [cargo-apk](https://crates.io/crates/cargo-apk), [cargo-brew](https://crates.io/crates/cargo-brew), [cargo-lipo](https://crates.io/crates/cargo-lipo), [cargo-at](https://crates.io/crates/cargo-at), [cargo-count](https://crates.io/crates/cargo-count), [cargo-open](https://crates.io/crates/cargo-open), [cargo-outdated](https://crates.io/crates/cargo-outdated), ... I'm gonna stop here.

## [clippy](https://crates.io/crates/clippy)

This is named after the cute little cartoon paper clip from Word.
It is much more sophisticated than that.
Clippy is a growing set of lints that will tell you that you are writing bad Rust.
Amazingly though it most of the time also tells you how to write better rust.
Btw: there is a cargo command that will make it easier to use clippy called, you guessed correctly [cargo-clippy](https://crates.io/crates/cargo-clippy) .

## [itertools](https://crates.io/crates/itertools)
What I already loved about Ruby and now love about Rust is iterators and iterator-adapters.The standard `Interator`-trait already has a lot of functionality,
but itertools adds `Chunks`, `Flatten`, `Group`, `Unique`, `Zip` and so on.

## [boolinator](https://crates.io/crates/boolinator)

If you've gotten addicted to functional mapping of `Option<T>`s or `Result<T,E>`s,
then you sometimes course at the fact that you have to handle `boolean`s with icky `if` blocks.
`boolinator` lets you convert booleans into `Option<()>` and other nicities.

## [chrono](https://crates.io/crates/chrono) or [datetime](https://crates.io/crates/datetime)

Pick one, they are both pretty good.
Chrono seems a bit more complete, while it sometimes lacks a complete rustacious feeling.
Datetime has the faster string parser :D

## [prettytable](https://crates.io/crates/prettytable)

When you wanna print complex data onto the terminal, use this.
It is quite fast and its API is really nice.

```rust
let table = table!(["ABC",     "DEFG", "HIJKLMN"],
                   ["foobar",  "bar",  "foo"],
                   ["foobar2", "bar2", "foo2"]
                  );
table.printstd();
```

## [simple_parallel](https://crates.io/crates/simple_parallel) or [rayon](https://crates.io/crates/rayon)

While I haven't played around with either of these yet, I so want to.
Essentially either of them is capable of turning an ordinary iterator into a multithreaded parallel iterator.

Rayon:

```rust
use rayon::prelude::*;
fn sum_of_squares(input: &[i32]) -> i32 {
    input.par_iter()
         .map(|&i| i * i)
         .sum()
}
```

AMAZING


## [image](https://crates.io/crates/image)

Images is a nice collection of native Rust libraries to encode and decode bmp, gif, ico, jpeg, png, ppm, tga, tiff and webp.
Last time I checked that list was a lot shorter.
These are mostly maintained by the people behind [piston](http://piston.rs/) and also used in [servo](http://servo.org/), so expect some high quality code here.
I personally used this to do a little stenography [experiment](http://github.com/hoodie/lsb-rs).


## Honorable Mentions

* [quick-error](https://crates.io/crates/quick-error)
* [env_logger](https://crates.io/crates/env_logger)
* [log](https://crates.io/crates/log)
* [cargo-bake](https://crates.io/crates/cargo-bake)
* [strsim](https://crates.io/crates/strsim)
* [iso8601](https://crates.io/crates/iso8601)
* [git2](https://crates.io/crates/git2)
* [open](https://crates.io/crates/open)
* [mpd](https://crates.io/crates/mpd)
* [leftpad](https://crates.io/crates/leftpad)
* [yolo](https://crates.io/crates/yolo)
* [cool_faces](https://crates.io/crates/cool_faces)


This posts title image is called "crates" and is by [Helen Cook](https://www.flickr.com/photos/hvc/7412773976/).

---

[^notify-rust]: [notify-rust](https://crates.io/crates/notify-rust/)

[^contributions]: 
[datetime](https://crates.io/crates/datetime/),
[iso8601](https://crates.io/crates/iso8601),
[currency](https://crates.io/crates/currency),
[yaml-rust](https://crates.io/crates/yaml-rust),
[multimap](https://crates.io/crates/multimap),
[open](https://crates.io/crates/open),
[dbus](https://crates.io/crates/dbus)
