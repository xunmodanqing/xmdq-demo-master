// pages/painterMore/painterMore.js
var util = require('../../utils/util.js')

Page({
  data: {
    requestResult: '',
    morePaintList: [],
    loadMore: '加载更多',
    isLoading: false,
    historyList: [],
    searchVal: '',
    getOption: {},
    oldListArray: []
  },

  /**
   * 显示更多画家信息
   */
  getMorePaintList(type) {
    var that = this;
    var url = '/select';
    var data = {
      fq: "dynasty:" + type,
      q: 'authorName:*',
      start: 0,
      fl: "id,authorName,dynasty,alias,courtesyNames,artNames,bornPlace,achievements,works,image_urls,descriptionURL",
      rows: 170
    };
    util.http('GET', url, data, (response) => {
      if (response.errMsg) {
        util.showModel(response.errMsg);
      } else {
        console.log('请求更多信息接口成功！');
        this.setData({
          morePaintList: response.response.docs
        })
      }
    })
  },

  /**
   * 跳转到详细信息页面
   */
  goPaintDetail(e) {
    wx.navigateTo({
      url: '../../pages/painterDetail/painterDetail?id=' + e.currentTarget.dataset.id
    })
  },

  /**
   * 设置标题
   */
  setNavigationBarTitleText: function (option) {
    wx.setNavigationBarTitle({
      title: option.category
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    this.data.getOption = option;
    this.setNavigationBarTitleText(option);
    this.getMorePaintList(option.type);
    console.log(option.type)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  }
})