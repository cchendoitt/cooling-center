import coolingCenter from './coolingCenter'
import Content from 'nyc-lib/nyc/Content'
import App from './App'

Content.loadCsv({
  url: coolingCenter.CONTENT_URL,
}).then(content => {
  new App(content)
})