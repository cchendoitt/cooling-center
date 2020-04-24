import coolingCenter from './coolingCenter'
import Content from 'nyc-lib/nyc/Content'
import App from './App'

const initializer = {
  init: () => {
    Content.loadCsv({
      url: coolingCenter.CONTENT_URL,
    }).then(content => {
      if(content.message('active') === 'no') {
        const msg = content.message('message') || ''
        return initializer.redirect(`inactive.html?message=${encodeURIComponent(msg)}`)
      }
      new App(content)
    })
  },
  redirect: (url) => {
    window.location.href = url
  },
  refresh: (search) => {
    if (search) {
      const params = search.substr(1).split('&')
      params.forEach(param => {
        const p = param.split('=')
        const minutes = p[1]
        if (p[0] === 'refresh' && !isNaN(minutes)) {
          setTimeout(() => {
            initializer.redirect(`./?refresh=${minutes}&now=${new Date().getTime()}`)
          }, minutes * 1000 * 60)
        } 
      })
    }
  }
}

initializer.refresh(document.location.search)

export default initializer