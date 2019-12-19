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
  var intro = ''
  intro = event.introduction

    result = await db.collection('projects').where({
      '_id': event.projectID
    })
      .update({
        data: {
          'introduction': intro
        },
      })

    if (result.errMsg === "collection.update:ok") {
      status = true
    } else {
      errMsg = "数据保存过程出错！"
    }

  




  return {
    'status': status,
    'errMsg': errMsg,
    'result': result
  }
}