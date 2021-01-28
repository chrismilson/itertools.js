[![npm version](https://badge.fury.io/js/%40shlappas%2Fitertools.svg)](https://badge.fury.io/js/%40shlappas%2Fitertools)
[![Build Status](https://github.com/chrismilson/itertools.js/workflows/Test/badge.svg)](https://github.com/chrismilson/itertools.js/actions)

# `itertools.js`

The python language (both python core and the `itertools` module) have great
support for dealing with iterators and iterables. Sometimes the same
functionality would be nice to have in javascript and typescript.

This package implements some of the useful iterator-related functions in
typescript, so that you can get the same great readability as a python program,
all while keeping that juicy compile-time type safety.

## Installation

```bash
yarn add @shlappas/itertools
```

## API

Check out [the docs](http://shlappas.com/itertools.js/modules.html)! *Created
with [typedoc](https://github.com/TypeStrong/typedoc)*

## Examples

### Strongly typed `zip`

```ts
import { zip, repeat } from "@shlappas/itertools"

for (const [c, n] of zip("Hello", repeat(2))) {
  // c is type string
  // n is type number
  console.log(c.repeat(n)) // No compilation errors!
}
```

### Strong Tuple types

```ts
import { combinations, range } from '.'

for (const combo of combinations(range(5), 100)) {
  console.log(Math.pow(...combo)) // Error: "Expected 2 arguments, but got 100."
}

for (const combo of combinations(range(5), 2)) {
  console.log(Math.pow(...combo)) // no error
}
```