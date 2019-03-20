//index.js
//获取应用实例
import F2 from '../../f2-canvas/lib/f2';
let chart;
const app = getApp();
var api = require('../../api.js');
//杉杉写的方法
function shanshan() {
  return new Promise((resolve, reject) => {
    app.request({
      url: api.index.index,
      success: function(res) {
        resolve(res.data);
      }
    })
  })
}
//柱形
function initChart(canvas, width, height) {
  shanshan(0).then((res) => {
    let data = [];
    for (var i in res.month_list) {
      if (res.month_list[i].brand) {
        let str = res.month_list[i].brand;
        if (res.month_list[i].brand.length > 4) {
          str = res.month_list[i].brand.substr(0, 4) + '...'
        }
        data.push({
          year: str,
          sales: parseInt(res.month_list[i].total),
        })
      }
    }


    chart = new F2.Chart({
      el: canvas,
      width,
      height
    });

    chart.source(data, {
      sales: {
        tickCount: 5
      }
    });
    chart.tooltip({
      showItemMarker: false,
      onShow(ev) {
        const {
          items
        } = ev;
        items[0].name = null;
        items[0].name = items[0].title;
        items[0].value = items[0].value + '%';
      }
    });
    chart.interval().position('year*sales');
    chart.render();
    return chart;
  })
}


//柱形
function initChart3(canvas, width, height) {
  shanshan(0).then((res) => {
    let data = [];
    for (var i in res.arr_list) {
      if (res.arr_list[i].brand) {
        let str = res.arr_list[i].brand;
        if (res.arr_list[i].brand.length > 4) {
          str = res.arr_list[i].brand.substr(0, 4) + '...'
        }
        data.push({
          year: str,
          sales: parseInt(res.arr_list[i].total),
        })
      }
    }
    chart = new F2.Chart({
      el: canvas,
      width,
      height
    });

    chart.source(data, {
      sales: {
        tickCount: 5
      }
    });
    chart.tooltip({
      showItemMarker: false,
      onShow(ev) {
        const {
          items
        } = ev;
        items[0].name = null;
        items[0].name = items[0].title;
        items[0].value = items[0].value + '%';
      }
    });
    chart.interval().position('year*sales');
    chart.render();
    return chart;
  })
}


//饼形
function initChart2(canvas, width, height) {
  shanshan(0).then((res) => {
    const map = {};
    const data = [];
    for (var i in res.month_list) {
      if (res.month_list[i].brand) {
        map[res.month_list[i].brand] = parseInt(res.month_list[i].total) + "%"
        data.push({
          name: res.month_list[i].brand,
          percent: parseInt(res.month_list[i].total) / 100,
          a: '1'
        })
      }
    }

    chart = new F2.Chart({
      el: canvas,
      width,
      height
    });
    chart.source(data, {
      percent: {
        formatter(val) {
          return val * 100 + '%';
        }
      }
    });
    chart.legend({
      position: 'right',
      itemFormatter(val) {
        return val + '  ' + map[val];
      }
    });
    chart.tooltip(false);
    chart.coord('polar', {
      transposed: true,
      radius: 0.85
    });
    chart.axis(false);
    chart.interval()
      .position('a*percent')
      .color('name', ['#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#F04864', '#8543E0'])
      .adjust('stack')
      .style({
        lineWidth: 1,
        stroke: '#fff',
        lineJoin: 'round',
        lineCap: 'round'
      })
      .animate({
        appear: {
          duration: 1200,
          easing: 'bounceOut'
        }
      });

    chart.render();
    return chart;
  })
}


//饼形
function initChart4(canvas, width, height) {
  shanshan(0).then((res) => {
    const map = {};
    const data = [];
    for (var i in res.arr_list) {
      if (res.arr_list[i].brand) {
        map[res.arr_list[i].brand] = parseInt(res.arr_list[i].total) + "%"
        data.push({
          name: res.arr_list[i].brand,
          percent: parseInt(res.arr_list[i].total) / 100,
          a: '1'
        })
      }
    }

    chart = new F2.Chart({
      el: canvas,
      width,
      height
    });
    chart.source(data, {
      percent: {
        formatter(val) {
          return val * 100 + '%';
        }
      }
    });
    chart.legend({
      position: 'right',
      itemFormatter(val) {
        return val + '  ' + map[val];
      }
    });
    chart.tooltip(false);
    chart.coord('polar', {
      transposed: true,
      radius: 0.85
    });
    chart.axis(false);
    chart.interval()
      .position('a*percent')
      .color('name', ['#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#F04864', '#8543E0'])
      .adjust('stack')
      .style({
        lineWidth: 1,
        stroke: '#fff',
        lineJoin: 'round',
        lineCap: 'round'
      })
      .animate({
        appear: {
          duration: 1200,
          easing: 'bounceOut'
        }
      });

    chart.render();
    return chart;
  })
}

Page({
  onShareAppMessage: function(res) {
    return {
      title: '',
      path: '/pages/index/index',
      success: function() {},
      fail: function() {}
    }
  },
  data: {
    opts: {
      onInit: initChart2
    },
    column: {
      onInit: initChart
    },
    column2: {
      onInit: initChart3
    },
    opts2: {
      onInit: initChart4
    },
    active: 0,
    rank: [],
    sales: '',
    pu_user_count: '',
  },
  onLoad() {
    var that = this;
    app.request({
      url: api.index.index,
      success: function(res) {
        console.log(res)
        that.setData({
          rank: res.data.sale_result,
          sales: res.data.sales,
          pu_user_count: res.data.pu_user_count,
          topCentent: res.data.index_top,
        })
      }
    })
  },
  active: function(e) {
    var that = this;
    that.setData({
      active: e.currentTarget.id
    })
  },
  showRank: function() {
    var info = JSON.stringify(this.data.rank)
    var esc = escape(info)
    wx.navigateTo({
      url: '../sale_member/sale_member?src=' + esc,
    })
  },
  
})