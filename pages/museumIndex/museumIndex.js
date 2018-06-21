var util = require('../../utils/util.js')

Page({
  data: {
    searchValue: 'museum:*',
    museumList: []
  },
  getMuseum: function() {
    var that = this;
    var url = '/select';
    var data = {
      fl: 'id,museumName,image_urls',
      starts: 0,
      rows: 85,
      q: this.data.searchValue
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
  bindKeyInput: function(e) {
    var q = '', final = ''
    if (e.detail.value === '' || e.detail.value == undefined){
      q = '*'
    }else{
      q = e.detail.value
    }
    console.log("e值", e.detail.value)
    final = "museum:"+q
    this.setData({
      searchValue: final
    })
    this.getMuseum();
  },
  setNavigationBarTitleText: function() {
    wx.setNavigationBarTitle({
      title: "· 寻墨丹青 ·"
    })
  },
  onReady: function() {
    this.setNavigationBarTitleText();
    this.getMuseum();
  }
})