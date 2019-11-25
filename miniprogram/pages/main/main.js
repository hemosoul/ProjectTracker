var app = getApp()
Page({

  data: {

  },

  onLoad: function (options) {

  },


  onReady: function () {

  },


  onShow: function () {
    wx.cloud.callFunction({
      name: 'userCheck',
      data: {
      },
      success: function (res) {

        if (res.result.status) {
          app.globalData.currentUser = res.result.result.data[0]
          //console.log(app.globalData.currentUser)
          wx.redirectTo({
            url: '/pages/projects/list/list',
          })

        } else {
          wx.redirectTo({
            url: '/pages/users/login/login'
          })

        }
      },
      fail: console.error
    })

  },

  
  onHide: function () {

  },

  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})