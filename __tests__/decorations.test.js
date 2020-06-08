import decorations from '../src/js/decorations'
import Olfeature from 'ol/feature'
import {center1, center2} from './features.mock'
import nyc from 'nyc-lib/nyc'
import facilityStyle from '../src/js/facility-style'
import { translate } from 'ol/transform'
import { closestOnCircle } from 'ol/coordinate'
import Collapsible from 'nyc-lib/nyc/Collapsible'

jest.mock('nyc-lib/nyc/Collapsible')

describe('decorations', () => {
  let container
  beforeEach(() => {
    $.resetMocks()
    container = $('<div></div>')
    $('body').append(container)
    Collapsible.mockReset()
  })
  afterEach(() => {
    container.remove()
    jest.resetModules()
  })
  test('extendfeature', () => {
    center1.extendFeature()
    expect.assertions(5)
    
    expect(center1.getId()).toBe(center1.get('OBJECTID'))
    expect(center1.get('search_label')).not.toBeNull()
    expect(center1.get('search_label')).toBe(`<b><span class="srch-lbl-lg">${center1.get('FACILITY_NAME')}</span></b><br>
      <span class="srch-lbl-sm">${center1.get('ADDRESS')}</span>`)
    expect(center2.get('STATUS')).toBe('CLOSED')
    center2.extendFeature()
    expect(decorations.closedFeatures.length).toBe(1)
  })
  describe('addressHtml', () => {
    test('addressHtml', () => {
      const div = $('<div></div>') 
      div.html(center1.addressHtml())
      expect(div.html()).toBe('<div class="addr notranslate"><div class="ln1">4790 Broadway</div><div class="ln3">Manhattan, NY 10034</div></div>')
    })
    test('addressHtml w/ entrance info', () => {
      const div = $('<div></div>') 
      center1.set('Entrance_info', 'entrance info')
      div.html(center1.addressHtml())
      expect(div.html()).toBe('<div class="addr notranslate"><div class="ln1">4790 Broadway</div><div class="ln3">Manhattan, NY 10034</div><div class="ln2">entrance info</div></div>')
    })
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
      global.nycTranslateInstance = {}
      nycTranslateInstance.lang = jest.fn(() => {return 'en'})
      nycTranslateInstance.messages = {'en': {'pop_type': 'Facility Type', 'pop_address': 'Address', 'pop_phone': 'Phone', 'pop_hours': 'Hours', 'pop_extended': 'Extended Hours', 'pop_access': 'Wheelchair Accessible'}}
    })
    
    afterEach(() => {
      delete global.nycTranslateInstance
    })
    test('detailsHtml - status OPEN', () => {
      expect.assertions(2)
      expect(center1.getStatus()).toBe('OPEN')
      expect(center1.detailsHtml().html()).toBe('<ul><li><b><span class="pop_type">Facility Type</span>: </b><span class="legend_library"></span></li><li><b><span class="pop_address">Address</span>: </b><div class="notranslate">4790 Broadway</div></li><li><b><span class="pop_phone">Phone</span>: </b><div class="notranslate">(212)942-2445</div></li><li><b><span class="pop_hours">Hours</span>: </b>HOURS</li><li><b><span class="pop_extended">Extended Hours</span>: </b>No</li><li><b><span class="pop_access">Wheelchair Accessible</span>: </b>Yes</li></ul>')
    })
  })
  describe('iconClass', () => {
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