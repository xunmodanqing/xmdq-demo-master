var util = require('../../utils/util.js')

Page({
  data: {
    museumList:[],
  },
  getMuseum: function () {
    var that = this;
    var url = '/select';
    var data = {
      fl:'id,museumName,image_urls',
      starts:0,
      rows:85,
      q: 'museum:*'
    };
    util.http('GET', url, data, (response) => {
      if (response.errMsg) {
        util.showModel(response.errMsg);
      } else {
        console.log('请求博物馆首页信息成功！')
        that.setData({
          museumList: response.response.docs
        })
      }
    })
  },
  changeMuseum: function(e){
    if (e.detail.value == ''){
      this.setData({
        searchValue: e.detail.value
      })
    }else{
      this.setData({
        searchValue: 'museum:*'
      })
    }
  },
  setNavigationBarTitleText: function () {
    wx.setNavigationBarTitle({
      title: "· 寻墨丹青 ·"
    })
  },
  onReady: function () {
    this.setNavigationBarTitleText();
    this.getMuseum();
  }
})