import { repeat } from '..'

describe('repeat', () => {
  it('Should repeat the same value', () => {
    const value = {}
    const it = repeat(value)

    expect(it.next().value).toBe(it.next().value)
  })

  it('Should only repeat the set number of times', () => {
    const times = 10

    expect([...repeat(5, times)].length).toBe(times)
  })
})
