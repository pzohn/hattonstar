// pages/information/information.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled: true,
    phone:'',
    name:'',
    sex:'Girl',
    age:'',
    father:'',
    mother:'',
    address:'',
    carddesc:'无',
    cardnum:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app = getApp();
    console.log(app);
    if (app.globalData.sex == 1){
      this.setData({ sex: 'Boy' });
    }
    if (app.globalData.carddesc != "") {
      this.setData({ carddesc: app.globalData.carddesc });
    }
    this.setData({ phone: app.globalData.phone });
    this.setData({ name: app.globalData.name });
    this.setData({ age: app.globalData.age });
    this.setData({ father: app.globalData.father });
    this.setData({ mother: app.globalData.mother });
    this.setData({ address: app.globalData.address });
    this.setData({ cardnum: app.globalData.cardnum });

    if (app.globalData.cardnum > 0) {
      this.setData({ disabled: true, btnstate: "default" });
    } else {
      this.setData({ disabled: false, btnstate: "primary" });
    }
  },
  
  createcode:function(){
    wx.navigateTo({
      url: '../code/code',
    })
  },

  edit:function(){
    wx.navigateTo({
      url: '../edit/edit',
    })
  },

  buy: function () {
    wx.navigateTo({
      url: '../card/card',
    })
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