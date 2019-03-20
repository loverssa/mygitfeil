// pages/shoplist/shoplist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: [],
  },
  onLoad: function(options) {
    this.setData({
      info: JSON.parse(unescape(options.src))
    })
  },
})