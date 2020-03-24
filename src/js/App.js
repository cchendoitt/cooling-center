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
import iconStyle from './iconStyle'


class App extends FinderApp {
  /**
   * @desc Create an instance of App
   * @public
   * @constructor
   * @param {module:nyc-lib/nyc/Content~Content} content The cc content
   * @param {string} url The cc data URL
   */
  constructor(content) {
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
    super({
      title: 'Cooling Center Finder',
      splashOptions: {
        message: 'Splash Message',
        buttonText: ['Screen reader instructions', 'View map to find your closest Cooling Center']
      },
      facilityFormat: format,
      facilityStyle: facilityStyle.pointStyle,
      decorations: [{ content: content }, decorations],
      facilityUrl: url,
      facilityTabTitle: 'Cooling Centers',
      facilitySearch: { displayField: 'search_label', nameField: 'name' },
      geoclientUrl: coolingCenter.GEOCLIENT_URL,
      directionsUrl: coolingCenter.DIRECTIONS_URL
    })
    if(arcGisUrl) {
      let iconurl = this.constructIconUrl(arcGisUrl)
      this.fetchIconUrl(iconurl)
    }
    else {
      const icon = new IconArcGis(iconStyle)
      facilityStyle.iconArcGis = icon
    }
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
    })
  }
}
export default App