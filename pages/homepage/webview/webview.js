// pages/webview/webview.js

Page({

  data: {
    newsUrl: "",
    title:"",
  },

  /**
   * 初次加载页面 
   * 接受更多活动里面的url ，跳转到相应的预定网址
   */
  onLoad: function (options) {
    var that = this;

    var url=that.options.id;

    console.log(url)

//加载webview 设置webview路径
  this.setData({
  newsUrl:that.options.id,
    title: that.options.title
  })
  
  //动态加载标题
   wx.setNavigationBarTitle({
     title: this.data.title,
    })
  },


})