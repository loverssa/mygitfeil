// pages/goodlist/goodlist.js
var api = require('../../api.js');
var app = getApp();
Page({
  data: {
    active: 0,
    list: [],
  },
  onLoad: function(options) {
    this.data.id = options.id;
    this.getList();
  },
  getActive: function(e) {
    var that = this;
    that.setData({
      active: e.currentTarget.id
    })
    this.data.list = [];
    this.getList();
  },
  getList: function() {
    let that = this;
    app.request({
      url: api.goods.info,
      data: {
        id: this.data.id,
        code: this.data.active,
      },
      success(res) {
        that.setData({
          list: res.data.list
        })
      }
    })
  }
})