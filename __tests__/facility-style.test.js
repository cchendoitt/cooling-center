import {center1} from './features.mock'
import Icon from 'ol/style/Icon'
import facilityStyle from '../src/js/facility-style'
import Circle from 'ol/style/Circle'

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
  const defaultStyle = facilityStyle.defaultStyle
  const mockStyle = {
    getImage: () => {return mockStyle}
  }
  beforeEach(() => {
    $.resetMocks()
    facilityStyle.calcRadius = jest.fn().mockImplementation(() => {
      return 1
    })
    facilityStyle.iconArcGis = {style: jest.fn(() => {return mockStyle})}
    facilityStyle.defaultStyle = jest.fn(() => {return 'default-style'})
  })
  afterEach(() => {
    facilityStyle.calcRadius = calcRadius
    facilityStyle.iconArcGis = iconArcGis
    facilityStyle.defaultStyle = defaultStyle

  })

  test('pointStyle w/ iconArcGis', () => {
    expect.assertions(3)
    let style = facilityStyle.pointStyle(center1, 305.748113140705)
    expect(facilityStyle.iconArcGis.style).toHaveBeenCalledTimes(1)
    expect(facilityStyle.iconArcGis.style.mock.calls[0][0]).toBe(center1)
    expect(facilityStyle.iconArcGis.style.mock.calls[0][1]).toBe(2 * facilityStyle.calcRadius.mock.results[0].value)
  })
  test('pointStyle w/ iconArcGis, image is null', () => {
    expect.assertions(5)
    facilityStyle.iconArcGis = {style: jest.fn()}
    let style = facilityStyle.pointStyle(center1, 305.748113140705)
    expect(facilityStyle.defaultStyle).toHaveBeenCalledTimes(1)
    expect(facilityStyle.defaultStyle.mock.calls[0][0]).toBe(center1)
    expect(facilityStyle.defaultStyle.mock.calls[0][1]).toBe(305.748113140705)
    expect(facilityStyle.defaultStyle.mock.calls[0][2]).toBe(facilityStyle.calcRadius.mock.results[0].value)
    expect(style).toBe('default-style')
  })
  test('pointStyle - iconArcGis is null', () => {
    expect.assertions(5)
    facilityStyle.iconArcGis = null
    let style = facilityStyle.pointStyle(center1, 305.748113140705)
    expect(facilityStyle.defaultStyle).toHaveBeenCalledTimes(1)
    expect(facilityStyle.defaultStyle.mock.calls[0][0]).toBe(center1)
    expect(facilityStyle.defaultStyle.mock.calls[0][1]).toBe(305.748113140705)
    expect(facilityStyle.defaultStyle.mock.calls[0][2]).toBe(facilityStyle.calcRadius.mock.results[0].value)
    expect(style).toBe('default-style')
  })
})
describe('defaultStyle', () => {
  afterEach(() => {
    center1.set('FACILITY_TYPE','Library')
    center1.set('HANDICAP_ACCESS','Yes')
  })
  test('defaultStyle - accessible', () => {
    expect.assertions(23)
    let style, typesMap = Object.entries(facilityStyle.FACILITY_TYPE)
    typesMap.forEach((obj) => {
      let type = obj[0]
      let color = obj[1]
      center1.set('FACILITY_TYPE', obj[0])
      style = facilityStyle.defaultStyle(center1, 305.748113140705, 10)
      expect(style[0].getImage() instanceof Circle).toBe(true)
      expect(style[0].getImage().getFill().getColor()).toBe(obj[1])
      expect(style[0].getImage().getStroke().getWidth()).toBe(1)
    })
    expect(style.length).toBe(2)
    expect(style[1].getImage() instanceof Icon).toBe(true)
    expect(style[1].getImage().getSrc()).toBe('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22656%22%20height%3D%22656%22%3E%3Cg%20transform%3D%22translate(-263.86732%2C-69.7075)%22%20style%3D%22fill%3A%23fff%22%3E%3Cpath%20%20d%3D%22M%20833.556%2C367.574%20C%20825.803%2C359.619%20814.97%2C355.419%20803.9%2C356.025%20l%20-133.981%2C7.458%2073.733%2C-83.975%20c%2010.504%2C-11.962%2013.505%2C-27.908%209.444%2C-42.157%20-2.143%2C-9.764%20-8.056%2C-18.648%20-17.14%2C-24.324%20-0.279%2C-0.199%20-176.247%2C-102.423%20-176.247%2C-102.423%20-14.369%2C-8.347%20-32.475%2C-6.508%20-44.875%2C4.552%20l%20-85.958%2C76.676%20c%20-15.837%2C14.126%20-17.224%2C38.416%20-3.097%2C54.254%2014.128%2C15.836%2038.419%2C17.227%2054.255%2C3.096%20l%2065.168%2C-58.131%2053.874%2C31.285%20-95.096%2C108.305%20c%20-39.433%2C6.431%20-74.913%2C24.602%20-102.765%2C50.801%20l%2049.66%2C49.66%20c%2022.449%2C-20.412%2052.256%2C-32.871%2084.918%2C-32.871%2069.667%2C0%20126.346%2C56.68%20126.346%2C126.348%200%2C32.662%20-12.459%2C62.467%20-32.869%2C84.916%20l%2049.657%2C49.66%20c%2033.08%2C-35.166%2053.382%2C-82.484%2053.382%2C-134.576%200%2C-31.035%20-7.205%2C-60.384%20-20.016%2C-86.482%20l%2051.861%2C-2.889%20-12.616%2C154.75%20c%20-1.725%2C21.152%2014.027%2C39.695%2035.18%2C41.422%201.059%2C0.086%202.116%2C0.127%203.163%2C0.127%2019.806%2C0%2036.621%2C-15.219%2038.257%2C-35.306%20l%2016.193%2C-198.685%20c%200.904%2C-11.071%20-3.026%2C-21.989%20-10.775%2C-29.942%20z%22%2F%3E%3Cpath%20%20d%3D%22m%20762.384%2C202.965%20c%2035.523%2C0%2064.317%2C-28.797%2064.317%2C-64.322%200%2C-35.523%20-28.794%2C-64.323%20-64.317%2C-64.323%20-35.527%2C0%20-64.323%2C28.8%20-64.323%2C64.323%200%2C35.525%2028.795%2C64.322%2064.323%2C64.322%20z%22%2F%3E%3Cpath%20d%3D%22m%20535.794%2C650.926%20c%20-69.668%2C0%20-126.348%2C-56.68%20-126.348%2C-126.348%200%2C-26.256%208.056%2C-50.66%2021.817%2C-70.887%20l%20-50.196%2C-50.195%20c%20-26.155%2C33.377%20-41.791%2C75.393%20-41.791%2C121.082%200%2C108.535%2087.983%2C196.517%20196.518%2C196.517%2045.691%2C0%2087.703%2C-15.636%20121.079%2C-41.792%20L%20606.678%2C629.11%20c%20-20.226%2C13.757%20-44.63%2C21.816%20-70.884%2C21.816%20z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')
    expect(style[1].getImage().getSize()).toEqual([656, 656])
    expect(style[1].getImage().getScale()).toBe(10 * 1.5 / 656)

  })
  test('defaultStyle - uses default color if facilityType for feature does not exist in predefined object', () => {
    expect.assertions(3)
    center1.set('FACILITY_TYPE', 'random-type')
    const style = facilityStyle.defaultStyle(center1, 305.748113140705, 10)
    expect(style[0].getImage() instanceof Circle).toBe(true)
    expect(style[0].getImage().getFill().getColor()).toBe(facilityStyle.DEFAULT_COLOR)
    expect(style[0].getImage().getStroke().getWidth()).toBe(1)
  })
  test('defaultStyle - not accessible', () => {
    expect.assertions(19)
    center1.set('HANDICAP_ACCESS', 'No')
    let style, typesMap = Object.entries(facilityStyle.FACILITY_TYPE)
    typesMap.forEach((obj) => {
      let type = obj[0]
      let color = obj[1]
      center1.set('FACILITY_TYPE', type)
      style = facilityStyle.defaultStyle(center1, 305.748113140705, 10)
      expect(style[0].getImage() instanceof Circle).toBe(true)
      expect(style[0].getImage().getFill().getColor()).toBe(color)
      expect(style[0].getImage().getStroke().getWidth()).toBe(1)
    })
    expect(style.length).toBe(1)
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