var app = getApp()
Page({

  data: {
    bugDetail:{

    },
    currentUser:{

    },
    showActionsheet:false,
    actionSheetList: [
      { text: '变更状态', value: "变更状态" },
      { text: '❌关闭问题', value: "关闭问题" },
      { text: '🎴添加图片', value: "添加图片" },
      { text: '补充说明', type: 'warn', value: "补充说明" }
    ]


  },

  onLoad: function (options) {

  },

  onReady: function () {

  },

  onShow: function () {
    var me =this
    var bugID=this.options.bugID
    me.setData({
      'currentUser': app.globalData.currentUser
    })
    wx.cloud.callFunction({
      name: 'bugDetail',
      data: {
        'bugID': bugID
      },
      
      success: function (res) {
        if (res.result.status) {
          console.log(res.result)
          me.setData({
            'bugDetail': res.result.result[0]
          })
          wx.setNavigationBarTitle({
            'title': res.result.result[0].title
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
  showActionSheet:function(){
    this.setData({
      showActionsheet: true
    })
  },
  //actionSheet分发
  actionSheetClick:function(e){
    

    switch (e.detail.value) {
      case "关闭问题":
        this.closeBugAction()
        break;
      case n:

        break;
      default:

    } 
  },

  closeBugAction:function(){
    var bugID = this.options.bugID
    wx.cloud.callFunction({
      name: 'bugClose',
      data: {
        'bugID': bugID
      },

      success: function (res) {
        if (res.result.status) {
          

        } else {
          


        }
      },
      
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