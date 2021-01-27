import { dropWhile } from '..'

describe('dropWhile', () => {
  it('Should not drop anything if the first value matches the predicate', () => {
    const target = [1, 2, 3, 4, 5]
    expect([...dropWhile(target, (v) => v !== 1)]).toMatchObject(target)
  })

  it('Should drop values while the predicate is true', () => {
    // an infinite iterator
    const count = function* () {
      let i = 0
      while (true) {
        yield i++
      }
    }

    expect(dropWhile(count(), (v) => v < 100).next()).toMatchObject({
      value: 100,
    })
  })
})
