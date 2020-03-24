import {center1} from './features.mock'
import OlStyle from 'ol/style/Style'
import OlStyleIcon from 'ol/style/Icon'
import facilityStyle from '../src/js/facility-style'
import nycOl from 'nyc-lib/nyc/ol'
import App from '../src/js/App'
import IconArcGis from 'nyc-lib/nyc/ol/style/IconArcGis'

jest.mock('nyc-lib/nyc/ol/style/IconArcGis')

const mockContent = {
  messages: {
    cc_url: 'http://cc-endpoint'
  },
  message: (key) => {
    return mockContent.messages[key]
  }
}

describe('pointStyle', () => {
  const calcRadius = facilityStyle.calcRadius
  const iconArcGis = facilityStyle.iconArcGis
  beforeEach(() => {
    $.resetMocks()
    facilityStyle.calcRadius = jest.fn().mockImplementation(() => {
      return 1
    })
    facilityStyle.iconArcGis = {style: jest.fn()}
  })
  afterEach(() => {
    facilityStyle.calcRadius = calcRadius
    facilityStyle.iconArcGis = iconArcGis
  })

  test('pointStyle', () => {
    let style = facilityStyle.pointStyle(center1, 305.748113140705)
    expect(facilityStyle.iconArcGis.style).toHaveBeenCalledTimes(1)
    expect(facilityStyle.iconArcGis.style.mock.calls[0][0]).toBe(center1)
    expect(facilityStyle.iconArcGis.style.mock.calls[0][1]).toBe(2 * facilityStyle.calcRadius.mock.results[0].value)
  })
})

describe('calcRadius', () => {
  test('zoom > 11', () => {
    expect(facilityStyle.calcRadius(12)).toBe(8)
  })

  test('zoom > 13', () => {
    expect(facilityStyle.calcRadius(14)).toBe(12)
  })

  test('zoom > 15', () => {
    expect(facilityStyle.calcRadius(16)).toBe(16)
  })

  test('zoom > 17', () => {
    expect(facilityStyle.calcRadius(18)).toBe(20)
  })

  test('zoom < 11', () => {
    expect(facilityStyle.calcRadius(10)).toBe(6)
  })
})