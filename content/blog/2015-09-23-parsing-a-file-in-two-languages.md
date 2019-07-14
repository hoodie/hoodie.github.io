+++
title = "Parsing a File in Two Languages"
date = 2015-09-23T13:52:13+02:00
description = "In which I take a Ruby one-liner and inflate it, until it is valid Rust"
author = "Hendrik Sollich"
header-img = "backgrounds/two_languages.jpg"
layout = "post"

+++

## Introduction
A friend asked me today to write him a little script to filter a file in ruby.
The objective was odd but simple, the file looked like this:

```
this file contains lines that start with quotes
like this, not but
"like" this
and another one for
"your" entertainment
this is not a particularly good
"style" but it serves the purpose
```

What the script needed to do was get all the words in quotes, but only those at the beginning of a line.
You could waste some time and write a REGEX[^r], but Ruby was our weapon of choice. [^1]
My personal requirement was: *do it in one line* but keep it legible.
So this came out of it.

[^1]: Please leave me be, I know it could have been even shorter than this and more readable :D [^2]
[^2]: Infact, please send me your implementations :P
[^r]: `sed -n 's/^"\([^"]*\)".*/\1/p' file.txt`

```ruby
puts File.open($FILENAME).read().lines().select{|l|l.start_with? ?"}.map{|l|l.split()[0][1..-2]}
```

```
"like"
"your"
"style"
```

## Ruby in Detail

I admire the functional simplicity of a piece of code like this.
You might say, this is cryptic?
**Did you look at the Regex?**
So let's write it down in a more legible fashion:

```ruby
File.open($FILENAME)             # opens the file, $FILENAME is a convenience
    .read()                      # turns it into a string
    .lines()                     # an Array of lines
    .select{|l|l.start_with? ?"} # drops all the lines that don't start with the character "
    .map{|l|                     # modify the Array
      l.split()[0]               # first block before a SPACE
      [1..-2]                    # use only the second till next to last character
    }
```

Now my idea was to take a look at how much more code I would have to write to get this done in **Rust**, a language I sometimes compare to Ruby[^3].
I've written a bunch of Rust so far, but never tried to produce a program that ought to look like a Ruby script.
[^3]: I take that back now

## Reading the File
First we want to open a file, let's leave out the argv part for now and open a static path.

```rust
fn main() {
    let file_content = File::open(Path::new("./file.txt")).read_to_string();
    file.content.lines().filter().map( ...
```


This looks reasonable doesn't it?
Unfortunately this is no working Rust code ☹.
I did a whole lot of things that Rust wont let me get away with.
First of all, I need to include
`use std::path::Path;` to specify a `Path`,
`use std::fs::File;` to open the file and finally
`use std::io::Read;` to then read it into a `String`.

```rust
use std::fs::File;
use std::io::Read;
use std::path::Path;
fn main() {
    let file_content = File::open(Path::new("./file.txt")).read_to_string();
    file.content.lines().filter().map( ...
```
This does not work either, because for some odd reason `read_to_string` does not return its result but rather takes a `&mut String`, a mutable reference to a String.
So I add `let mut file_content = String::new()` because it wants to be initialized too.
Let's also pull out the path variable, just to make the lines shorter.

```rust
...
let path = Path::new("./file.txt");
let mut file_content = String::new();
File::open(&path).unwrap().read_to_string(&mut file_content).unwrap();
...
```

But now we finally have the content of our file in a string and the Rust standard-lib even offers a `lines()` methods for `String`s.
**Rejoice!**

Now `lines()` does not return an Array, it returns a `Lines` struct.
The Rust equivalent to `Array::select()` is `Iterator::filter`, and `Lines` happens to implement `Iterator<&str>`. Let's have a look:

```rust
let lines:Vec<&str> = file_content
    .lines()
    .filter(|l|{ l.starts_with('"') })
    .map(|l|l.split_whitespace().nth(0).unwrap())
    .map(|l|l.trim_matches('"'))
    .collect();
```

## What's different?

> Rust feels almost, but not quite, entirely unlike Ruby

So why does this look awkward to the Rubyist?
In Rust a Vector[^v] is not quite an Iterator and vice versa.
This divide is what keeps us from writing such simple code as in Ruby.
The output of `lines()` is an Iterator, so we have to `collect()` at the end to turn it back into a Vector.
Same with `split_whitespace()` so we can't index into the first item with `[0]` <small>(that's for Vector)</small> but rather have to run there with `.nth(0)`, which my fail and therefore returns a [Result](http://rustbyexample.com/std/result.html).

[^v]: Rust Arrays are primitives and can not grow, there for we use Vectors. Same as in C++.

## Printing

Now that we have the data we wanted in the datastructure that we wanted we have to print it.
Ruby allows to simply `puts` it and the Array of Strings will already be neatly formated into lines.
Rust has the `println!()` macro.

```rust
println!("{}", lines);
```

For this to work you have to implement `core::fmt::Display` for `collections::vec::Vec<&str>`.
Let's not go into this right now, I will if you ask me.
What is implemented is the Debug trait.

```rust
println!("{:#?}", lines);
```

Works immediately but, looks like this.

```
[
    "like",
    "your",
    "style"
]

```

So we have to resort to the for loop, which in Rust is syntactic sugar to the [iterator](http://rustbyexample.com/trait/iter.html) trait.

```rust
for line in lines{
    println!("{}", line);
}
```

```
like
your
style
```

We got it!!1!

```rust
use std::fs::File;
use std::io::Read;
use std::path::Path;

fn main() {
    let arg = std::env::args().nth(1).unwrap();
    let path = Path::new(&arg);
    let mut file_content = String::new();

    File::open(&path).unwrap().read_to_string(&mut file_content).unwrap();

    let lines:Vec<&str> = file_content
        .lines()
        .filter(|l|{ l.starts_with('"') })
        .map(|l|l.split_whitespace().nth(0).unwrap())
        .map(|l|l.trim_matches('"'))
        .collect();

    for line in lines{
        println!("{}", line);
    }
}
```

Feel free to bug me with questions on [twitter #rustvsruby](https://twitter.com/hashtag/rustvsruby).


## Conclusion

So Rust and Ruby have a few functional aspects in common, mostly Rust let's you do a few things you know from Ruby but can't do in e.g. old style C++ or even python or javascript without an abundance of `function` or `lambda` keywords.
However Rust is still far from a scripting language in that it is clearly less productive.
Mostly the type system makes you stumble into a lot of pitfalls if you try to hang on to your Ruby-Mindset.
Anyways, its still much prettier to look at than comparable languages, which by now is the major reason I like it.


<small>PS: todays background image comes from [Vinoth Chandar](https://www.flickr.com/photos/vinothchandar/4308120229/in/photostream/)</small>

<small>PS2: I'd be happy to receive your C++, javascript and python implementations of this program.</small>



## Appendix

Thanks for sending me more examples, not that this piece of code is particularly difficult to write, so just for fun, here are examples in 

### [Haskell](https://gist.github.com/JustusAdam/0d793b4ef86711273f68)

```Haskell
{- read a file, filter out all words in quotes that are at the beginning of a line, and print the resulting words. Using functions from Prelude only -}
main = readFile "input.txt" >>= mapM (putStrLn . (('\"' :) . (++ "\"") . takeWhile (/= '\"') . tail)) . filter ((== '\"') . head) . lines
```

```Haskell
{- here's another version, that's a bit more hacky in my opinion, but closer to the original (and shorter than the runby code ;) -}
main=readFile"input.txt">>=mapM(putStrLn.takeWhile(/=' ')).filter((=='\"').head).lines
```

### More Ruby

```ruby
#!/bin/env ruby
puts open($FILENAME).grep(/\"(\w+)\"/){$1}

puts open($FILENAME).read.lines().select{|l| l.start_with?  ?"}.map{|l|l.split[0][1..-2]}

puts open($FILENAME).readlines().select{|l| l[0]==?"}.map{|l|l.split[0][1..-2]}

puts open($FILENAME).readlines().select{|l| l[0]==?"}.map(&:split).map(&:first).map{|l|l[1..-2]}

puts open($FILENAME).read.lines().select{|l| l[0]==?"}.map{|l|l.split(?")[1]}

puts open($FILENAME).readlines().select{|l| l[0]==?"}.map(&:split).map{|l|l[1]}
```

Thanks to Justus and Thomas for sending in examples ☺

