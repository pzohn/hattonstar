Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageName:'',
    cardprice:0,
    cardtime:'',
    playnum:0
  },
  pay:function() {
    wx.login({
      success: res => {
        var code = res.code;
        var app = getApp();
        console.log(app);
        if (app.globalData.detailid == 0)
        {
          wx.showModal({
            title: '错误提示',
            content: '商品订购出错，请重新订购',
            confirmText: '重新订购',
            success: function (res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '../buy/buy',
                })
              }
            }
          });
          return;
        }
        if (app.globalData.phone == '') {
          wx.showModal({
            title: '用户未登录',
            content: '用户未登录或登录超时，请重新登录',
            confirmText: '重新登录',
            success: function (res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '../login/login',
                })
              }
            }
          });
          return;
        }
        if (code) {
          wx.request({
            url: 'https://www.hattonstar.com/onPay',
            data: {
              js_code: code,
              body: app.globalData.body,
              detail_id: app.globalData.detailid,
              phone: app.globalData.phone,
            },
            method: 'POST',
            success: function (res) {
              console.log(res);
              wx.requestPayment(
                {
                  'timeStamp': res.data.timeStamp,
                  'nonceStr': res.data.nonceStr,
                  'package': res.data.package,
                  'signType': 'MD5',
                  'paySign': res.data.paySign,
                  'success': function (res) {
                    console.log(1);
                    console.log(res);
                  },
                  'fail': function (res) {
                    console.log(2);
                    console.log(res);
                  },
                  'complete': function (res) {
                    console.log(3);
                    console.log(res);
                  }
                })
            },
            fail: function (res) {
              console.log(res);
            }
          })
        }
      }
    })
  },

  rechoose: function () {
    var app = getApp();
    app.globalData.imageNo = 0;
    app.globalData.cardtype = 0;
    app.globalData.cardprice = 0;
    app.globalData.cardtype = 0;
    wx.navigateTo({
      url: '../buy/buy',
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
    var app = getApp();
    var imageNo = app.globalData.imageNo;
    var type = app.globalData.cardtype;
    var typetime = '';
    if (type == 1) {
      typetime = '9:00-13:00或13:30-17:30';
    } else if (type == 2) {
      typetime = '9:00-17:30';
    } else if (type == 3) {
      typetime = '11:00-13:00或15:30-17:30';
    }
    var name = '/images/list/star' + imageNo + '.jpg';
    this.setData({ imageName: name, cardprice: app.globalData.cardprice,
      playnum: app.globalData.playnum, cardtime: typetime});
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