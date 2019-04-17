// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchValue: '',
    mydata: [],

    
  },

  searchinfo: function (e) {
    console.log("输入框内容：" +e.detail.value)

    this.setData({
      searchValue: e.detail.value,
    });
  
  },

  searchonclick: function (e) {
  var that=this;
    console.log("ddd" + this.data.searchValue)
    wx.request({
      
      url: 'https://api.apiopen.top/musicRankingsDetails?type=' + this.data.searchValue,
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res)

        that.setData({
         mydata: res.data.result
        })
      },
      fail: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      },
    });
    },

  onclickdetail:function(res){
  var data = res.currentTarget.dataset;
    console.log("a", data.name)
    wx.navigateTo({
      url: '/pages/detail/detail?name=' + data.name,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
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