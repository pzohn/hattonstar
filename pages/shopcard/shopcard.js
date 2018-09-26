Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageName: '',
    cardprice: 0,
    num:0
  },
  pay: function () {
    wx.login({
      success: res => {
        var code = res.code;
        var app = getApp();
        console.log(app);
        if (app.globalData.detailid == 0) {
          wx.showModal({
            title: '错误提示',
            content: '商品订购出错，请重新订购',
            confirmText: '重新订购',
            success: function (res) {
              if (res.confirm) {
                wx.redirectTo({
                  url: '../shopbuy/shopbuy',
                })
              }
            }
          });
          return;
        }
        if (app.globalData.shop_phone == '') {
          wx.showModal({
            title: '用户未登录',
            content: '用户未登录或登录超时，请重新登录',
            confirmText: '重新登录',
            success: function (res) {
              if (res.confirm) {
                wx.redirectTo({
                  url: '../shoplogin/shoplogin',
                })
              }
            }
          });
          return;
        }
        if (this.data.num == 0) {
          wx.showModal({
            title: '数量为0',
            content: '团购数量为0，请重新填写',
            confirmText: '重新填写',
          });
          return;
        }
        if (code) {
          wx.request({
            url: 'https://www.hattonstar.com/onPayShop',
            data: {
              js_code: code,
              body: app.globalData.body,
              detail_id: app.globalData.detailid,
              phone: app.globalData.shop_phone,
              shop_id: 0,
              name: app.globalData.shop_name,
              num:this.data.num,
              card_one_price: app.globalData.card_one_price,
              card_two_price: app.globalData.card_two_price
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
                    wx.request({
                      url: 'https://www.hattonstar.com/getShopNopass',
                      data: {
                        phone: app.globalData.shop_phone
                      },
                      method: 'POST',
                      success: function (res) {
                        
                        if (res.data.phone != "") {
                          var app = getApp();
                          app.globalData.card_one_num = res.data.card_one_num;
                          app.globalData.card_two_num = res.data.card_two_num;
                        }
                      },
                      fail: function (res) {
                        wx.showModal({
                          title: '错误提示',
                          content: '服务器无响应，请重新登录',
                          success: function (res) {
                            if (res.confirm) {
                              wx.redirectTo({
                                url: '../shoplogin/shoplogin',
                              })
                            }
                          }
                        })
                        return;
                      }
                    })

                    wx.showModal({
                      title: '支付成功',
                      content: '支付成功，欢迎加盟哈顿星球!',
                      success: function (res) {
                        if (res.confirm) {
                          wx.redirectTo({
                            url: '../shopinfo/shopinfo',
                          })
                        }
                      }
                    })
                  },
                  'fail': function (res) {
                    console.log(2);
                  },
                  'complete': function (res) {
                  }
                })
            },
            fail: function (res) {
              console.log(3);
            }
          })
        }
      }
    })
  },

  rechoose: function () {
    console.log("rechoose");
    var app = getApp();
    app.globalData.imageNo = 0;
    wx.redirectTo({
      url: '../shopbuy/shopbuy',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app = getApp();
    var imageNo = app.globalData.imageNo;
    var typetime = '';
    var cardprice = 0;
    if (app.globalData.detailid == 1) {
      typetime = '周二至周五';
      cardprice = app.globalData.card_one_price;
    } else if (app.globalData.detailid == 2) {
      typetime = '周六周日';
      cardprice = app.globalData.card_two_price;
    } 
    var name = '/images/list/star' + imageNo + '.jpg';
    this.setData({
      imageName: name, cardprice: cardprice,cardtime: typetime
    });
  },

  bindkeyboard:function(e) {
    this.setData({
      num: e.detail.value
    });
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