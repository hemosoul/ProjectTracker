var app = getApp()
Page({


  data: {
    bugList: [],
    statusList: ["","",'待跟进', '已处理', '👍已关闭','📙已延期']

  },

  onLoad: function (options) {

    var status = this.options.status

    wx.setNavigationBarTitle({
      title: "【" + this.data.statusList[status] + "】问题汇总"
    })





  },

  onReady: function () {


  },


  onShow: function () {
    var me = this
    var status = this.options.status
    wx.cloud.callFunction({
      name: 'bugListByStatus',
      data: {
        'projectID': app.globalData.currentProject._id,
        'status': parseInt(status)
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