import OlFeature from 'ol/Feature'
import decorations from '../src/js/decorations'
import nyc from 'nyc-lib/nyc'
import CsvPoint from 'nyc-lib/nyc/ol/format/CsvPoint'
import facilityStyle from '../src/js/facility-style'


const csvPoint = new CsvPoint({
  x: 'X',
  y: 'Y',
  defaultDataProjection: 'EPSG:2263'
})

// Active Library
const center1Source = {
  OBJECTID: 41,
  FACILITY_NAME: 'Inwood Library',
  ADDRESS: '4790 Broadway',
  BOROUGH: 'Manhattan',
  ZIP_CODE: '10034',
  PHONE: '(212)942-2445',
  HANDICAP_ACCESS: 'Yes',
  EXTENDED_HOURS: 'No',
  HOURS: 'HOURS',
  STATUS: 'OPEN',
  X: 1004774,
  Y: 254661,
  CTYPE: 1,
  FACILITY_TYPE: 'Library'
}
const center1 = csvPoint.readFeature(center1Source)
nyc.mixin(decorations.decorations, [{facilityStyle: facilityStyle}])
nyc.mixin(center1, [decorations.decorations])

module.exports = {center1}