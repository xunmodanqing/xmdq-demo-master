var util = require('../../utils/util.js')

Page({
  data: {
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    morePaintList: [],
    loadMore: '加载更多',
    isLoading: false,
    historyList: [],
    searchVal: '',
    getOption: {},
    oldListArray: [],
    start: 0
  },
  getMorePaintList(type, start, flag) {
    var that = this;
    var url = '/select';
    var data = {
      q: 'current_location_str:'+type,
      start: start,
      fl: "id,title,image_urls,creation_creator,subject_matter,current_location",
      rows: 10
    };
    console.log(start)
    util.http('GET', url, data, (response) => {
      if (response.errMsg) {
        util.showModel(response.errMsg);
      } else {
        if (flag) {
          this.setData({
            morePaintList: that.data.morePaintList.concat(response.response.docs)
          })
        } else {
          that.setData({
            morePaintList: response.response.docs
          })
        }
      }
    })
  },
  setNavigationBarTitleText: function (option) {
    wx.setNavigationBarTitle({
      title: option.category
    })
  },
  goPaintDetail(e) {
    wx.navigateTo({
      url: '../../pages/paintDetail/paintDetail?id=' + e.currentTarget.dataset.id
    })
  },
  getMorePaintTypeList() {
    this.setData({
      start: (this.data.start) + 10
    })
    this.oldListArray = this.data.morePaintList;
    var start = (this.data.start);
    this.getMorePaintList(this.data.getOption.type, start, true);
  },
  // 加载更多
  onReachBottom: function () {
    console.log("###################")
    this.getMorePaintTypeList();
  },
  onLoad: function (option) {
    this.data.getOption = option;
    this.setNavigationBarTitleText(option);
    this.getMorePaintList(option.type, 0);
    console.log(option.type)
  },
  onReady: function () {
  }
})