import { combinations, combinationsWithReplacement } from '..'

describe('combinations', () => {
  it('Should yield combinations in order', () => {
    const orig = [1, 2, 3, 4, 5]
    const combs = [...combinations(orig, 3)].map((x) => x.join(''))

    expect(combs).toMatchObject([...combs].sort())
  })

  it('Should yield the correct number of combinations', () => {
    const orig = [1, 2, 3, 4, 5]
    const combs = [...combinations(orig, 3)]

    expect(combs.length).toBe(10) // 5 schoose 3 == 10
  })
})

describe('combinationsWithReplacement', () => {
  it('Should yield combinations in order', () => {
    const orig = 'ABCD'
    const combs = [...combinationsWithReplacement(orig, 2)].map((x) =>
      x.join('')
    )

    expect(combs).toMatchObject([...combs].sort())
  })

  it('Should yield the correct number of combinations', () => {
    const orig = 'ABCD'
    const combs = [...combinationsWithReplacement(orig, 2)]

    expect(combs.length).toBe(10) // 4 + 2 - 1 choose 2 == 5 choose 2 == 10
  })
})
