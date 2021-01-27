import { filter, filterFalse } from '..'

describe('filter', () => {
  it('Should not yield values that do not match the predicate', () => {
    const values = 'happy'

    expect([...filter(values, () => false)].length).toBe(0)
  })

  it('Should yield values that match the predicate', () => {
    const values = 'happy'

    expect([...filter(values, () => true)].join('')).toBe(values)
  })
})

describe('filterFalse', () => {
  it('Should yield values that do not match the predicate', () => {
    const values = 'happy'

    expect([...filterFalse(values, () => false)].join('')).toBe(values)
  })

  it('Should not yield values that match the predicate', () => {
    const values = 'happy'

    expect([...filterFalse(values, () => true)].length).toBe(0)
  })
})
