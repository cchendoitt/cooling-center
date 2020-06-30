import coolingCenter from '../src/js/coolingCenter'
import Content from 'nyc-lib/nyc/Content'
import message from '../src/js/message'
import App from '../src/js/App'
import nyc from 'nyc-lib/nyc'

jest.mock('../src/js/App')

const redirect = coolingCenter.redirect
const cacheBust = nyc.cacheBust
const loadCsv = Content.loadCsv
const messages = {}
let content

beforeEach(() => {
  App.mockClear()
  coolingCenter.redirect = jest.fn()
  nyc.cacheBust = jest.fn(() => {
    return 'cache-bust'
  })
  Content.loadCsv = jest.fn(() => {
    return new Promise(resolve => {
      content = new Content([messages])
      resolve(content)
    })
  })
})
afterEach(() => {
  coolingCenter.redirect = redirect
  Content.loadCsv = loadCsv
  nyc.cacheBust = cacheBust
})

test('status active=yes, automation=yes no app', done => {
  expect.assertions(7)

  messages.active = 'yes'
  messages.automation = 'yes'

  coolingCenter.status()

  setTimeout(() => {
    expect(Content.loadCsv).toHaveBeenCalledTimes(1)
    expect(Content.loadCsv.mock.calls[0][0].url).toBe(`${coolingCenter.CONTENT_URL}?cache-bust`)
    expect( nyc.cacheBust).toHaveBeenCalledTimes(1)
    expect(nyc.cacheBust.mock.calls[0][0]).toBe(5)
    expect(App).toHaveBeenCalledTimes(1)
    expect(App.mock.calls[0][0]).toBe(content)
    expect(coolingCenter.automation).toBe('yes')
    done()
  }, 200)
})

test('status active=yes, automation=no no app', done => {
  expect.assertions(7)

  messages.active = 'yes'
  messages.automation = 'no'

  coolingCenter.status()

  setTimeout(() => {
    expect(Content.loadCsv).toHaveBeenCalledTimes(1)
    expect(Content.loadCsv.mock.calls[0][0].url).toBe(`${coolingCenter.CONTENT_URL}?cache-bust`)
    expect( nyc.cacheBust).toHaveBeenCalledTimes(1)
    expect(nyc.cacheBust.mock.calls[0][0]).toBe(5)
    expect(App).toHaveBeenCalledTimes(1)
    expect(App.mock.calls[0][0]).toBe(content)
    expect(coolingCenter.automation).toBe('no')
    done()
  }, 200)
})

test('status active=yes, automation unchanged, has app', done => {
  expect.assertions(5)

  messages.active = 'yes'
  messages.automation = 'no'
  coolingCenter.automation = 'no'
  
  coolingCenter.status(true)

  setTimeout(() => {
    expect(Content.loadCsv).toHaveBeenCalledTimes(1)
    expect(Content.loadCsv.mock.calls[0][0].url).toBe(`${coolingCenter.CONTENT_URL}?cache-bust`)
    expect( nyc.cacheBust).toHaveBeenCalledTimes(1)
    expect(nyc.cacheBust.mock.calls[0][0]).toBe(5)
    expect(App).toHaveBeenCalledTimes(0)
    done()
  }, 200)
})

test('status active=yes, automation has changed, has app', done => {
  expect.assertions(7)

  messages.active = 'yes'
  messages.automation = 'yes'
  coolingCenter.automation = 'no'
  
  coolingCenter.status(true)

  setTimeout(() => {
    expect(Content.loadCsv).toHaveBeenCalledTimes(1)
    expect(Content.loadCsv.mock.calls[0][0].url).toBe(`${coolingCenter.CONTENT_URL}?cache-bust`)
    expect( nyc.cacheBust).toHaveBeenCalledTimes(1)
    expect(nyc.cacheBust.mock.calls[0][0]).toBe(5)
    expect(App).toHaveBeenCalledTimes(0)
    expect(coolingCenter.redirect).toHaveBeenCalledTimes(1)
    expect(coolingCenter.redirect.mock.calls[0][0]).toBe('./')
    done()
  }, 200)
})

test('status active=no', done => {
  expect.assertions(5)

  messages.active = 'no'

  coolingCenter.status()

  setTimeout(() => {
    expect(Content.loadCsv).toHaveBeenCalledTimes(1)
    expect(Content.loadCsv.mock.calls[0][0].url).toBe(`${coolingCenter.CONTENT_URL}?cache-bust`)
    expect(App).toHaveBeenCalledTimes(0)
    expect(coolingCenter.redirect).toHaveBeenCalledTimes(1)
    expect(coolingCenter.redirect.mock.calls[0][0]).toBe('inactive.html?cache-bust')
    done()
  }, 200)
})