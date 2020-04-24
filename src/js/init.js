import coolingCenter from './coolingCenter'
import Content from 'nyc-lib/nyc/Content'
import App from './App'


const initializer = {
  init: () => {
    const params = initializer.params()
    const minutes = params.refresh
    const hasBeenRefreshed = params.now > 0
    initializer.refresh(minutes)
    Content.loadCsv({
      url: coolingCenter.CONTENT_URL,
    }).then(content => {
      if(content.message('active') === 'no') {
        const msg = content.message('message') || ''
        return initializer.redirect(`inactive.html?message=${encodeURIComponent(msg)}`)
      }
      new App(content, hasBeenRefreshed)
    })
  },
  redirect: (url) => {
    console.warn(url)
    window.location.href = url
  },
  params: () => {
    const result = {}
    const search = document.location.search
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
        initializer.redirect(`./?refresh=${minutes}&now=${new Date().getTime()}`)
      }, minutes * 1000 * 60)
    }
  }
}

export default initializer
