import $ from 'jquery'
import coolingCenter from '../src/js/coolingCenter'
import decorations from '../src/js/decorations'
import FinderApp from 'nyc-lib/nyc/ol/FinderApp'
import App from '../src/js/App';
import GeoJson from 'ol/format/GeoJSON'
import CsvPoint from 'nyc-lib/nyc/ol/format/CsvPoint'

jest.mock('nyc-lib/nyc/ol/FinderApp')
jest.mock('nyc-lib/nyc/ol/format/CsvPoint')
jest.mock('ol/format/GeoJSON')


const mockContent = {
  messages: {
    cc_url: 'http://cc-endpoint'
  },
  message: (key) => {
    return mockContent.messages[key]
  }
}

beforeEach(() => {
  FinderApp.mockClear()
  CsvPoint.mockClear()
  GeoJson.mockClear()
})

describe('constructor', () => {
  test('constructor - data as service url', () => {
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

    expect(FinderApp.mock.calls[0][0].decorations).toBe(decorations)

    expect(FinderApp.mock.calls[0][0].geoclientUrl).toBe(coolingCenter.GEOCLIENT_URL)
    expect(FinderApp.mock.calls[0][0].directionsUrl).toBe(coolingCenter.DIRECTIONS_URL)

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
    expect(CsvPoint.mock.calls[0][0].x).toBe('x')
    expect(CsvPoint.mock.calls[0][0].y).toBe('y')    
    expect(CsvPoint.mock.calls[0][0].dataProjection).toBe('EPSG:2263')
    
    expect(FinderApp.mock.calls[0][0].facilityTabTitle).toBe('Cooling Centers')

    expect(FinderApp.mock.calls[0][0].decorations).toBe(decorations)

    expect(FinderApp.mock.calls[0][0].geoclientUrl).toBe(coolingCenter.GEOCLIENT_URL)
    expect(FinderApp.mock.calls[0][0].directionsUrl).toBe(coolingCenter.DIRECTIONS_URL)

  })
})
