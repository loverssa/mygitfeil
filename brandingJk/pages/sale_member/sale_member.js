// pages/sale_member/sale_member.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rank: []
  },
  onLoad: function(options) {
    this.setData({
      rank: JSON.parse(unescape(options.src))
    })
  },
})