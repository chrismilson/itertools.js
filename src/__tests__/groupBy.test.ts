import { groupBy } from '..'

describe('groupBy', () => {
  const exampleValues = [0, 1, 2, 3, 1, 4, 5]
  const exampleKeyFunc = (v: number) => Math.floor(v / 2)

  it('Should iterate over the entire iterator', () => {
    const target = [...exampleValues]
    const result = []

    for (const keyAndIterable of groupBy(target, exampleKeyFunc)) {
      for (const v of keyAndIterable[1]) {
        result.push(v)
      }
    }
    expect(result).toMatchObject(target)
  })

  it('Should yield the groups respecting the keyFunc', () => {
    const target = [...exampleValues]
    const it = groupBy(target, exampleKeyFunc)

    let { done, value } = it.next()
    expect(done).not.toBeTruthy()
    expect(value[0]).toBe(0)
    expect([...value[1]]).toMatchObject([0, 1])
    ;({ done, value } = it.next())
    expect(done).not.toBeTruthy()
    expect(value[0]).toBe(1)
    expect([...value[1]]).toMatchObject([2, 3])
    ;({ done, value } = it.next())
    expect(done).not.toBeTruthy()
    expect(value[0]).toBe(0)
    expect([...value[1]]).toMatchObject([1])
    ;({ done, value } = it.next())
    expect(done).not.toBeTruthy()
    expect(value[0]).toBe(2)
    expect([...value[1]]).toMatchObject([4, 5])
    ;({ done, value } = it.next())
    expect(done).toBeTruthy()
  })

  it('Should not save the groups after they have been passed', () => {
    const target = [...exampleValues]
    const it = groupBy(target, exampleKeyFunc)

    const groups = [...it].map((keyAndIterator) => [...keyAndIterator[1]])

    expect(groups).toMatchObject([[], [], [], []])
  })

  describe('default keyFunc', () => {
    it('Should iterate over the unique elements of the iterator', () => {
      const iterator = [1, 1, 1, 2, 2, 2, 2, 4, 4, 4]

      expect([...groupBy(iterator)].map(([k]) => k)).toMatchObject([1, 2, 4])
    })
  })
})
