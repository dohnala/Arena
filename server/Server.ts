import express from 'express'
import fs from 'fs'
import path from 'path'

const port = process.env.PORT || 3000
const app = express();

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use('/', express.static(path.join(__dirname, 'static')))

const manifest = fs.readFileSync(
    path.join(__dirname, 'static/manifest.json'),
    'utf-8'
)
const assets = JSON.parse(manifest)

app.get('/', (req, res) => {
    res.render('index', { assets })
})

const server = app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})
