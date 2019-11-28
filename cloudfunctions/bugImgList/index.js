const cloud = require('wx-server-sdk')

cloud.init({
  env: 'project-mini-8oci7'
})

// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()

  var status = false;
  var errMsg = ""
  var result = {}

  const _ = db.command
  result = await db.collection('images').where({
    'objectName': 'bugs',
    'objectID': event.bugID
  }).
  orderBy('created', 'asc').
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
    'debug': '',
  }
}