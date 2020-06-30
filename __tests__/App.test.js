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
import Filters from 'nyc-lib/nyc/ol/Filters'
import Translate from 'nyc-lib/nyc/lang/Translate'
import message from '../src/js/message'
import nyc from 'nyc-lib/nyc'

jest.mock('nyc-lib/nyc/ol/FinderApp')
jest.mock('nyc-lib/nyc/ol/format/CsvPoint')
jest.mock('nyc-lib/nyc/lang/Translate')
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
const addDescription = App.prototype.addDescription
const addLangClasses = App.prototype.addLangClasses
const constructIconUrl = App.prototype.constructIconUrl
const fetchIconUrl = App.prototype.fetchIconUrl
const filterIconsUrl = App.prototype.filterIconsUrl
const cacheBust = nyc.cacheBust

beforeEach(() => {
  nyc.cacheBust = jest.fn(() => {
    return 'cache-bust'
  })
  FinderApp.mockClear()
  CsvPoint.mockClear()
  Translate.mockClear()
  GeoJson.mockClear()
  IconArcGis.mockClear()
  App.prototype.addDescription = jest.fn()
  App.prototype.addLangClasses = jest.fn()
  App.prototype.constructIconUrl = jest.fn()
  App.prototype.fetchIconUrl = jest.fn()
  App.prototype.filterIconsUrl = jest.fn()

})

afterEach(() => {
  nyc.cacheBust = cacheBust
  App.prototype.constructIconUrl = constructIconUrl
  App.prototype.fetchIconUrl = fetchIconUrl
  App.prototype.filterIconsUrl = filterIconsUrl

})

describe('constructor', () => {
  test('constructor - data as service url', () => {
    expect.assertions(46)

    mockContent.messages.cc_url = 'http://cc-endpoint'
    const app = new App(mockContent)

    expect(app instanceof FinderApp).toBe(true)
    expect(FinderApp).toHaveBeenCalledTimes(1)

    expect(FinderApp.mock.calls[0][0].title).toBe('<span class=cc_title>Cooling Center Finder</span>')
    expect(FinderApp.mock.calls[0][0].facilityUrl).toBe('http://cc-endpoint')

    expect(GeoJson).toHaveBeenCalledTimes(1)
    expect(GeoJson.mock.calls[0][0].dataProjection).toBe('EPSG:2263')
    expect(GeoJson.mock.calls[0][0].featureProjection).toBe('EPSG:3857')
    
    expect(FinderApp.mock.calls[0][0].facilityTabTitle).toBe('<span class=btn_cooling_centers>Cooling Centers</span>')

    expect(FinderApp.mock.calls[0][0].decorations.length).toBe(2)
    expect(FinderApp.mock.calls[0][0].decorations[0].content).toBe(mockContent)
    expect(FinderApp.mock.calls[0][0].decorations[0].facilityStyle).toBe(facilityStyle)
    expect(FinderApp.mock.calls[0][0].decorations[1]).toBe(decorations.decorations)

    expect(FinderApp.mock.calls[0][0].geoclientUrl).toBe(coolingCenter.GEOCLIENT_URL)
    expect(FinderApp.mock.calls[0][0].directionsUrl).toBe(coolingCenter.DIRECTIONS_URL)

    expect(FinderApp.mock.calls[0][0].filterChoiceOptions.length).toBe(2)
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].title).toBe('<span class=pop_type>Facility Type</span>')
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices.length).toBe(6)

    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[0].name).toBe('FACILITY_TYPE')
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[0].values).toEqual(['Community center'])
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[0].label).toBe('<span class=legend_comm>Community Center</span>')
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[0].checked).toBe(true)

    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[1].name).toBe('FACILITY_TYPE')
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[1].values).toEqual(['Senior center'])
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[1].label).toBe('<span class=legend_senior>Senior Center</span>')
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[1].checked).toBe(true)

    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[2].name).toBe('FACILITY_TYPE')
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[2].values).toEqual(['Cornerstone Program'])
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[2].label).toBe('<span class=legend_cornerstone>Cornerstone Program</span>')
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[2].checked).toBe(true)

    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[3].name).toBe('FACILITY_TYPE')
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[3].values).toEqual(['Library'])
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[3].label).toBe('<span class=legend_library>Library</span>')
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[3].checked).toBe(true)
    
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[4].name).toBe('FACILITY_TYPE')
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[4].values).toEqual(['School'])
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[4].label).toBe('<span class=legend_school>School</span>')
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[4].checked).toBe(true)

    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[5].name).toBe('FACILITY_TYPE')
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[5].values).toEqual(['Other'])
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[5].label).toBe('<span class=legend_other>Other</span>')
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[5].checked).toBe(true)

    expect(App.prototype.addDescription).toHaveBeenCalledTimes(1)
    expect(App.prototype.addLangClasses).toHaveBeenCalledTimes(1)
    expect(App.prototype.constructIconUrl).toHaveBeenCalledTimes(1)
    expect(App.prototype.constructIconUrl.mock.calls[0][0]).toBe('http://cc-endpoint')
    expect(App.prototype.fetchIconUrl).toHaveBeenCalledTimes(1)
  })
  test('constructor - page refresh enabled', () => {
    const app = new App(mockContent, true)
    expect(FinderApp.mock.calls[0][0].splashOptions).toBeUndefined()
  })
  test('constructor - data as csv', () => {
    expect.assertions(47)

    mockContent.messages.cc_url = ''
    
    const app = new App(mockContent)

    expect(app instanceof FinderApp).toBe(true)
    expect(FinderApp).toHaveBeenCalledTimes(1)

    expect(FinderApp.mock.calls[0][0].title).toBe('<span class=cc_title>Cooling Center Finder</span>')
    expect(FinderApp.mock.calls[0][0].facilityUrl).toBe(`${coolingCenter.CENTER_UPLOADER_URL}?cache-bust`)

    expect(CsvPoint).toHaveBeenCalledTimes(1)
    expect(CsvPoint.mock.calls[0][0].x).toBe('X')
    expect(CsvPoint.mock.calls[0][0].y).toBe('Y')    
    expect(CsvPoint.mock.calls[0][0].dataProjection).toBe('EPSG:2263')
    
    expect(FinderApp.mock.calls[0][0].facilityTabTitle).toBe('<span class=btn_cooling_centers>Cooling Centers</span>')

    expect(FinderApp.mock.calls[0][0].decorations.length).toBe(2)
    expect(FinderApp.mock.calls[0][0].decorations[0].content).toBe(mockContent)
    expect(FinderApp.mock.calls[0][0].decorations[0].facilityStyle).toBe(facilityStyle)
    expect(FinderApp.mock.calls[0][0].decorations[1]).toBe(decorations.decorations)

    expect(FinderApp.mock.calls[0][0].geoclientUrl).toBe(coolingCenter.GEOCLIENT_URL)
    expect(FinderApp.mock.calls[0][0].directionsUrl).toBe(coolingCenter.DIRECTIONS_URL)

    expect(FinderApp.mock.calls[0][0].filterChoiceOptions.length).toBe(2)
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].title).toBe('<span class=pop_type>Facility Type</span>')
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices.length).toBe(6)

    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[0].name).toBe('FACILITY_TYPE')
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[0].values).toEqual(['Community center'])
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[0].label).toBe('<span class=legend_comm>Community Center</span>')
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[0].checked).toBe(true)

    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[1].name).toBe('FACILITY_TYPE')
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[1].values).toEqual(['Senior center'])
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[1].label).toBe('<span class=legend_senior>Senior Center</span>')
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[1].checked).toBe(true)

    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[2].name).toBe('FACILITY_TYPE')
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[2].values).toEqual(['Cornerstone Program'])
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[2].label).toBe('<span class=legend_cornerstone>Cornerstone Program</span>')
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[2].checked).toBe(true)

    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[3].name).toBe('FACILITY_TYPE')
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[3].values).toEqual(['Library'])
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[3].label).toBe('<span class=legend_library>Library</span>')
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[3].checked).toBe(true)

    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[4].name).toBe('FACILITY_TYPE')
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[4].values).toEqual(['School'])
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[4].label).toBe('<span class=legend_school>School</span>')
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[4].checked).toBe(true)

    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[5].name).toBe('FACILITY_TYPE')
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[5].values).toEqual(['Other'])
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[5].label).toBe('<span class=legend_other>Other</span>')
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[5].checked).toBe(true)

    expect(App.prototype.addDescription).toHaveBeenCalledTimes(1)
    expect(App.prototype.addLangClasses).toHaveBeenCalledTimes(1)
    expect(App.prototype.constructIconUrl).toHaveBeenCalledTimes(0)
    expect(App.prototype.fetchIconUrl).toHaveBeenCalledTimes(0)
    expect(App.prototype.filterIconsUrl).toHaveBeenCalledTimes(0)

  })
})

describe('addDescription', () => {
  let list
  beforeEach(() => {
    list = $('<div id="facilities"><div class="list"></div></div>')
    $('body').append(list)
  })
  afterEach(() => {
    list.remove()
  })

  test('addDescription', () => {
    const app = new App(mockContent)
    app.addDescription = addDescription
    app.addDescription()

    expect($('#facilities .list').prev()[0]).not.toBe(undefined)
    expect($('div.description')).toEqual($(`<div class="description"><div class="desc"><div class="panel_note">${coolingCenter.DESCRIPTION_HTML}</div></div></div>`))

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
    expect.assertions(7)
    const app = new App(mockContent)
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
      expect(App.prototype.filterIconsUrl).toHaveBeenCalledTimes(1)
      done()
    }, 100)
  })
})
describe('filterIconsUrl', () => {
  const target = $('<div></div>')
  const filterOptions = {
    target,
    choiceOptions: [
      {
        title: 'Facility Type',
        radio: false,
        choices: [
          {name: 'FACILITY_TYPE', values: ['Community center'], label: 'Community Center', checked: true},
          {name: 'FACILITY_TYPE', values: ['Senior center'], label: 'Senior Center', checked: true},
          {name: 'FACILITY_TYPE', values: ['Cornerstone Program'], label: 'Cornerstone Program', checked: true},
          {name: 'FACILITY_TYPE', values: ['Library'], label: 'Library', checked: true},
          {name: 'FACILITY_TYPE', values: ['School'], label: 'School', checked: true}
        ]
      }
    ]
  }
  beforeEach(() => {
    $('body').append(target)
  })
  afterEach(() => {
    target.remove()
  })

  test('filterIconsUrl', () => {
    expect.assertions(5)
    
    const app = new App(mockContent)  

    app.filterIconsUrl = filterIconsUrl
    app.facilityStyle = {iconArcGis: {renderer: require('../src/js/iconStyle').default}}
    app.filters = new Filters(filterOptions)
    
    app.filterIconsUrl()
  
    const filter = app.filters.choiceControls[0]
    const renderer = app.facilityStyle.iconArcGis.renderer
    const labels = filter.find('label')

    filter.choices.forEach((ch, i) => {
      renderer.uniqueValueInfos.forEach(info => {
        if (`${ch.values[0]},No` === info.value) {
          const sym = info.symbol
          const img = $(labels[i]).children().first()
          expect(img.attr('src')).toBe(`data:${sym.contentType};base64,${sym.imageData}`)
        }
      })
    })
  
  })
})
describe('addLangClasses', () => {
  const target = $('<div></div>')
  const filterOptions ={
    target,
    choiceOptions: [
      {
        title: 'Sample filter',
        radio: true,
        choices: []
      },
      {
        title: 'Wheelchair Accessible',
        radio: true,
        choices: [
          {name: 'HANDICAP_ACCESS', values: ['Yes', 'No'], label: 'All Centers', checked: true},
          {name: 'HANDICAP_ACCESS', values: ['Yes'], label: ' Accessible Only'}
        ]
      }
    ]
  }
  beforeEach(() => {
    $('body').append(target)
  })
  afterEach(() => {
    target.remove()
  })
  test('addLangClasses', () => {
    expect.assertions(2)

    const app = new App(mockContent) 

    app.addLangClasses = addLangClasses

    app.filters = new Filters(filterOptions)
    const filter = app.filters.choiceControls[1]
    app.addLangClasses()
    const labels = filter.find('label')

    expect($(labels[1]).hasClass('acc_only')).toBe(true)
    expect($(labels[0]).hasClass('acc_all')).toBe(true)
  })
})

test('translateBtn', () => {
  expect.assertions(6)

  const app = new App(mockContent)  

  expect(Translate).toHaveBeenCalledTimes(0)

  app.translateBtn()

  expect(Translate).toHaveBeenCalledTimes(1)
  expect(Translate.mock.calls[0][0].target).toBe('body')
  expect(Translate.mock.calls[0][0].languages).toBe(message.languages)
  expect(Translate.mock.calls[0][0].messages).toBe(message.messages)
  expect(Translate.mock.calls[0][0].button).toBe(true)
})

test('ready', () => {
  expect.assertions(5)

  decorations.closedFeatures = ['closed1', 'closed2']

  const app = new App(mockContent)
  app.source = {
    removeFeature: jest.fn(),
    getFeatures: jest.fn().mockImplementation(() => {
      return 'mock-features'
    })
  }

  app.ready()

  expect(app.source.removeFeature).toHaveBeenCalledTimes(2)
  expect(app.source.removeFeature.mock.calls[0][0]).toBe('closed1')
  expect(app.source.removeFeature.mock.calls[1][0]).toBe('closed2')
  expect(FinderApp.prototype.ready).toHaveBeenCalledTimes(1)
  expect(FinderApp.prototype.ready.mock.calls[0][0]).toBe('mock-features')
})