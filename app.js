const express = require('express')
const cors = require('cors')
const boolParser = require('express-query-boolean')
const limiter = require('./helpers/limiter')

const app = express()

app.use(cors())
app.use(limiter)
app.use(express.json({ limit: 15000 }))
app.use(boolParser())

app.use((req, res) => {
  res.status(404).json({ status: 'error', code: 404, message: 'Not found' })
})

app.use((err, req, res, next) => {
  const code = err.status || 500
  const status = err.status ? 'error' : 'fail'
  res.status(code).json({ status, code, message: err.message })
})

module.exports = app
