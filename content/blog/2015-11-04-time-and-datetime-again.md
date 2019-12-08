+++
title = "Time and Datetime Again"
date = 2015-11-04T00:02:58+01:00
description = "how I did the same thing twice - adding iso8601 to rust-datetime"
author = "Hendrik Sollich"
layout = "post"
header-img = "backgrounds/time.jpg"
[taxonomies]
tags = ["rust"]

+++

## Prerequisite 

Last July I was looking around for some Rust projects to contribute to in order to sharpen my teeth on an existing codebase.
I ran into a Rust crate called **[datetime](https://github.com/rust-datetime/datetime/)**.
After I heard that Rust's Regex was supposedly very fast - I though - *a crate with such a prominent name[^1] and it does not yet support parsing dates?*

[^1]: eg "[Datetime](http://ruby-doc.org/stdlib-2.2.2/libdoc/date/rdoc/DateTime.html)" is a part of the Ruby standard library

So I went ahead and added the functionality to parse [iso8601](https://en.wikipedia.org/wiki/ISO_8601) with regular expressions.
With a little help of http://regexr.com/ I got it done.
While I dug around in the internals of *datetime* I also found and fixed a few minor issues, hence it's original maintainer already had good experiences excepting my pull requests :D

### Coda 

After my Regex parser was accepted I read about yet [another implementation of iso8601](http://fnordig.de/2015/07/16/omnomnom-parsing-iso8601-dates-using-nom/) in Rust, using a parser combinator called [nom](https://github.com/Geal/nom) instead of regular expressions.
At the time I just though "Oh well - but I just got done, and Rust's [Regex](http://doc.rust-lang.org/regex/) is fast."

## The backlash

2 months later I played around with Rust's benchmarking.
Because I heard many good things about [nom](https://github.com/Geal/nom) I decided to compare [chrono](https://crates.io/crates/chrono)'s[^2] and *datetimes* parsing performance with the implementation presented by Jan-Erik Rediger's [implementation](https://github.com/badboy/iso8601/commit/72cc6a0d257dd0fbac38ce120a8e32e35868b8bf) using nom. The [Results](https://github.com/hoodie/dateparser_benchmarks/tree/2aa390ad2b8750c9dd606100e66b51b461d22b0d) were devastating:

[^2]: currently the most popular date/time crate

```bash
     Running target/release/dateparser_benchmarks-71747040d4b5a03b

running 4 tests
test chrono_bench::parse_iso8601              ... bench:         866 ns/iter (+/- 3)
test datetime_bench::parse_iso8601            ... bench:      82,033 ns/iter (+/- 847)
test nomdate_bench::parse_iso8601             ... bench:         260 ns/iter (+/- 2)

test result: ok. 0 passed; 0 failed; 0 ignored; 4 measured
```

Too my defense: I hadn't spent a second on optimizations, and the datetime implementation was still the most standard conform out of the three.

A little later, without my participation, this benchmark got a little bit of [attention on reddit](https://www.reddit.com/r/rust/comments/3pwxqw/benchmarking_datetime_libs_in_rust/).
With help of [Piotr Czarnecki](https://github.com/pczarn) it was possible to deduce that the instantiation of Regex objects is the most expensive part:

```bash
...
test datetime_regex_pure_bench::create_regex ... bench:      41,473 ns/iter (+/- 1,217)
test datetime_regex_pure_bench::apply_regex  ... bench:       1,484 ns/iter (+/- 137)
...
```

That doesn't help much though, because when you parse a single string you still have to instantiate the Regex each time, and pulling it out of the implementation like Piotr did would just not make for a neat API.
And even then, the nom version was still twice 3x as fast.

## Rolling up the sleeves 

So the next time when I had a little time on my hands, I though I'd give it a try and put in Jan-Erik's nom parser into datetime instead of mine.[^3] 
After all, I kinda owed ogham as much, after leaving him with such a slow implementation :D

Turns out, the nom parser was still a bit incomplete since it was never meant for release as a crate.
So I decided to contribute to both crates:

1. make iso8601 a releasable general purpose library that exposes a simple API
2. remove regex parsing from datetime all together

The important differentiation is that iso8601 is no datetime library, it only knows how to parse those darn strings, while datetime itself does not care about iso standards, but understands what a valid date is. There is preliminary validity checking in iso8601, but that may even be dropped later on, if it has a performance advantage.
Though the nom version became slightly slower through this [^4]. 

[^3]: Meanwhile Datetime's maintainer [Benjamin Sago](https://github.com/ogham/) decided to tackle the same issue by using [lazy static](https://crates.io/crates/lazy_static), At this point, sorry Ben for missing this, you had to [pay the price](https://github.com/rust-datetime/datetime/pull/9). Ogham: "This merge sucks :p"

[^4]: I was never able to reproduce those 260ns numbers, even without modifications.

After sending pull requests to two separate crate owners I am glad to announce, [datetime](https://github.com/rust-datetime/datetime) now has a faster and more complete parsing date-string-parsing implementation than chrono, thanks to [@badboy](https://github.com/badboy/) and [@ogham](https://github.com/ogham/).

## Conclusion

This may be a very small contribution to the Rust crates ecosystem,
but I had the chance to improve my Regex skills, could play around with Rusts benchmarking features, got a good look at how fast and safe parsers are really build and got a little bit of github-cred along the way. Let's call that a day.
