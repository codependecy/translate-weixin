//index.js
//获取应用实例
const app = getApp()

// 输入框聚焦的时候icon-close出现
// 输入框失焦的时候icon-close关闭
// 点击icon-close清空input下面textarea的内容


Page({
  onFocus:function(){
    this.setData({ 'hideIcon': false })
  },
  onBlur:function(){
    this.setData({ 'hideIcon': true })
    // this.translate()
  },
  cleartext:function(){
    this.setData({ query: '', hideIcon: true,})
  },
  data: {
    hideIcon: true,
    query:'',
    transmsg:[],
    array: ['英文', '中文', '日语', '韩语', '法语', '西班牙语', '阿拉伯语'],
    objectArray: [
      {
        'chs': '英文',
        "lang": 'en',
        "index": 0
      },
      {
        'chs': '中文',
        'lang': 'zh',
        "index": 1
      },
      {
        'chs': '日语',
        'lang': 'jp',
        "index": 2
      },
      {
        'chs': '韩语',
        'lang': 'kor',
        "index": 3
      },
      {
        'chs': '法语',
        'lang': 'fra',
        "index": 4
      },
      {
        'chs': '西班牙语',
        'lang': 'spa',
        "index": 5
      },
      {
        'chs': '阿拉伯语',
        'lang': 'ara',
        "index": 6
      }
    ],
    index: 0,
  },
  bindPickerChange(e) {
    self=this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
    console.log(this.data.index,e.detail.value)
  },
  translate:function(){
    self=this
    wx.request({
      url: 'https://api.fanyi.baidu.com/api/trans/vip/translate', // 仅为示例，并非真实的接口地址
      data:{
        q:"apple",
        from:"en",
        to:"zh",
        appid:"20190328000282122",
        salt:"1435660288",
        sign:"05ab534515144148515500311d2d5dca"
      },
      success(res) {
        self.data.transmsg = res.data.trans_result[0].dst
        self.setData({ transmsg: self.data.transmsg })
      }
    })
    // this.setData({ transmsg: this.data.transmsg })
  }
})




// Page({
//   data: {
//     motto: 'Hello World',
//     userInfo: {},
//     hasUserInfo: false,
//     canIUse: wx.canIUse('button.open-type.getUserInfo')
//   },
//   //事件处理函数
//   bindViewTap: function() {
//     wx.navigateTo({
//       url: '../logs/logs'
//     })
//   },
//   onLoad: function () {
//     if (app.globalData.userInfo) {
//       this.setData({
//         userInfo: app.globalData.userInfo,
//         hasUserInfo: true
//       })
//     } else if (this.data.canIUse){
//       // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
//       // 所以此处加入 callback 以防止这种情况
//       app.userInfoReadyCallback = res => {
//         this.setData({
//           userInfo: res.userInfo,
//           hasUserInfo: true
//         })
//       }
//     } else {
//       // 在没有 open-type=getUserInfo 版本的兼容处理
//       wx.getUserInfo({
//         success: res => {
//           app.globalData.userInfo = res.userInfo
//           this.setData({
//             userInfo: res.userInfo,
//             hasUserInfo: true
//           })
//         }
//       })
//     }
//   },
//   getUserInfo: function(e) {
//     console.log(e)
//     app.globalData.userInfo = e.detail.userInfo
//     this.setData({
//       userInfo: e.detail.userInfo,
//       hasUserInfo: true
//     })
//   }
// })
