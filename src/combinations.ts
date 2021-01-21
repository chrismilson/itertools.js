import { range } from './range'

export type Tuple<T, N extends number> = N extends N
  ? number extends N
    ? T[]
    : _TupleOf<T, N, []>
  : never
// Recurses until the length of type R is the target number N.
export type _TupleOf<
  T,
  N extends number,
  R extends unknown[]
> = R['length'] extends N ? R : _TupleOf<T, N, [T, ...R]>

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
