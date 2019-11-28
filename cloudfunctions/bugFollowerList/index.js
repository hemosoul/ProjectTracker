// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'project-mini-8oci7'
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()

  var status = false;
  var errMsg = ""
  var result = {}

  const _ = db.command
  result = await db.collection('followers')
    .aggregate()
    .match({
      'bugID': event.bugID
    }).
    lookup({
      from: 'users',
      localField: 'userOpenID',
      foreignField: 'openID',
      as: 'followerInfo',
    })
    .end()

  if (result.errMsg === "collection.aggregate:ok") {
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