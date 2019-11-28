const cloud = require('wx-server-sdk')

cloud.init({
  env: 'project-mini-8oci7'
})


exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()

  var status = false
  var errMsg = ""
  var result = {}

  const _ = db.command
  result = await db.collection('bugs').where({
    'projectID': event.projectID,
    'status': _.nin(['0', '1']),
    'userOpenID': wxContext.OPENID
  }).
    orderBy('created', 'desc').
    get()

  if (result.errMsg === "collection.get:ok") {
    status = true
  } else {
    errMsg = "查询出错！"
  }

  return {
    'status': status,
    'errMsg': errMsg,
    'result': result,
    'debug': event.projectID
  }

}