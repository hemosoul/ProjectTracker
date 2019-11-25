var app = getApp()
Page({

  data: {
    error:'',

    priorLevel: ['高', '中', '低',],
    priorLevelIndex: 0,


    rules: [
      {
        name: 'title',
        rules: [
          { required: true, message: '问题标题必填' },
          { maxlength: 12, message: '不得超过是12个字符'}
        ],
      }, 
      {
        name: 'detail',
        rules: { required: true, message: '问题详情必填' },
      }
      
    ],

    bugDetail: {
      appendContent: '',
      detail: '',
      projectID: '',
      status: '',
      title: '',
      userOpenID: '',
      prior:'',
      status:''
    }

  },

  onLoad: function (options) {
    console.log(app.globalData);
    //初始化当前用户标识和项目标识
    this.setData({
      ['bugDetail.projectID']: app.globalData.currentProject._id,
      ['bugDetail.userOpenID']: app.globalData.currentUser.openID,
      ['bugDetail.prior']:'高'

    })

  },

  addBugAction:function(){
    this.selectComponent('#bugAddForm').validate((valid, errors) => {

      if (!valid) {
        console.log(Object.keys(errors))
        const firstError = Object.keys(errors)
        if (firstError.length) {
          this.setData({
            error: errors[firstError[0]].message
          })

        }
      } else {
        this.setData({
          ['bugDetail.status']:2
        })
        wx.cloud.callFunction({
          name: 'bugAdd',
          data: {
            bugDetail: this.data.bugDetail
          },
          success: function (res) {
            console.log(res)
            if (res.result.status===true){
              console.log(res.result.result._id)
              wx.redirectTo({
                url: "/pages/bugs/detail/detail?bugID=" + res.result.result._id
              })

            }else{
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

  bindTitleInputChange:function(e){
    this.setData({
      ['bugDetail.title']: e.detail.value
    })
  },

  bindDetailInputChange:function(e){
    this.setData({
      ['bugDetail.detail']: e.detail.value
    })
  },
  bindProirLevelChange:function(e){
    console.log(this)
    this.setData({
      ['bugDetail.prior']: this.data.priorLevel[e.detail.value]
    })

  },
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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