/**
 * Created by zhangzongzheng on 16/11/25
 */

class Vue {
  constructor (options) {
    this.data = options.data
    observer(this.data, this._update)
  }

  _update () {
    console.log('data updated')
  }
}

function observer (data, callback) {
  Object.keys(data).forEach((key) => {
    dataReactive(data, key, data[key], callback)
  })
}

function dataReactive (data, key, val, callback) {
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: () => {
      return val
      // return data[key] // Maximum call stack size exceeded(…) http://stackoverflow.com/questions/23938419/using-object-defineproperty-with-rangeerror
    },
    set: (newVal) => {
      val = newVal
      typeof callback === 'function' && callback()
    }
  })
}

const app = new Vue({
  el: '#app',
  data: {
    msg: 'hello world'
  }
})