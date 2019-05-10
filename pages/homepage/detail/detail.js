// pages/detail/detail.js

// pages/contact-us/contact-us.js
// 引入SDK核心类
var QQMapWX = require('../../../js/qqmap-wx-jssdk.js');
var demo = new QQMapWX({
  key: "M4LBZ-VXULX-FSY4V-ZMSQY-SQZX3-JJFMG"
});
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0, //tab默认选中第一个
    myid: '', //场馆id
    mytitle: "", //详情页标题
    time: "", //开放时间
    address: "", //地址
    phone: "", //电话
    splashImg: "",
    subscribeUrl: "", //立即预约 网址url
    swiperinfo: "", //tab 切换底部内容
    showOrHidden: false, //评论是否显示  false显示 true隐藏
    showOrHiddenInfo: true, //场馆介绍 景区须知是否显示 和showOrHidden相对应
    publishInfo: "", //发布框内容
    arrayTabInfo: [], //底部tab内容
    commentsList: "", //评论列表

    tabArray: ["评论", "景区须知", "场馆介绍", "交通指南"],
    //地图
    showModal: false,
    gd: true,
    xn: false,
    hd: false,
    xb: false

  },


  //没有图片显示默认图片
  // loadimg: function() {
  //   this.setData({
  //     splashImg: '/images/banner.jpg'
  //   })
  // },


  

  //事件处理函数
  bindChange: function(e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current,
    });

    console.log("“bindChange”" + this.data.currentTab)
    if (this.data.currentTab == 0) {
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

    if (this.data.currentTab == 1) {
      that.setData({
        swiperinfo: this.data.arrayTabInfo[0],
      })
    } else if (this.data.currentTab == 2) {
      that.setData({
        swiperinfo: this.data.arrayTabInfo[1],
      })
    } else if (this.data.currentTab == 3) {
      that.setData({
        swiperinfo: this.data.arrayTabInfo[2],
      })
    }
  },


  swichNav: function(e) {
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

    if (this.data.currentTab == 1) {
      that.setData({
        swiperinfo: this.data.arrayTabInfo[0],
      })
    } else if (this.data.currentTab == 2) {
      that.setData({
        swiperinfo: this.data.arrayTabInfo[1],
      })
    } else if (this.data.currentTab == 3) {
      that.setData({
        swiperinfo: this.data.arrayTabInfo[2],
      })
    }


  },

  //获取发布框输入的内容
  searchinfo: function(e) {

    console.log("输入框内容：" + e.detail.value)
    this.setData({
      publishInfo: e.detail.value,
    });
  },

  //发布按钮点击
  onclickpublish: function(e) {

    console.log("点击发布按钮获取 评论内容：" + this.data.publishInfo)

    //发送评论
    wx.request({

      url: 'http://106.39.228.248/index.php/comments/addComments',
      data: {
        venues_id: this.data.myid,
        user_id: 1,
        msg: this.data.publishInfo
      },
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        console.log("====" + res.data.message)
        wx.showToast({
          title: '发送成功',
        })
      },
      fail: function(res) {
        wx.showToast({
          title: '发送失败',
        })
      }
    })


  },

  //加载页面内容
  onLoad: function(option) {
    var that = this;
    console.log("接受的id:" + option.id)
    console.log("接受的name:" + option.name)

    that.setData({
      myid: option.id,
      mytitle: option.name,
    })

    //设置navigationtitle
    wx.setNavigationBarTitle({
      title: option.name
    })

    //请求数据
    wx.request({
      url: 'http://106.39.228.248/index.php/venues/venuesInfo',
      data: {
        'id': this.data.myid,
      },
      method: "POST",
      // 请求头部
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        console.log(res)

        that.setData({
          time: res.data.data[0].start_time + "-" + res.data.data[0].end_time,
          address: res.data.data[0].address,
          phone: res.data.data[0].phone,
          subscribeUrl: res.data.data[0].booking_url,
          splashImg: res.data.data[0].venues_img,
          arrayTabInfo: [
            res.data.data[0].instructions,
            res.data.data[0].venues_describe,
            res.data.data[0].traffic_guidance
          ]


        })

        //设置navigationtitle+
        wx.setNavigationBarTitle({
          title: res.data.data.name
        })

      }
    })


    //请求评论接口
    wx.request({
      url: 'http://106.39.228.248/index.php/comments/commentsList',
      data: {
        page: 0,
        size: 10,
        id: this.data.myid,
      },
      method: "POST",
      // 请求头部
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        console.log(res)

        that.setData({
          commentsList: res.data.data

        })



      }
    })





  },


// 跳转到立即预约界面
  onclick: function (res) {
    wx.navigateTo({
      url: '/pages/homepage/webview/webview?id=' + this.data.subscribeUrl + "&title=" + this.data.mytitle,
    })
  },

  //地图
  seeMap: function () {
    // 调用接口
    // demo.reverseGeocoder({
    //   location: {
    //     latitude: 39.984060,
    //     longitude: 116.307520
    //   },
    //   success: function (res) {
    //     console.log(res);
    //   },
    //   fail: function (res) {
    //     console.log(res);
    //   },
    //   complete: function (res) {
    //     console.log(res);
    //   }
    // });
    //地址解析(地址转坐标)     

    demo.geocoder({
      address: '北京市朝阳区育慧里4号',
      success: function (res) {
        //console.log(res.result.location.lng);
        var latitude = res.result.location.lat
        var longitude = res.result.location.lng
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          scale: 28
        })

      },
      fail: function (res) {
        // console.log(res);
      },
      complete: function (res) {
        // console.log(res);
      }
    });
  },
  preventTouchMove: function () {
  },
  go: function () {
    this.setData({
      showModal: false
    })
  },
  /**
   * 弹出层函数 结束
   */
  onToggle(e) {
    let idId = e.currentTarget.dataset.id;
    switch (idId) {
      case 'gd':
        this.setData({
          gd: this.data.gd ? false : true
        })
        break;
      case 'xn':
        this.setData({
          xn: this.data.xn ? false : true
        })
        break;
      case 'hd':
        this.setData({
          hd: this.data.hd ? false : true
        })
        break;
      case 'xb':
        this.setData({
          xb: this.data.xb ? false : true
        })
        break;
    }
  }



})