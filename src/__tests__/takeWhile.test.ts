import { takeWhile } from '..'

describe('takeWhile', () => {
  it('Should stop once a non-matching value has been found', () => {
    // An infinite iterator
    const count = function* () {
      let i = 0
      while (true) {
        yield i++
      }
    }

    expect([...takeWhile(count(), (v) => v < 4)]).toMatchObject([0, 1, 2, 3])
  })
})
