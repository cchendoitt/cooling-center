import coolingCenter from './coolingCenter'
import Content from 'nyc-lib/nyc/Content'
import App from './App'


const initializer = {
  init: () => {
    const params = initializer.params()
    const minutes = params.refresh
    const hasBeenRefreshed = params.refreshed === 'true'
    initializer.refresh(minutes)
    Content.loadCsv({
      url: coolingCenter.CONTENT_URL
    }).then(content => {
      if (content.message('active') === 'no') {
        const qstr = minutes ? `refresh=${minutes}` : ''
        initializer.redirect(`inactive.html?${qstr}`)
        return
      }
      new App(content, hasBeenRefreshed)
    })
  },
  redirect: (url) => {
    window.location.href = url
  },
  search: () => {
    return document.location.search
  },
  params: () => {
    const result = {}
    const search = initializer.search()
    if (search) {
      const params = search.substr(1).split('&')
      params.forEach(param => {
        const p = param.split('=')
        result[p[0]] = p[1]
      }) 
    }
    return result
  },
  refresh: (minutes) => {
    if (minutes) {
      setTimeout(() => {
        initializer.redirect(`./?refresh=${minutes}&refreshed=true`)
      }, minutes * 1000 * 60)
    }
  }
}

export default initializer
