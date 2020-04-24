/**
 * @module cooling-center/decorations
 */

 const decorations ={
  extendFeature() {
    this.setId(this.get('OBJECTID'))
    this.set(
      'search_label',
      `<b><span class="srch-lbl-lg">${this.getName()}</span></b><br>
      <span class="srch-lbl-sm">${this.getAddress1()}</span>`
    )
  },
  cssClass() {
    return `${this.getType()}-${this.getAccessible()}`.replace(/ /g, '-').toLowerCase()
  },
  getAccessible() {
    return this.get('HANDICAP_ACCESS')
  },
  getAddress1() {
    return this.get('ADDRESS')
  },
  getBorough() {
    return this.get('BOROUGH')
  },
  getCityStateZip() {
    return `${this.getBorough()}, NY ${this.getZip()}`
  },
  getHours() {
    return this.get('HOURS')
  },
  getExHours() {
    return this.get('EXTENDED_HOURS')
  },
  getName() {
    return this.get('FACILITY_NAME')
  },
  getIcon() {
    const icon = $('<img>')
    if (this.facilityStyle.iconArcGis) {
      const img = this.facilityStyle.iconArcGis.style(this, 13).getImage()
      if (img && img.getSrc()) {
        icon.attr('src', img.getSrc())
        return $('<div class="icon"></div>').append(icon)
      }
      return this.iconClass()
    }
    return this.iconClass()
  },
  nameHtml() {
    return $('<h3 class="name" translate="no" notranslate></h3>')
      .append(this.getIcon())
      .append(this.getName())
  },
  getPhone() {
    return this.get('PHONE')
  },
  getStatus() {
    return this.get('STATUS')
  },
  getType() {
    return this.get('FACILITY_TYPE')
  },
  getZip() {
    return this.get('ZIP_CODE')
  },
  detailsHtml() {
    const div = $('<div></div>')
    let ul = $('<ul></ul>')
    const status = `<li><b>Status: </b>${this.getStatus()}</li>`
    const type = `<li><b>Facility Type: </b>${this.getType()}</li>`
    const address = `<li><b>Address: </b>${this.getAddress1()}</li>`
    const phone = `<li><b>Phone: </b>${this.getPhone()}</li>`
    const hours = `<li><b>Hours: </b>${this.getHours()}</li>`
    const exHours = `<li><b>Extended Hours: </b>${this.getExHours()}</li>`
    const access = `<li><b>Wheelchair Accessible: </b>${this.getAccessible()}</li>`
    
    ul.append(status)
    .append(type)
    .append(address)
    .append(phone)
    .append(hours)
    .append(exHours)
    .append(access)

    return div.append(ul)
  },
  iconClass() {
    let type = this.getType()
    if (this.facilityStyle.FACILITY_TYPE.hasOwnProperty(type))
      type = type.replace(/ /g, '-').toLowerCase()
    else
      type = 'default'
    const access = this.getAccessible()
    return $(`<div class="cc-icon ${type} ${access === 'Yes' ? 'accessible' : 'not-accessible'}"></div>`)
  }
 }
 export default decorations