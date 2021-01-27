import { range } from '..'

describe('range', () => {
  describe('end only', () => {
    it('Should start counting from zero', () => {
      const instance = range(10)

      expect(instance.next().value).toBe(0)
    })

    it('Should iterate the entire range', () => {
      const instance = range(10)

      expect([...instance]).toMatchObject([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
    })

    it('Should throw on non-integer input', () => {
      expect(() => [...range(0.5)]).toThrow(TypeError)
    })
  })

  describe('start and end', () => {
    it('Should start counting from start', () => {
      const instance = range(2, 4)

      expect(instance.next().value).toBe(2)
    })

    it('Should iterate the entire range', () => {
      const instance = range(2, 4)

      expect([...instance]).toMatchObject([2, 3])
    })

    it('Should throw on non-integer input', () => {
      expect(() => [...range(4, 5.1)]).toThrow(TypeError)
    })
  })

  describe('step', () => {
    it('Should throw if zero', () => {
      expect(() => [...range(0, 1, 0)]).toThrow(TypeError)
    })

    it('Should throw if non-integer', () => {
      expect(() => [...range(0, 1, 0.5)]).toThrow(TypeError)
    })

    it('Should iterate down if negative', () => {
      const instance = range(10, 5, -1)

      expect([...instance]).toMatchObject([10, 9, 8, 7, 6])
    })
  })
})
