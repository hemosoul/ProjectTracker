var app = getApp()
var uuid = require('../../../utils/uuid.js')
const  collect = require('../../../utils/collect.js')
Page({

  data: {
    bugDetail: {

    },
    bugImagList:[],
    bugCommentList:[],
    bugFollowerList:[],
    currentUserIsFollower:false,
    currentBugComment:{
      content:'',
      bugID:''
    },
    currentUser: {

    },
    showActionsheet: false,
    actionSheetList: [{
        text: '🏓变更状态',
        value: "变更状态"
      },
      {
        text: '❌关闭问题',
        value: "关闭问题"
      },
      {
        text: '🎴添加图片',
        value: "添加图片"
      },
      {
        text: '📝补充说明',
        type: 'warn',
        value: "补充说明"
      }
    ]


  },

  onLoad: function(options) {

  },

  onReady: function() {

  },

  onShow: function() {
    var me = this
    var bugID = this.options.bugID
    me.setData({
      'currentBugComment.bugID': bugID
    })
    me.setData({
      'currentUser': app.globalData.currentUser
    })

    wx.cloud.callFunction({
      name: 'bugDetail',
      data: {
        'bugID': bugID
      },

      success: function(res) {
        if (res.result.status) {
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

    wx.cloud.callFunction({
      name: 'bugImgList',
      data: {
        'bugID': bugID
      },

      success: function (res) {
        if (res.result.status) {
          me.setData({
            'bugImagList': res.result.result.data
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

    wx.cloud.callFunction({
      name: 'bugCommentList',
      data: {
        'bugID': bugID
      },

      success: function (res) {
        if (res.result.status) {
          me.setData({
            'bugCommentList': res.result.result.list
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


    wx.cloud.callFunction({
      name: 'bugFollowerList',
      data: {
        'bugID': bugID
      },

      success: function (res) {
        console.log(res)
        if (res.result.status) {

          me.setData({
            'bugFollowerList': res.result.result.list
          })

          // 引用外部库
          var followerList = new collect(res.result.result.list)
          var isFollowerCheck = followerList.find({ userOpenID: me.data.currentUser.openID })
          if (isFollowerCheck === undefined){

          }else{
            me.setData({
              'currentUserIsFollower': true
            })
          }
          


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
  showActionSheet: function() {
    this.setData({
      showActionsheet: true
    })
  },
  //actionSheet分发
  actionSheetClick: function(e) {


    switch (e.detail.value) {
      case "关闭问题":
        this.closeBugAction()
        break;
      case "添加图片":
        this.addBugImgDirect()
        break;
      case "补充说明":
        this.navToAppendContentAdd()
        break;
      default:

    }
  },

  closeBugAction: function() {
    var me = this
    var bugID = this.options.bugID
    wx.cloud.callFunction({
      name: 'bugClose',
      data: {
        'bugID': bugID
      },

      success: function(res) {
        if (res.result.status) {
          me.setData({
            showActionsheet: false
          })
          //刷新数据
          me.onShow()

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

    })
  },
  //直接添加图片
  addBugImgDirect: function() {
    var me = this
    var bugID = this.options.bugID
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        me.setData({
          showActionsheet: false
        })
        //提示
        wx.showLoading({
          title: '上传中',
        })
        var tempFilePaths = res.tempFilePaths[0]
        var ext = /\.\w+$/.exec(tempFilePaths)[0]
        console.log(tempFilePaths)

        wx.cloud.uploadFile({
          cloudPath: Math.uuid() + ext,
          filePath: tempFilePaths,
          success: function(res) {
            // get resource ID
            console.log(res.fileID)
            wx.cloud.callFunction({
              name: 'bugAddImg',
              data: {
                'objectName': 'bugs',
                'objectID': bugID,
                'fileID': res.fileID
              },

              success: function(res) {
                //关闭提示
                wx.hideLoading()
                //刷新数据
                me.onShow()
              },
              fail:function(){
                //关闭提示
                wx.hideLoading()
              }
            })








          }
        })


      }
    })
  },
  showBigImage:function(e){
    console.log(e)
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: [current]
    })

  },
  bindCommentInputChange:function(e){
    this.setData({
      ['currentBugComment.content']: e.detail.value
    })

  },

  addBugComment:function(){
    var me = this;
    console.log(me.data.currentBugComment.content, me.data.currentBugComment.content === "")
    if (me.data.currentBugComment.content===""){
      console.log('输入内容为空，不保存！')
    }else{
      wx.cloud.callFunction({
        name: 'commentAdd',
        data: {
          'comment': this.data.currentBugComment
        },

        success: function (res) {
          if (res.result.status) {
            //清空当前输入框呢绒
            me.setData({
              'currentBugComment.content': ''
            })
            //刷新
            me.onShow()


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
    }
   
    

  },
  //单独页面添加补充信息
  navToAppendContentAdd:function(){
    var me = this
    var bugID = this.options.bugID
    me.setData({
      showActionsheet: false
    })
    wx.navigateTo({
      url: "/pages/bugs/updateAppendContent/updateAppendContent?bugID=" + bugID
    })

  },


  followBugAction:function(){
    console.log(app)
    var me = this
    var bugID = this.options.bugID
    wx.cloud.callFunction({
      name: 'bugFollowerAdd',
      data: {
        'bugID': bugID,
        'projectID':app.globalData.currentProject._id,
      },

      success: function (res) {
        console.log(res)
        if (res.result.status){
          

          wx.showModal({
            title: '成功了！',
            content: '已成功更进！',
            showCancel: false,
            success(res) {
              if (res.confirm) {
                //刷新数据
                me.onShow()

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



  //单独页面添加图片
  addBugImg: function() {
    var me = this
    var bugID = this.options.bugID
    me.setData({
      showActionsheet: false
    })
    wx.navigateTo({
      url: "/pages/bugs/addImg/addImg?bugID=" + bugID
    })

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