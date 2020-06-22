import decorations from '../src/js/decorations'
import Olfeature from 'ol/feature'
import {center1, center2} from './features.mock'
import nyc from 'nyc-lib/nyc'
import facilityStyle from '../src/js/facility-style'
import { translate } from 'ol/transform'
import { closestOnCircle } from 'ol/coordinate'
import Collapsible from 'nyc-lib/nyc/Collapsible'
import EventHandling from 'nyc-lib/nyc/EventHandling'

jest.mock('nyc-lib/nyc/Collapsible')

let currentLang = 'en'
beforeEach(() => {
  const transl = new EventHandling()
  transl.defaultLanguage = 'en'
  transl.lang = jest.fn().mockImplementation(() => {
    return currentLang
  })
  global.nycTranslateInstance = transl
})
afterEach(() => {
  global.nycTranslateInstance = undefined
})

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
    expect.assertions(48)

    const hrs = center1.getHours()

    expect($(hrs.rows[0].cells[0]).html()).toBe('Day')
    expect($(hrs.rows[0].cells[0]).hasClass('day')).toBe(true)
    expect($(hrs.rows[0].cells[1]).html()).toBe('Opens')
    expect($(hrs.rows[0].cells[1]).hasClass('opens')).toBe(true)
    expect($(hrs.rows[0].cells[2]).html()).toBe('Closes')
    expect($(hrs.rows[0].cells[2]).hasClass('closes')).toBe(true)

    expect($(hrs.rows[1].cells[0]).html()).toBe('Sunday')
    expect($(hrs.rows[1].cells[0]).hasClass('sunday')).toBe(true)
    expect($(hrs.rows[1].cells[1]).html()).toBe('<span class="closed">Closed</span>')
    expect($(hrs.rows[1].cells[1]).hasClass('op')).toBe(true)
    expect($(hrs.rows[1].cells[2]).html()).toBe('<span class="closed">Closed</span>')
    expect($(hrs.rows[1].cells[2]).hasClass('cl')).toBe(true)

    expect($(hrs.rows[2].cells[0]).html()).toBe('Monday')
    expect($(hrs.rows[2].cells[0]).hasClass('monday')).toBe(true)
    expect($(hrs.rows[2].cells[1]).html()).toBe('6:00 PM')
    expect($(hrs.rows[2].cells[1]).hasClass('op')).toBe(true)
    expect($(hrs.rows[2].cells[2]).html()).toBe('10:00 PM')
    expect($(hrs.rows[2].cells[2]).hasClass('cl')).toBe(true)

    expect($(hrs.rows[3].cells[0]).html()).toBe('Tuesday')
    expect($(hrs.rows[3].cells[0]).hasClass('tuesday')).toBe(true)
    expect($(hrs.rows[3].cells[1]).html()).toBe('6:00 PM')
    expect($(hrs.rows[3].cells[1]).hasClass('op')).toBe(true)
    expect($(hrs.rows[3].cells[2]).html()).toBe('10:00 PM')
    expect($(hrs.rows[3].cells[2]).hasClass('cl')).toBe(true)

    expect($(hrs.rows[4].cells[0]).html()).toBe('Wednesday')
    expect($(hrs.rows[4].cells[0]).hasClass('wednesday')).toBe(true)
    expect($(hrs.rows[4].cells[1]).html()).toBe('6:00 PM')
    expect($(hrs.rows[4].cells[1]).hasClass('op')).toBe(true)
    expect($(hrs.rows[4].cells[2]).html()).toBe('10:00 PM')
    expect($(hrs.rows[4].cells[2]).hasClass('cl')).toBe(true)

    expect($(hrs.rows[5].cells[0]).html()).toBe('Thursday')
    expect($(hrs.rows[5].cells[0]).hasClass('thursday')).toBe(true)
    expect($(hrs.rows[5].cells[1]).html()).toBe('6:00 PM')
    expect($(hrs.rows[5].cells[1]).hasClass('op')).toBe(true)
    expect($(hrs.rows[5].cells[2]).html()).toBe('10:00 PM')
    expect($(hrs.rows[5].cells[2]).hasClass('cl')).toBe(true)

    expect($(hrs.rows[6].cells[0]).html()).toBe('Friday')
    expect($(hrs.rows[6].cells[0]).hasClass('friday')).toBe(true)
    expect($(hrs.rows[6].cells[1]).html()).toBe('6:00 PM')
    expect($(hrs.rows[6].cells[1]).hasClass('op')).toBe(true)
    expect($(hrs.rows[6].cells[2]).html()).toBe('10:00 PM')
    expect($(hrs.rows[6].cells[2]).hasClass('cl')).toBe(true)

    expect($(hrs.rows[7].cells[0]).html()).toBe('Saturday')
    expect($(hrs.rows[7].cells[0]).hasClass('saturday')).toBe(true)
    expect($(hrs.rows[7].cells[1]).html()).toBe('10:00 AM')
    expect($(hrs.rows[7].cells[1]).hasClass('op')).toBe(true)
    expect($(hrs.rows[7].cells[2]).html()).toBe('5:00 PM')
    expect($(hrs.rows[7].cells[2]).hasClass('cl')).toBe(true)

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
      global.nycTranslateInstance.messages = {'en': {'pop_type': 'Facility Type', 'pop_address': 'Address', 'pop_phone': 'Phone', 'pop_hours': 'Hours', 'pop_extended': 'Extended Hours', 'pop_access': 'Wheelchair Accessible'}}
    })

    test('detailsHtml - status OPEN', () => {
      expect.assertions(2)
      expect(center1.getStatus()).toBe('OPEN')
      console.warn(center1.detailsHtml().html());
      expect(center1.detailsHtml().html()).toBe('<ul><li><b><span class="pop_type">Facility Type</span>: </b><span class="legend_library"></span></li><li><b><span class="pop_address">Address</span>: </b><div class="notranslate">4790 Broadway</div></li><li><b><span class="pop_phone">Phone</span>: </b><div class="notranslate">(212)942-2445</div></li><li><b><span class="pop_hours">Hours</span>: </b><table><thead><tr><th class="day">Day</th><th class="opens">Opens</th><th class="closes">Closes</th></tr></thead><tbody><tr><td class="sunday">Sunday</td><td class="op"><span class="closed">Closed</span></td><td class="cl"><span class="closed">Closed</span></td></tr><tr><td class="monday">Monday</td><td class="op">6:00 PM</td><td class="cl">10:00 PM</td></tr><tr><td class="tuesday">Tuesday</td><td class="op">6:00 PM</td><td class="cl">10:00 PM</td></tr><tr><td class="wednesday">Wednesday</td><td class="op">6:00 PM</td><td class="cl">10:00 PM</td></tr><tr><td class="thursday">Thursday</td><td class="op">6:00 PM</td><td class="cl">10:00 PM</td></tr><tr><td class="friday">Friday</td><td class="op">6:00 PM</td><td class="cl">10:00 PM</td></tr><tr><td class="saturday">Saturday</td><td class="op">10:00 AM</td><td class="cl">5:00 PM</td></tr></tbody></table></li><li><b><span class="pop_extended">Extended Hours</span>: </b><span class="msg_no"></span></li><li><b><span class="pop_access">Wheelchair Accessible</span>: </b><span class="msg_yes"></span></li></ul>')
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
        expect(center1.iconClass()).toEqual($(`<div class="ico chc-${type} accessible"></div>`))
      })
    })
    test('iconClass - accessible', () => {
      center1.set('HANDICAP_ACCESS', 'Yes')
      center1.set('FACILITY_TYPE', 'random-type')
      expect(center1.iconClass()).toEqual($(`<div class="ico chc-default accessible"></div>`))
    })
    test('iconClass - not accessible', () => {
      center1.set('HANDICAP_ACCESS', 'No')
        typesMap.forEach((obj) => {
          let type = obj[0].replace(/ /g, '-').toLowerCase()
          let color = obj[1]
          center1.set('FACILITY_TYPE', obj[0])
          expect(center1.iconClass()).toEqual($(`<div class="ico chc-${type} not-accessible"></div>`))
        })
      })
    })
  })