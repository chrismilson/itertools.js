import { filter } from '..'

describe('filter', () => {
  it('Should not yield values that do not match the predicate', () => {
    const values = 'happy days'

    expect([...filter(values, () => false)].length).toBe(0)
  })

  it('Should yield values that match the predicate', () => {
    const values = 'happy'

    expect([...filter(values, () => true)].join('')).toBe(values)
  })
})
