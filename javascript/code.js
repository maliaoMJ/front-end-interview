var phone 
var city
var buttonDOM 
var urls = ""
buttonDOM.onclick = function () {
	// 参数判断是否合法
	if(!phone || !city) {
		showDialog('补全信息')
		return false
	}
	// 整合发送的数据
    let data = {
    	phone,
    	city
    }
    // 发送数据
    sendUserInfo(data).then(res => {
    	// 假设状态码res.statusCode
    	if(res.statusCode === 200) {
    	  sendTrack()
          jump()
    	} else if(res.statusCode === 601) {
    	    sendTrack()
            jump()

    	} else if(res.statusCode === 602){
          showDialog('网络异常！')
    	} else {
           throw Error('其他错误')
    	}
    }).catch((error)=>{
    	// 错误处理
    })


}