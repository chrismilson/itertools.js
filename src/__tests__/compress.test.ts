import { compress } from '..'

describe('compress', () => {
  it('Should not yield elements corresponding to a falsy element', () => {
    expect([
      ...compress('ABCDE', [null, 0, undefined, '', false]),
    ]).toMatchObject([])
  })

  it('Should yield elements corresponding to truthy elements', () => {
    expect([...compress('ABCDE', [1, 'hat', {}, true, []])]).toMatchObject([
      'A',
      'B',
      'C',
      'D',
      'E',
    ])
  })
})
