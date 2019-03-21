// pages/disOrder/disOrder.js
var api = require('../../api.js');
var app = getApp();
Page({
  data: {
    filtrate:true,
    active: 0,
    phTab: ["所有订单", "待审核", "待盖章", "生效中", "已失效"],
    page: 1,
    hasMorepage: false,
    list: []
  },
  onLoad: function(options) {
    var _this = this
    _this.setData({
      active:options.tid
    })
    this.getList();
  },
  onReachBottom: function() {
    if (this.data.hasMorePage) {
      this.data.page = this.data.page + 1;
      this.getList();
    }
  },
  getActive: function(e) {
    var that = this;
    that.setData({
      active: e.currentTarget.id
    })
    this.data.page = 1;
    this.data.list = [];
    this.getList();
  },
  getList: function() {
    let that = this;
    app.request({
      url: api.order.index,
      data: {
        code: 'distribution',
        distribution_status: this.data.active,
      },
      success(res) {
        console.log(res);
        if (res.data.list.length == 0){
          wx.showToast({
            title: '没找到相关商品',
            icon:'none'
          })
        }
        let list = that.data.list;
        for (var i in res.data.list) {
          list.push(res.data.list[i])
        }
        that.setData({
          hasMorePage: res.data.page < res.data.lastPage,
          list: list
        })
        console.log(that.data.list)
      }
    })
  },
    filtrate: function (e) {
    this.setData({
      filtrate: false
    })
  },
  filtrateClose(){
    this.setData({
      filtrate:true
    })
  },
  Input(e){
    console.log(e)
    var _this = this
    var id = e.currentTarget.id
    if(id == 1){
      _this.setData({
        cententTxt:e.detail.value
      })
    }else if(id == 2){
      _this.setData({
        cententTxte: e.detail.value
      })
    }else{
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
  radioClick(e){
    console.log(e)
    var _this = this
    _this.setData({
      redioTetx:e.detail.value,
      active: e.detail.value
    })
  },
  //重置
  resetClick(){
    var _this = this
    _this.setData({
      cententTxt:"",
      cententTxte:'',
      cententTxtw:"",
      redioTetx:1
    })
  },
  //完成查询按钮
  onClickSuccess(){
    var _this = this
    var dingdan = _this.data.cententTxt
    var qiye = _this.data.cententTxte
    var yonghu = _this.data.cententTxtw
    var status = _this.data.redioTetx
    var access_token = wx.getStorageSync("access_token");
    wx.request({
      url: 'https://bcrm.jingku.cn/public/bcrm/order/index',
      method:'POST',
      header:{'token': access_token,},
      data:{
        order_sn: dingdan,
        company: qiye,
        user_name: yonghu,
        distribution_status: status,
        code: 'distribution',   
      },
      success(res){
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
  //订单号搜索
  goinput(e){
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
      header: { 'token': access_token, },
      data: {
        order_sn: value,
        composite_status: active,
        code: 'distribution'
      },
      success(res) {
        console.log(res);
        // let list = _this.data.list;
        // for (var i in res.data.data.list) {
        //   list.push(res.data.data.list[i])
        // }\
        if (res.data.data.list.length == 0) {
          wx.showToast({
            title: '没找到相关商品',
            icon: 'none'
          })
        }
        _this.setData({
          list: res.data.data.list
        })
      }
    })
  }
})