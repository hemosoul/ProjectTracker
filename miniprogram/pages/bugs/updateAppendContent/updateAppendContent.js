Page({
  data: {
    bugDetail: {}
  },

  onLoad: function () {

  },

  onReady: function () {

  },

  onShow: function () {


    var me = this
    var bugID = this.options.bugID
    wx.cloud.callFunction({
      name: 'bugDetail',
      data: {
        'bugID': bugID
      },

      success: function (res) {
        if (res.result.status) {

          me.setData({
            'bugDetail': res.result.result[0]
          })

        } else {
          wx.showModal({
            title: '出错了！',
            content: res.result.errMsg,
            showCancel: false,
            success(res) {
              if (res.confirm) {

              }
            }
          })


        }
      },
      fail: console.error
    })
  },

 
  onHide: function () {

  },
  appendContentInput:function(e){
    this.setData({
      ['bugDetail.appendContent']: e.detail.value
    })
  },
  addAppendContent:function(){

      wx.cloud.callFunction({
        name: 'bugAppendContentUpdate',
        data: {
          'bugID': this.data.bugDetail._id,
          'appendContent': this.data.bugDetail.appendContent
        },

        success: function (res) {
          if (res.result.status) {
            //清空当前输入框呢绒
            wx.navigateBack({
              delta: 1
            })
            console.log('OKo')



          } else {
            wx.showModal({
              title: '出错了！',
              content: res.result.errMsg,
              showCancel: false,
              success(res) {
                if (res.confirm) {

                }
              }
            })


          }
        },
        fail: console.error
      })
    
    
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