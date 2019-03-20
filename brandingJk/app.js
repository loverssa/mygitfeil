//app.js
App({
  onLaunch: function() {},
  request: function(object) {
    wx.showLoading({
      title: '正在加载',
    });
    if (!object.data)
      object.data = {};
    var access_token = wx.getStorageSync("access_token");
    wx.request({
      url: object.url,
      header: object.header || {
        'content-type': 'application/x-www-form-urlencoded',
        'token': access_token,
      },
      data: object.data || {},
      method: object.method || "post",
      dataType: object.dataType || "json",
      success: function(res) {
        if (res.data.status == 0) {
          wx.showToast({
            title: res.data.error_description,
            icon: 'none'
          })
        } else if (res.data.status == 2) {
          wx.reLaunch({
            url: '../login/login',
          })
        } else {
          if (object.success)
            object.success(res.data);
          wx.hideLoading();
        }
      },
      fail: function(res) {
        wx.showToast({
          title: res.msg,
          icon: "none",
        });
        if (object.fail)
          object.fail(res);
      },
      complete: function(res) {
        if (object.complete)
          object.complete(res);
      }
    });
  },
  login: function(e) {
    var that = this;
    wx.showLoading({
      title: '正在登录',
    })
    wx.login({
      success(res) {
        wx.request({
          url: 'https://bcrm.jingku.cn/public/bcrm/publics/login',
          method: 'post',
          data: e,
          success(res) {
            if (res.data.status == 1) {
              getApp().globalData.showModel = false;
              wx.setStorageSync("access_token", res.data.data.token);

              wx.switchTab({
                url: '/pages/index/index'
              })
            } else {
              wx.showToast({
                title: res.data.error_description,
                icon: 'none'
              })
            }
          }
        })
      }
    })
  },
  //判断是否登录
  isLogin: function() {
    var userInfo = wx.getStorageSync('access_token');
    if (!userInfo) {
      return false;
    }
    return true;
  },
  globalData: {}
})