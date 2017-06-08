const assert = require('assert')
const Stream = require('stream')
const Ashcroft = require('..')

const he = it

Ashcroft.enable()

describe('Ashcroft', () => {
  he("won't let you setTimeout", () => {
    assert.throws(() => setTimeout(() => null, 1), error('setTimeout'))
  })

  he("won't let you setInterval", () => {
    assert.throws(() => setInterval(() => null, 1), error('setInterval'))
  })

  he("won't let you write to a stream", () => {
    const s = new Stream.Writable({write: (chunk, encoding, cb) => cb()})
    assert.throws(() => s.write(''), error('write'))
  })
})

const error = (fname) => err => {
  assert.equal(`${fname} - you can't do that`, err.message)
  return true
}
