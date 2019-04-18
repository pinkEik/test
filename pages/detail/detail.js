// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,//tab默认选中第一个

    title:"1",//详情页标题
    time:"",//开放时间
    address: "",//地址
    phone: "",//电话
    subscribeUrl: "",//立即预约 网址url
    swiperinfo:"",//tab 切换底部内容
    showOrHidden: false,//评论是否显示  false显示 true隐藏
    showOrHiddenInfo: true,//场馆介绍 景区须知是否显示 和showOrHidden相对应
    publishInfo:"",//发布框内容
    goodArray: [
      { "title": "标题3", "src": "/images/img2.png", "name": "内容", "id": 23 },
      { "title": "brand", "src": '/images/img1.png', "name": "内容", "id": 3 },
      { "title": "ratio", "src": " /images/img2.png", "name": "内容", "id": 3 },
      { "title": "标题3", "src": "/images/img2.png", "name": "内容", "id": 13 },
      { "title": "标题3", "src": "/images/img2.png", "name": "内容", "id": 31 },

    ],
    tabArray: ["评论", "景区须知", "场馆介绍", "交通指南"]

  },

  
// 跳转到立即预约界面
  onclick: function (res) {
    wx.navigateTo({
      url: '/pages/webview/webview?id=' + "list.index",
    })
  },

  //事件处理函数
  bindChange: function (e) {
    var that = this;
    that.setData({ 
            currentTab: e.detail.current,
       });

    console.log("“bindChange”" + this.data.currentTab)
    if (this.data.currentTab==0){
      that.setData({
        showOrHidden: false,
        showOrHiddenInfo:true
      })
    }else{
      that.setData({
        showOrHidden: true,
        showOrHiddenInfo: false
      })

    }
  },


  swichNav: function (e) {
    var that = this;
    
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
      // 设置显示隐藏
      if (e.target.dataset.current == 0) {
        that.setData({
          showOrHidden: false,
          showOrHiddenInfo: true
        })
      } else {
        that.setData({
          showOrHidden: true,
          showOrHiddenInfo: false
        })
      }
  },

//获取发布框输入的内容
  searchinfo:function(e){
  
  console.log("输入框内容：" + e.detail.value)
  this.setData({
    publishInfo: e.detail.value,
  });
  },

  //发布按钮点击
  onclickpublish:function(e){

    console.log("====" + this.data.publishInfo)

    //请求数据
    wx.request({

      url: 'https://api.apiopen.top/musicRanki=1'+this.data.publishInfo+'&user_id='+"1",
      method: "POST",
      data: {
        teacherid: teacherid
      },
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log("====" + res)

      },fail:function(res){
        wx.showToast({
          title: '发送失败',
        })
      }
    })

   
  },

  //加载页面内容
  onLoad: function (option) {
    var that=this;
    console.log("接受的id:"+option.id)
    this.setData({
       id :option.id,
    })

    //请求数据
    wx.request({
      url: 'https://api.apiopen.top/musicRankingsDetails?type=1',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {

        that.setData({
          title: res.data.message,
        
          time: res.data.message,
          address: res.data.message,
          phone: res.data.message,
          subscribeUrl: res.data.message,
          swiperinfo: res.data.message
        
          
        })

        //设置navigationtitle
        wx.setNavigationBarTitle({
          title: res.data.message
        })
      }
    })

 
   



  }
  

})