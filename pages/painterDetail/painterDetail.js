// pages/painterDetail/painterDetail.js
var util = require('../../utils/util.js')

Page({
  data: {
    userInfo: {},
    paintDetail: {},
    loadMore: '加载更多',
    isLoading: false,
    morePaintList: [],
    paintImg: '',
    paintDesc: '',
    searchVal: '',
    paintId: '',
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
    },
    screenWidth: 0,
    screenHeight: 0,
    imgwidth: 0,
    imgheight: 0,
  },
  show: function () {
    var that = this;
    that.setData({
      picshow: true,
    })
  },
  hide: function () {
    this.setData({
      picshow: false
    })
  },
  imageLoad: function (e) {
    var _this = this;
    var $width = e.detail.width,    //获取图片真实宽度  
      $height = e.detail.height;
    var ratio;  //图片的真实宽高比例  
    var viewWidth;
    var viewHeight;
    if ($height > $width) {
      ratio = $width / $height;
      viewWidth = 700;         //设置图片显示宽度，  
      viewHeight = 700 / ratio;    //计算的高度值    
    } else {
      ratio = $height / $width;
      viewHeight = 700;
      viewWidth = 700 / ratio;
    }
    this.setData({
      imgwidth: viewWidth,
      imgheight: viewHeight
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
  getPaintDetail: function (id) {
    var that = this;
    var url = '/select';
    var data = {
      fl: 'id,authorName,dynasty,alias,courtesyNames,artNames,bornPlace,achievements,works,image_urls,descriptionURL',
      q: 'id:' + that.data.paintId,
    };
    util.http('GET', url, data, (response) => {
      if (response.errMsg) {
        util.showModel(response.errMsg);
      } else {
        var paint = response.response.docs[0];
        //that.setData({
        //authorName: paint.authorName,
        //dynasty: paint.dynasty,
        //courtesyNames: paint.courtesyNames,
        //bornPlace: paint.bornPlace,
        //artNames: paint.artNames,
        //achievements: paint.achievements,
        //works: paint.works,
        //alias: paint.alias,
        //paintImg: paint.image_urls,
        //descriptionURL: paint.descriptionURL
        //})  
        this.setData({
          paintImg: paint.image_urls,
          morePaintList: response.response.docs
        })
      }
    })
  },
  /**
   * 跳转百科
   */
  goBaike() {
    wx.navigateTo({
      url: '../../pages/painterBaike/painterBaike?id=' + this.data.paintId
    })
  },

  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
  },
  onLoad: function (option) {
    //console.log(option.id)
    this.setData({
      paintId: option.id
    })
    this.getPaintDetail(this.data.paintId);
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          screenHeight: res.windowHeight,
          screenWidth: res.windowWidth,
        });
      }
    });
  },
  onReady: function () {
  }
})