var app = getApp()
Page({

  userAuthAction: function(event) {
    var userInfo = event.detail.userInfo
    if (userInfo) {
      wx.cloud.callFunction({
        name: 'userAuth',
        data: {
          'userInfo': userInfo
        },
        success: function(res) {
          console.log(res)
          if (res.result.status) {

            wx.redirectTo({
              url: '/pages/main/main',
            })

          } else {
            wx.showModal({
              title: '出错了!',
              content: res.result.errMsg,
              showCancel: false,
              success(res) {

              }
            })




          }
        },

      })

    } else {
      wx.showModal({
        title: '哎呀！!',
        content: '这个小程序需要您的授权才能使用！😄',
        showCancel: false,
        success(res) {

        }
      })

    }

  }

})