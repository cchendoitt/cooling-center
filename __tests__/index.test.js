import App from '../src/js/App'
import Content from 'nyc-lib/nyc/Content'
import coolingCenter from '../src/js/coolingCenter'

jest.mock('../src/js/App')
jest.mock('nyc-lib/nyc/Content')

const mockContent = {
  messages: {
    cc_url: 'mock-url'
  },
  message: (key) => {
    return mockContent.messages[key]
  }
}

beforeEach(() => {
  App.mockClear()
  Content.mockClear()
  Content.loadCsv.mockImplementation(() => {
    return new Promise(resolve => {
      resolve(mockContent)
    })
  })
})

test('constructs instance of App', () => {
  expect.assertions(5)

  const test = async () => {
    return new Promise(resolve => {
      setTimeout(() => {
        expect(Content.loadCsv).toHaveBeenCalledTimes(1)
        expect(Content.loadCsv.mock.calls[0][0].url).toBe(coolingCenter.CONTENT_URL)
        expect(App).toHaveBeenCalledTimes(1)
        expect(App.mock.calls[0][0]).toBe(mockContent)
        resolve(true)
      }, 500)
    })
  }

  require('../src/js/index')

  return test().then(result => {expect(result).toBe(true)})
})