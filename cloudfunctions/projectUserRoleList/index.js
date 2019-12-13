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
  var projectUserRoles=[]

  var projectID = event.projectID
  //.match({ 'ProjectID': projectID, approved: true }) 
  result = await db.collection('projectUserRoles')
    .aggregate()
    .match({
      'projectID': projectID,
      'userOpenID': wxContext.OPENID
    }).end()
  if (result.errMsg ==="collection.aggregate:ok"){
    status = true
    projectUserRoles = result.list
  }

  return {
    'status': status,
    'projectUserRoles': projectUserRoles,
    'errMsg': errMsg,

  }


 
}