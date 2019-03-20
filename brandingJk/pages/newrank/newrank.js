const app = getApp();
var api = require('../../api.js');
Page({
  data: {},
  onLoad: function (options) {
    var that = this;
    app.request({
      url: api.index.index,
      success: function (res) {
        console.log(res)
        that.setData({
          rank: res.data.sale_result,
        })
      }
    })
   },
  onReady: function () { },
  onShow: function () { },
  onHide: function () { },
  onUnload: function () { },
  onPullDownRefresh: function () { },
  onReachBottom: function () { },
  onShareAppMessage: function () { },

})
