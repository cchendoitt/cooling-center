require('dotenv').config()

const fs = require('fs')
const csv = fs.readFileSync('./dist/data/content.csv', 'utf8')
const newCsv = `${csv}`.replace(/cc_url\,/, `cc_url,"${process.env.CC_URL}"`)
fs.writeFile('./dist/data/content.csv', newCsv, err => {
  if(err) console.error(err)
})
