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

  result =await db.collection('bugs').where({
    '_id': event.bugID
  }).
  update({
      data: {
        'appendContent': event.appendContent
      },
  })
  if (result.errMsg === "collection.update:ok" || result.stats.updated === 1) {
    status = true
  } else {
    errMsg = "更新出错！"
  }


  return {
    'status': status,
    'errMsg': errMsg,
    'result': result

  }
}











