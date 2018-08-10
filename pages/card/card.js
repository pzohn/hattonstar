// pages/card1/card.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  pay:function() {
    wx.login({
      success: res => {
        var code = res.code;
        if (code) {
          wx.request({
            url: 'https://www.hattonstar.com/onPay',
            data: {
              js_code: code,
              body: '哈顿星球成长学院-cardone',
              total_fee: 1,
              detail_id: 1,
              phone: '18303741618',
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
  
  }
})