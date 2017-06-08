const assert = require('assert')
const Stream = require('stream')
const Ashcroft = require('..')

const he=it

Ashcroft.enable()

describe('Ashcroft', () => {
  he("won't let you setTimeout", () => {
    try {
      setTimeout(() => null, 1)
      throw new Error('should have failed')
    } catch (e) {
      assert.equal("setTimeout - you can't do that", e.message)
    }
  })

  he("won't let you setInterval", () => {
    try {
      setInterval(() => null, 1)
      throw new Error('should have failed')
    } catch (e) {
      assert.equal("setInterval - you can't do that", e.message)
    }
  })

  he("won't let you write to a stream", () => {
    const s = new Stream.Writable({write: (chunk, encoding, cb) => cb()})
    try {
      s.write('')
      throw new Error('should have failed')
    } catch (e) {
      assert.equal("write - you can't do that", e.message)
    }
  })
})
