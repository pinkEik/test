//index.js   https://github.com/Leanper/dbd.git
//获取应用实例
const app = getApp()
var pages = 0;
Page({
  data: {
    totalPage:0,
    nowPage: 1,
    selectShow: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    index: 0, //选择的下拉列表下标
    goodArray: "",
    activityImg: "",
    newactobj:[
      { 'title': '创客大赛2019', 'id': "1","pic_big":'../../../images/img1.png'},
      { 'title': '创客大赛2019', 'id': "2", "pic_big": '../../../images/img2.png' },
      { 'title': '创客大赛2019', 'id': "4", "pic_big": '../../../images/img3.png' }

    ],
    //下拉列表数据
    selectData: [{
        "id": "0",
        "text": "北京"
      },
      {
        "id": "1",
        "text": "河北"
      },
      {
        "id": "2",
        "text": "天津"
      }
    ],
  },
  // 点击下拉显示框
  selectTap() {
    this.setData({
      selectShow: !this.data.selectShow
    });
  },

  // 点击下拉列表
  optionTap(e) {
    let Index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    this.setData({
      index: Index,
      selectShow: !this.data.selectShow
    });
  },

  //跳转到搜索界面
  search: function(res) {
    wx.navigateTo({
      url: '/pages/homepage/search/search',
    })
  },
  //轮播图点击事件swipclick
  swiperclick: function(e) {
    wx.navigateTo({
     // url: '/pages/homempae/detail/detail?id=' + e.currentTarget.id,
      url: '/pages/homempae/webview/webview'
    })
  },

  mine:function(res){
    wx.navigateTo({
      url: '/pages/mine/mine/mine',
    })
  },
  //场馆点击事件处理
  onclickItem: function(res) {
    var data = res.currentTarget.dataset;
    console.log("a", data.name)
    console.log("a", data.index)
    wx.navigateTo({
      url: '/pages/homepage/detail/detail?name=' + data.name + '&id=' + data.index,
    })
  },

  // 加载数据
  onLoad: function(e) {
    var that = this
    //场馆列表
    wx.request({
        url: 'http://106.39.228.248/index.php/venues/venuesList',

        data: {
          page: pages,
          size: 10
        },
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        success: function(res) {
          console.log(res)

          that.setData({
            goodArray: res.data.data,
            totalPage:res.data.page.total_page,
            nowPage: res.data.page.page_num
          })
        }
      })

  
  },



  //加载更多数据
  onReachBottom: function (e) {
    var that = this;
    // 显示加载图标
    wx.showLoading({
      title: '玩命加载中',
    })

    console.log("a", this.data.totalPage + "=========" + this.data.nowPage)

    //判断是否为最后一页
    if (this.data.totalPage == this.data.nowPage) {
      wx.showToast({
        title: '到底了',
      })
      return;
    }

    if (that.data.totalPage > pages) {
      // 页数+1
      pages = pages + 1;
    }

    console.log("当前页面", pages)

    wx.request({
      url: 'http://106.39.228.248/index.php/venues/venuesList',

      //请求参数
      data: {
        page: pages,
        size: 10
      },
      method: "POST",
      // 请求头部
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {

        console.log("转化为" + res)
        console.log("集合长度：" + res.data.data.length)

        console.log("当前页面长度：" + res.data.page.page_num
        )
        if (res.data.data.length == 0) {
          wx.showToast({
            title: '没内容了',
          })
          return;
        }
        // 回调函数
        var moment_list = that.data.goodArray;

        if (res.data.data.length > 0) {
          for (var i = 0; i < res.data.data.length; i++) {
            moment_list.push(res.data.data[i]);
          }
        } else {
          wx.showToast({
            title: '没内容了',
          })
        }
        // 设置数据
        that.setData({
          goodArray: moment_list
        })
        // 隐藏加载框
        wx.hideLoading();
      }, fail: function (e) {
        wx.showToast({
          title: '请求失败',
        })
      }
    })
  },

})