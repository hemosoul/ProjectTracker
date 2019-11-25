var app = getApp()
Page({

  data: {
    projectID: '',
    projectDetail: {},
    projectUserList: [],
    currentUserCheck:{}

  },

  onLoad: function(options) {
    var me = this
    me.setData({
      projectID: options.projectID
    })
    //获取项目详细信息
    wx.cloud.callFunction({
      name: 'projectDetail',
      data: {
        projectID: options.projectID
      },
      success: function(res) {
        if (res.result.status === true) {
          app.globalData.currentProject = res.result.projectDetail;
          me.setData({
            projectDetail: res.result.projectDetail
          })
          wx.setNavigationBarTitle({
            title: "【" + res.result.projectDetail.projectName + "】首页"
          })
          console.log();
          //更具项目详细信息检查当前用户访问权限
          wx.cloud.callFunction({
            name: 'projectUserCheck',
            data: {
              projectID: res.result.projectDetail._id
            },
            success: function (res) {
              me.setData({
                currentUserCheck: res.result
              })
            }
          })

        }

      }


    })

    //获取项目成员列表
    wx.cloud.callFunction({
      name: 'projectUserList',
      data: {
        projectID: options.projectID
      },
      success: function(res) {
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



  projectUserApplyInAction: function(){
    var me =this
    wx.cloud.callFunction({
      name: 'projectUserApplyInAction',
      data: {
        projectID: me.data.projectDetail._id
      },
      success: function (res) {
        if (res.result.status===true){
          wx.showModal({
            title: '成功了！',
            content: '你已提交申请，请耐心等待审核！',
            showCancel:false,
            success(res) {
              if (res.confirm) {
                
              }
            }
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
  },



  enterProjectHome:function(){
    wx.switchTab({
      url: '/pages/projects/main/main'
    })
  },

  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
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