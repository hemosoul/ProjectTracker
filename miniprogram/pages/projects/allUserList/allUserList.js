var app = getApp()
Page({
  data: {
    projectUserList: [],
    res:{}
  },

  onLoad: function (options) {


  },

  onReady: function () {

  },

  onShow: function () {
    var me = this
    console.log(app)
    wx.cloud.callFunction({
      name: 'projectAllUserList',
      data: {
        projectID: app.globalData.currentProject._id
      },
      success: function (res) {
        console.log(res)
        if (res.result.status) {
          me.setData({
            projectUserList: res.result.projectUserList
          })

        } else {
          console.log(res.result.errMsg)
        }

      }

    })
  },
  projectUserApproveSwitchAction:function(e){
    var me=this
    var approved=e.detail.value
    var userOpenID=e.target.dataset.useropenid
    console.log(e)
    wx.cloud.callFunction({
      name: 'projectUserApproveSwitch',
      data: {
        'approved': approved,
        'projectID': app.globalData.currentProject._id,
        'userOpenID': userOpenID
      },
      success: function (res) {
        me.setData({
          'res': res.result
        })
        if (res.result.status === true) {

        } else {
         
          me.onShow()
          
        }
      }
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