Page({
  data: {
    bugDetail:{}
  },

  onLoad:function() {
    this.setData({
      selectBugImg: this.selectBugImg.bind(this),
      addBugImg: this.addBugImg.bind(this)
    })
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
  uploadError:function(){
    console.log('图片上传出错。')
  },
  uploadSuccess:function(){

  },
  selectBugImg: function (selectBugImg){

  },
  addBugImg:function(selectedImg){
    console.log(selectedImg)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject('some error')
      }, 1000)
    })
   /*  wx.cloud.uploadFile({
      cloudPath: 'example.png', // 上传至云端的路径
      filePath: '', // 小程序临时文件路径
      success: res => {
        // 返回文件 ID
        console.log(res.fileID)
      },
      fail: console.error
    }) */


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