const assert = require('assert')
const stream = require('stream')
const net = require('net')
const Ashcroft = require('..')

const he = it

Ashcroft.banAll()

const check = checkError

describe('Ashcroft', () => {
  he("won't let you setTimeout", () => {
    check(() => setTimeout(() => null, 1), 'setTimeout')
  })

  he("won't let you setInterval", () => {
    check(() => setInterval(() => null, 1), 'setInterval')
  })

  he("won't let you setImmediate", () => {
    check(() => setImmediate(() => null, 1), 'setImmediate')
  })

  he("won't let you write to a stream", () => {
    const s = new stream.Writable({write: (chunk, encoding, cb) => cb()})
    check(() => s.write(''), 'write')
  })

  he("won't let you connect a Socket", () => {
    check(() => new net.Socket().connect(), 'connect')
  })

  he("won't let you access environment variables", () => {
    check(() => process.env.NODE_ENV, 'env')
  })
})

function checkError(fn, fname) {
  assert.throws(fn, err => {
    assert.equal(`${fname} - you can't do that`, err.message)
    return true
  })
}
