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
  Monday: '6p-10p',
  Tuesday: '6p-10p',
  Wednesday: '6p-10p',
  Thursday: '6p-10p',
  Friday: '12:30p-10p',
  Saturday: '10a-5p',
  Sunday: '',
  STATUS: 'OPEN',
  X: 1004774,
  Y: 254661,
  CTYPE: 1,
  FACILITY_TYPE: 'Library',
  Entrance_info: ''
}
const closedCenterSource = {
  OBJECTID: 99,
  FACILITY_NAME: 'Bensonhurst NSC',
  ADDRESS: '7802 Bay Pkwy',
  BOROUGH: 'Brooklyn',
  ZIP_CODE: '11214',
  PHONE: '(718)331-6800',
  HANDICAP_ACCESS: 'Yes',
  EXTENDED_HOURS: 'No',
  Monday: '6p-10p',
  Tuesday: '6p-10p',
  Wednesday: '6p-10p',
  Thursday: '6p-10p',
  Friday: '6p-10p',
  Saturday: '10:30a-5:30p',
  Sunday: '',
  STATUS: 'CLOSED',
  X: 987099,
  Y: 160188,
  CTYPE: 2,
  FACILITY_TYPE: 'Senior Center',
  Entrance_info: ''
}

const center1 = csvPoint.readFeature(center1Source)
const center2 = csvPoint.readFeature(closedCenterSource)
nyc.mixin(decorations.decorations, [{facilityStyle: facilityStyle}])
nyc.mixin(center1, [decorations.decorations])
nyc.mixin(center2, [decorations.decorations])

module.exports = {center1, center2}