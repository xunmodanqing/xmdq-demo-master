// pages/painterIndex/painterIndex.js
var util = require('../../utils/util.js')

Page({
  data: {
    imgUrls: [
      'http://a1.att.hudong.com/76/64/01100000000000144726648606414_s.jpg',
      'http://n.sinaimg.cn/fo/transform/20160104/E4K6-fxneefs5530999.jpg',
      'http://collection.sinaimg.cn/cjrw/20131125/U8596P1081T2D134770F6DT20131125101840.jpg',
      'http://images.takungpao.com/2015/0213/20150213090438589.jpg',
      'http://pic.baike.soso.com/p/20140225/20140225135013-723661441.jpg'
    ],
    interval: 5000,
    duration: 500,
    pictureList: [],
    adInfo: {},
    //newsList: [],
    //partList: [],
    //specialList: [],
    PaintList1: [],
    PaintList2: [],
    PaintList3: [],
    PaintList4: [],
    PaintList5: [],
    PaintList6: [],
    PaintList7: [],
    PaintList8: [],
    isInputDisabled: true
  },
  getPaintList1: function () {
    var that = this;
    var url = '/select';
    var data = {
      fl: 'id,authorName,dynasty,alias,courtesyNames,artNames,bornPlace,achievements,works,image_urls,descriptionURL',
      fq: "dynasty:清代",
      q: 'authorName:*',
      start: 4,
      rows: 2
    };
    util.http('GET', url, data, (response) => {
      if (response.errMsg) {
        util.showModel(response.errMsg);
      } else {
        console.log('请求画家列表接口成功！');
        that.setData({
          PaintList1: response.response.docs
        })
      }
    })
  },
  getPaintList2: function () {
    var that = this;
    var url = '/select';
    var data = {
      fl: 'id,authorName,dynasty,alias,courtesyNames,artNames,bornPlace,achievements,works,image_urls,descriptionURL',
      fq: "dynasty:明代",
      q: 'authorName:*',
      start: 7,
      rows: 2
    };
    util.http('GET', url, data, (response) => {
      if (response.errMsg) {
        util.showModel(response.errMsg);
      } else {
        console.log('请求画家列表接口成功！');
        that.setData({
          PaintList2: response.response.docs
        })
      }
    })
  },
  getPaintList3: function () {
    var that = this;
    var url = '/select';
    var data = {
      fl: 'id,authorName,dynasty,alias,courtesyNames,artNames,bornPlace,achievements,works,image_urls,descriptionURL',
      fq: "dynasty:宋代",
      q: 'authorName:*',
      start: 3,
      rows: 2
    };
    util.http('GET', url, data, (response) => {
      if (response.errMsg) {
        util.showModel(response.errMsg);
      } else {
        console.log('请求画家列表接口成功！');
        that.setData({
          PaintList3: response.response.docs
        })
      }
    })
  },
  getPaintList4: function () {
    var that = this;
    var url = '/select';
    var data = {
      fl: 'id,authorName,dynasty,alias,courtesyNames,artNames,bornPlace,achievements,works,image_urls,descriptionURL',
      fq: "dynasty:近现代",
      q: 'authorName:*',
      rows: 2
    };
    util.http('GET', url, data, (response) => {
      if (response.errMsg) {
        util.showModel(response.errMsg);
      } else {
        console.log('请求画家列表接口成功！');
        that.setData({
          PaintList4: response.response.docs
        })
      }
    })
  },
  getPaintList5: function () {
    var that = this;
    var url = '/select';
    var data = {
      fl: 'id,authorName,dynasty,alias,courtesyNames,artNames,bornPlace,achievements,works,image_urls,descriptionURL',
      fq: "dynasty:元代",
      q: 'authorName:*',
      rows: 2
    };
    util.http('GET', url, data, (response) => {
      if (response.errMsg) {
        util.showModel(response.errMsg);
      } else {
        console.log('请求画家列表接口成功！');
        that.setData({
          PaintList5: response.response.docs
        })
      }
    })
  },
  getPaintList6: function () {
    var that = this;
    var url = '/select';
    var data = {
      fl: 'id,authorName,dynasty,alias,courtesyNames,artNames,bornPlace,achievements,works,image_urls,descriptionURL',
      fq: "dynasty:五代十国",
      q: 'authorName:*',
      rows: 2
    };
    util.http('GET', url, data, (response) => {
      if (response.errMsg) {
        util.showModel(response.errMsg);
      } else {
        console.log('请求画家列表接口成功！');
        that.setData({
          PaintList6: response.response.docs
        })
      }
    })
  },
  getPaintList7: function () {
    var that = this;
    var url = '/select';
    var data = {
      fl: 'id,authorName,dynasty,alias,courtesyNames,artNames,bornPlace,achievements,works,image_urls,descriptionURL',
      fq: "dynasty:唐代",
      q: 'authorName:*',
      start: 2,
      rows: 2
    };
    util.http('GET', url, data, (response) => {
      if (response.errMsg) {
        util.showModel(response.errMsg);
      } else {
        console.log('请求画家列表接口成功！');
        that.setData({
          PaintList7: response.response.docs
        })
      }
    })
  },
  getPaintList8: function () {
    var that = this;
    var url = '/select';
    var data = {
      fl: 'id,authorName,dynasty,alias,courtesyNames,artNames,bornPlace,achievements,works,image_urls,descriptionURL',
      fq: "dynasty:金代",
      q: 'authorName:*',
      rows: 2
    };
    util.http('GET', url, data, (response) => {
      if (response.errMsg) {
        util.showModel(response.errMsg);
      } else {
        console.log('请求画家列表接口成功！');
        that.setData({
          PaintList8: response.response.docs
        })
      }
    })
  },

  /**
   * 查看更多画家
   */
  goMorePaint(e) {
    wx.navigateTo({
      url: '../../pages/painterMore/painterMore?type=' + e.currentTarget.dataset.type + '&category=' + e.currentTarget.dataset.category
    })
  },

  /**
   * 跳转搜索画家
   */
  goSearchPage() {
    wx.navigateTo({
      url: '../../pages/painterSearch/painterSearch'
    })
  },

  /**
   * 查看详细信息
   */
  goPaintDetail(e) {
    wx.navigateTo({
      url: '../../pages/painterDetail/painterDetail?id=' + e.currentTarget.dataset.id
    })
  },


  setNavigationBarTitleText: function () {
    wx.setNavigationBarTitle({
      title: '· 寻墨丹青 ·'
    })
  },
  onReachBottom: function () {
  },
  onLoad: function () { // call setNavigationBarTitleText
    this.setNavigationBarTitleText();
  },
  onReady: function () {
    this.getPaintList1();
    this.getPaintList2();
    this.getPaintList3();
    this.getPaintList4();
    this.getPaintList5();
    this.getPaintList6();
    this.getPaintList7();
    this.getPaintList8();
  }
})