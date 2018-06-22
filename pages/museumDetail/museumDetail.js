// pages/museumDetail/museumDetail.js
var util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    museumID:'',
    museumInfo:''
  },
  /**
   * 获取指定博物馆详细信息
   */
  getMuseumInfo: function () {
    var url = '/select';
    var query = 'id:' + this.data.museumID
    var data = {
      q: query
    };
    util.http('GET', url, data, (response) => {
      if (response.errMsg) {
        util.showModel(response.errMsg);
      } else {
        this.setData({
          museumInfo: response.response.docs[0]
        })
        wx.setNavigationBarTitle({
          title: response.response.docs[0].museumName
        });
      }
    })
  },
  /**
   * 跳转到web浏览器页面
   */
  goWebView() {
    var argv1 = 'url=' + this.data.museumInfo.descriptionURL
    var argv2 = '&barTitle=' + this.data.museumInfo.museumName
    wx.navigateTo({
      url: '../../pages/webview/webview?'+argv1+argv2
    })
  },
  /**
   * 查看该博物馆馆藏国画
   */
  lookPainting(){
    var argv1 = 'type=' + this.data.museumInfo.museumName;
    var argv2 = '&category=' + this.data.museumInfo.museumName;
    wx.navigateTo({
      url: '../../pages/museumPainting/museumPainting?' + argv1+argv2
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      museumID: options.id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getMuseumInfo();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})