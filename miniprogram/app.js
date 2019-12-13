App({
  globalData: {
    currentUser: {},
    currentUserRoles:[],
    currentProjectUserRoles:[],
    currentProject:[]
  },
  onLaunch: function () {
    var app =this;

    wx.cloud.init({
      env: 'project-mini-8oci7',
      traceUser: true,
    })

  }
  
})
