// pages/commonOrder/commonOrder.js
var api = require('../../api.js');
var app = getApp();

Page({
  data: {
    active: 0,
    filtrate: true,
    page: 1,
    hasMorePage: false,
    list: [],
    jjj:1
  },
  onLoad: function(options) {
    var id = options.id
    var _this = this
    _this.setData({
      active: id
    })
    this.getList();
  },
  onReachBottom: function() {
    if (this.data.hasMorePage) {
      this.data.page = this.data.page + 1;
      this.getList();
    }
  },
  getList: function() {
    let that = this;
    app.request({
      url: api.order.index,
      data: {
        page: this.data.page,
      },
      success(res) {
        console.log(res.data)
        let list = that.data.list;
        for (var i in res.data.list) {
          list.push(res.data.list[i])
        }
        that.setData({
          hasMorePage: res.data.page < res.data.lastPage,
          list: list
        })
      }
    })
  },
  active: function(e) {
    var _this = this
    var id = e.currentTarget.id
    _this.setData({
      active: id,

    })

    var access_token = wx.getStorageSync("access_token");
    wx.request({
      url: 'https://bcrm.jingku.cn/public/bcrm/order/index',
      method: 'POST',
      header: {
        'token': access_token
      },
      data: {
        composite_status: id
      },
      success(res) {
        console.log(res);
        if (res.data.data.list.length == 0) {
          wx.showToast({
            title: '没找到相关商品',
            icon: 'none'
          })
        }
        _this.setData({
          list: res.data.data.list,
    
        })
      },
      fail(res){
        _this.setData({
          jjj: 0,
          jjjj: res.errMsg
        })
      }
    })
  },
  filtrate: function(e) {
    this.setData({
      filtrate: false
    })
  },
  filtrateClose() {
    this.setData({
      filtrate: true
    })
  },
  //筛选输入内容
  textInput(e) {
    console.log(e)
    var _this = this
    var id = e.currentTarget.id
    if (id == 1) {
      _this.setData({
        cententTxt: e.detail.value
      })
    } else if (id == 2) {
      _this.setData({
        cententTxte: e.detail.value
      })
    } else {
      _this.setData({
        cententTxtw: e.detail.value
      })
    }
  },
  //清空
  clickClier(e) {
    console.log(e)
    var _this = this
    var id = e.currentTarget.id
    if (id == 1) {
      _this.setData({
        cententTxt: ""
      })
    } else if (id == 2) {
      _this.setData({
        cententTxte: ""
      })
    } else {
      _this.setData({
        cententTxtw: ""
      })
    }
  },
  //选项筛选redio
  radioClick(e) {
    console.log(e)
    var _this = this
    _this.setData({
      redioTetx: e.detail.value,
      active: e.detail.value
    })
  },
  onClickSuccess() {
    var _this = this
    var dingdan = _this.data.cententTxt
    var qiye = _this.data.cententTxte
    var yonghu = _this.data.cententTxtw
    var status = _this.data.redioTetx
    var access_token = wx.getStorageSync("access_token");
    wx.request({
      url: 'https://bcrm.jingku.cn/public/bcrm/order/index',
      method: 'POST',
      header: {
        'token': access_token,
      },
      data: {
        order_sn: dingdan,
        company: qiye,
        user_name: yonghu,
        composite_status: status,
      },
      success(res) {
        console.log(res);
        // let list = _this.data.list;
        // for (var i in res.data.data.list) {
        //   list.push(res.data.data.list[i])
        // }
        if (res.data.data.list.length == 0) {
          wx.showToast({
            title: '没找到相关商品',
            icon: 'none'
          })
        }
        _this.setData({
          filtrate: true,
          list: res.data.data.list
        })
        console.log(_this.data.list)
      }
    })
  },
  goinput(e) {
    console.log(e)
    var _this = this
    var value = e.detail.value
    _this.setData({
      cententTxt: value
    })
    var active = _this.data.active
    var access_token = wx.getStorageSync("access_token");
    wx.request({
      url: 'https://bcrm.jingku.cn/public/bcrm/order/index',
      method: 'POST',
      header: {
        'token': access_token,
      },
      data: {
        order_sn: value,
        composite_status: active
      },
      success(res) {
        console.log(res);
        // let list = _this.data.list;
        // for (var i in res.data.data.list) {
        //   list.push(res.data.data.list[i])
        // }
        if (res.data.data.list.length == 0) {
          wx.showToast({
            title: '没找到相关商品',
            icon: 'none'
          })
        }
        _this.setData({
          list: res.data.data.list
        })
        console.log(_this.data.list)
      }
    })
  },
  //重置按钮
  resetClick() {
    var _this = this
    _this.setData({
      cententTxt: "",
      cententTxte: '',
      cententTxtw: "",
      redioTetx: 1
    })
  }
})