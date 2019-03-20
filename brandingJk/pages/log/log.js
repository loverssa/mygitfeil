// pages/log/log.js
var api = require('../../api.js');
var app = getApp();
Page({
  data: {
    height: 0,
    page: 1,
    hasMorePage: false,
    list: [],
    height: 0,
    show: false,
    content: '',
    id: -1,
    cid: -1,
    type: -1,
  },
  onLoad: function(options) {
    this.getList();
  },
  onTextareaFocus: function(e) {
    if (e.detail.height) {
      this.setData({
        height: e.detail.height,
      })
    }
  },
  onTextareaNoFocus: function(e) {
    this.setData({
      height: 0,
      show: false,
    })
  },
  getList: function() {
    let that = this;
    app.request({
      url: api.plan.plan_list,
      data: {
        page: this.data.page,
      },
      success(res) {
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
  onReachBottom: function() {
    if (this.data.hasMorePage) {
      this.data.page = this.data.page + 1;
      this.getList();
    }
  },
  operation: function(e) {
    let list = this.data.list;
    for (var i in list) {
      if (list[i].id == e.currentTarget.dataset.id) {
        list[i].check = true;
      } else {
        list[i].check = false;
      }
    }
    this.setData({
      list: list
    })
  },
  onPageScroll: function() {
    let list = this.data.list;
    for (var i in list) {
      list[i].check = false;
    }
    this.setData({
      list: list,
      show: false,
    })
  },
  zan: function(e) {
    let that = this;
    app.request({
      url: api.plan.click_zan,
      data: {
        type: 5,
        id: e.currentTarget.dataset.id
      },
      success(res) {
        that.plan_info(e.currentTarget.dataset.id);
      }
    })
  },
  plan_info: function(id) {
    let that = this;
    app.request({
      url: api.plan.plan_info,
      data: {
        id: id
      },
      success(res) {
        let data = that.data.list;
        for (var i in data) {
          if (data[i].id == id) {
            data[i] = res.data
          }
        }
        that.setData({
          list: data
        });
      }
    })
  },
  comment: function(e) {
    this.onPageScroll();
    if (e.currentTarget.dataset.type == 0) {
      this.setData({
        show: true,
        id: e.currentTarget.dataset.id,
        type: 0
      })
    } else {
      this.setData({
        show: true,
        id: e.currentTarget.dataset.id,
        cid: e.currentTarget.dataset.cid,
        type: 1
      })
    }

  },
  submit: function() {
    let that = this;
    let data = {};
    if (this.data.type == 0) {
      data.type = 5;
      data.id = this.data.id;
      data.content = this.data.content;
    } else {
      data.id = this.data.id;
      data.cid = this.data.cid;
      data.replay = 'replay';
      data.content = this.data.content;
    }
    app.request({
      url: api.plan.comment,
      data: data,
      success(res) {
        if (that.data.type == 0) {
          that.plan_info(that.data.id);
        } else {
          that.plan_info(that.data.cid);
        }
      }
    })
  },
  content: function(e) {
    this.data.content = e.detail.value;
  }
})