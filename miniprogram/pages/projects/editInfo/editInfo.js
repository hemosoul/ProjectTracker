var app = getApp()
Page({
  data: {
    error: '',
    currentProject:{},
    rules: [
      {
        name: 'introduction',
        rules: [
          {
            required: true,
            message: '内容不能为空！'
          },
          {
            maxlength: 100,
            message: '内容不得超过100个字符！'
          }
        ],
      },
    ]

  },

  onLoad: function (options) {
    console.log(app)
  },
  bindInfoInputChange: function (e) {
    this.setData({
      ['currentProject.introduction']: e.detail.value
    })
  },
  saveEditInfoAction:function(){
    var me = this
    this.selectComponent('#projectIntroEditForm').validate((valid, errors) => {

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
          name: 'projectInfoEdit',
          data: {
            'projectID': this.data.currentProject._id,
            'introduction': this.data.currentProject.introduction

          },
          success: function (res) {
            console.log(res)
            if (res.result.status === true) {
              console.log(res.result.result._id)
              app.globalData.currentProject.introduction = me.data.currentProject.introduction
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
  onReady: function () {

  },

  onShow: function () {
    this.setData({
      'currentProject': app.globalData.currentProject
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