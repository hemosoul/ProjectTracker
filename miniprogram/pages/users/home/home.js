var app = getApp()
Page({

  data: {
    currentUser:{}

  },

  onLoad: function (options) {

  },

  onReady: function () {
    console.log(app)
  },

  onShow: function () {
    this.setData({
      'currentUser': app.globalData.currentUser
    })

  },
  backToProjectList:function(){
    wx.redirectTo({
      url: '/pages/projects/list/list',
    })
  },
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