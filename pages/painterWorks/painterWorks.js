// pages/painterWorks/painterWorks.js
var util = require('../../utils/util.js')

Page({
  data: {
    requestResult: '',
    morePaintList: [],
    loadMore: '加载更多',
    painterName:'',
    isLoading: false,
    historyList: [],
    getOption: {},
    oldListArray: []
  },
  getMorePaintList() {
    var that = this;
    var url = '/select';
    var data = {
      q: 'creation_creator_str:' + this.data.painterName,
      start: 0,
      //fl: "id,title,creation_creator,image_urls,subject_matter,current_location",
      rows: 10
    };
    util.http('GET', url, data, (response) => {
      if (response.errMsg) {
        util.showModel(response.errMsg);
      } else {
        console.log('请求代表作品口成功！');
        this.setData({
          morePaintList: response.response.docs
        })
      }
    })
  },
  getMorePaintResult() {
    this.setData({
      start: (this.data.start) + 10
    })
    this.oldListArray = this.data.resultList;
    var start = (this.data.start);
  },
  goPaintDetail(e) {
    wx.navigateTo({
      url: '../../pages/paintDetail/paintDetail?id=' + e.currentTarget.dataset.id
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
      title: '代表画作'
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
  onLoad: function (option) {
    console.log(option.name)
    this.setData({
      painterName: option.name
    })
    this.setNavigationBarTitleText();
    this.getMorePaintList();
  },
  onReady: function () {
  }
})