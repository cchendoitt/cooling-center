import decorations from '../src/js/decorations'
import OlFeature from 'ol/Feature'
import {feature} from './features.mock'
import nyc from 'nyc-lib/nyc'

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
  test('extendFeature', () => {
    expect.assertions(3)
    feature.extendFeature()

    expect(feature.getId()).toBe(feature.get('OBJECTID'))
    expect(feature.get('search_label')).not.toBeNull()
    expect(feature.get('search_label')).toBe(`<b><span class="srch-lbl-lg">${feature.get('FACILITY_NAME')}</span></b><br>
      <span class="srch-lbl-sm">${feature.get('ADDRESS')}</span>`)
    
  })
  test('getAccessible', () => {
    expect.assertions(2)
    expect(feature.getAccessible()).toBe(`${feature.get('HANDICAP_ACCESS')}`)
    expect(feature.getAccessible()).not.toBeNull()
  })
  test('getAddress1', () => {
    expect.assertions(2)
    expect(feature.getAddress1()).toBe(`${feature.get('ADDRESS')}`)
    expect(feature.getAddress1()).not.toBeNull()
  })
  test('getCityStateZip', () => {
    expect.assertions(1)
    expect(feature.getCityStateZip()).toBe("")
  })
  test('getHours', () => {
    expect.assertions(2)
    expect(feature.getHours()).toBe(`${feature.get('HOURS')}`)
    expect(feature.getHours()).not.toBeNull()
  })
  test('getExHours', () => {
    expect.assertions(2)
    expect(feature.getExHours()).toBe(`${feature.get('EXTENDED_HOURS')}`)
    expect(feature.getExHours()).not.toBeNull()
  })
  test('getName', () => {
    expect.assertions(2)
    expect(feature.getName()).toBe(`${feature.get('FACILITY_NAME')}`)
    expect(feature.getName()).not.toBeNull()
  })
  test('getPhone', () => {
    expect.assertions(2)
    expect(feature.getPhone()).toBe(`${feature.get('PHONE')}`)
    expect(feature.getPhone()).not.toBeNull()
  })
  test('getStatus', () => {
    expect.assertions(2)
    expect(feature.getStatus()).toBe(`${feature.get('STATUS')}`)
    expect(feature.getStatus()).not.toBeNull()
  })
  test('getType', () => {
    expect.assertions(2)
    expect(feature.getType()).toBe(`${feature.get('FACILITY_TYPE')}`)
    expect(feature.getType()).not.toBeNull()
  })
  test('getZip', () => {
    expect.assertions(2)
    expect(feature.getZip()).toBe(`${feature.get('ZIP_CODE')}`)
    expect(feature.getZip()).not.toBeNull()
  })
  test('detailsHtml', () => {
    expect.assertions(0)
    /* TODO */
  })

})