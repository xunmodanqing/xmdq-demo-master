//index.js
var util = require('../../utils/util.js')

Page({
    data: {
        userInfo: {},
        paintDetail: {},
        loadMore: '加载更多',
        isLoading: false,
        paintTags: [],
        searchVal: '',
        paintContent:'',
        paintId:'',
        paintStatus: 'DEFAULT',
        showIndex: [],
        isShowPartContent: true,
        picshow: false,
        stv: {
          offsetX: 0,
          offsetY: 0,
          zoom: false, //是否缩放状态
          distance: 0,  //两指距离
          scale: 1,  //缩放倍数
        }
    },
    show: function (){
        var that = this;
        that.setData({
          picshow: true,
        })
    },
    hide: function (){
        this.setData({
          picshow: false
        })
    },
    touchstartCallback: function (e) {
      //触摸开始
      console.log('touchstartCallback');
      console.log(e);

      if (e.touches.length === 1) {
        let { clientX, clientY } = e.touches[0];
        this.startX = clientX;
        this.startY = clientY;
        this.touchStartEvent = e.touches;
      } else {
        let xMove = e.touches[1].clientX - e.touches[0].clientX;
        let yMove = e.touches[1].clientY - e.touches[0].clientY;
        let distance = Math.sqrt(xMove * xMove + yMove * yMove);
        this.setData({
          'stv.distance': distance,
          'stv.zoom': true, //缩放状态
        })
      }

    },
    touchmoveCallback: function (e) {
      //触摸移动中
      console.log('touchmoveCallback');
      console.log(e);

      if (e.touches.length === 1) {
        //单指移动
        if (this.data.stv.zoom) {
          //缩放状态，不处理单指
          return;
        }
        let { clientX, clientY } = e.touches[0];
        let offsetX = clientX - this.startX;
        let offsetY = clientY - this.startY;
        this.startX = clientX;
        this.startY = clientY;
        let { stv } = this.data;
        stv.offsetX += offsetX;
        stv.offsetY += offsetY;
        stv.offsetLeftX = -stv.offsetX;
        stv.offsetLeftY = -stv.offsetLeftY;
        this.setData({
          stv: stv
        });

      } else {
        //双指缩放
        let xMove = e.touches[1].clientX - e.touches[0].clientX;
        let yMove = e.touches[1].clientY - e.touches[0].clientY;
        let distance = Math.sqrt(xMove * xMove + yMove * yMove);

        let distanceDiff = distance - this.data.stv.distance;
        let newScale = this.data.stv.scale + 0.005 * distanceDiff;

        this.setData({
          'stv.distance': distance,
          'stv.scale': newScale,
        })
      }

    },
    touchendCallback: function (e) {
      //触摸结束
      console.log('touchendCallback');
      console.log(e);

      if (e.touches.length === 0) {
        this.setData({
          'stv.zoom': false, //重置缩放状态
        })
      }
    },
    getPaintDetail: function(id){
        var that = this;
        var url = '/m/book/' + id;
        util.http('GET',url, {}, (response) => {
            if (response.errMsg) {
                util.showModel(response.errMsg);
            } else {
                var array = response.book.tags ? (response.book.tags + '').replace(/[\[\]]/g, '').split(', ') : '';
                that.setData({
                    paintDetail: response,
                    paintTags: array,
                    paintAllContent: response.book.content,
                    paintContent: response.book.content,
                    paintPartContent: response.book.content ? response.book.content.substring(0, 100) + '...': '',
                    bookStatus: response.bookStatus
                })
            }
        })
    },
    getAuthPaintDetail: function(id){
        var that = this;
        var url = '/m/auth/book/' + id;
        util.http('POST',url, {}, (response) => {
            if (response.errMsg) {
                util.showModel(response.errMsg);
            } else {
                var array = response.book.tags ? (response.book.tags + '').replace(/[\[\]]/g, '').split(', ') : '';
                that.setData({
                    paintDetail: response,
                    paintTags: array,
                    paintContent: response.book.content,
                    paintStatus: response.bookStatus
                })
            }
        },'',that.data.auth)
    },
    doShowAllContent: function() {
        var isShowPartContent = !this.data.isShowPartContent;
        this.setData({
            isShowPartContent: isShowPartContent
        })
    },
    goPaintTag(e) {
        wx.navigateTo({
            url: '../../pages/paintTag/paintTag?tag=' + e.currentTarget.dataset.tag
        })
        //wx.redirectTo({
        //  url: '../../pages/paintTag/paintTag?tag=' + e.currentTarget.dataset.tag
        //})
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    onLoad: function(option){
        this.setData({
            paintId: option.id
        })
        this.getPaintDetail(this.data.paintId);
    },
    onReady: function() {
    }
})