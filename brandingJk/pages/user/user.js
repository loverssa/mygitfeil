// pages/user/user.js
var api = require('../../api.js');
var app = getApp();

Page({
  data: {
    info: {},
  },
  onLoad: function(options) {
    let that = this;
    app.request({
      url: api.index.user_info,
      success(res) {
        that.setData({
          info: res.data
        })
      }
    })
  },
  exit: function() {
    wx.showModal({
      title: '提示',
      content: '是否退出登录',
      success: function(res) {
        if (res.confirm) {
          wx.setStorageSync('access_token', '')
          wx.reLaunch({
            url: '../login/login',
          })
        }
      }
    })
  }
})