import { map } from '..'

describe('map', () => {
  it('Should apply the map to each value in the iterator', () => {
    const values = [1, 2, 3, 4, 5]
    const mapper: (v: number) => number = (v) => v * 2

    expect([...map(mapper, values)]).toMatchObject(values.map(mapper))
  })

  it('Should apply the map to each value only once', () => {
    let count = 0
    const values = [1, 2, 3, 4, 5]
    const mapper = (v: number): number => v * 2
    const counter = (v: number): number => {
      count += 1
      return mapper(v)
    }

    expect([...map(counter, values)]).toMatchObject(values.map(mapper))
    expect(count).toBe(values.length)
  })

  it('Should apply the map to multiple arguments', () => {
    const a = [1, 2, 3, 4]
    const b = [2, 2, 2, 2]
    const mapper = Math.pow

    expect([...map(mapper, a, b)]).toMatchObject([1, 4, 9, 16])
  })
})
