
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg:'青空',
    userInfo:{},
    isShow:true
  },
  handleClick(){
    wx.navigateTo({
      url:'/pages/list/list'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log('onload 页面加载')
    this.getUserInfo()
  },
  getUserInfo(){
    //判断是否已经授权
    wx.getSetting({
      success: (data) => {
        // console.log(data)
        if (data.authSetting['scope.userInfo']) {
          //已经授权,不显示获取按钮
          this.setData({
            isShow : false
          })
        } else {
          //未授权
          isShow : true
        }
      }
    })
    //获取用户登录信息
    wx.getUserInfo({
      success: (data) => {
        // console.log(data)
        //更新用户信息
        this.setData({
          userInfo: data.userInfo
        })
      },
      fail: () => {
        console.log('获取用户信息失败')
      }
    })
  },
  handleGetUserInfo(data){
    console.log(data)
    if (data.detail.rawData){
      this.getUserInfo()
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

    // console.log('onReady 初次渲染完成')

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // console.log('onShow 页面显示')

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // console.log('onHide 页面隐藏')

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