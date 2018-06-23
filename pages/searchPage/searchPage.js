var util = require('../../utils/util.js')
var app = getApp();

Page({
  data: {
    searchValue: '',
    isFocus: true,
    start: 0,
    resultList: [],
    highlighting: [],
    //oldListArray: [],
    loadMore: '加载更多',
    sortArray: ['按朝代排序'],
    multiArray: [
      [' 所有 ',
        ' 战国 ',
        ' 汉代 ',
        ' 晋代 ',
        ' 五代十国 ',
        ' 隋代 ',
        ' 唐代 ',
        ' 南北朝 ',
        ' 金代 ',
        ' 辽代 ',
        ' 宋代 ',
        ' 元代 ',
        ' 明代 ',
        ' 清代 ',
        ' 近现代'
      ],
      ['所有', '山水', '花鸟', '人物', '其他'],
      ['所有', '纸本设色',
        '绢本设色',
        '纸本墨笔',
        '纸本水墨',
        '绢本水墨',
        '绢本墨笔',
        '金笺设色',
        '金笺墨笔',
        '绫本设色',
        '绫本墨笔',
        '金笺水墨',
        '其他'
      ]
    ],
    creation_date: [],
    subject_matter: [],
    material_technique: [],
    isLoading: false,
    date: '*',
    sub: '*',
    m_tech: '*'
  },
  bindMultiPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var start = 0;
    var date = this.data.creation_date[e.detail.value[0]];
    console.log(date)
    var sub = this.data.subject_matter[e.detail.value[1]];
    console.log(sub)
    var m_tech = this.data.material_technique[e.detail.value[2]];
    console.log(m_tech)
    this.setData({
      date: date,
      sub: sub,
      m_tech: m_tech
    })
    console.log('filter')
    console.log(this.data.date)
    console.log(this.data.sub)
    console.log(this.data.m_tech)
    this.doSearch(start, false, date, sub, m_tech);
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
  },
  merge: function (ob1, ob2) {
    var result = {};
    for (var attr in ob1) {
      result[attr] = ob1[attr];
    }
    for (var attr in ob2) {
      result[attr] = ob2[attr];
    }
    return result;
  },
  doSearch: function(start, flag, date, sub, m_tech) {
    var that = this;
    var defType = 'dismax'; //开启dismax
    var qf = 'title^1.5 creation_date creation_creator subject_matter material_technique current_location description^0.2'; //定义查询字段与查询权重
    var hl = 'on'; //开启高亮
    var hl_fl = 'title,subject_matter,material_technique,creation_creator,current_location'; //允许高亮的字段
    var hl_simple_pre = '<span style="color: red">'; //高亮的前缀
    var hl_simple_post = '</span>'; //高亮的后缀
    var fl = 'id,title,creation_date,creation_creator,subject_matter,material_technique,current_location,image_urls'; //定义返回响应返回的字段
    var rows = 10; //每次返回的结果数
    var q = that.data.searchValue; //查询内容
    var fq1 = 'creation_date:' + date; //日期筛选
    var fq2 = 'subject_matter:' + sub; //题材筛选
    var fq3 = 'material_technique:' + m_tech; //材质技艺筛选
    if (that.data.searchValue) {
      var url = "/select?" + "defType=" + defType + "&qf=" + qf + "&hl=" + hl + "&hl.fl=" + hl_fl + "&hl.simple.pre=" + hl_simple_pre + "&hl.simple.post=" + hl_simple_post + "&fl=" + fl + "&start=" + start + "&rows=" + rows + "&q=" + q + "&fq=" + fq1 + "&fq=" + fq2 + "&fq=" + fq3;
      var data = {
      };
      util.http('GET', url, data, (response) => {
        if (response.errMsg) {
          util.showModel(response.errMsg);
        } else {
          if (flag) {
            this.setData({
              resultList: that.data.resultList.concat(response.response.docs),
              highlighting: this.merge(that.data.highlighting,response.highlighting)
            })
          } else {
            that.setData({
              resultList: response.response.docs,
              highlighting: response.highlighting
            })
          }
        }
      })
    } else {
      that.setData({
        resultList: [],
        highlighting: []
      })
    }
  },
  getMorePaintResult() {
    this.setData({
      start: (this.data.start) + 10
    })
    //this.oldListArray = this.data.resultList;
    var start = (this.data.start);
    this.doSearch(start, true, this.data.date, this.data.sub, this.data.m_tech);
  },
  goPaintDetail(e) {
    wx.navigateTo({
      url: '../../pages/paintDetail/paintDetail?id=' + e.currentTarget.dataset.id
    })
  },
  bindKeyInput: function(e) {
    this.setData({
      searchValue: e.detail.value,
      date: '*',
      sub: '*',
      m_tech: '*'
    })
    var start = 0;
    this.doSearch(start, false, this.data.date, this.data.sub, this.data.m_tech);
  },
  onReachBottom: function() {
    console.log("###################")
    this.getMorePaintResult();
  },
  setNavigationBarTitleText: function() {
    wx.setNavigationBarTitle({
      title: '搜索画作'
    })
  },
  goBookDetail(e) {
    wx.navigateTo({
      url: '../../pages/paintDetail/paintDetail?id=' + e.currentTarget.dataset.id
    })
  },
  onPullDownRefresh: function() {
    wx.stopPullDownRefresh();
  },
  onLoad: function() {
    this.setData({
      creation_date: app.creation_date,
      subject_matter: app.subject_matter,
      material_technique: app.material_technique
    })
  },
  onReady: function() {
    this.setNavigationBarTitleText();
  }
})