var util = require('../../utils/util.js')

Page({
    data: {
        mainTopic:[
          { src: '../../assets/xmdq.png' },
          { src: '../../assets/smhj.jpg' },
          { src: '../../assets/lsmj.png' },
          { src: '../../assets/bwg.png' }
        ],
        pictureList: [],
        adInfo: {},
        //newsList: [],
        //partList: [],
        //specialList: [],
        rwPaintList:[],
        ssPaintList: [],
        hnPaintList: [],
        othersList:[],
        isInputDisabled: true
    },
    getssPaint: function () {
      var that = this;
      var url = '/select';
      var data = {
          fl:'id,title,image_urls',
          fq: "subject_matter:山水",
          q: 'painting:*',
          rows:4
      };
      util.http('GET', url, data, (response) => {
        if (response.errMsg) {
          util.showModel(response.errMsg);
        } else {
          console.log('请求首页列表接口成功！');
          that.setData({
            ssPaintList: response.response.docs
          })
        }
      })
    },
    getrwPaint: function () {
      var that = this;
      var url = '/select';
      var data = {
        fl: 'id,title,image_urls',
        fq: "subject_matter:人物",
        q: 'painting:*',
        rows:4
      };
      util.http('GET', url, data, (response) => {
        if (response.errMsg) {
          util.showModel(response.errMsg);
        } else {
          console.log('请求首页列表接口成功！');
          that.setData({
            rwPaintList: response.response.docs
          })
        }
      })
    },
    gethnPaint: function () {
      var that = this;
      var url = '/select';
      var data = {
        fl: 'id,title,image_urls',
        fq: "subject_matter:花鸟",
        q: 'painting:*',
        rows:4
      };
      util.http('GET', url, data, (response) => {
        if (response.errMsg) {
          util.showModel(response.errMsg);
        } else {
          console.log('请求首页列表接口成功！');
          that.setData({
            hnPaintList: response.response.docs
          })
        }
      })
    },
    getOthersPaint: function () {
      var that = this;
      var url = '/select';
      var data = {
        fl: 'id,title,image_urls',
        fq: "subject_matter:其他",
        q: 'painting:*',
        rows:4
      };
      util.http('GET', url, data, (response) => {
        if (response.errMsg) {
          util.showModel(response.errMsg);
        } else {
          console.log('请求首页列表接口成功！');
          that.setData({
            othersList: response.response.docs
          })
        }
      })
    },
    /*
    goPaintList(e){
        wx.switchTab({
            url: '../../pages/bookList/bookList'
        })
    },
    */
    goMorePaint(e){
        wx.navigateTo({
            url: '../../pages/morePaint/morePaint?type=' + e.currentTarget.dataset.type + '&category=' + e.currentTarget.dataset.category
        })
    },
    goSearchPage(){
        wx.navigateTo({
            url: '../../pages/searchPage/searchPage'
        })
    },
    goPaintDetail(e){
        wx.navigateTo({
            url: '../../pages/paintDetail/paintDetail?id=' + e.currentTarget.dataset.id
        })
    },
    setNavigationBarTitleText:function(){
        wx.setNavigationBarTitle({
            title: '· 寻墨丹青 ·'
        })
    },
    onReachBottom: function() {
    },
    onLoad: function () { // call setNavigationBarTitleText
        this.setNavigationBarTitleText();
    },
    onReady: function() { 
        this.getssPaint();
        this.gethnPaint();
        this.getrwPaint();
        this.getOthersPaint();
    }
})