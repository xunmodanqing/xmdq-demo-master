var util = require('../../utils/util.js')

Page({
    data: {
        userInfo: {},
        logged: false,
        takeSession: false,
        requestResult: '',
        paintCategoryList: [],
        loadMore: '加载更多',
        isLoading: false,
        historyList: [],
        searchVal: '',
        getOption: {},
        oldListArray: [],
        num: 1
    },
    // 获取图书分类列表
    getPaintTagList(sKey, page, flag) {
        var that = this;
        var url = '/app/tags/' + sKey + '/' + page;
        util.http('GET', url, {}, (response) => {
            if(response.errMsg) {
                util.showModel(response.errMsg);
            } else {
                if(flag){
                    this.setData({
                        paintCategoryList: that.data.paintCategoryList.concat(response.resData)
                    })
                }else{
                    that.setData({
                        paintCategoryList: response.resData
                    })
                }
            }
        })
    },
    setNavigationBarTitleText:function(option){
        wx.setNavigationBarTitle({
            title: option.tag
        })
    },
    goPaintDetail(e) {
        console.log("gopaintdetail")
        wx.navigateTo({
            url: '../../pages/paintDetail/paintDetail?id=' + e.currentTarget.dataset.id
        })
        //wx.redirectTo({
        //  url: '../../pages/paintDetail/paintDetail?id=' + e.currentTarget.dataset.id
        //})
    },
    getMorePaintTypeList() {
        this.setData({
            num: (this.data.num) + 1
        })
        this.oldListArray = this.data.paintCategoryList;
        var page = (this.data.num);
        this.getPaintTagList(this.data.getOption.tag, page, true);     
    },
    // 刷新数据
    onPullDownRefresh: function(){
        console.log("pulldownrefresh")
        this.getPaintTagList(this.data.getOption.tag, '1', false);
        wx.stopPullDownRefresh();
    },
    // 加载更多
    onReachBottom: function() {
        console.log("reach bottom")
        this.getMorePaintTypeList();
    },
    onLoad: function(option){
        console.log(option)
        this.data.getOption = option;
        console.log(this.data.getOption)
        this.setNavigationBarTitleText(option);
        this.getPaintTagList(option.tag, '1');
    },
    onReady: function() {
        // this.getUserInfo();
        // this.getPaintTagList();
    }
})