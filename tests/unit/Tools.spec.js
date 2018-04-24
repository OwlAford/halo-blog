import { JSON2Array } from '@/libs/tools.js'

test('String converted to uppercase', () => {
  const spec = JSON2Array({
    home: {
      parent: 'father mother',
      child: 'son'
    }
  })
  const exp = [{
    id: 'home',
    parent: 'father mother',
    child: 'son'
  }]
  expect(spec).toEqual(exp)
})
