// pages/painterSearch/painterSearch.js
var util = require('../../utils/util.js')

Page({
  data: {
    searchValue: '',
    isFocus: true,
    start: 0,
    resultList: [],
    oldListArray: [],
    loadMore: '加载更多',
    isLoading: false
  },
  doSearch: function (start, flag) {
    var that = this;
    if (that.data.searchValue) {
      var url = '/select';
      var data = {
        fl: "id,authorName,dynasty,image_urls,bornPlace",
        start: start,
        rows: 10,
        q: "painter:" + that.data.searchValue
      };
      util.http('GET', url, data, (response) => {
        if (response.errMsg) {
          util.showModel(response.errMsg);
        } else {
          if (flag) {
            this.setData({
              resultList: that.data.resultList.concat(response.response.docs)
            })
          } else {
            that.setData({
              resultList: response.response.docs
            })
            console.log("get return")
            console.log(response)
            that.setData({
              resultList: response.response.docs,
              //start:(that.data.start)+10
            })
            console.log(that.data.resultList)
          }
        }
      })
    } else {
      that.setData({
        resultList: []
      })
    }
  },
  getMorePaintResult() {
    this.setData({
      start: (this.data.start) + 10
    })
    this.oldListArray = this.data.resultList;
    var start = (this.data.start);
    this.doSearch(start, true);
  },

  goPaintDetail(e) {
    wx.navigateTo({
      url: '../../pages/painterDetail/painterDetail?id=' + e.currentTarget.dataset.id
    })
  },
  bindKeyInput: function (e) {
    this.setData({
      searchValue: e.detail.value
    })
    var start = 0;
    this.doSearch(start);
  },
  onReachBottom: function () {
    console.log("###################")
    this.getMorePaintResult();
  },
  setNavigationBarTitleText: function () {
    wx.setNavigationBarTitle({
      title: '搜索画家'
    })
  },
  goBookDetail(e) {
    wx.navigateTo({
      url: '../../pages/paintDetail/paintDetail?id=' + e.currentTarget.dataset.id
    })
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
  },
  onReady: function () {
    this.setNavigationBarTitleText();
  }
})