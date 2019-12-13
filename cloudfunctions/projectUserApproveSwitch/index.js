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

  result = await db.collection('projectUsers').where({
    'userOpenID': event.userOpenID,
    'projectID': event.projectID,
  })
    .update({
      data: {
        'approved': event.approved
      },
    })

  if (result.errMsg === "collection.update:ok") {
    status = true
    errMsg = "修改成功"
  } else {
    errMsg = "数据保存过程出错！"
  }


  return {
    'status': status,
    'errMsg': errMsg,
    'result': result
  }
}