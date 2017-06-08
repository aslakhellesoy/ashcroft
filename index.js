const Stream = require('stream')
const net = require('net')

function ashcroftify(obj, ...methodNames) {
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
  for (const methodName of methodNames) {
    obj[methodName] = proxy[methodName]
  }
  return proxy
}

const Ashcroft = {
  enable: () => {
    ashcroftify(global, 'setTimeout', 'setInterval')
    ashcroftify(Stream.Writable.prototype, 'write')
    ashcroftify(net.Socket.prototype, 'connect')
  }
}

module.exports = Ashcroft
