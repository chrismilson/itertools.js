export type Iterableify<T> = { [P in keyof T]: Iterable<T[P]> }

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
