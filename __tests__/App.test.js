import $ from 'jquery'
import coolingCenter from '../src/js/coolingCenter'
import FinderApp from 'nyc-lib/nyc/ol/FinderApp'
import App from '../src/js/App';
import decorations from '../src/js/decorations'
import CsvPoint from 'nyc-lib/nyc/ol/format/CsvPoint'

jest.mock('nyc-lib/nyc/ol/FinderApp')
jest.mock('nyc-lib/nyc/ol/format/CsvPoint')


describe('constructor', () => {
  test('constructor', () => {
    const app = new App()

    expect(app instanceof FinderApp).toBe(true)
    expect(FinderApp).toHaveBeenCalledTimes(1)

    expect(FinderApp.mock.calls[0][0].title).toBe('Cooling Center Finder')
    expect(FinderApp.mock.calls[0][0].splashOptions.message).toBe('Splash Message')
    expect(FinderApp.mock.calls[0][0].splashOptions.buttonText).toEqual(['Screen reader instructions', 'View map to find your closest Cooling Center'])
    expect(FinderApp.mock.calls[0][0].facilityUrl).toBe('data/center.csv')

    expect(CsvPoint).toHaveBeenCalledTimes(1)
    expect(CsvPoint.mock.calls[0][0].x).toBe('X')
    expect(CsvPoint.mock.calls[0][0].y).toBe('Y')    
    expect(CsvPoint.mock.calls[0][0].dataProjection).toBe('EPSG:2263')
    
    expect(FinderApp.mock.calls[0][0].facilityTabTitle).toBe('Cooling Centers')

    expect(FinderApp.mock.calls[0][0].decorations).toBe(decorations)

    expect(FinderApp.mock.calls[0][0].geoclientUrl).toBe(coolingCenter.GEOCLIENT_URL)
    expect(FinderApp.mock.calls[0][0].directionsUrl).toBe(coolingCenter.DIRECTIONS_URL)

  })
})
