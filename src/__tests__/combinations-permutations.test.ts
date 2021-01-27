import { combinations, combinationsWithReplacement, permutations } from '..'

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

describe('permutations', () => {
  it('Should yield permutations in order', () => {
    const orig = [1, 2, 3, 4, 5, 6]
    const perms = [...permutations(orig)].map((p) => p.join(''))

    expect(perms).toMatchObject([...perms].sort())
  })

  it('Should yield the correct number of permutations', () => {
    const orig = [1, 2, 3, 4, 5, 6]
    const factorial = (v: number): number => (v == 0 ? 1 : v * factorial(v - 1))

    expect([...permutations(orig)].length).toBe(factorial(orig.length))
  })
})
