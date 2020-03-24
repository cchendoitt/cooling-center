import $ from 'jquery'
import coolingCenter from '../src/js/coolingCenter'
import decorations from '../src/js/decorations'
import facilityStyle from '../src/js/facility-style'
import FinderApp from 'nyc-lib/nyc/ol/FinderApp'
import App from '../src/js/App';
import GeoJson from 'ol/format/GeoJSON'
import CsvPoint from 'nyc-lib/nyc/ol/format/CsvPoint'
import IconArcGis from 'nyc-lib/nyc/ol/style/IconArcGis'
import Layer from 'ol/layer/Vector'
import Source from 'ol/source/Vector'
import Icon from 'ol/style/Icon';

jest.mock('nyc-lib/nyc/ol/FinderApp')
jest.mock('nyc-lib/nyc/ol/format/CsvPoint')
jest.mock('ol/format/GeoJSON')
jest.mock('nyc-lib/nyc/ol/style/IconArcGis')
jest.mock('ol/layer/Vector')


const mockContent = {
  messages: {
    cc_url: 'http://cc-endpoint'
  },
  message: (key) => {
    return mockContent.messages[key]
  }
}

const constructIconUrl = App.prototype.constructIconUrl
const fetchIconUrl = App.prototype.fetchIconUrl

beforeEach(() => {
  FinderApp.mockClear()
  CsvPoint.mockClear()
  GeoJson.mockClear()
  IconArcGis.mockClear()
  App.prototype.constructIconUrl = jest.fn()
  App.prototype.fetchIconUrl = jest.fn()

})

afterEach(() => {
  App.prototype.constructIconUrl = constructIconUrl
  App.prototype.fetchIconUrl = fetchIconUrl
})

describe('constructor', () => {
  test('constructor - data as service url', () => {
    mockContent.messages.cc_url = 'http://cc-endpoint'
    const app = new App(mockContent)

    expect(app instanceof FinderApp).toBe(true)
    expect(FinderApp).toHaveBeenCalledTimes(1)

    expect(FinderApp.mock.calls[0][0].title).toBe('Cooling Center Finder')
    expect(FinderApp.mock.calls[0][0].splashOptions.message).toBe('Splash Message')
    expect(FinderApp.mock.calls[0][0].splashOptions.buttonText).toEqual(['Screen reader instructions', 'View map to find your closest Cooling Center'])
    expect(FinderApp.mock.calls[0][0].facilityUrl).toBe('http://cc-endpoint')

    expect(GeoJson).toHaveBeenCalledTimes(1)
    expect(GeoJson.mock.calls[0][0].dataProjection).toBe('EPSG:2263')
    expect(GeoJson.mock.calls[0][0].featureProjection).toBe('EPSG:3857')
    
    expect(FinderApp.mock.calls[0][0].facilityTabTitle).toBe('Cooling Centers')

    expect(FinderApp.mock.calls[0][0].decorations.length).toBe(2)
    expect(FinderApp.mock.calls[0][0].decorations[0].content).toBe(mockContent)
    expect(FinderApp.mock.calls[0][0].decorations[1]).toBe(decorations)

    expect(FinderApp.mock.calls[0][0].geoclientUrl).toBe(coolingCenter.GEOCLIENT_URL)
    expect(FinderApp.mock.calls[0][0].directionsUrl).toBe(coolingCenter.DIRECTIONS_URL)

    expect(App.prototype.constructIconUrl).toHaveBeenCalledTimes(1)
    expect(App.prototype.constructIconUrl.mock.calls[0][0]).toBe('http://cc-endpoint')
    expect(App.prototype.fetchIconUrl).toHaveBeenCalledTimes(1)
  })
  test('constructor - data as csv', () => {
    mockContent.messages.cc_url = ''
    
    const app = new App(mockContent)

    expect(app instanceof FinderApp).toBe(true)
    expect(FinderApp).toHaveBeenCalledTimes(1)

    expect(FinderApp.mock.calls[0][0].title).toBe('Cooling Center Finder')
    expect(FinderApp.mock.calls[0][0].splashOptions.message).toBe('Splash Message')
    expect(FinderApp.mock.calls[0][0].splashOptions.buttonText).toEqual(['Screen reader instructions', 'View map to find your closest Cooling Center'])
    expect(FinderApp.mock.calls[0][0].facilityUrl).toBe(coolingCenter.CENTER_CSV_URL)

    expect(CsvPoint).toHaveBeenCalledTimes(1)
    expect(CsvPoint.mock.calls[0][0].x).toBe('X')
    expect(CsvPoint.mock.calls[0][0].y).toBe('Y')    
    expect(CsvPoint.mock.calls[0][0].dataProjection).toBe('EPSG:2263')
    
    expect(FinderApp.mock.calls[0][0].facilityTabTitle).toBe('Cooling Centers')

    expect(FinderApp.mock.calls[0][0].decorations.length).toBe(2)
    expect(FinderApp.mock.calls[0][0].decorations[0].content).toBe(mockContent)
    expect(FinderApp.mock.calls[0][0].decorations[1]).toBe(decorations)

    expect(FinderApp.mock.calls[0][0].geoclientUrl).toBe(coolingCenter.GEOCLIENT_URL)
    expect(FinderApp.mock.calls[0][0].directionsUrl).toBe(coolingCenter.DIRECTIONS_URL)

    expect(App.prototype.constructIconUrl).toHaveBeenCalledTimes(0)
    expect(App.prototype.fetchIconUrl).toHaveBeenCalledTimes(0)

  })
})

describe('constructIconUrl', () => {
  test('constructIconUrl', () => {
    expect.assertions(1)
    let arcGisUrl = 'http://cc-endpoint/query?param1=value1&param2=value2&token=tokenvalue'
    
    let app = new App(mockContent)
    app.constructIconUrl = constructIconUrl

    expect(app.constructIconUrl(arcGisUrl)).toBe('http://cc-endpoint/?f=pjson&token=tokenvalue')
  })
})

describe('fetchIconUrl', () => {
  const fetch = IconArcGis.fetch
  const setSource = Layer.prototype.setSource
  const arcGisUrl = 'http://cc-endpoint/'

  beforeEach(() => {
    Layer.prototype.setSource = jest.fn()
    IconArcGis.fetch = jest.fn().mockImplementation((arcGisUrl) => {
      return new Promise((resolve, reject)=>{
        resolve(new IconArcGis())
      })
    })
  })
  afterEach(() => {
    IconArcGis.fetch = fetch
    Layer.prototype.setSource = setSource
  })
  
  test('fetchIconUrl', done => {
    expect.assertions(6)
    let app = new App(mockContent)
    app.layer = new Layer()

    app.fetchIconUrl = fetchIconUrl

    app.fetchIconUrl(arcGisUrl)

    setTimeout(() => {
      expect(IconArcGis.fetch).toHaveBeenCalledTimes(1)
      expect(IconArcGis.fetch.mock.calls[0][0]).toBe(arcGisUrl)
      expect(facilityStyle.iconArcGis).not.toBeNull()
      expect(Layer.prototype.setSource).toHaveBeenCalledTimes(2)
      expect(Layer.prototype.setSource.mock.calls[0][0] instanceof Source).toBe(true)
      expect(Layer.prototype.setSource.mock.calls[1][0]).toBe(app.source)
      done()
    }, 100)
  })
})