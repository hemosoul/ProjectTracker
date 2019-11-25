const cloud = require('wx-server-sdk')
cloud.init({
  env: 'project-mini-8oci7'
})

exports.main = async(event, context) => {
  
  var status =false;
  var errMsg=""
  var result = []

  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  
  result = await db.collection('users').where({'openID': wxContext.OPENID,}).get()

  if (result.data.length>0){
    status=true;
  } else {
    errMsg="你尚未授权登陆"
  }
  return {
    'status': status,
    'errMsg': errMsg,
    'result': result
  }
 

 
}

