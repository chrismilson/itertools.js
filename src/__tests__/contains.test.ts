import { contains } from '..'

describe('contains', () => {
  it('Should return false if the needle is not in the haystack', () => {
    expect(contains([1, 2, 3], 4)).toBe(false)
  })

  it('Should return true if the needle is in the haystack', () => {
    expect(contains([1, 2, 3, 4], 4)).toBe(true)
  })

  it('Should exit the iterator if the needle is found', () => {
    // An infinite iterator
    const count = function* () {
      let i = 1
      while (true) {
        yield i++
      }
    }

    expect(contains(count(), 10)).toBe(true)
  })
})
