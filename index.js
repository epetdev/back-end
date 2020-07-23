const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

require('./src/routes/AuthRoutes')(app)
require('./src/routes/routes')(app)

app.listen(process.env.PORT || 3001)