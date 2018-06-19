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
        num: 1
    },
    // 获取用户权限
    /*
    getSetting: function() {
        console.log('获取用户权限')
        var that = this;
        wx.getSetting({
            success(res) {
                if (!res.authSetting['scope.userInfo']) {
                    wx.authorize({
                        scope: 'scope.userInfo',
                        success(res) {
                            that.login()
                        },
                        error() {}
                    })
                } else {
                    that.data.logged ? that.getUserInfo() : that.login();
                }
            }
        })
    },
    */
    getMorePaintList(type, page, flag) {
        var that = this;
        var url = '/app/getMore';
        var data = {
            type: "GOOD",
            page: page,
            pageSize: 10
        };
        util.http('GET', url, data, (response) => {
            if(response.errMsg) {
                util.showModel(response.errMsg);
            } else {
                if(flag){
                    this.setData({
                        morePaintList: that.data.morePaintList.concat(response.bookList)
                    })
                }else{
                    that.setData({
                        morePaintList: response.bookList
                    })
                }
            }
        })
    },
    setNavigationBarTitleText:function(option){
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
            num: (this.data.num) + 1
        })
        this.oldListArray = this.data.morePaintList;
        var page = (this.data.num);
        this.getMorePaintList(this.data.getOption.type, page, true);     
    },
    // 加载更多
    onReachBottom: function() {
        console.log("###################")
        this.getMorePaintTypeList();
    },
    onLoad: function(option){
        this.data.getOption = option;
        this.setNavigationBarTitleText(option);
        this.getMorePaintList(option.type, '1');
    },
    onReady: function() {
    }
})