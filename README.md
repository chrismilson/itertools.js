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

### `zip`; Strongly Typed and Versatile

```ts
import { zip, repeat, count } from '@shlappas/itertools'

for (const [c, n] of zip('Hello', repeat(2))) {
  // c is type string
  // n is type number
  console.log(c.repeat(n)) // No compilation errors!
}

for (const [i, c, n] of zip(count(0), 'Hello', repeat(2))) {
  // i is type number
  // c is type string
  // n is type number
  console.log(i * i, c.repeat(n))
}
```

### Strong Tuple types

```ts
import { combinations, range } from '@shlappas/itertools'

for (const combo of combinations(range(5), 100)) {
  console.log(Math.pow(...combo)) // Error: "Expected 2 arguments, but got 100."
}

for (const combo of combinations(range(5), 2)) {
  console.log(Math.pow(...combo)) // no error
}
```

### Reliably typed `map`

The argument types are inferred from the passed `mapper` function.

```ts
import { map, range, repeat } from '@shlappas/itertools'

// Error: "`map` Expected 3 arguments, but got 2."
for (const v of map(Math.pow, range(10, 5, -1))) {
  console.log(v)
}

// No error
for (const v of map(Math.pow, range(10, 5, -1), repeat(2))) {
  console.log(v)
}

// Error: "`map` Expected 2 arguments, but got 3."
for (const s of map((n) => "a".repeat(n), range(5), repeat(4))) {
  console.log(s)
}
```