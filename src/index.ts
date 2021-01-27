import { Iterableify, Tuple, tailIterable } from './common'

/**
 * An iterator over the prefix sums of the number iterable.
 *
 * @example
 * accumulate([1, 2, 3, 4]) // 1 3 6 10
 */
export function accumulate(iterable: Iterable<number>): Generator<number>
/**
 * Similar to reduce_, but provides an iterator to the accumulated values.
 *
 * Calls the reducer with an undefined accumulated value on the first value in
 * the iterator to produce the initial value.
 *
 * @see reduce_
 *
 * @example
 * accumulate(['bing', 'bang', 'bong'], (n, s) => (n ?? 0) + s.length) // 4, 8, 12
 */
export function accumulate<T, R>(
  iterable: Iterable<T>,
  reducer: (accumulated: R | undefined, nextVal: T) => R
): Generator<R>
/**
 * Similar to reduce, but provides an iterator over the accumulated values.
 *
 * Yields the initial value first.
 *
 * @see reduce
 *
 * @example
 * accumulate(['bing', 'bang', 'bong'], (n, s) => n + s.length, 0) // 0, 4, 8, 12
 */
export function accumulate<T, R>(
  iterable: Iterable<T>,
  reducer: (accumulated: R, nextItem: T) => R,
  initial: R
): Generator<R>
export function* accumulate<T, R>(
  iterable: Iterable<T>,
  reducer?: (a: R, b: T) => R,
  initial?: R
): Generator<R> {
  const iterator = iterable[Symbol.iterator]()

  let accumulated: R

  if (initial === undefined) {
    const { value, done } = iterator.next()
    if (done) {
      return
    }

    // The initial value is the first value of the iterator.
    if (reducer === undefined) {
      const defaultReducer = (a: number | undefined, b: T) => {
        if (typeof b !== 'number') {
          throw new TypeError(
            'The reducer must be specified for non-nummber types.'
          )
        }
        return (a ?? 0) + b
      }
      reducer = (defaultReducer as unknown) as (a: R, b: T) => R
      accumulated = value
    } else {
      // Since initial was undefined and reducer was defined, the matching
      // overload signature must mean reducer is of type (acc: R | undefined,
      // next: T) => R
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      accumulated = reducer(undefined!, value)
    }
  } else {
    accumulated = initial
  }

  yield accumulated
  for (const item of tailIterable(iterator)) {
    // The only overload signature with an undefined reducer also has the
    // initial value undefined. In this case, we defined the reducer above.
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    accumulated = reducer!(accumulated, item)
    yield accumulated
  }
}

/**
 * Returns true when all of the items in iterable are truthy.  An optional key
 * function can be used to define what truthiness means for the specific
 * iterator.
 *
 * @example
 *     all([])                           // true
 *     all([0])                          // false
 *     all([0, 1, 2])                    // false
 *     all([1, 2, 3])                    // true
 *
 *     all([2, 4, 6], n => n % 2 === 0)  // true
 *     all([2, 4, 5], n => n % 2 === 0)  // false
 *
 */
export function all<T>(
  iterable: Iterable<T>,
  predicate: (value: T) => boolean = Boolean
): boolean {
  for (const item of iterable) {
    if (!predicate(item)) {
      return false
    }
  }
  return true
}

/**
 * Returns true when all of the items in iterable are truthy.  An optional key
 * function can be used to define what truthiness means for the specific
 * iterator.
 *
 * @example
 *     all([])                           // false
 *     all([0])                          // false
 *     all([0, 1, 2])                    // true
 *     all([1, 2, 3])                    // true
 *
 *     all([2, 4, 6], n => n % 2 === 0)  // true
 *     all([2, 4, 5], n => n % 2 === 0)  // true
 *
 */
export function any<T>(
  iterable: Iterable<T>,
  predicate: (value: T) => boolean = Boolean
): boolean {
  return !all(iterable, (item) => !predicate(item))
}

/**
 * An iterator over multiple iterators in order.
 *
 * @example
 * [...chain("Help", [1, 2, 3])].join('') // "Help123"
 */
export function* chain<T>(...toChain: Iterable<T>[]): Generator<T> {
  for (const iterable of toChain) {
    for (const item of iterable) {
      yield item
    }
  }
}

/**
 * Alternate to chain. Gets chained inputs from a single iterable argument that
 * is evaluated lazily.
 *
 * @see chain
 */
export function* chainFromIterable<T>(
  toChain: Iterable<Iterable<T>>
): Generator<T> {
  for (const iterable of toChain) {
    for (const item of iterable) {
      yield item
    }
  }
}

/**
 * Iterates over the r-length subsequences of an iterable.
 *
 * The combination tuples are emitted in lexicographic ordering according to the
 * order of the input iterable. So, if the input iterable is sorted, the
 * combination tuples will be produced in sorted order.
 *
 * Elements are treated as unique based on their position, not on their value.
 * So if the input elements are unique, there will be no repeat values in each
 * combination.
 */
export function* combinations<T, N extends number>(
  iterable: Iterable<T>,
  r: N
): Generator<Tuple<T, N>> {
  const saved: T[] = [...iterable]
  const n = saved.length

  if (r > n) {
    return
  }

  const indicies = [...range(r)]

  for (;;) {
    yield indicies.map((i) => saved[i]) as Tuple<T, N>
    let i = r - 1
    for (; i >= 0; i--) {
      if (indicies[i] !== i + n - r) {
        break
      }
    }
    if (i === -1) {
      break
    }
    indicies[i] += 1
    for (let j = i + 1; j < r; j++) {
      indicies[j] = indicies[j - 1] + 1
    }
  }
}

/**
 * Iterates over the r length subsequences of elements from the input iterable
 * allowing individual elements to be repeated more than once.
 *
 * The combination tuples are emitted in lexicographic ordering according to the
 * order of the input iterable. So, if the input iterable is sorted, the
 * combination tuples will be produced in sorted order.
 *
 * Elements are treated as unique based on their position, not on their value.
 * So if the input elements are unique, the generated combinations will also be
 * unique.
 *
 * @see combinations
 *
 * @example
 * combinationsWithReplacement('ABC', 2) // AA AB BB AC BC CC
 */
export function* combinationsWithReplacement<T, N extends number>(
  iterable: Iterable<T>,
  r: N
): Generator<Tuple<T, N>> {
  const saved = [...iterable]
  const n = saved.length

  if (n === 0 && r !== 0) {
    return
  }

  const indicies = Array(r).fill(0)

  for (;;) {
    yield indicies.map((i) => saved[i]) as Tuple<T, N>

    let i = r - 1
    for (; i >= 0; i--) {
      if (indicies[i] !== n - 1) {
        break
      }
    }
    if (i === -1) {
      break
    }
    indicies[i] += 1
    for (let j = i + 1; j < r; j++) {
      indicies[j] = indicies[j - 1]
    }
  }
}

/**
 * An iterator that filters elements from data returning only those that have a
 * corresponding element in selectors that is truthy. Stops when either the data
 * or selectors iterables has been exhausted.
 *
 * @example
 * compress('ABCDEF', [1,0,1,0,1,1]) // A C E F
 */
export function* compress<T, S>(
  data: Iterable<T>,
  selectors: Iterable<S>
): Generator<T> {
  for (const [d, s] of zip(data, selectors)) {
    if (s) {
      yield d
    }
  }
}

/**
 * Returns true when any of the items in the iterable are equal (===) to the
 * target object.
 *
 * @example
 *
 *contains([], 'whatever') // => false
 *contains([3], 42) // => false
 *contains([3], 3) // => true
 *contains([{}, {}], {}) // => false, since comparison is done with ===
 */
export function contains<T>(haystack: Iterable<T>, needle: T): boolean {
  return any(haystack, (value) => value === needle)
}

/**
 * Iterates the infinite sequence of start, start + step, start + 2 * step,...
 *
 * Be careful to avoid calculating the entire sequence.
 *
 * Defaults to `start = 0` and `step = 1`.
 *
 * @example
 * // good
 * const it = count(5, 2)
 * it.next() // 5
 * it.next() // 7
 * it.next() // 9
 *
 * //bad
 * [...count(5, 3)] // Infinite loop!
 */
export function* count(start = 0, step = 1): Generator<number> {
  for (let i = start; ; i += step) {
    yield i
  }
}

/**
 * Make an iterator yielding elements from the iterable and saving a copy of
 * each. When the iterable is exhausted, yields elements from the saved copy.
 * Repeats indefinitely.
 *
 * @example
 * const it = cycle([1, 2, 3])
 * it.next() // 1
 * it.next() // 2
 * it.next() // 3
 * it.next() // 1
 */
export function* cycle<T>(iterable: Iterable<T>): Generator<T> {
  const saved = []

  for (const item of iterable) {
    yield item
    saved.push(item)
  }

  while (saved.length > 0) {
    for (const item of saved) {
      yield item
    }
  }
}

/**
 * An iterator that drops elements from the passed iterable as long as the
 * predicate is true; afterwards, returns every element. Note, the iterator does
 * not produce any output until the predicate first becomes false, so it may
 * have a lengthy start-up time.
 *
 * Defaults to the truthyness of values for the predicate.
 */
export function* dropWhile<T>(
  iterable: Iterable<T>,
  predicate: (value: T) => boolean = Boolean
): Generator<T> {
  const iterator = iterable[Symbol.iterator]()
  let value: T

  while (!({ value } = iterator.next()).done) {
    if (!predicate(value)) {
      yield value
      break
    }
  }

  yield* tailIterable(iterator)
}

/**
 * Returns a generator of enumeration pairs. Iterable must be an object which
 * supports iteration. Produces tuples of the order of each element and the
 * element itself.
 *
 * @example
 * [...enumerate(['hello', 'world'])] // [[0, 'hello'], [1, 'world']]
 * [...enumerate([5,4,3,2,1].splice(2), 1)] // [[1, 3], [2, 2], [3, 1]]
 */
export function* enumerate<T>(
  iterable: Iterable<T>,
  start = 0
): Generator<[number, T]> {
  yield* zip(count(start), iterable)
}

/**
 * Returns a generator that filters elements from a given iterable based on a
 * predicate.
 *
 * The predicate defaults to the boolean constructor; falsy values will be
 * filtered.
 *
 * @example
 * [...filter([0, 1, 2, 3, 4], n => n % 2 === 0)] // [0, 2, 4]
 * [...filter('Hello World!', c => c.match(/[A-Z]/) !== null)] // ['H', 'W']
 */
export function* filter<T>(
  iterable: Iterable<T>,
  predicate: (value: T) => boolean = Boolean
): Generator<T> {
  for (const item of iterable) {
    if (predicate(item)) {
      yield item
    }
  }
}

/**
 * An iterator that filters elements from iterable returning only those for
 * which the predicate is False.
 *
 * Defaults to filtering out values that are truthy.
 */
export function* filterFalse<T>(
  iterable: Iterable<T>,
  predicate: (value: T) => boolean = Boolean
): Generator<T> {
  yield* filter(iterable, (v) => !predicate(v))
}

/**
 * An iterator that returns unique values and groups of that value from the
 * iterable. Generally, the iterable needs to already be sorted.
 *
 * The operation is similar to the `uniq` filter in Unix. It generates a break
 * or new group every time the value changes (which is why it is usually
 * necessary to have sorted the data beforehand). This differs from SQL’s `GROUP
 * BY` which aggregates elements regardless of their input order.
 *
 * The group iterator is not saved as the iterator progresses; please pay
 * attention to the second example.
 *
 * @example
 * const values = [0, 0, 1, 1]
 * for (const [k, g] of groupBy(values)) {
 *    console.log(`key = ${k}`)        // 0      1
 *    console.log(`group = ${[...g]}`) // [0, 0] [1, 1]
 * }
 *
 * const groups = [...groupBy(values)].map(([k, g]) => [...g]) // [[], []]
 */
export function groupBy<T>(iterable: Iterable<T>): Generator<[T, Iterable<T>]>
/**
 * An iterator that returns consecutive keys and groups from the iterable.
 * Generally, the iterable needs to already be sorted on the same key function.
 *
 * The operation is similar to the `uniq` filter in Unix. It generates a break
 * or new group every time the value of the key function changes (which is why
 * it is usually necessary to have sorted the data by the key function
 * beforehand). This differs from SQL’s `GROUP BY` which aggregates common
 * elements regardless of their input order.
 *
 * The group iterator is not saved as the iterator progresses; please pay
 * attention to the second example.
 *
 * @example
 * const values = [0, 1, 2, 3, 1, 4, 5]
 * const keyFunc = v => Math.floor(v / 2)
 * for (const [k, g] of groupBy(values, keyFunc)) {
 *    console.log(`key = ${k}`)        // 0      1      0   2
 *    console.log(`group = ${[...g]}`) // [0, 1] [2, 3] [1] [4, 5]
 * }
 *
 * const groups = [...groupBy(values, keyFunc)].map(([k, g]) => [...g]) // [[], [], [], []]
 *
 * @param keyFunc A function computing a key value for each element.
 */
export function groupBy<T, K>(
  iterable: Iterable<T>,
  keyFunc: (item: T) => K
): Generator<[K, Iterable<T>]>
export function* groupBy<T, K>(
  iterable: Iterable<T>,
  keyFunc?: (v: T) => K
): Generator<[K, Iterable<T>]> {
  if (keyFunc === undefined) {
    // If the key value is to be a different type to the iterated values, then
    // a different overloaded method will be used.
    keyFunc = (v: T) => (v as unknown) as K
  }

  const it = iterable[Symbol.iterator]()

  // We need a dummy value to initialise the keys and values that will not be
  // equal to anything in the iterable.
  // When we start iterating, all three of these variables will be defined
  // before we yield them.
  let currKey: K = ({} as unknown) as K
  let targetKey: K = currKey
  let currValue: T = ({} as unknown) as T

  // A dummy object to notify the grouper when the next group has started.
  let id: Record<string, never> = {}

  const grouper = function* (
    targetId: Record<string, never>,
    keyFunc: (v: T) => K
  ) {
    while (id === targetId && currKey === targetKey) {
      yield currValue
      if (!({ value: currValue } = it.next()).done) {
        currKey = keyFunc(currValue)
      } else {
        // the iterator has finished
        return
      }
    }
  }

  while (true) {
    id = {}
    // Skip over the values with the same key.
    while (currKey === targetKey) {
      if (!({ value: currValue } = it.next()).done) {
        currKey = keyFunc(currValue)
      } else {
        // The iterator has finished.
        return
      }
    }
    // Update the key to the next value
    targetKey = currKey
    // Yield the current key and an iterator over the values with the same key.
    yield [currKey, grouper(id, keyFunc)]
  }
}

/**
 * An iterator that yields k elements from the iterable.
 */
export function islice<T>(iterable: Iterable<T>, k: number): Generator<T>
/**
 * An iterator that yields selected elements from the iterable. If `start` is
 * non-zero, then elements from the iterable are skipped until start is reached.
 * Afterward, elements are returned consecutively unless step is set higher than
 * one which results in items being skipped. Unlike regular slicing, islice()
 * does not support negative values for start, stop, or step.
 */
export function islice<T>(
  iterable: Iterable<T>,
  start: number,
  stop?: number,
  step?: number
): Generator<T>
export function* islice<T>(
  iterable: Iterable<T>,
  startOrEnd: number,
  endValue?: number,
  stepValue?: number
): Generator<T> {
  const enumerated = enumerate(iterable)
  let start: number
  let end: number
  let step: number

  if (endValue === undefined) {
    if (stepValue === undefined) {
      if (startOrEnd < 0) {
        throw new TypeError('k param must be non-negative or undefined')
      }
      start = 0
      end = startOrEnd
      step = 1
    } else {
      start = startOrEnd
      end = Infinity
      step = stepValue
    }
  } else {
    start = startOrEnd
    end = endValue
    step = stepValue ?? 1
  }
  if (start < 0) {
    throw new TypeError('start param must be non-negative or undefined')
  }
  if (end < 0) {
    throw new TypeError('end param must be non-negative or undefined')
  }
  if (step <= 0) {
    throw new TypeError('step param must be positive or undefined')
  }

  for (const select of takeWhile(count(start, step), (v) => v < end)) {
    for (;;) {
      const { done, value } = enumerated.next()
      if (done) {
        // The iterator is done and we will not yield any more.
        return
      }
      // Since we are not done, the value property will be of the correct type.
      const [i, val] = value as [number, T]
      if (i === select) {
        // We found the next value, yield it and move on to the next value.
        yield val
        break
      }
    }
  }
}

/**
 * Returns a generator over mapped elements from a given iterable based on a
 * given modifying function.
 *
 * @example
 * [...map([0, 1, 2], n => 'a'.repeat(n))] // ['', 'a', 'aa']
 * [...map('Hello World!', c => c.toUpperCase()].join('') // 'HELLO WORLD!'
 */
export function* map<T, M>(
  iterable: Iterable<T>,
  mapFunction: (value: T) => M
): Generator<M> {
  for (const item of iterable) {
    yield mapFunction(item)
  }
}

/**
 * Iterates over the values 0 <= i < end.
 */
export function range(end: number): Generator<number>
/**
 * Returns an iterator producing all the numbers in the given range one by one,
 * starting from `start` in increments of `step` (defaults to 1) until `end` is
 * reached.
 *
 * When the step value is positive, the iterator will keep producing values as
 * long as they are less than the end value.
 *
 * When the step value is negative, the iterator will keep producing values as
 * long as they are greater than the end value.
 *
 * If the step value is 0, it will throw a `TypeError`.
 *
 * The range will be empty if the first value to produce already does not meet
 * the value constraint.
 *
 * @example
 * [...range(0, 3)] // [0, 1, 2]
 * [...range(1, 4)] // [1, 2, 3]
 * [...range(4, 0, -1)] // [4, 3, 2, 1]
 */
export function range(
  start: number,
  end: number,
  step?: number
): Generator<number>
export function* range(
  startOrEnd: number,
  maybeEnd?: number,
  step = 1
): Generator<number> {
  if (step === 0) {
    throw new TypeError('The step argument must not be zero.')
  }

  let start: number, end: number
  if (maybeEnd === undefined) {
    end = startOrEnd
    start = 0
  } else {
    start = startOrEnd
    end = maybeEnd
  }

  if (start % 1 !== 0 || end % 1 !== 0 || step % 1 !== 0) {
    throw new TypeError('The range arguments must be integers.')
  }

  let predicate: (v: number) => boolean

  if (step > 0) {
    predicate = (v) => v < end
  } else {
    predicate = (v) => v > end
  }

  yield* takeWhile(count(start, step), predicate)
}

/**
 * Accumulates an iterator into a single value with a reducer function.
 *
 * DISCLAIMER: it may be tempting to do the following:
 *
 * ```js
 * reduce(stringIterator, (n, s) => n + s, '') // concatenate all strings
 * ```
 *
 * to concatenate a list of strings, however since strings are immutable in
 * javascript, it is better to use the Array.prototype.join() function to avoid
 * unnecessary copying of strings.
 *
 * @example
 * reduce(['bing', 'bang', 'bong'], (n, s) => n + s.length, 0) // 12
 */
export function reduce<T, R>(
  iterable: Iterable<T>,
  reducer: (accumulated: R, nextVal: T) => R,
  initialValue: R
): R {
  let accumulated = initialValue

  for (const item of iterable) {
    accumulated = reducer(accumulated, item)
  }

  return accumulated
}

/**
 * Same as reduce, but uses the first value from the iterable as the initial
 * value.
 *
 * @see reduce
 *
 * @example
 * reduce_([1,2,3], (a, b) => a + b) // 6
 */
export function reduce_<T>(
  iterable: Iterable<T>,
  reducer: (accumulated: T, nextVal: T) => T
): T | undefined {
  const iterator = iterable[Symbol.iterator]()
  const { done, value: initialValue } = iterator.next()
  if (done) {
    return undefined
  }
  return reduce(tailIterable(iterator), reducer, initialValue)
}

/**
 * Iterates over the values of an iterator while they satisfy a predicate.
 *
 * Defaults to the truthiness of values as the predicate.
 */
export function* takeWhile<T>(
  iterable: Iterable<T>,
  predicate: (value: T) => boolean = Boolean
): Generator<T> {
  for (const item of iterable) {
    if (!predicate(item)) {
      break
    }
    yield item
  }
}

/**
 * Iterates over multiple iterators in parallel. Stops as soon as any of the
 * included iterators stop.
 *
 * @see zipLongest
 *
 * @example
 * [...zip('Hello', [3, 2, 1])] // [['H', 3], ['e', 2], ['l', 1]]
 */
export function* zip<T extends unknown[]>(
  ...toZip: Iterableify<T>
): Generator<T> {
  const iterators = toZip.map((i) => i[Symbol.iterator]())

  while (true) {
    const result = iterators.map((i) => i.next())
    if (result.some(({ done }) => done)) {
      break
    }
    yield result.map(({ value }) => value) as T
  }
}

/**
 * Iterates over multiple iterators in parallel. Stops when all included
 * iterators stop. Yields `undefined` for iterators that stop early.
 *
 * @see zip
 *
 * @example
 * [...zipLongest('Hat', [3])] // [['H', 3], ['a', undefined], ['t', undefined]]
 */
export function* zipLongest<T extends unknown[]>(
  ...toZip: Iterableify<T>
): Generator<Partial<T>> {
  const iterators = toZip.map((i) => i[Symbol.iterator]())

  while (true) {
    const result = iterators.map((i) => i.next())
    if (!result.some(({ done }) => !done)) {
      // All iterators are done.
      break
    }
    yield result.map(({ done, value }) =>
      done ? undefined : value
    ) as Partial<T>
  }
}
