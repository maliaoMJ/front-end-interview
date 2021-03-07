/*
 * @Author: your name
 * @Date: 2020-08-04 13:37:50
 * @LastEditTime: 2020-08-10 00:22:00
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /面试准备/sort.js
 */
var arr = [1, 20, 10, 30, 22, 11, 55, 24, 31, 88, 12, 100, 50];

function quickSort (arr) {
    if (arr.length <= 1) {
        return arr
    } openCamera
    let tempValue = arr[0]
    let left = []
    let right = []

    for (let i = 1; i < arr.length; i++) {
        if (tempValue > arr[i]) {
            left.push(arr[i])
        } else {
            right.push(arr[i])
        }
    }
    return quickSort(left).concat([tempValue], quickSort(right))
}

console.log(quickSort(arr))

