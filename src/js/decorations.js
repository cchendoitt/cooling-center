/**
 * @module cooling-center/decorations
 */

 import Collapsible from 'nyc-lib/nyc/Collapsible'

 const closedFeatures = []
  
 const decorations ={
  extendFeature() {
    if (this.get('STATUS') == 'CLOSED') {
      closedFeatures.push(this)
    }

    this.setId(this.get('OBJECTID'))
    this.set(
      'search_label',
      `<b><span class="srch-lbl-lg">${this.getName()}</span></b><br>
      <span class="srch-lbl-sm">${this.getAddress1()}</span>`
    )
    this.set('search_name', `${this.getName()}, ${this.getAddress1()}, ${this.getCityStateZip()}`)
  },
  addressHtml() {
    const html = $('<div class="addr notranslate"></div>')
      .append(`<div class="ln1">${this.getAddress1()}</div>`)
      .append(`<div class="ln3">${this.getCityStateZip()}</div>`)
    if (this.getAddress2()) {
      html.append(`<div class="ln2">${this.getAddress2()}</div>`)
    }
    return html
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
  getAddress2() {
    return this.get('Entrance_info')
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
    const msgs = global.nycTranslateInstance.messages[global.nycTranslateInstance.lang()]

    const typeMap = {
      "Community center": 'legend_comm',
      "Senior center": 'legend_senior',
      "Cornerstone Program": 'legend_cornerstone',
      "Library": 'legend_library',
      "School": 'legend_school',
    }
    const type = `<li><b><span class=pop_type>${msgs['pop_type']}</span>: </b><span class=${typeMap[this.getType()]}></span></li>`
    const address = `<li><b><span class=pop_address>${msgs['pop_address']}</span>: </b>${this.getAddress1()}</li>`
    const phone = `<li><b><span class=pop_phone>${msgs['pop_phone']}</span>: </b>${this.getPhone()}</li>`
    const hours = `<li><b><span class=pop_hours>${msgs['pop_hours']}</span>: </b>${this.getHours()}</li>`
    const exHours = `<li><b><span class=pop_extended>${msgs['pop_extended']}</span>: </b>${this.getExHours()}</li>`
    const access = `<li><b><span class=pop_access>${msgs['pop_access']}</span>: </b>${this.getAccessible()}</li>`
    
    ul.append(type)
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
 export default {decorations, closedFeatures}