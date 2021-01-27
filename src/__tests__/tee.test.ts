import { tee } from '..'

describe('tee', () => {
  it('Should provide multiple handles on the same iterator', () => {
    const iterable = [1, 2, 3, 4, 5]
    const it = iterable[Symbol.iterator]()
    it.next() // lose a value

    const [a, b] = tee(it)

    expect([...a]).toMatchObject([...b])
  })
})
