/**
 * @module cooling-center/App
 */

import $ from 'jquery'
import coolingCenter from './coolingCenter'
import FinderApp from 'nyc-lib/nyc/ol/FinderApp'
import GeoJson from 'ol/format/GeoJSON'
import CsvPoint from 'nyc-lib/nyc/ol/format/CsvPoint'
import decorations from './decorations'
import facilityStyle from './facility-style'
import Source from 'ol/source/Vector'
import IconArcGis from 'nyc-lib/nyc/ol/style/IconArcGis'
import Translate from 'nyc-lib/nyc/lang/Translate'
import message from './message'


class App extends FinderApp {
  /**
   * @desc Create an instance of App
   * @public
   * @constructor
   * @param {module:nyc-lib/nyc/Content~Content} content The cc content
   * @param {string} url The cc data URL
   * @param {boolean} hasBeenRefreshed Has the page automatically refreshed 
   */
  constructor(content, hasBeenRefreshed) {
    let format
    const arcGisUrl = content.message('cc_url')
    let url = arcGisUrl
    if (url === '') {
      url = coolingCenter.CENTER_CSV_URL
      format = new CsvPoint({
        x: 'X',
        y: 'Y',
        dataProjection: 'EPSG:2263'
      })
    } else {
      format = new GeoJson({
        dataProjection: 'EPSG:2263',
        featureProjection: 'EPSG:3857'
      })
    }
    const splashOptions = hasBeenRefreshed ? undefined : {
      message: 'Splash Message',
      buttonText: ['Screen reader instructions', 'View map to find your closest Cooling Center']
    }
    super({
      title: 'Cooling Center Finder',
      splashOptions: splashOptions,
      facilityFormat: format,
      facilityStyle: facilityStyle.pointStyle,
      decorations: [{content, facilityStyle}, decorations],
      facilityUrl: url,
      facilityTabTitle: 'Cooling Centers',
      facilitySearch: { displayField: 'search_label', nameField: 'name' },
      geoclientUrl: coolingCenter.GEOCLIENT_URL,
      directionsUrl: coolingCenter.DIRECTIONS_URL,
      filterChoiceOptions: [
        {
          title: 'Facility Type',
          radio: false,
          choices: [
            {name: 'FACILITY_TYPE', values: ['Community Center'], label: '<span class=legend_comm>Community Center</span>', checked: true},
            {name: 'FACILITY_TYPE', values: ['Senior Center'], label: '<span class=legend_senior>Senior Center</span>', checked: true},
            {name: 'FACILITY_TYPE', values: ['Cornerstone Program'], label: 'Cornerstone Programs', checked: true},
            {name: 'FACILITY_TYPE', values: ['Library'], label: 'Libraries', checked: true},
            {name: 'FACILITY_TYPE', values: ['School'], label: 'Schools', checked: true}
          ]
        },
        {
          title: 'Wheelchair Accessible',
          radio: true,
          choices: [
            {name: 'HANDICAP_ACCESS', values: ['Yes', 'No'], label: 'All', checked: true},
            {name: 'HANDICAP_ACCESS', values: ['Yes'], label: ' Accessible'}
          ]
        }
      ],
    })
    this.facilityStyle = facilityStyle
    this.addDescription()
    if(arcGisUrl) {
      let iconurl = this.constructIconUrl(arcGisUrl)
      this.fetchIconUrl(iconurl)
    }
    else {
      this.filterIcons()
    }
    $('.desc').append($('.filter-chc-1'))
    $('.filter-1').remove()
  }
  translateBtn(options) {
    window.translateBtn = new Translate({
      target: '#map',
      languages: message.languages,
      messages: message.messages,
      button: true
    })
  }
  filterIconsUrl() {
    const renderer = this.facilityStyle.iconArcGis.renderer
    const filter = this.filters.choiceControls[0]
    const labels = filter.find('label')
    filter.choices.forEach((ch, i) => {
      renderer.uniqueValueInfos.forEach(info => {
        if (`${ch.values[0]},No` === info.value) {
          const sym = info.symbol
          $(labels[i]).prepend(`<img src="data:${sym.contentType};base64,${sym.imageData}">`)
        }
      })
    })
  }
  filterIcons() {
    const filter = this.filters.choiceControls[0]
    const labels = filter.find('label')
    filter.choices.forEach((ch, i) => {
      let type = ch.values[0].replace(/ /g, '-').toLowerCase()
      const iconDiv = $(`<div class="cc-icon ${type}"></div>`)
      $(labels[i]).prepend(iconDiv)
    })
  }
  constructIconUrl(arcGisUrl) {
      let qstr = arcGisUrl.split('?')[1]
      let params = {}
      qstr.split('&').forEach(param => {
        const p = param.split('=')
        params[p[0]] = p[1]
      })
      let iconurl = arcGisUrl.split('?')[0].replace(/query/, '').concat(`?f=pjson&token=${params.token}`)
      return iconurl
  }
  fetchIconUrl(iconurl) {
    IconArcGis.fetch(iconurl).then(iconArcGis => {
      facilityStyle.iconArcGis = iconArcGis
      this.layer.setSource(new Source({}))
      this.layer.setSource(this.source)
      this.resetList()
      this.filterIconsUrl()
    })
  }
  addDescription() {
    let list = $('#facilities .list') 
    let desc = coolingCenter.DESCRIPTION_HTML
    let description = `<div class="description"><div class="panel_note desc">${desc}</div></div>`
    $(description).insertBefore(list)
  }
}
export default App