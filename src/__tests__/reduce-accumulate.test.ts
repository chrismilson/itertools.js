import { reduce, reduce_, accumulate } from '..'

describe('reduce', () => {
  it('Should sum the values in an array', () => {
    const arr = [1, 2, 3, 4]

    expect(reduce(arr, (a, b) => a + b, 0)).toBe(10)
  })
})

describe('reduce_', () => {
  it('Should sum the values in an array', () => {
    const arr = [1, 2, 3, 4]

    expect(reduce_(arr, (a, b) => a + b)).toBe(10)
  })
})

describe('accumulate', () => {
  it('Should provide a running sum of the values in an array', () => {
    const arr = [1, 2, 3, 4]

    expect([...accumulate(arr)]).toMatchObject([1, 3, 6, 10])
  })

  it('Should start by yielding the initial value', () => {
    const arr = [1, 2, 3, 4]
    const initial = 100
    const result = [...accumulate(arr, (a, b) => a + b, initial)]

    expect(result.length).toBe(arr.length + 1)
    expect(result).toMatchObject([100, 101, 103, 106, 110])
  })
})
