 // pages/good/good.js
 var api = require('../../api.js');
 var app = getApp();
 Page({
   data: {
     up: false,
     filtrate: true,
     filCon: [],
     filConOne: [],
     filConTwo: [{
       name: "商品状态",
       list: {
         list: [{
           "brand_name": "上架中",
           "brand_id": "1"
         }, {
           "brand_name": "已下架",
           "brand_id": "0"
         }],
       },
     }],
     amount: true,
     moreicon: false,
     more: false,
     amounte: true,
     moreicone: false,
     moree: false,
     active: 1,
     list: [],
     hasMorePage: false,
     page: 1,
     cid: 99999,
     scrollList: [],
     Conid: 999,
     Oneid: 999,
     Twoid: 999,
     ConText: '',
     ConOneText: '',
     ConTwoText: ''
   },
   onLoad: function(options) {
     var _this = this
     _this.getgoodList();
     _this.onShaiList()
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
   //旧接口-------------------------->
   getList: function() {
     let that = this;
     app.request({
       url: api.goods.index,
       data: {
         page: this.data.page,
         is_shelf: this.data.active,
       },
       success(res) {
         console.log(res);
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
   //--------------------------------------->
   screchClick(e) {
     var _this = this
     console.log(e);
     _this.setData({
       screchinput: e.detail.value
     })
   },
   getgoodList: function() {
     let that = this;
     app.request({
       url: api.goods.index,
       data: {},
       success(res) {
         console.log(res);

         that.setData({
           list: res.data.list
         })
       }
     })
   },
   //筛选
   filtrate: function(e) {
     this.setData({
       filtrate: false
     })
   },
   filtrateClose: function(e) {
     let that = this;
     that.setData({
       filtrate: true
     })
     app.request({
       url: api.goods.index,
       data: {
         keyword: that.data.screchinput == undefined ? "" : that.data.screchinput,
         bid: that.data.ConText,
         sid: that.data.ConOneText,
         is_shelf: that.data.ConTwoText
       },
       success(res) {
         console.log(res);
         that.setData({
           list: res.data.list
         })
       }
     })
   },
   //更多
   seeall: function(e) {
     var that = this;
     var index = e.currentTarget.id
     let filCon = that.data.moreicon;
     let more = that.data.more;
     filCon = !filCon;
     more = !more;
     that.setData({
       moreicon: filCon,
       more: more
     })
   },
   //更多
   seeallOne: function(e) {
     var that = this;
     var index = e.currentTarget.id
     let filCon = that.data.moreicone;
     let more = that.data.moree;
     filCon = !filCon;
     more = !more;
     that.setData({
       moreicone: filCon,
       moree: more
     })
   },

   onPageScroll: function(e) {
     let that = this;
     e.scrollTop > 200 ? that.setData({
       up: true
     }) : that.setData({
       up: false
     });
   },
   up: function(e) {
     wx.pageScrollTo({
       scrollTop: 0
     })
   },
   clickUp(e) {
     console.log(e)
     var _this = this
     console.log(_this.data.scrollList)
     var id = e.currentTarget.id
     // var list = _this.data.scrollList
     // if (list[id].cid == 0){
     //   list[id].cid = 1;
     // } else if (list[id].cid == 1){
     //   list[id].cid = 0;
     // }

     _this.setData({
       cid: id
     })
     app.request({
       url: api.goods.index,
       data: {
         bid: e.currentTarget.dataset.name
       },
       success(res) {
         console.log(res)
         _this.setData({
           list: res.data.list
         })
       }
     })
   },
   downUpend(e) {
     console.log(e)
     var id = e.currentTarget.dataset.id
     wx.navigateTo({
       url: '../goodlist/goodlist?id=' + id,
     })
   },
   //筛选列表
   onShaiList() {
     var _this = this
     var access_token = wx.getStorageSync("access_token");
     wx.request({
       url: api.goods.search,
       header: {
         'token': access_token
       },
       success(res) {
         console.log(res)
         _this.setData({
           scrollList: res.data.data.brand,
           filConOne: res.data.data.suppliers,
         })
       }
     })
   },
   selected(e) {
     var _this = this
     console.log(e)
     var id = e.currentTarget.id
     var oid = _this.data.Conid
     var name = e.currentTarget.dataset.name
     if (id == oid) {
       _this.setData({
         Conid:999,
         ConText: ""
       })
       console.log(oid)
     } else {
       _this.setData({
         Conid: id,
         ConText: name
       })
     }
   },
   selectedOne(e) {
     var _this = this
     console.log(e)
     var id = e.currentTarget.id
     var oid = _this.data.Oneid
     var name = e.currentTarget.dataset.name
     if (id == oid) {
       _this.setData({
         Oneid: 999,
         ConOneText: ""
       })
       console.log(oid)
     } else {
       _this.setData({
         Oneid: id,
         ConOneText: name
       })
     }
   },
   selectedTwo(e) {
     var _this = this
     console.log(e)
     var id = e.currentTarget.id
     var oid = _this.data.Twoid
     var name = e.currentTarget.dataset.name
     if (id == oid) {
       _this.setData({
         Twoid: 999,
         ConTwoText: ""
       })
       console.log(oid)
     } else {
       _this.setData({
         Twoid: id,
         ConTwoText: name
       })
     }
   },
   //重置
   onChongZhi() {
     var _this = this
     _this.setData({
       Oneid: 0,
       Twoid: 0,
       Conid: 0,
       amount: true,
       moreicon: false,
       more: false,
       amounte: true,
       moreicone: false,
       moree: false,
     })
   }
 })