/**
 * @module cooling-center/decorations
 */

const closedFeatures = []
  
const HOURS_TABLE = '<table><thead><tr><th class="day">Day</th><th class="opens">Opens</th><th class="closes">Closes</th></tr></thead><tbody><tr><td class="sunday">Sunday</td><td class="op"></td><td class="cl"></td></tr><tr><td class="monday">Monday</td><td class="op"></td><td class="cl"></td></tr><tr><td class="tuesday">Tuesday</td><td class="op"></td><td class="cl"></td></tr><tr><td class="wednesday">Wednesday</td><td class="op"></td><td class="cl"></td></tr><tr><td class="thursday">Thursday</td><td class="op"></td><td class="cl"></td></tr><tr><td class="friday">Friday</td><td class="op"></td><td class="cl"></td></tr><tr><td class="saturday">Saturday</td><td class="op"></td><td class="cl"></td></tr></tbody></table>'

 const decorations = {
  extendFeature() {
    if (this.get('STATUS') !== 'OPEN') {
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
  times(day, row) {
    const times = this.get(day)
    if (times) {
      const hoursOfOp = []
      times.split('-').forEach(time => {
        const ampm = `${time.substr(time.length - 1).toUpperCase()}M`
        const parts = time.split(':')
        let hr = parts[0]
        let min = parts[1]
        if (isNaN(hr)) {
          hr = hr.substr(0, hr.length - 1)
        }
        if (min) {
          min = min.substr(0, min.length - 1)
        } else {
          min = '00'
        }
        if (global.nycTranslateInstance.lang() !== global.nycTranslateInstance.defaultLanguage) {
          if (ampm === 'PM' && hr < 12) {
            hoursOfOp.push(`${(hr * 1) + 12}:${min}`)
          } else {
            hoursOfOp.push(`${hr}:${min}`)
          }
        } else {
          hoursOfOp.push(`${hr}:${min} ${ampm}`)
        }
      })
      $(row).find('.op').html(hoursOfOp[0])
      $(row).find('.cl').html(hoursOfOp[1])
    } else {
      $(row).find('.op, .cl').html('<span class="closed">Closed</span>')
    }
  },
  getHours(table) {
    const me = this
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    table = table || $(HOURS_TABLE).get(0)
    days.forEach((day, i) => {
      this.times(day, table.rows[i + 1])
    })
    global.nycTranslateInstance.on('change', () => {
      me.getHours(table)
    })
    return table
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
      "Other": 'legend_other'
    }
    const otherMap = {
      "No": 'msg-no',
      "Yes": 'msg-yes',
      "Hours may be extended during a heat emergency.": 'msg_extended',
    }
    
    const type = `<li><b><span class=pop_type>${msgs['pop_type']}</span>: </b><span class=${typeMap[this.getType()]}></span></li>`
    const address = `<li><b><span class=pop_address>${msgs['pop_address']}</span>: </b><div class="notranslate">${this.getAddress1()}</div></li>`
    const phone = `<li><b><span class=pop_phone>${msgs['pop_phone']}</span>: </b><div class="notranslate">${this.getPhone()}</div></li>`
    const hours = $(`<li><b><span class=pop_hours>${msgs['pop_hours']}</span>: </b></li>`).append(this.getHours())
    const exHours = `<li><b><span class=pop_extended>${msgs['pop_extended']}</span>: </b><span class=${otherMap[this.getExHours()]}></span></li>`
    const access = `<li><b><span class=pop_access>${msgs['pop_access']}</span>: </b><span class=${otherMap[this.getAccessible()]}></span></li>`
    
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
    return $(`<div class="ico chc-${type} ${access === 'Yes' ? 'accessible' : 'not-accessible'}"></div>`)
  }
 }
 export default {decorations, closedFeatures}