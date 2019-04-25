// pages/detail/detail.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    name:"",//详情页标题
    start_time:"",//开放时间
    end_time:"",
    join_way: "",//地址
    activity_msg: "",//电话
  },
  //加载页面内容
  onLoad: function (option) {
    var that = this;
    console.log("接受的id:" + option.id)

    that.setData({
      myid: option.id,

    })


    //请求数据
    wx.request({
      url: 'http://106.39.228.248/index.php/activity/activityInfo',
      data: {
        id: this.data.myid,
      },
      method: "POST",
      // 请求头部
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res)

        that.setData({
          time: res.data.data[0].start_time + "-" + res.data.data[0].end_time,
          join_way: res.data.data[0].join_way,
          activity_msg:res.data.data[0].activity_msg,
        })

  
      }
    })






  }



  

})