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
  var nickName = ''
  nickNamee = event.nickName

  if (wxContext.OPENID  === event.openID){
    result = await db.collection('users').where({
      'openID': event.openID
    })
      .update({
        data: {
          'nickName': nickNamee
        },
      })

    if (result.errMsg === "collection.update:ok") {
      status = true
    } else {
      errMsg = "数据保存过程出错！"
    }

  }else{
    errMsg = "你只能修改你本人的昵称！"
  }
  

  

  return {
    'status': status,
    'errMsg': errMsg,
    'result': result
  }
}