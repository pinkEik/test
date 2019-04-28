// pages/mine/mine.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    myiconurl:"/images/header.png",
 
     isLogin:false,
	      ss:false,

    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  onclickchangeinfo:function(res){

      wx.navigateTo({
        url: '/pages/mine/changeinfo/changeinfo',
      })
  },

  onclickmyfav:function(){
      wx.showToast({
        icon:false,
      title: '开发小姐姐正在努力赶工中',
    })
  },
  onclickhis: function () {
    wx.showToast({
      title: '敬请期待', 
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,

          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,

            hasUserInfo: true
          })
        }
      })
    }
  },

})