/**
 * @module cooling-center/decorations
 */

 const decorations ={
  getPhone() {
    return this.get('PHONE')
  },
  getAddress1() {
    return this.get('ADDRESS')
  },
  getCityStateZip() {
    return ''
  },
  getName() {
    return this.get('FACILITY_NAME')
  }
 }
 export default decorations