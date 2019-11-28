// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'project-mini-8oci7'
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()

  var status = false
  var errMsg = ""
  var result = {}
  var debug = {}
  var checkRes={}
  var saveData={}
  saveData.bugID = event.bugID
  saveData.userOpenID = wxContext.OPENID
  saveData.created=new Date()
  saveData.projectID =event.projectID

  const _ = db.command
  checkRes = await db.collection('followers').where({
    'bugID': event.bugID,
    'userOpenID': wxContext.OPENID
  }).
  orderBy('created', 'desc').
  get()
  
  if (checkRes.errMsg ==="collection.get:ok"){
    if (checkRes.data.length>0){
      errMsg = "你已更进了，请勿重复操作"
    }else{
      result = await db.collection('followers').add({
        data: saveData
      })

      if (result.errMsg === "collection.add:ok"){
        status = true
      }else{
        errMsg = "数据保存失败，请重试。"
      }
      
    }

  }else{
    errMsg="查询过程出错"
  }





  return {
    'status': status,
    'errMsg': errMsg,
    'result': result,
    'debug': checkRes

  }
}