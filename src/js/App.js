/**
 * @module cooling-center/App
 */

import $ from 'jquery'
import coolingCenter from './coolingCenter'
import FinderApp from 'nyc-lib/nyc/ol/FinderApp'
import GeoJson from 'ol/format/GeoJSON'
import CsvPoint from 'nyc-lib/nyc/ol/format/CsvPoint'
import decorations from './decorations'


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
    let url = content.message('cc_url')
    if (url === '') {
      url = coolingCenter.CENTER_CSV_URL
      format = new CsvPoint({
        x: 'x',
        y: 'y',
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
      decorations: decorations,
      facilityUrl: url,
      facilityTabTitle: 'Cooling Centers',
      facilitySearch: { displayField: 'search_label', nameField: 'name' },
      geoclientUrl: coolingCenter.GEOCLIENT_URL,
      directionsUrl: coolingCenter.DIRECTIONS_URL
    })
  }
}

export default App