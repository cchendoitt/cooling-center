import OlFeature from 'ol/Feature'
import decorations from '../src/js/decorations'
import nyc from 'nyc-lib/nyc'
import CsvPoint from 'nyc-lib/nyc/ol/format/CsvPoint'

const csvPoint = new CsvPoint({
  x: 'X',
  y: 'Y',
  defaultDataProjection: 'EPSG:2263'
})

const featureSource = {
  OBJECTID: 1,
  FACILITY_NAME: 'FACILITY_NAME',
  ADDRESS: 'ADDRESS',
  BOROUGH: 'BOROUGH',
  ZIP_CODE: 'ZIP_CODE',
  PHONE: 'PHONE',
  HANDICAP_ACCESS: 'YES',
  EXTENDED_HOURS: 'YES',
  HOURS: 'HOURS',
  STATUS: 'OPEN',
  X: 962810,
  Y: 173464,
  CTYPE: 'CTYPE',
  FACILITY_TYPE: 'FACILITY_TYPE'
}
const feature = csvPoint.readFeature(featureSource)
nyc.mixin(feature, [decorations])

module.exports = {feature}