// pages/buy/buy.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
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
  
  },

  earth: function() {
    var app = getApp();
    app.globalData.detailid = 1;
    app.globalData.body = '哈顿星球成长学院-地球卡';
    app.globalData.imageNo = 1;
    this.card();
  },
  mars: function () {
    var app = getApp();
    app.globalData.detailid = 3;
    app.globalData.body = '哈顿星球成长学院-火星卡';
    app.globalData.imageNo = 2;
    this.card();
  },
  jupiter: function () {
    var app = getApp();
    app.globalData.detailid = 4;
    app.globalData.body = '哈顿星球成长学院-木星卡';
    app.globalData.imageNo = 3;
    this.card();
  },
  venus: function () {
    var app = getApp();
    app.globalData.detailid = 5;
    app.globalData.body = '哈顿星球成长学院-金星卡';
    app.globalData.imageNo = 4;
    this.card();
  },
  mercury: function () {
    var app = getApp();
    app.globalData.detailid = 6;
    app.globalData.body = '哈顿星球成长学院-水星卡';
    app.globalData.imageNo = 5;
    this.card();
  },
  saturn: function () {
    var app = getApp();
    app.globalData.detailid = 7;
    app.globalData.body = '哈顿星球成长学院-土星卡';
    app.globalData.imageNo = 6;
    this.card();
  },
  uranus: function () {
    var app = getApp();
    app.globalData.detailid = 8;
    app.globalData.body = '哈顿星球成长学院-天王星卡';
    app.globalData.imageNo = 7;
    this.card();
  },

  card:function() {
    var app = getApp();
    wx.request({
      url: 'https://www.hattonstar.com/getCard',
      data: {
        detail_id: app.globalData.detailid,
      },
      method: 'POST',
      success: function (res) {
        var app = getApp();
        app.globalData.cardprice = res.data.PRICE;
        app.globalData.cardtype = res.data.TYPE;
        app.globalData.playnum = res.data.USENUM;
        wx.redirectTo({
          url: '../card/card',
        })
      },
      fail: function (res) {
        wx.showModal({
          title: '错误提示',
          content: '服务器无响应，请联系工作人员!',
          success: function (res) {
            if (res.confirm) {
              return;
            }
          }
        })
      }
    })
  }
})