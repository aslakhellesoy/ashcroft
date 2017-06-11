const stream = require('stream')
const net = require('net')

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

    // Reassign original methods
    for (const methodName of methodNames) {
      if(typeof obj[methodName] === 'function') {
        obj[methodName] = proxy[methodName]
      } else {
        // assume it's a getter
        Object.defineProperty(obj, methodName, {
          get: proxy[methodName]
        })
      }
    }
  },

  banAll: () => {
    Ashcroft.ban(global, 'setTimeout', 'setInterval', 'setImmediate')
    Ashcroft.ban(process, 'env')
    Ashcroft.ban(stream.Writable.prototype, 'write')
    Ashcroft.ban(net.Socket.prototype, 'connect')
  }
}

module.exports = Ashcroft
