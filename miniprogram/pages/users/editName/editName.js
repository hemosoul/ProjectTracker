var app = getApp()
Page({

  data: {
    error: '',
    currentUser: {
    },

    rules: [{
        name: 'nickName',
        rules: [{
            required: true,
            message: '昵称不能为空！'
          },
          {
            maxlength: 20,
            message: '昵称不得超过20个字符！'
          }
        ],
      },
     

    ],
  },

  onLoad: function(options) {

  },

  onReady: function() {

  },

  onShow: function() {
    this.setData({
      'currentUser': app.globalData.currentUser
    })

  },

  bindNickNameInputChange: function(e) {
    this.setData({
      ['currentUser.nickName']: e.detail.value
    })
  },

  saveEditNameAction: function () {
    var me =this
    this.selectComponent('#nicknameAddForm').validate((valid, errors) => {

      if (!valid) {
        console.log(Object.keys(errors))
        const firstError = Object.keys(errors)
        if (firstError.length) {
          this.setData({
            error: errors[firstError[0]].message
          })

        }
      } else {
        wx.cloud.callFunction({
          name: 'userNameEdit',
          data: {
            'openID': this.data.currentUser.openID,
            'nickName': this.data.currentUser.nickName

          },
          success: function (res) {
            console.log(res)
            if (res.result.status === true) {
              console.log(res.result.result._id)
              app.globalData.currentUser.nickName = me.data.currentUser.nickName
              wx.navigateBack({
                
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
          }
        })

      }

    })

  },

  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})