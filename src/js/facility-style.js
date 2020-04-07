/**
 * @module cooling-center/facility-style
 */
import Style from 'ol/style/Style'
import nycOl from 'nyc-lib/nyc/ol' 
import IconArcGis from 'nyc-lib/nyc/ol/style/IconArcGis'
import Circle from 'ol/style/Circle'
import Fill from 'ol/style/Fill'
import Stroke from 'ol/style/Stroke'
import Text from 'ol/style/Text'

const facilityStyle = {
  iconArcGis: null,
  pointStyle: (feature, resolution) => {
    const zoom = nycOl.TILE_GRID.getZForResolution(resolution)
    const radius = facilityStyle.calcRadius(zoom)
    if (facilityStyle.iconArcGis) {
      const style = facilityStyle.iconArcGis.style(feature, 2 * radius)
      if (style && style.getImage()) return style
    }
    return facilityStyle.defaultStyle(feature, resolution, radius)
  },
  defaultStyle: (feature, resolution, radius) => {
    return new Style({
      image: new Circle({
        radius: radius,
        fill: new Fill({color: '#000'})
      })
    })
  },
  calcRadius: (zoom) => {
    let radius = 6
    if (zoom > 17) radius = 20
    else if (zoom > 15) radius = 16
    else if (zoom > 13) radius = 12
    else if (zoom > 11) radius = 8
    return radius
  }
}

export default facilityStyle
