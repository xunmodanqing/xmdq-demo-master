var util = require('../../utils/util.js')

Page({
    data: {
        interval: 5000,
        duration: 500,
        pictureList: [],
        adInfo: {},
        //newsList: [],
        //partList: [],
        //specialList: [],
        rwPaintList:[],
        ssPaintList: [],
        hnPaintList: [{
          "id": 35610,
          "name": "元尊2",
          "content": "在这个以实力为*标准的世界，唯有向前，才是王道!齐王虎视眈眈，苟延残喘的大周王朝危在旦夕，作为一国太子，周元主动担负起责任，历险黒渊终于获得大将军卫沧澜的信任，也得到了新的机缘。随后在齐王围城中，周",
          "enable": null,
          "createDate": null,
          "author": "天蚕土豆",
          "updateDate": null,
          "createUser": null,
          "updateUser": null,
          "imgUrl": "http://img.dpm.org.cn/Uploads/Picture/2017/04/14/s58f0362f753ea.jpg",
          "tags": null,
          "status": null,
          "alias": null,
          "doubanScore": 10
        },
        {
          "id": 18063,
          "name": "关于我父母的一切",
          "content": "会少吃点好吃",
          "enable": null,
          "createDate": null,
          "author": "南帆",
          "updateDate": null,
          "createUser": null,
          "updateUser": null,
          "imgUrl": "http://img.dpm.org.cn/Uploads/Picture/dc/20214[1024].jpg",
          "tags": null,
          "status": null,
          "alias": null,
          "doubanScore": 10
        },
        {
          "id": 37860,
          "name": "王骧陆居士全集（上下）",
          "content": "的his航次的是彻底的将",
          "enable": null,
          "createDate": null,
          "author": "王骧陆",
          "updateDate": null,
          "createUser": null,
          "updateUser": null,
          "imgUrl": "http://img.dpm.org.cn/Uploads/Picture/dc/20211[1024].jpg",
          "tags": null,
          "status": null,
          "alias": null,
          "doubanScore": 10
        }],
        isInputDisabled: true
    },
    getIndexList: function() {
        var that = this;
        var url = '/app/getIndexInfo';
        util.http('GET', url , {}, (response) => {
            if (response.errMsg) {
                util.showModel(response.errMsg);
            } else {
                console.log('请求首页列表接口成功！');
                that.setData({
                    pictureList: response.newBookList || [],
                    //newsList: response.newsList || [],
                    //partList: response.goodPaint || [3],
                    rwPaintList: response.newBookList || [],
                    ssPaintList: response.goodBookList || [],
                    hnPaintList: response.hotBookList || []
                })
            }
        })
        //console.log()
    },
    getMorePaint: function(){
        console.log("getMorePaint")
        var that = this;
        var url = '/app/getMore';
        var data = {
            type: "GOOD",
            page: 1,
            pageSize: 10
        };
        util.http('GET', url , data, (response) => {
            if (response.errMsg) {
                util.showModel(response.errMsg);
            } else {
                console.log(response);
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
        this.getIndexList();
    }
})