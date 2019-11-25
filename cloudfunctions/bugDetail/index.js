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
  result = await db.collection('bugs')
  .aggregate()
    .match({
      '_id': bugID
    }).
    lookup({
      from: 'users',
      localField: 'userOpenID',
      foreignField: 'openID',
      as: 'creatorInfo',
    })
    .end()

  if (result.errMsg === "collection.aggregate:ok") {
    status = true
  } else {
    errMsg = "查询出错"
  }

  return {
    'status': status,
    'errMsg': errMsg,
    'result': result.list,
    'debug':""
  }
}