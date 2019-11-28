const cloud = require('wx-server-sdk')

cloud.init({
  env: 'project-mini-8oci7'
})

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  const wxContext = cloud.getWXContext()

  var status = false;
  var errMsg = ""
  var result = {}
 /*  result =await db.collection('bugs').where({
    'projectID': event.projectID
  }).count() */
  const $ = db.command.aggregate
  result = await db.collection('bugs').aggregate()
    .match({
      'projectID': event.projectID
    })
    .group({
      _id: '$status',
      'count': $.sum(1)
    })
    .end()
  if (result.errMsg === "collection.aggregate:ok") {
    status = true
  } else {
    errMsg = "数据汇总过程出错！"
  }

  return {
    'status': status,
    'errMsg': errMsg,
    'result': result,
    'debug':''
  }

}