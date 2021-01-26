import { zip, zipLongest } from '..'

describe('zip', () => {
  it('Should iterate two iterables in parallel', () => {
    const a = [1, 2, 3]
    const b = 'abc'

    expect([...zip(a, b)]).toMatchObject([
      [1, 'a'],
      [2, 'b'],
      [3, 'c'],
    ])
  })

  it('Should stop at the shortest iterator', () => {
    const a: number[] = [1, 2, 3, 4]
    const b = 'abc'

    expect([...zip(a, b)]).toMatchObject([
      [1, 'a'],
      [2, 'b'],
      [3, 'c'],
    ])
  })
})

describe('zipLongest', () => {
  it('Should iterate two iterables in parallel', () => {
    const a = [1, 2, 3]
    const b = 'abc'

    expect([...zipLongest(a, b)]).toMatchObject([
      [1, 'a'],
      [2, 'b'],
      [3, 'c'],
    ])
  })

  it('Should iterate until all iterators are done', () => {
    const a = [1, 2, 3, 4]
    const b = 'abc'

    expect([...zipLongest(a, b)]).toMatchObject([
      [1, 'a'],
      [2, 'b'],
      [3, 'c'],
      [4, undefined],
    ])
  })
})
