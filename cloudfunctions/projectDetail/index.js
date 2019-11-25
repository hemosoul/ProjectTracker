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
  var projectDetail={}

  var projectID = event.projectID
  result = await db.collection('projects').where({ '_id': projectID }).get()

  if (result.data.length == 1) {
    status = true;
    projectDetail = result.data[0]
  } else {
    errMsg = "未查找到任何任何公开项目信息！"
  }

  return {
    'status': status,
    'projectDetail': projectDetail,
    'errMsg': errMsg,

  }
}