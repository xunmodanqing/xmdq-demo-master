// pages/painterBaike/painterBaike.js
var util = require('../../utils/util.js')

Page({
  data: {
    morePaintList: [],
    loadMore: '加载更多',
    isLoading: false,
    historyList: [],
    searchVal: '',
    getOption: {},
    oldListArray: []
  },

  /**
   * 请求URL的具体链接
   */
  getMorePaintList(id) {
    var that = this;
    var url = '/select';
    var data = {
      q: 'id:' + id,
      fl: "descriptionURL",
    };
    util.http('GET', url, data, (response) => {
      if (response.errMsg) {
        util.showModel(response.errMsg);
      } else {
        console.log('请求成功！');
        this.setData({
          morePaintList: response.response.docs
        })
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    this.data.getOption = option;
    this.getMorePaintList(option.id);
    //console.log(option.id)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  }
})