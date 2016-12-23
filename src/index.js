/**
 * Created by zhangzongzheng on 16/11/25
 */

class Vue {
  constructor (options) {
    this.el = options.el
    this.node = document.querySelector(this.el)
    this.data = options.data
    // observer(this.data, function () {this.scan(this.node, this.data)})
    // watcher(this.scan(this.node, this.data))
    // watcher(this, this._update)
    this.scan(this.node, this.data)
  }

  _update () {
    console.log('data updated')
  }

  scan (node, data) {
    for (let i = 0; i < node.children.length; i++) {
      this.parseText(node.children[i], data)
    }
  }

  parseText (node, data) {
    let prop = node.getAttribute('v-text')
    if (prop.indexOf('.') === -1) {
      node.innerText = data[prop]
      observer(data, function (old, now) {
        node.innerText = now
      })
    }
  }
}

class Dep {
  constructor () {
    this.subs = []
  }

  add (callback) {
    this.subs.push(callback)
  }

  notify () {
    this.subs.forEach((sub) => {
      sub()
    })
  }
}

function observer (data, cb) {
  Object.keys(data).forEach((key) => {
    defineReactive(data, key, data[key], cb)
  })
}

// function watcher (callback) {
//   Dep.target = callback
// }

function defineReactive (data, key, val, cb) {
  let dep = new Dep()
  
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: () => {
      // dep.add(Dep.target)
      return val
      // return data[key] // Maximum call stack size exceeded(…) http://stackoverflow.com/questions/23938419/using-object-defineproperty-with-rangeerror
    },
    set: (newVal) => {
      if (val === newVal) {
        return
      } else {
        val = newVal
        // dep.notify()
        cb(val, newVal)
      }
    }
  })
}