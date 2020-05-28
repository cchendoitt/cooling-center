import Content from 'nyc-lib/nyc/Content'
import coolingCenter from '../src/js/coolingCenter'
import App from '../src/js/App'

jest.mock('../src/js/App')

const initializer = require('../src/js/init').default
const methods = {}
Object.keys(initializer).forEach(key => {
  methods[key] = initializer[key]
})

beforeEach(() => {
  Object.keys(methods).forEach(key => {
    initializer[key] = methods[key]
  })
  App.mockClear()
})

describe('init', () => {
  let messages = {}
  let params = {}
  beforeEach(() => {
    initializer.redirect = jest.fn()
    initializer.refresh = jest.fn()
    initializer.params = jest.fn().mockImplementation(() => {
      return params
    })
    Content.loadCsv = jest.fn().mockImplementation(options => {
      return new Promise(resolve => {
        resolve(new Content([messages]))
      })
    })
  })
  
  test('init - active - no refresh', done => {
    expect.assertions(10)
  
    messages = {active: 'yes'}
    params = {}
  
    initializer.init()
  
    setTimeout(() => {
      expect(initializer.params).toHaveBeenCalledTimes(1)
      expect(initializer.refresh).toHaveBeenCalledTimes(1)
      expect(initializer.refresh.mock.calls[0][0]).toBeUndefined()
      expect(Content.loadCsv).toHaveBeenCalledTimes(1)
      expect(Content.loadCsv.mock.calls[0][0].url).toBe(coolingCenter.CONTENT_URL)
      expect(App).toHaveBeenCalledTimes(1)
      expect(App.mock.calls[0][0] instanceof Content).toBe(true)
      expect(App.mock.calls[0][0].messages).toEqual(messages)
      expect(App.mock.calls[0][1]).toBe(false)
      expect(initializer.redirect).toHaveBeenCalledTimes(0)
      done()
    }, 100)
  })
  
  test('init - active - 1st refresh', done => {
    expect.assertions(10)
  
    messages = {active: 'yes'}
    params = {refresh: '5'}
  
    initializer.init()
  
    setTimeout(() => {
      expect(initializer.params).toHaveBeenCalledTimes(1)
      expect(initializer.refresh).toHaveBeenCalledTimes(1)
      expect(initializer.refresh.mock.calls[0][0]).toBe('5')
      expect(Content.loadCsv).toHaveBeenCalledTimes(1)
      expect(Content.loadCsv.mock.calls[0][0].url).toBe(coolingCenter.CONTENT_URL)
      expect(App).toHaveBeenCalledTimes(1)
      expect(App.mock.calls[0][0] instanceof Content).toBe(true)
      expect(App.mock.calls[0][0].messages).toEqual(messages)
      expect(App.mock.calls[0][1]).toBe(false)
      expect(initializer.redirect).toHaveBeenCalledTimes(0)
      done()
    }, 100)
  })
  
  test.only('DONT LEAVE ME!!', () => {

  })
  
  test('init - active - 2nd refresh', done => {
    expect.assertions(10)
  
    messages = {active: 'yes'}
    params = {refresh: '15', now: `${new Date().getTime()}`}
  
    initializer.init()
  
    setTimeout(() => {
      expect(initializer.params).toHaveBeenCalledTimes(1)
      expect(initializer.refresh).toHaveBeenCalledTimes(1)
      expect(initializer.refresh.mock.calls[0][0]).toBe('15')
      expect(Content.loadCsv).toHaveBeenCalledTimes(1)
      expect(Content.loadCsv.mock.calls[0][0].url).toBe(coolingCenter.CONTENT_URL)
      expect(App).toHaveBeenCalledTimes(1)
      expect(App.mock.calls[0][0] instanceof Content).toBe(true)
      expect(App.mock.calls[0][0].messages).toEqual(messages)
      expect(App.mock.calls[0][1]).toBe(true)
      expect(initializer.redirect).toHaveBeenCalledTimes(0)
      done()
    }, 100)
  })
  
  test('init - not active - refresh', done => {
    expect.assertions(8)
  
    messages = {active: 'no', message: 'mock-message'}
    params = {refresh: '10'}
  
    initializer.init()
  
    setTimeout(() => {
      expect(initializer.params).toHaveBeenCalledTimes(1)
      expect(initializer.refresh).toHaveBeenCalledTimes(1)
      expect(initializer.refresh.mock.calls[0][0]).toBe('10')
      expect(Content.loadCsv).toHaveBeenCalledTimes(1)
      expect(Content.loadCsv.mock.calls[0][0].url).toBe(coolingCenter.CONTENT_URL)
      expect(App).toHaveBeenCalledTimes(0)
      expect(initializer.redirect).toHaveBeenCalledTimes(1)
      expect(initializer.redirect.mock.calls[0][0]).toBe('inactive.html?message=mock-message')
      done()
    }, 100)
  })
  
  test('init - not active - no refresh', done => {
    expect.assertions(8)
  
    messages = {active: 'no', message: 'mock-message'}
    initializer.refresh = jest.fn()
    params = {}
  
    initializer.init()
  
    setTimeout(() => {
      expect(initializer.params).toHaveBeenCalledTimes(1)
      expect(initializer.refresh).toHaveBeenCalledTimes(1)
      expect(initializer.refresh.mock.calls[0][0]).toBeUndefined()
      expect(Content.loadCsv).toHaveBeenCalledTimes(1)
      expect(Content.loadCsv.mock.calls[0][0].url).toBe(coolingCenter.CONTENT_URL)
      expect(App).toHaveBeenCalledTimes(0)
      expect(initializer.redirect).toHaveBeenCalledTimes(1)
      expect(initializer.redirect.mock.calls[0][0]).toBe('inactive.html?message=mock-message')
      done()
    }, 100)
  })
})

describe('params', () => {
  let search = ''
  beforeEach(() => {
    initializer.search = jest.fn().mockImplementation(() => {
      return search
    })
  })

  test('params - no query string', () => {
    expect.assertions(1)
  
    expect(initializer.params()).toEqual({})
  })

  test('params - with query string', () => {
    expect.assertions(1)

    const now = new Date().getTime()
    search = `?refresh=5&now=${now}`

    expect(initializer.params()).toEqual({refresh: '5', now: `${now}`})
  })
})

describe('refresh', () => {
  const timeout = global.setTimeout
  beforeEach(() => {
    initializer.redirect = jest.fn()
    global.setTimeout = jest.fn().mockImplementation((fn, ms) => {
      fn()
    })
  })
  afterEach(() => {
    global.setTimeout = timeout
  })

  test('refresh - yes', () => {
    expect.assertions(5)

    initializer.refresh(5)

    expect(setTimeout).toHaveBeenCalledTimes(1)
    expect(typeof setTimeout.mock.calls[0][0]).toBe('function')
    expect(setTimeout.mock.calls[0][1]).toBe(5 * 1000 * 60)
    expect(initializer.redirect).toHaveBeenCalledTimes(1)
    expect(initializer.redirect.mock.calls[0][0].substr(0, 17)).toBe('./?refresh=5&now=')
  })

  test('refresh - no', () => {
    expect.assertions(2)

    initializer.refresh()

    expect(setTimeout).toHaveBeenCalledTimes(0)
    expect(initializer.redirect).toHaveBeenCalledTimes(0)
  })
})

