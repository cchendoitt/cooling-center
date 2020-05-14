import decorations from '../src/js/decorations'
import Olfeature from 'ol/feature'
import {center1} from './features.mock'
import nyc from 'nyc-lib/nyc'
import facilityStyle from '../src/js/facility-style'
import { translate } from 'ol/transform'
import { closestOnCircle } from 'ol/coordinate'


describe('decorations', () => {
  let container
  beforeEach(() => {
    $.resetMocks()
    container = $('<div></div>')
    $('body').append(container)
  })
  afterEach(() => {
    container.remove()
    jest.resetModules()
  })
  test('extendfeature', () => {
    center1.extendFeature()
    expect.assertions(3)
    
    expect(center1.getId()).toBe(center1.get('OBJECTID'))
    expect(center1.get('search_label')).not.toBeNull()
    expect(center1.get('search_label')).toBe(`<b><span class="srch-lbl-lg">${center1.get('FACILITY_NAME')}</span></b><br>
      <span class="srch-lbl-sm">${center1.get('ADDRESS')}</span>`)
    
  })
  test('cssClass', () => {
    expect.assertions(1)
    expect(center1.cssClass()).toBe('library-yes')
  })
  test('cssClass - does replacement', () => {
    expect.assertions(1)
    center1.set('FACILITY_TYPE', 'type with spaces')
    expect(center1.cssClass()).toBe('type-with-spaces-yes')
    center1.set('FACILITY_TYPE', 'Library')
  })
  test('getAccessible', () => {
    expect.assertions(2)
    expect(center1.getAccessible()).toBe(`${center1.get('HANDICAP_ACCESS')}`)
    expect(center1.getAccessible()).not.toBeNull()
  })
  test('getAddress1', () => {
    expect.assertions(2)
    expect(center1.getAddress1()).toBe(`${center1.get('ADDRESS')}`)
    expect(center1.getAddress1()).not.toBeNull()
  })
  test('getBorough', () => {
    expect.assertions(2)
    expect(center1.getBorough()).toBe(`${center1.get('BOROUGH')}`)
    expect(center1.getBorough()).not.toBeNull()
  })
  test('getCityStateZip', () => {
    expect.assertions(2)
    expect(center1.getCityStateZip()).toBe(`${center1.get('BOROUGH')}, NY ${center1.get('ZIP_CODE')}`)
    expect(center1.getCityStateZip()).not.toBeNull()
  })
  test('getHours', () => {
    expect.assertions(2)
    expect(center1.getHours()).toBe(`${center1.get('HOURS')}`)
    expect(center1.getHours()).not.toBeNull()
  })
  test('getExHours', () => {
    expect.assertions(2)
    expect(center1.getExHours()).toBe(`${center1.get('EXTENDED_HOURS')}`)
    expect(center1.getExHours()).not.toBeNull()
  })
  test('getName', () => {
    expect.assertions(2)
    expect(center1.getName()).toBe(`${center1.get('FACILITY_NAME')}`)
    expect(center1.getName()).not.toBeNull()
  })
  describe('getIcon', () => {
    const iconArcGis = facilityStyle.iconArcGis
    const iconClass = center1.iconClass()
    beforeEach(() => {
      facilityStyle.iconArcGis = iconArcGis
      center1.iconClass = jest.fn(() => {return 'mock-icon'})
    })
    afterEach(() => {
      facilityStyle.iconArcGis = iconArcGis
      center1.iconClass = iconClass
    })
    test('getIcon - no img', () => {
      expect.assertions(2)
      let mockIcon = {
        style: () => {
          return {
            getImage: () => {
              return undefined
            }
          }
        }
      }
      facilityStyle.iconArcGis = mockIcon
      expect(center1.getIcon()).toBe('mock-icon')
      expect(center1.iconClass).toHaveBeenCalledTimes(1)
    })
    test('getIcon - w/ img src', () => {
      expect.assertions(2)
      let mockIcon = {
        style: () => {
          return {
            getImage: () => {
              return {
                getSrc: jest.fn(() => {return 'mock-src'})
              }
            }
          }
        }
      }
      facilityStyle.iconArcGis = mockIcon
      expect(center1.getIcon()).toEqual($('<div class="icon"><img src="mock-src"></img></div>'))
      expect(center1.getName()).not.toBeNull()
    })
    test('getIcon - no img src', () => {
      expect.assertions(2)
      let mockIcon = {
        style: () => {
          return {
            getImage: () => {
              return {
                getSrc: jest.fn()
              }
            }
          }
        }
      }
      facilityStyle.iconArcGis = mockIcon
      expect(center1.getIcon()).toBe('mock-icon')
      expect(center1.iconClass).toHaveBeenCalledTimes(1)
    })
  })
  describe('nameHtml', () => {
    const getIcon = center1.getIcon()
    const getName = center1.getName()
    beforeEach(() => {
      center1.getIcon = jest.fn(() => {return '<img>mock-icon</img>'})
      center1.getName = jest.fn(() => {return 'mock-name'})
    })
    afterEach(() => {
      center1.getIcon = getIcon
      center1.getName = getName
    })
    test('nameHtml', () => {
      let html = $('<h3 class="name" translate="no" notranslate></h3>')
      .append(center1.getIcon())
      .append(center1.getName())

      expect(center1.nameHtml()).toEqual(html)
    }) 
  })
 
  test('getPhone', () => {
    expect.assertions(2)
    expect(center1.getPhone()).toBe(`${center1.get('PHONE')}`)
    expect(center1.getPhone()).not.toBeNull()
  })
  test('getStatus', () => {
    expect.assertions(2)
    expect(center1.getStatus()).toBe(`${center1.get('STATUS')}`)
    expect(center1.getStatus()).not.toBeNull()
  })
  test('getType', () => {
    expect.assertions(2)
    expect(center1.getType()).toBe(`${center1.get('FACILITY_TYPE')}`)
    expect(center1.getType()).not.toBeNull()
  })
  test('getZip', () => {
    expect.assertions(2)
    expect(center1.getZip()).toBe(`${center1.get('ZIP_CODE')}`)
    expect(center1.getZip()).not.toBeNull()
  })

  
  // Only OPEN centers will be displayed 
  describe ('detailsHtml', () => {
    beforeEach(() => {
      global.translateBtn = {}
      translateBtn.lang = jest.fn(() => {return 'en'})
      translateBtn.messages = {'en': {'pop_type' : center1.getType()}};
    })
    
    afterEach(() => {
      delete global.translate
    })
    test('detailsHtml - status OPEN', () => {
      expect.assertions(1)
      expect(center1.getStatus()).toBe('OPEN')
      expect(center1.detailsHtml().html()).toBe('<ul><li><b>Facility Type: </b>Library</li><li><b>Address: </b>4790 Broadway</li><li><b>Phone: </b>(212)942-2445</li><li><b>Hours: </b>HOURS</li><li><b>Extended Hours: </b>No</li><li><b>Wheelchair Accessible: </b>Yes</li></ul>')
    })
  })

  describe.only('iconClass', () => {
    const typesMap = Object.entries(facilityStyle.FACILITY_TYPE)
    const iconClass = center1.iconClass
    beforeEach(() => {
      center1.iconClass = iconClass
    })
    afterEach(() => {
      center1.set('HANDICAP_ACCESS', 'Yes')
      center1.set('FACILITY_TYPE', 'Library')
    })
    test('iconClass - accessible', () => {
      center1.set('HANDICAP_ACCESS', 'Yes')
      typesMap.forEach((obj) => {
        let type = obj[0].replace(/ /g, '-').toLowerCase()
        let color = obj[1]
        center1.set('FACILITY_TYPE', obj[0])
        expect(center1.iconClass()).toEqual($(`<div class="cc-icon ${type} accessible"></div>`))
      })
    })
    test('iconClass - accessible', () => {
      center1.set('HANDICAP_ACCESS', 'Yes')
      center1.set('FACILITY_TYPE', 'random-type')
      expect(center1.iconClass()).toEqual($(`<div class="cc-icon default accessible"></div>`))
    })
    test('iconClass - not accessible', () => {
      center1.set('HANDICAP_ACCESS', 'No')
        typesMap.forEach((obj) => {
          let type = obj[0].replace(/ /g, '-').toLowerCase()
          let color = obj[1]
          center1.set('FACILITY_TYPE', obj[0])
          expect(center1.iconClass()).toEqual($(`<div class="cc-icon ${type} not-accessible"></div>`))
        })
      })
    })
  })