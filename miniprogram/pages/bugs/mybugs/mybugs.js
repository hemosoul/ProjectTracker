var app = getApp()
Page({


  data: {
    bugList: []

  },

  onLoad: function (options) {
    console.log(app)


    wx.setNavigationBarTitle({
      title: "我提交的问题清单"
    })





  },

  addBugDetailAction: function () {
    console.log('OK');
    wx.navigateTo({
      url: '/pages/bugs/add/add'
    })
  },


  searchBugList: function () {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {


  },


  onShow: function () {
    var me = this
    wx.cloud.callFunction({
      name: 'bugFindByMe',
      data: {
        'projectID': app.globalData.currentProject._id
      },
      success: function (res) {
        if (res.result.status === true) {
          me.setData({
            bugList: res.result.result.data
          })

        }

      }
    })

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
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