// pages/login/login.js
var api = require('../../api.js');
var app = getApp();

Page({
  data: {
    phone: '',
    password: '',
  },
  onLoad: function(options) {
    if (app.isLogin()) {
      wx.switchTab({
        url: '/pages/index/index'
      })
    }
  },
  phone: function(e) {
    this.data.phone = e.detail.value;
  },
  password: function(e) {
    this.data.password = e.detail.value;
  },
  login: function() {
    let data = {};
    data.member = this.data.phone;
    data.pass = this.data.password;
    app.login(data);
  }
})