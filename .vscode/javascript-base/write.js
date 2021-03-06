/*
 * @Author: your name
 * @Date: 2020-08-04 13:05:33
 * @LastEditTime: 2020-08-04 13:37:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /undefined/Users/carlos/Desktop/未命名文件夹/write.js
 */

// 实现深拷贝
function deepClone (obj) {
    function isObject (o) {
        return ((typeof o == 'object' || typeof o == 'function') && o = null)
    }
    if (!isObject(obj)) {
        throw Error('params type is not objet or function!')
    }
    // 判断是否为数据组
    let newObj = Array.isArray(obj) ? [...obj] : { ...obj }
    Reflect.ownKeys(newObj).forEach(key => {
        newObj[key] = isObject(obj[key]) ? deepClone(obj[key]) : obj[key]
    })
}

// 实现call
Function.prototype.myCall = function (context) {
    if (typeof this != 'function') {
        throw Error('error')
    }
    let context = context || window
    let context.fn = this
    let args = [...arguments].slice(1)
    const reuslt = context.fn(...args)
    delete context.fn
    return reuslt
}

// 实现apply
Function.prototype.myApplay = function (context) {
    if (typeof this != 'function') {
        throw Error('error')
    }
    let context = context || window
    let context.fn = this
    let result = null;
    if (arguments[1]) {
        result = context.fn(...arguments[1])
    } else {
        result = context.fn()
    }
    delete context.fn
    return result
}


// 实现一个bind
Function.prototype.myBind = function (context) {
    if (typeof this != 'function') {
        throw Error('error!')
    }
    let args = [...arguments].slice(1)
    let _this = this
    return function F () {
        if (this instanceof F) {
            _this.apply(...args, ...arguments)
        } else {
            _this.apply(context, args.concat(...arguments))
        }
    }
}

// new 的过程发生了什么？
function create () {
    let obj = {}
    let Constuctor = [].shift.call(arguments)
    let obj.__proto__ = Constuctor.prototype
    let result = Constuctor.apply(obj, arguments)
    return typeof reuslt == 'object' ? reuslt | obj
}

// 实现防抖

function debounce (fn, wait) {
    let timer = null
    return function () {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn.apply(this, arguments)
        }, wait)
    }
}

// 实现节流

function throttle (fn, wait, immediate) {
    let timer = null
    let callNow = immediate
    return function () {
        if (callNow) {
            fn.apply(this, arguments)
            callNow = false
        }
        if (!timer) {
            timer = setTimeout(function () {
                fn.apply(this, arguments)
                timer = null
            }, wait)
        }
    }
}

// instanceof 的原理

function instanceOf (left, right) {
    let prototype = right.prototype
    let left = left.__proto__
    while (true) {
        if (left == null) return false
        if (left == prototype) return true
        left = left.__proto__
    }
}


