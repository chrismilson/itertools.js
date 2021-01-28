/**
 * Constructs tuples of `never` of length 2^K for all 0 ≤ K and 2^(K - 1) ≤ N.
 * The tuples are in decreasing order by their lengths.
 *
 * The placeholder type `never` is chosen because it lets us test the length, as
 * opposed to a generic type, which may be extended by undefined, and give us
 * unexpected results.
 *
 * This type should not be used directly; it is a support type for Tuple.
 *
 * @param N The number N
 * @param R A tuple of the tuples constructed so far.
 */
type _BuildLargeTuples<
  N extends number,
  R extends never[][]
> = R[0][N] extends never ? R : _BuildLargeTuples<N, [[...R[0], ...R[0]], ...R]>

/**
 * Concatenates the large tuples from _BuildLargeTuples while not exceeding the
 * specified length in order to build a tuple of length exactly N.
 *
 * This type should not be used directly; it is a support type for Tuple.
 */
type _ConcatUntilDone<
  N extends number,
  R extends never[],
  L extends never[][]
> = R['length'] extends N
  ? R
  : _ConcatUntilDone<
      N,
      [...L[0], ...R][N] extends never ? R : [...L[0], ...R],
      L extends [L[0], ...infer U] ? (U extends never[][] ? U : never) : never
    >

/**
 * Replaces the never placeholder type in our tuples with the intended type for
 * a tuple.
 */
type _ReplaceNever<R extends never[], T> = { [P in keyof R]: T }

/**
 * A generic tuple type.
 */
// The `number extends N` check makes sure that N is not the generic number
// type. The `[][K] extends never` check makes sure that K is not negative.
export type Tuple<T, N extends number> = number extends N
  ? T[]
  : {
      [K in N]: [][K] extends never
        ? never
        : _BuildLargeTuples<K, [[never]]> extends infer U
        ? U extends never[][]
          ? _ReplaceNever<_ConcatUntilDone<K, [], U>, T>
          : never
        : never
    }[N]

export type Iterableify<T> = { [P in keyof T]: Iterable<T[P]> }
