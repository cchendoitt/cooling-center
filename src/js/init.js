import coolingCenter from './coolingCenter'
import Content from 'nyc-lib/nyc/Content'
import App from './App'

const initializer = {
  init: () => {
    Content.loadCsv({
      url: coolingCenter.CONTENT_URL,
    }).then(content => {
      if(content.message('active') === 'no') {
        initializer.redirect(content.message('message'))
        return
      }
      new App(content)
    })
  },
  redirect: (msg) => {
    let query = ''
    if (msg) {
      query = `?message=${encodeURIComponent(msg)}`
    }
    window.location.href = `inactive.html${query}`
  }
}
export default initializer
