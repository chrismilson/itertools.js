import { islice } from '..'

describe('islice', () => {
  describe('two arguments', () => {
    it('Should yield the first k elements of an iterable', () => {
      const k = 5
      const iterable = 'Hello World!'

      expect([...islice(iterable, k)].join('')).toBe(iterable.substring(0, k))
    })
  })

  describe('three arguments', () => {
    it('Should yield the slice between the start and stop arguments', () => {
      const start = 4
      const end = 10
      const iterable = 'Hello World!'

      expect([...islice(iterable, start, end)].join('')).toBe(
        iterable.substring(start, end)
      )
    })
  })

  describe('four arguments', () => {
    it('Should yield the proper elements of the slice', () => {
      const start = 4
      const end = 10
      const step = 2
      const iterable = 'Hello World!'

      expect([...islice(iterable, start, end, step)].join('')).toBe('oWr')
    })

    it('Should yield until the end', () => {
      const start = 4
      const end = undefined
      const step = 2
      const iterable = 'Hello World!'

      expect([...islice(iterable, start, end, step)].join('')).toBe('oWrd')
    })
  })
})
