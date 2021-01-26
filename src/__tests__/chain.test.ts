import { chain, chainFromIterable } from '..'

describe('chain', () => {
  it('Should iterate multiple iterators in order', () => {
    const a = [1, 2, 3]
    const b = 'hat'
    const chained = [...chain<number | string>(a, b)]

    expect(chained).toMatchObject([1, 2, 3, 'h', 'a', 't'])
  })

  it('Should iterate a single iterator', () => {
    const orig = [1, 2, 3]
    const chained = chain(orig)

    expect([...chained]).toMatchObject(orig)
  })
})

describe('chainFromIterable', () => {
  it('Should iterate an iterator of iterators', () => {
    const base = [[1, 2, 3], 'hat']

    expect([...chainFromIterable(base)]).toMatchObject([1, 2, 3, 'h', 'a', 't'])
  })
})
