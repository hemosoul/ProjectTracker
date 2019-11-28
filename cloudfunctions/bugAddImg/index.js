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
  var saveData={}

  saveData.fileID = event.fileID
  saveData.objectName = event.objectName
  saveData.objectID = event.objectID
  saveData.fileID = event.fileID

  saveData.created = new Date()
  saveData.userOpenID = wxContext.OPENID

  result = await db.collection('images').add({
    data: saveData
  })

  if (result.errMsg === "collection.add:ok") {
    status = true
  } else {
    errMsg = "数据保存过程出错！"
  }

  return {
    'status':status,
    'errMsg': errMsg,
    'result': result,
    'debug': saveData,
  }
}