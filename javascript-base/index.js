// JS  基础类型？字符串 数字 对象 Bool  Symbol Null undefined
var a = 1
var s = 'xxx'
var o = {}
var t = true
var sy = Symbol(100)
var n = null
var u = undefined

console.log(sy)


// 

function Animation() {
    return 1
}

var a = new Animation()
console.log(a)

console.log(typeof NaN === 'number')

console.log([] + {})
console.log({} + [])