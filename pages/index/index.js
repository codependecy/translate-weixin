//index.js
//获取应用实例
// 输入框聚焦的时候icon-close出现
// 输入框失焦的时候icon-close关闭
// 点击icon-close清空input下面textarea的内容

import { translate } from '../../utils/api.js'
const app = getApp()

Page({
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
    language:'en',
  },
  bindPickerChange(e) {
    self=this
    this.setData({
      index: e.detail.value,
      language: this.data.objectArray[e.detail.value].lang
    })
    this.onconfirm()
  },
  onFocus: function () {
    this.setData({ 'hideIcon': false })
  },
  onInput:function(e){
    this.setData({ 'query': e.detail.value })
  },
  onconfirm: function () {
    if (!this.data.query) return
    translate(this.data.query, 'auto', this.data.language).then(res => {
      this.setData({ 'transmsg': res.trans_result })

      let history = wx.getStorageSync('history') || []
      history.unshift({ query: this.data.query, transmsg: res.trans_result[0].dst, language: this.data.language, index: this.data.index,  })
      history.length = history.length > 10 ? 10 : history.length
      wx.setStorageSync('history', history)
    })
  },
  cleartext: function () {
    this.setData({ query: '', hideIcon: true, transmsg:[] })

  },
  onShow: function () {
    console.log('onshow....')
    this.onconfirm()
  },
  onLoad: function (options) {
    console.log('lonload..')
    console.log(options)
    if (options.query) {
      this.setData({ query: options.query, index: options.index, language: options.language})
    }
  },
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
