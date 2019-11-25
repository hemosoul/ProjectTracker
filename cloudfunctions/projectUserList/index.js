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
  var projectUserList=[]

  var projectID = event.projectID
  //.match({ 'ProjectID': projectID, approved: true }) 
  result = await db.collection('projectUsers')
    .aggregate()
    .match({
      'projectID': projectID,
      'approved':true
    }).
    lookup({
      from: 'users',
      localField: 'userOpenID',
      foreignField: 'openID',
      as: 'userInfo',
    })
    .end()
  if (result.errMsg ==="collection.aggregate:ok"){
    status = true
    projectUserList = result.list
  }

  return {
    'status': status,
    'projectUserList': projectUserList,
    'errMsg': errMsg,

  }


 
}