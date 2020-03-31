import coolingCenter from './coolingCenter'
import Content from 'nyc-lib/nyc/Content'
import App from './App'

const initializer = {
  init: () => {
    Content.loadCsv({
      url: coolingCenter.CONTENT_URL,
    }).then(content => {
      if(content.message('active') === 'no') {
        initializer.redirect()
        return
      }
      new App(content)
    })
  },
  redirect: () => {
    window.location.href = 'inactive.html'
  }
}
export default initializer
