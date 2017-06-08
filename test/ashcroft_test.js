const assert = require('assert')
const stream = require('stream')
const net = require('net')
const Ashcroft = require('..')

const he = it

Ashcroft.banAll()

describe('Ashcroft', () => {
  he("won't let you setTimeout", () => {
    assert.throws(() => setTimeout(() => null, 1), error('setTimeout'))
  })

  he("won't let you setInterval", () => {
    assert.throws(() => setInterval(() => null, 1), error('setInterval'))
  })

  he("won't let you write to a stream", () => {
    const s = new stream.Writable({write: (chunk, encoding, cb) => cb()})
    assert.throws(() => s.write(''), error('write'))
  })

  he("won't let you connect a Socket", () => {
    assert.throws(() => new net.Socket().connect(), error('connect'))
  })

  he("won't let you access environment variables", () => {
    assert.throws(() => process.env.NODE_ENV, error('env'))
  })
})

const error = (fname) => err => {
  assert.equal(`${fname} - you can't do that`, err.message)
  return true
}
