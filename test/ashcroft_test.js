const assert = require('assert')
const stream = require('stream')
const net = require('net')
const Ashcroft = require('..')

Ashcroft.banAll()

const configs = [
  {
    name: 'Ashcroft',
    prefix: "won't",
    check: checkError
  },
  // {
  //   name: 'Vanilla Node',
  //   prefix: "will",
  //   check: checkNoError
  // }
]

configs.forEach(({name, prefix, check}) => {
  describe(name, () => {

    it(`${prefix} let you setTimeout`, () => {
      check(() => setTimeout(() => null, 0), 'setTimeout')
    })

    it(`${prefix} let you setInterval`, () => {
      check(() => setInterval(() => null, 0), 'setInterval')
    })

    it(`${prefix} let you setImmediate`, () => {
      check(() => setImmediate(() => null, 0), 'setImmediate')
    })

    it(`${prefix} let you write to a stream`, () => {
      const s = new stream.Writable({write: (chunk, encoding, cb) => cb()})
      check(() => s.write(''), 'write')
    })

    it(`${prefix} let you connect a Socket`, () => {
      check(() => new net.Socket().connect(), 'connect')
    })

    it(`${prefix} let you access environment variables`, () => {
      check(() => process.env.NODE_ENV, 'env')
    })
  })
})

function checkError(fn, fname) {
  assert.throws(fn, err => {
    assert.equal(`${fname} - you can't do that`, err.message)
    return true
  })
}

function checkNoError(fn, fname) {
  fn()
}
