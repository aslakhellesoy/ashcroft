const stream = require('stream')
const net = require('net')

var resets = []

const Ashcroft = {
  ban: (obj, ...methodNames) => {
    const handler = {
      get(target, methodName) {
        const origMethod = target[methodName]
        return (...args) => {
          if (methodNames.includes(methodName)) {
            throw new Error(`${methodName} - you can't do that`)
          }
          return origMethod.apply(this, args)
        }
      }
    }
    const proxy = new Proxy(obj, handler)

    const orig = {}
    const reset = () => {
      for (const methodName of methodNames) {
        obj[methodName] = orig[methodName]
      }
    }

    // Reassign original methods
    for (const methodName of methodNames) {
      orig[methodName] = obj[methodName]

      if(typeof obj[methodName] === 'function') {
        obj[methodName] = proxy[methodName]
      } else {
        // assume it's a getter
        Object.defineProperty(obj, methodName, {
          get: proxy[methodName]
        })
      }
    }

    return reset
  },

  banAll: () => {
    resets = []
    resets.push(Ashcroft.ban(global, 'setTimeout', 'setInterval', 'setImmediate'))
    //resets.push(Ashcroft.ban(process, 'env'))
    resets.push(Ashcroft.ban(stream.Writable.prototype, 'write'))
    resets.push(Ashcroft.ban(net.Socket.prototype, 'connect'))
  },

  resetAll: () => {
    resets.forEach(reset => reset())
  }
}

module.exports = Ashcroft
