// 手动实现call
Function.prototype.myCall = function (context) {
   if(typeof this != 'function') {
     throw new Error('error!')
   }
   const context = context || window
   context.fn = this
   const args = [...arguments].slice(1)
   const result = context.fn(...args)
   delete context.fn
   return result
}
// 手动实现apply
Function.prototype.myApply = function(context) {
  if(typeof this != 'function'){throw new Error('error!')}
  const context = context || window
  const context.fn = this
  let result
  if(arguments[1]){
    result = context.fn(...arguments[1])
  }else{
    result = context.fn()
  }
  delete context.fn
  return result
}

// 手动实现bind
Function.prototype.myBind = function (context) {
  if(typeof this == 'function') {throw new Error('error!')}
  const args = [...arguments].slice(1)
  const _this  = this
  return function F () {
    if(this instanceof F) {
      return new _this(...args,...arguments)
    }else {
      return _this.apply(context,args.conact(...arguments))
    }
  }
}
// 手动实现instanceof的原理
function instanceOf(left,right) {
  let prototype = right.prototype
  let left = left.__proto__
  while(true){
    if(left == null) return false
    if(left == prototype) return true
    left = left.__proto__
  }
}
// 手动实现数组去重
// 手动实现数组排序
// 1. 快速排序
function quickSort(arr) {
    if(arr.length <= 1) {
      return arr
    }
    let temp = arr[0]
    let left = []
    let right = []
    for(let i = 1;i < arr.length; i++){
      if(arr[i] < temp) {
          left.push(arr[i])
      } else {
          right.push(arr[i])
      }
    }
  return quickSort(left).concat([temp],quickSort(right))
}
console.log(quickSort(arr))
// 2. 冒泡排序
function bubbleSort(arr){
  for(let i = 0; i < arr.length - 1; i++){
    for(let j = 0; j < arr.length - i - 1; j++){
      if(arr[j] > arr[j + 1]){
        swap(arr, j, j+1);
      }
    }
  }
  return arr;
}

function swap(arr, i, j){
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
console.log(arr);

// 3. 选择排序
function selectSort(arr) {
  for(let i = 0;i<arr.length;i++) {
    for(let j = i+1;j<arr.length;j++) {
            if(arr[i] > arr[j]) {
              let temp = arr[i]
              arr[i]= arr[j]
              arr[j] = temp
            }
    }
  }
  return arr
}

// 手动实现new 的过程
/**
 * 1. 创建一个新的对象
 * 2. 链接到原型
 * 3. 绑定this
 * 4. 返回一个新的对象
 */
function create() {
  let obj = {}
  let Constructor = [].shift.call(arguments)
  obj.__proto__ = Constructor.prototype
  let result = Constructor.apply(obj,arguments)
  return typeof result == 'object' ? result : obj
}
// 手动实现
// 防抖
function debounce(fn, wait, immediate) {
	let timer = null
	return function () {
		let args = arguments
		let context = this
		if (!timer && immediate) {
			fn.apply(context, args)
		}
		if (timer) clearTimeout(timer)
		timer = setTimeout(function() {
			fn.apply(context, args)
		}, wait) 
	}
}

// 节流
// 第一种方式，采用时间计数

function throttle (fn, wait) {
  var pre = Date.now()
  return function () {
  	let args = arguments
  	let context = this
  	let now = Date.now()
  	if(now - pre >= wait) {
  		fn.apply(context, args)
  		pre = now
  	}
  }
}

// 第二种方式，参数定时器



function throttle (fn, wait, immediate) {
  let timer = null
  let callNow = immediate
  return function () {
  	let args = arguments
  	let context = this
  	if(callNow) {
  		fn.apply(context, args)
  		callNow = false
  	}
  	if(!timer) {
  		timer = setTimeout(function() {
  			fn.apply(context, args)
  			timer = null
  		}, wait)
  	}
  }
}


// 深拷贝
function deepClone (obj) {
  function isObject(o) {
    return (typeof o == 'object' || type o == 'function') && (o != null)
  }
  if(!isObject(obj)){
    throw TypeError("the params is not object")
  }
  let newObject = Array.isArray(obj) ? [...obj] : {...obj}
  Reflect.Ownkeys(newObject).forEach(key=> {
    newObject[key] = isObject(obj[key]) ? deepClone(obj[key]) : obj[key]
  })
  return newObject
}





































