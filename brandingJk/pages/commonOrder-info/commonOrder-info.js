// pages/commonOrder-info/commonOrder-info.js
var api = require('../../api.js');
var app = getApp();
Page({
  data: {
    info: {},
  },
  onLoad: function(options) {
    var that = this;
    that.setData({
      id:options.id
    })
    app.request({
      url: api.order.info,
      data: {
        id: options.id
      },
      success(res) {
        that.setData({
          info: res.data
        })
      }
    })
  },
  lookMore: function() {
    var info = JSON.stringify(this.data.info.goods_list)
    var esc = escape(info)
    wx.navigateTo({
      url: '../shoplist/shoplist?src=' + esc,
    })
  },
  goJumpis(){
    var _this=  this
    wx.navigateTo({
      url: '../spqd/spqd?id=' + _this.data.id,
    })
  }
})