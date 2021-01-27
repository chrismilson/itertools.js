import { enumerate } from '..'

describe('enumerate', () => {
  it('Should add the order of each value in the iterator', () => {
    const values = 'Hello'
    const it = enumerate(values)

    expect(it.next().value).toMatchObject([0, 'H'])
    expect(it.next().value).toMatchObject([1, 'e'])
    expect(it.next().value).toMatchObject([2, 'l'])
    expect(it.next().value).toMatchObject([3, 'l'])
    expect(it.next().value).toMatchObject([4, 'o'])
    expect(it.next()).toMatchObject({ done: true })
  })

  it('Should start counting from the passed start value', () => {
    const values = 'Hello'
    const start = 10
    const it = enumerate(values, start)

    expect(it.next().value).toMatchObject([start, 'H'])
  })
})
