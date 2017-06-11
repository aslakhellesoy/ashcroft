const stream = require('stream')
const net = require('net')

class Ashcroft {
  constructor(bans) {
    bans = bans || [
      [global, 'setTimeout', 'setInterval', 'setImmediate'],
      [stream.Writable.prototype, 'write'],
      [net.Socket.prototype, 'connect']
    ]
    this._bans = bans
    this._unbanners = []
  }

  ban() {
    this._bans.forEach(ban => this._banObject(ban[0], ban.slice(1)))
  }

  _banObject(obj, methodNames) {
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
      const orig = obj[methodName]

      const unbanner = () => obj[methodName] = orig
      this._unbanners.push(unbanner)

      if(typeof orig === 'function') {
        obj[methodName] = proxy[methodName]
      } else {
        // assume it's a getter
        Object.defineProperty(obj, methodName, {
          get: proxy[methodName]
        })
      }
    }
  }

  unban() {
    this._unbanners.forEach(unbanner => unbanner())
  }
}

module.exports = Ashcroft
