import { count, takeWhile } from './itertools'

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
