
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchValue: '',
    mydata: [],
    pages: ""


  },

  mysearchInfo: function (e) {
    console.log("输入框内容：" + e.detail.value)

    this.setData({
      searchValue: e.detail.value,
    });

  },
  //搜索事件点击
  mySearchOnclick: function (e) {
    console.log("输入框内容searchValue：" + searchValue)

    var that = this;
    wx.request({

      url: 'http://106.39.228.248/index.php/venues/venuesList',
      data: {
        page: this.data.pages,
        size: 10,
        name: this.data.searchValue
      },
      method: "POST",
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data.data)

        that.setData({
          mydata: res.data.data
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

  onclickdetail: function (res) {
    var data = res.currentTarget.dataset;
    console.log(data)
    console.log("a", data.name)
    console.log("a", data.index)
    wx.navigateTo({
      url: '/pages/homepage/detail/detail?name=' + data.name + '&id=' + data.index,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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