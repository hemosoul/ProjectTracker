const cloud = require('wx-server-sdk')

cloud.init({
  env: 'project-mini-8oci7'
})

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()

  var status = false;
  var errMsg = ""
  var result = {}
  var resultCode=""
  var resultCodeText=

  result= await db.collection('projectUsers').where({
    'projectID': event.projectID,
    'userOpenID': wxContext.OPENID
  }).get()

  if (result.errMsg ==="collection.get:ok"){
    status=true
    switch (result.data.length) {
      case 0:
        resultCode=0
        resultCodeText="系统中尚未查到对应信息"
        break;
      case 1:
        resultCode=1
        resultCodeText = "系统中已查到对应信息"
        break;
      default:
        resultCode=2
        resultCodeText = "系统中查到多调对应信息"

        
    } 
    
  }else{
    errMsg="查询出错！"
  }

  
  return {
    'status': status,
    'errMsg': errMsg,
    'resultCode': resultCode,
    'resultCodeText': resultCodeText,
    'result': result
  }


}