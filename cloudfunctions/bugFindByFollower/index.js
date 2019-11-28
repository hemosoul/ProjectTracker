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
  result = await db.collection('followers')
    .aggregate()
    .match({
      'projectID': event.projectID,
      'userOpenID': wxContext.OPENID
    }).
    lookup({
      from: 'bugs',
      localField: 'bugID',
      foreignField: '_id',
      as: 'bugInfo',
    })
    .end()


  if (result.errMsg ==="collection.aggregate:ok") {
    status = true
  } else {
    errMsg = "查询出错！"
  }

  return {
    'status': status,
    'errMsg': errMsg,
    'result': result,
    'debug': result
  }

}