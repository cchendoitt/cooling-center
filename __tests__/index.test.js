import coolingCenter from '../src/js/coolingCenter'

const status = coolingCenter.status

beforeEach(() => {
  coolingCenter.status = jest.fn()
})
afterEach(() => {
  coolingCenter.status = status
})

test('index calls coolingCenter.status', () => {
  expect.assertions(1)
  require('../src/js/index')
  expect(coolingCenter.status).toHaveBeenCalledTimes(1)
})
