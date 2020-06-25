import App from '../src/js/App'
import Content from 'nyc-lib/nyc/Content'
import coolingCenter from '../src/js/coolingCenter'

jest.mock('../src/js/App')
jest.mock('nyc-lib/nyc/Content')

let mockContent
const origRedirect = coolingCenter.redirect
beforeEach(() => {
  mockContent = {
    messages: {
      cc_url: 'mock-url',
      active: 'yes',
      message: 'message',
      automation: 'yes'
    },
    message: (key) => {
      return mockContent.messages[key]
    }
  }
  App.mockClear()
  coolingCenter.redirect = jest.fn()
  Content.mockClear()
  Content.loadCsv.mockImplementation(() => {
    return new Promise(resolve => {
      resolve(mockContent)
    })
  })
})
afterEach(() => {
  coolingCenter.redirect = origRedirect
})

test('App is inactive', done => {
  expect.assertions(4)
  mockContent.messages.active = 'no'
  const test = async () => {
    return new Promise(resolve => {
      setTimeout(() => {
        expect(Content.loadCsv).toHaveBeenCalledTimes(1)
        expect(Content.loadCsv.mock.calls[0][0].url).toBe(coolingCenter.CONTENT_URL)
        expect(coolingCenter.redirect).toHaveBeenCalledTimes(1)
        expect(App).toHaveBeenCalledTimes(0)
        resolve()
      }, 500)
    })
  }

  require('../src/js/index')

  return test().then(result => {done()})
})
