import { count } from '..'

describe('count', () => {
  it('Should count up from a starting value', () => {
    const start = 5
    const it = count(start)
    expect(it.next()).toMatchObject({ value: start })
  })

  it('Should change by the step value at each step', () => {
    const start = 0
    const step = 1
    const it = count(start, step)
    for (let i = 0; i < 100; i++) {
      expect(it.next()).toMatchObject({ value: i })
    }
  })
})
