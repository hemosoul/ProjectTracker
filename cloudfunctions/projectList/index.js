// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'project-mini-8oci7'
})

// 云函数入口函数
exports.main = async (event, context) => {
  var status = false;
  var errMsg = ""
  var result = {}
  var projectList=[]

  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  result = await db.collection('projects').get()
  if (result.data.length > 0) {
    status=true;
    projectList = result.data
  } else{
    errMsg="未查找到任何任何公开项目信息！"
  }
  return {
    'status': status,
    'errMsg': errMsg,
    'projectList': projectList
  }
}