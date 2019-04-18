//index.js
//获取应用实例
const app = getApp()
var pages = 1;
Page({
  data: {
    selectShow: false,//控制下拉列表的显示隐藏，false隐藏、true显示
 
    //下拉列表数据
    selectData: [
      {"id": "0","text": "北京" },
       {"id": "1","text": "上海" },
      { "id": "1", "text": "广州"}],

    index: 0,//选择的下拉列表下标
    goodArray:[],
    activityImg:""
  },
  // 点击下拉显示框
  selectTap() {
    this.setData({
      selectShow: !this.data.selectShow
    });
  },


  // 点击下拉列表
  optionTap(e) {
    let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    this.setData({
      index: Index,
      selectShow: !this.data.selectShow
    });
  },

  //跳转到搜索界面
  search:function(res){
      wx.navigateTo({
        url: '/pages/homepage/search/search',
      })
  },

  //轮播图点击事件swipclick
  onclickswiper: function (e) {
    wx.navigateTo({
      url: '/pages/homempae/detail/detail?id=' + e.currentTarget.id,
    })
  },

//场馆点击事件处理
onclickItem:function(res){
  var data = res.currentTarget.dataset;
  console.log("a", data.name)
  console.log("a", data.index)
  wx.navigateTo({
    url:'/pages/homepage/detail/detail?name=' + data.name + '&id=' + data.index,
      })
  },



// 加载数据
  onLoad:function(){
    var that = this

    //场馆列表
    wx.request({
      url: 'http://106.39.228.248/index.php/venues/venuesList',
      data: {
        page: pages,
        size:10
      },
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        
        that.setData({
          goodArray: res.data.data
        })
      }
    }),

    //请求最新活动轮播图
      wx.request({
      url: 'http://106.39.228.248/index.php/venues/venuesList',
      data: {
        page: pages,
        size:10
      },
      method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          console.log(res)

          that.setData({
            activityImg: res.data.data.auto
            // docid
            //res代表success函数的事件对，data是固定的，list是数组
          })
        }
      })
  },

//加载轮播图数据
  requestActivity:function(){
    wx.request({
      url: 'http://106.39.228.248/index.php/venues/venuesList',
      data: {
        page: pages,
        size:10
      },
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        that.setData({
          activityImg: res.data.data.auto    
        })
      }
    })
  },

//加载更多数据
   onReachBottom: function () {
    var that = this;
    // 显示加载图标
    wx.showLoading({
      title: '玩命加载中',
    })

    // 页数+1
     pages = pages+1;
     console.log("a",pages )

    wx.request({
      url: 'http://106.39.228.248/index.php/venues/venuesList',
      data:{
          page:pages,
          size:10
      },
      method: "POST",
      // 请求头部
      header: {
        'content-type': 'application/text'
      },
      success: function (res) {
        console.log("b"+res)

       


        // 回调函数
        var moment_list = that.data.goodArray;
     
        if (res.data.result!=null){
        for (var i = 0; i < res.data.result.length; i++) {
          moment_list.push(res.data.result[i]);
        }
      }else{
     
          wx.showToast({
            title: '没内容了',
          })
      }
     // 隐藏加载框
        wx.hideLoading();

        
        // 设置数据
        that.setData({
          goodArray: moment_list
        })
        console.log("c" + goodArray)
        // 隐藏加载框
        wx.hideLoading();
      }
    })
    //http://106.39.228.248/index.php/venues/venuesList
  },

})
