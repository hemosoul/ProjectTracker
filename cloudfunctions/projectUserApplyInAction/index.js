const cloud = require('wx-server-sdk')

cloud.init({
  env: 'project-mini-8oci7'
})

exports.main = async (event, context) => {

  const wxContext = cloud.getWXContext()
  const db = cloud.database()

  var status =false
  var errMsg=""
  var result={}
  var debug={}


  checkRes=await cloud.callFunction({
    name: 'projectUserCheck',
    // 传递给云函数的参数
    data: {
      projectID: event.projectID,
    }
  })
  if (checkRes.result.status===true){
    if (checkRes.result.resultCode === 0) {
      result = await db.collection('projectUsers').add({
        data:{
          projectID: event.projectID,
          userOpenID: wxContext.OPENID,
          approved: false,
          applyTime: new Date(),
          approvedTime: '',
          approverOpenID:''
        }
      })
      if (result.errMsg==="collection.add:ok"){
        status=true
      }else{
        errMsg="数据保存过程出错！"
      }


    } else {
      errMsg = "您已申请加入过，请耐心等待审核,请勿重复申请！"
    }


  }else{
    errMsg="请求出错"
  }

  return {
    'status': status,
    'errMsg': errMsg,
    'result': result,
    'debug': checkRes

  }
}