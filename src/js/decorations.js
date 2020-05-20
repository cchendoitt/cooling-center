/**
 * @module cooling-center/decorations
 */

 import Collapsible from 'nyc-lib/nyc/Collapsible'

 const decorations ={
  extendFeature() {
    this.setId(this.get('OBJECTID'))
    this.set(
      'search_label',
      `<b><span class="srch-lbl-lg">${this.getName()}</span></b><br>
      <span class="srch-lbl-sm">${this.getAddress1()}</span>`
    )
    this.set('search_name', `${this.getName()}, ${this.getAddress1()}, ${this.getCityStateZip()}`)
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
  detailsCollapsible() {
    const msgs = translateBtn.messages[translateBtn.lang()]
    const details = this.detailsHtml()
    if (details) {
      const collapsible = new Collapsible({
        target: $('<div class="dtl"></div>'),
        title: `<span class=dtl_btn_text>${msgs['dtl_btn_text']}</span>`,
        content: details,
        collapsed: true
      })
      collapsible.on('change', this.app.expandDetail, this.app)
      return collapsible.getContainer()
    }
  },
  detailsHtml() {
    const div = $('<div></div>')
    let ul = $('<ul></ul>')
    const msgs = translateBtn.messages[translateBtn.lang()]
    const type = `<li><b><span class=pop_type>${msgs['pop_type']}</span>: </b>${this.getType()}</li>`
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
  directionsButton() {
    const msgs = translateBtn.messages[translateBtn.lang()]
    return $(`<button class="btn btn-ico rad-all dir"><span class="dir_btn">${msgs['dir_btn']}</span></button>`)
      .data('feature', this)
      .click(this.handleButton)
  },
  mapButton() {
    const msgs = translateBtn.messages[translateBtn.lang()]
    return $(`<button class="btn btn-ico rad-all map"><span class="map_btn">${msgs['map_btn']}</span></button>`)
      .prepend('<span class="screen-reader-only">Locate this facility on the </span>')
      .data('feature', this)
      .click(this.handleButton)
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