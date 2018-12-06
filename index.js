process.env.DEBUG = 'test'

const RotatingFileStream = require('bunyan-rotating-file-stream')
const { exec } = require('child_process')
const Benchmark = require('benchmark')
const bunyan = require('bunyan')
const logda = require('logda')
const debug = require('debug')
const path = require('path')
const os = require('os')

const hostname = os.hostname()
const pid = process.pid
const name = 'test'

const debugLogger = debug(name)

const bunyanLogger = bunyan.createLogger({ name })
const bunyanRotatingFileLogger = bunyan.createLogger({ 
  name,
  streams: [{
    stream: new RotatingFileStream({
      path: path.join(__dirname, 'logs', 'rotating-log-file'),
      period: '1d',
      totalFiles: 10,
      rotateExisting: true,  
      threshold: '50m',     
      totalSize: '50m',    
      gzip: true
    })
  }]
})

const suite = new Benchmark.Suite()

suite.add('console', function () {
  console.log({ name, hostname, pid, type: 'log', time: new Date(), msg: 'test' })
  console.log({ name, hostname, pid, type: 'error', time: new Date(), msg: 'test' })
})

suite.add('stdout', function () {
  process.stdout.write(JSON.stringify({ name, hostname, pid, type: 'log', time: new Date(), msg: 'test' }) + '\n')
  process.stdout.write(JSON.stringify({ name, hostname, pid, type: 'log', time: new Date(), msg: 'test' }) + '\n')
})

suite.add('bunyan stdout', function () {
  bunyanLogger.info('test')
  bunyanLogger.error('test')
})

suite.add('bunyan rotating file', function () {
  bunyanRotatingFileLogger.info('test')
  bunyanRotatingFileLogger.error('test')
})

suite.add('logda', function () {
  logda.info('test')
  logda.error('test')
})

suite.add('debug', function () {
  debugLogger('%o', { name, hostname, pid, type: 'log', time: new Date(), msg: 'test' })
  debugLogger('%o', { name, hostname, pid, type: 'error', time: new Date(), msg: 'test' })
})

suite.on('complete', function print () {
  for (var i = 0; i < this.length; i++) {
    console.log(this[i].toString())
  }
})

suite.on('error', console.error)

suite.run()

