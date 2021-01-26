import { all, any } from '..'

describe('all', () => {
  it('Should return true if all values are truthy', () => {
    const test = [1, 'hello', {}]

    expect(all(test)).toBe(true)
  })

  it('Should return false if any value is falsy', () => {
    expect(all([undefined])).toBe(false)
    expect(all([0])).toBe(false)
    expect(all([''])).toBe(false)
  })

  it('Should return true on an empty iterator', () => {
    expect(all('')).toBe(true)
    expect(all([])).toBe(true)
  })

  it('Should respect a passed predicate', () => {
    expect(all([0, false, undefined], () => true)).toBe(true)
  })
})

describe('any', () => {
  it('Should return true if any value is truthy', () => {
    expect(any([0, 0, true, '', undefined])).toBe(true)
    expect(any('Hello')).toBe(true)
    expect(any(['yes'])).toBe(true)
  })

  it('Should return false if no value is truthy', () => {
    expect(any([undefined])).toBe(false)
    expect(any([0, false, ''])).toBe(false)
  })

  it('Should return false on an empty iterator', () => {
    expect(any([])).toBe(false)
  })

  it('Should respect a passed predicate', () => {
    expect(any([1, 2, 3], () => false)).toBe(false)
  })
})
