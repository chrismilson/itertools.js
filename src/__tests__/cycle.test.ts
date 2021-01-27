import { cycle } from '..'

describe('cycle', () => {
  it('Should iterate the same as the passed iterator first', () => {
    const target = [1, 2, 3, 4, 5, 3, 2]
    const it = cycle(target)

    for (let i = 0; i < target.length; i++) {
      expect(it.next()).toMatchObject({ value: target[i] })
    }
  })

  it('Should iterate the same as the passed iterator more than once', () => {
    const target = [1, 2, 3, 4, 5, 3, 2]
    const it = cycle(target)

    for (let i = 0; i < target.length; i++) {
      expect(it.next()).toMatchObject({ value: target[i] })
    }
    for (let i = 0; i < target.length; i++) {
      expect(it.next()).toMatchObject({ value: target[i] })
    }
  })
})
