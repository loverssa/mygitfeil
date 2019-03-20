Page({
  data: {
    info:[]
  },
  onLoad: function (options) {
    var _this = this
    var id = options.id
    _this.setData({
      id:id
    })
    _this.onShoplist()
  },
  onShoplist(){
    var _this = this
    var access_token = wx.getStorageSync("access_token");
    wx.request({
      url: 'http://bcrm.jingku.cn/public/bcrm/order/info',
      method:'POST', 
      header:{'token': access_token,},
      data:{
        id:this.data.id
      },
      success(res){
        console.log(res)
     
        _this.setData({
          info: res.data.data
        })
      }
      
    })
  }
})