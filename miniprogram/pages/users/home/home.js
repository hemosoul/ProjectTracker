var app = getApp()
const collect = require('../../../utils/collect.js')
Page({

  data: {
    currentUser:{

    },
    currentProjectRoles:[],
    currentUserIsProjectAdmin:false

  },

  onLoad: function (options) {

  },

  onReady: function () {
    console.log(app)
  },

  onShow: function () {
    var me =this 
    me.setData({
      'currentUser': app.globalData.currentUser
    })

    // 引用外部库
    console.log(app)
    var currentProjectRoles = new collect(app.globalData.currentProjectUserRoles)
    me.setData({
      'currentProjectRoles': currentProjectRoles
    })
    var isProjectAdmin = currentProjectRoles.find({ role: '项目管理员' })
    if (isProjectAdmin === undefined) {

    } else {
      me.setData({
        'currentUserIsProjectAdmin': true
      })
    }

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