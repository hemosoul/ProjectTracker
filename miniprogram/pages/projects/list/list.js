var app = getApp()
Page({
  data: {
    projectList:[]
  },

  onLoad: function (options) {
    var page=this
    wx.cloud.callFunction({
      name: 'projectList',
      data: {
      },
      success: function (res) {

        if (res.result.status) {
          //console.log(res.result)
          page.setData({
            projectList: res.result.projectList
          })

        

        } else {
         
         

        }
      },
      fail: console.error
    })
    //console.log(app.globalData) 
  }
})