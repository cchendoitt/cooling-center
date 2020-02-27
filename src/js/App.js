/**
 * @module cooling-center/App
 */

import $ from 'jquery'
import FinderApp from 'nyc-lib/nyc/ol/FinderApp'
import CsvPoint from 'nyc-lib/nyc/ol/format/CsvPoint'
import decorations from './decorations'


class App extends FinderApp {
  /**
   * @desc Create an instance of App
   * @public
   * @constructor
   * @param {module:nyc-lib/nyc/Content~Content} content The POD content
   * @param {string} url The POD data URL
   */
  constructor() {
    super({
      title: 'Cooling Center Finder',
      splashOptions: {
        message: 'Splash Message',
        buttonText: ['Screen reader instructions', 'View map to find your closest Cooling Center']
      },
      facilityFormat: new CsvPoint({
        x: 'X',
        y: 'Y',
        dataProjection: 'EPSG:2263'
      }),
      decorations: decorations,
      facilityUrl: 'data/center.csv',
      facilityTabTitle: 'Cooling Centers',
      facilitySearch: { displayField: 'search_label', nameField: 'name' },
      geoclientUrl: process.env.GEOCLIENT_URL,
      directionsUrl: process.env.DIRECTIONS_URL
    })
  }
}

export default App