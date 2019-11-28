
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
  var bugID = event.bugID
  result = await db.collection('bugs').where({
    '_id': bugID
  }).
    update({
      data: {
        status: event.status
      }
    })
  if (result.errMsg === "collection.update:ok" || result.stats.updated === 1) {
    status = true
  } else {
    errMsg = "更新出错！"
  }
  return {
    'status': status,
    'errMsg': errMsg,
    'result': result,
    'debug': ''
  }
}