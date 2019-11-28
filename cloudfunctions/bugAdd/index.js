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
  saveData=event.bugDetail
  saveData.created = new Date()

  result = await db.collection('bugs').add({
    data: saveData
  })
  
  if (result.errMsg === "collection.add:ok") {
    status = true
  } else {
    errMsg = "数据保存过程出错！"
  }

  return {
   'status':status,
   'errMsg':errMsg,
   'result':result
  }
}