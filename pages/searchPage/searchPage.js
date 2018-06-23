var util = require('../../utils/util.js')
var app=getApp();

Page({
    data: {
        searchValue: '',
        isFocus: true,
        start: 0,
        resultList: [],
        oldListArray: [],
        loadMore: '加载更多',
        sortArray:['按朝代排序'],
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
            ' 近现代'], 
          ['所有','山水', '花鸟', '人物', '其他'], 
          ['所有','纸本设色',
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
            '其他']
        ],
        creation_date: [],
        subject_matter: [],
        material_technique: [],
        isLoading: false,
        date:'*',
        sub:'*',
        m_tech:'*'
    },
    bindMultiPickerChange: function (e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      var start=0;
      var date=this.data.creation_date[e.detail.value[0]];
      console.log(date)
      var sub=this.data.subject_matter[e.detail.value[1]];
      console.log(sub)
      var m_tech = this.data.material_technique[e.detail.value[2]];
      console.log(m_tech)
      this.setData({
        date:date,
        sub:sub,
        m_tech:m_tech
      })
      console.log('filter')
      console.log(this.data.date)
      console.log(this.data.sub)
      console.log(this.data.m_tech)
      this.doSearch(start,false,date,sub,m_tech);
    },
    bindPickerChange: function (e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
    },
    doSearch:function(start,flag,date,sub,m_tech){
        var that = this;
        if(that.data.searchValue){
            var url = "/select?"+"fl=id,title,image_urls,creation_creator,subject_matter,current_location&start=" + start + "&rows=10" + "&q=" + that.data.searchValue + "&fq=creation_date:" + date + "&fq=subject_matter:" + sub + "&fq=material_technique:" + m_tech;
            console.log(url)
            var data={};
            util.http('GET', url , data,(response) => {
                if (response.errMsg) {
                    util.showModel(response.errMsg);
                } else {
                      if (flag) {
                        this.setData({
                          resultList: that.data.resultList.concat(response.response.docs)
                        })
                      } else {
                        that.setData({
                          resultList: response.response.docs
                        })
                        console.log("get return")
                        console.log(response)
                        that.setData({
                          resultList: response.response.docs,
                          //start:(that.data.start)+10
                        })
                        console.log(that.data.resultList)
                      }
                }
            })
        }else{
            that.setData({
                resultList: []
            })
        }
    },
    getMorePaintResult() {
        this.setData({
            start: (this.data.start) + 10
        })
        this.oldListArray = this.data.resultList;
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
            date:'*',
            sub:'*',
            m_tech:'*'
        })
        var start=0;
        this.doSearch(start,false,this.data.date,this.data.sub,this.data.m_tech);
    },
    onReachBottom: function () {
      console.log("###################")
      this.getMorePaintResult();
    },
    setNavigationBarTitleText:function(){
        wx.setNavigationBarTitle({
            title: '搜索画作'
        })
    },
    goBookDetail(e){
        wx.navigateTo({
            url: '../../pages/paintDetail/paintDetail?id=' + e.currentTarget.dataset.id
        })
    },
    onPullDownRefresh: function(){
        wx.stopPullDownRefresh();
    },
    onLoad: function(){
      this.setData({
        creation_date:app.creation_date,
        subject_matter:app.subject_matter,
        material_technique: app.material_technique
      })
    },
    onReady: function() {
        this.setNavigationBarTitleText();
    }
})