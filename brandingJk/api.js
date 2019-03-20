// var _api_root = 'http://price.jingkoo.net/';
var _api_root = 'https://bcrm.jingku.cn/';


var api = {
  login: _api_root + 'public/bcrm/publics/login',
  index: {
    index: _api_root + 'public/bcrm/index/index',
    user_info: _api_root + 'public/bcrm/index/user_info',
  },
  order: {
    index: _api_root + 'public/bcrm/order/index',
    info: _api_root + 'public/bcrm/order/info',
    order_shipping: _api_root + 'public/bcrm/order/order_shipping',
  },
  goods: {
    index: _api_root + 'public/bcrm/goods/index',
    info: _api_root + 'public/bcrm/goods/info',
    search: _api_root + 'public/bcrm/goods/search'
  },
  plan: {
    plan_list: _api_root + 'public/bcrm/plan/plan_list',
    click_zan: _api_root + 'public/bcrm/plan/click_zan',
    plan_info: _api_root + 'public/bcrm/plan/plan_info',
    comment: _api_root + 'public/bcrm/plan/comment',
  },
};
module.exports = api;