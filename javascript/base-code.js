// new

function create() {
	let obj = {}
	let Con = [].shift.call(arguments)
	obj.__proto__ =  Con.prototype
	let result = Con.apply(obj, arguments)
	return typeof result  == 'object' ? result : obj
}
// [...arguments].slice(1) Array.from(arguments)

// instanceof 的原理

function intanceOf (left, right) {
	let prototype = right.prototype
	let left = left.__proto__
	while(true) {
		if(left == null) return false
		if(left == prototype) return true
		left = left.__proto__
	}
}

// 实现一个深拷贝

function deepClone (obj) {
	function isObject(o) {
		return ((typeof o == 'object' || typeof o == 'function') && typeof o != null)
	}
	if(!isObject(obj)) {
		throw Error('the params type is error!')
	}
	let newObj = Array.isArray(obj) ? [...obj] : {...obj}
	Reflect.OwnKeys(newObj).forEach(key => {
		newObj[key] = isObject(obj[key]) ? deepClone(obj[key]) : obj[key]
	})
	return newObj
}



// 实现一个防抖

function debounce(fn, wait, immediate) {
	let timer = null
	let callNow = immediate
	return function () {
		let args = arguments
		let context =this
		if(callNow && !timer) {
			fn.apply(context, args)
			callNow = false
		}
		if(timer) clearTimeout(timer)
		timer = setTimeout(()=>{
			fn.apply(context, args)
		},wait)
	}
}


// 实现一个节流

function throttle(fn, wait, immediate) {
	let timer = null
	let callNow = immediate
	return function () {
		let context = this
		let args = arguments
		if(callNow) {
			fn.apply(context, args)
		}
		if(!timer) {
			setTimeout(()=> {
              fn.apply(context, args)
              timer = null
			},wait)
		}
	}
}


/**
*实现继承
*1. 构造函数继承  无法继承父级类的prototype上的方法和属性
*2. 原型继承     多个子实例会共享引用类型的父级属性
*3. 组合继承     父级会调用两次
*4. 寄生继承     利用Object.create()
*/

// 1. 构造函数继承

function Sup (name, age) {
	this.name = name
	this.age = age
	this.info = {
		age,
		name
	}
	this.getName = function() {
		console.log(this.name)
		return this.name
	}
}
Sup.prototype.getAge = function () {
	console.log(this.age)
	return this.age
}

function Sub (name, age, weight) {
	Sup.call(this, name,age)
	this.weight = weight
}

let child = new Sub('cat',23,23)

// 原型链模式

function Sub1 (name, age, weight) {
	this.weight = weight
}
Sub1.prototype == new Sup()

let child1 = new Sub1('dog',11,11)

// 寄生组合式继承

function Child () {
	Sup.call(this)
}
// var prototype = Object.create(Sup.prototype)
// prototype.constrcutor = Child
// Child.prototype = prototype

Child.prototype = Object.create(Sup.prototype, {
   constructor: {
   	value: Child,
   	writable: true,
   	configurable: true
   }
})

class B {

}
class A extends B {
	constructor() {
		super()
	}
	getName() {}
}

// 实现call


Function.prototype.myCall = function (context) {
	var context = context || window 
	context.fn = this
	var args = [...arguments].slice(1)
	var result = context.fn(...args)
	delete context.fn
	return result
}

// 实现apply
Function.prototype.myApply = function (context) {
	var context = context || window
	context.fn = this
	var result = null
	if(arguments[1]) {
       result = context.fn(...arguments[1])
	} else {
       result = context.fn()
	}
    return result
}

// 实现一个bind

Function.prototype.myBind = function (context) {
	if(typeof this != 'function') {
		throw TypeError('error')
	}
	var args = [...arguments].slice(1)
	var _this = this
	return function F() {
		if(this instanceof F) {
           return _this(...args, ...arguments)
		} else  {
           _this.apply(context, args.concat(...arguments))
		}
	}
}

// 实现一个Promise 





















