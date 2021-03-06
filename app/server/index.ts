/// <reference path="../../typings/main.d.ts" />

let fs = require('fs')
let path = require('path')
let express = require('express')
let bodyParser = require('body-parser')
let winston = require('winston')

winston.loggers.add('server', { console: { level: 'debug', colorize: true, label: 'Server' } })
winston.loggers.add('scheduler', { console: { level: 'debug', colorize: true, label: 'Scheduler' } })
winston.loggers.add('ssh', { console: { level: 'debug', colorize: true, label: 'SSH' } })
winston.loggers.add('vagrant', { console: { level: 'debug', colorize: true, label: 'Vagrant' } })
winston.loggers.add('awsec2', { console: { level: 'debug', colorize: true, label: 'AWS' } })

import api from './api'

let buildDir = path.join(__dirname, '..', '..', 'build')

let app = express()

app.set('json spaces', 2)

app.use(bodyParser.json())

app.use(api)

app.get('/bundle.js', (req, res) => res.sendFile(path.join(buildDir, 'bundle.js')))
app.get('/bundle.js.map', (req, res) => res.sendFile(path.join(buildDir, 'bundle.js.map')))
app.get('*', (req, res) => res.sendFile(path.join(buildDir, 'index.html')))

let server = app.listen(8081, () => winston.loggers.get('server').info('Listening at http://localhost:%d/', server.address().port))
