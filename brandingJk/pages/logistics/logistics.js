// pages/logistics/logistics.js
var api = require('../../api.js');
var app = getApp();
Page({
  data: {
    info: {},
  },
  onLoad: function(options) {
    let that = this;
    app.request({
      url: api.order.order_shipping,
      data: {
        id: options.id,
      },
      success(res) {
        that.setData({
          info:res.data[0]
        })
      }
    })
  },
})