const cloud = require('wx-server-sdk')
cloud.init({
  env: 'project-mini-8oci7'
})

exports.main = async (event, context) => {
  var status = false;
  var errMsg = ""
  var result = {}
  var saveData;
  var savedResult={};

  const wxContext = cloud.getWXContext()
  const db = cloud.database()

  result = await db.collection('users').where({ 'openID': wxContext.OPENID, }).get()

  if (result.data.length > 0) {
    errMsg = "用户已授权，请勿重复授权!"
  } else {
    saveData={
      'openID': wxContext.OPENID,
      'created': new Date(),
      'nickName': event.userInfo.nickName,
      'gender': event.userInfo.gender,
      'avatarUrl': event.userInfo.avatarUrl
    }
    try {
      savedResult = await db.collection('users').add({
        data: saveData
      })
      if (savedResult.errMsg === "collection.add:ok") {
        status = true;
      } else {
        errMsg = savedResult.errMsg
      }

    } catch (err) {
      console.log(err);
    }
  }
  

  return {
    'status': status,
    'errMsg': errMsg
  }
}