'use strict'

const express = require('express');
const cors = require('cors')
const app = express()
const port = 3001
const route = require('./routes')
const compress = require('compression')

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(compress())
app.use(cors())
app.use(route)

app.listen(process.env.PORT || port)