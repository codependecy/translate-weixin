//logs.js
const util = require('../../utils/util.js')
const app = getApp()
Page({
  data: {
    history: []
  },
  onLoad: function () {
    // this.setData({
    //   logs: (wx.getStorageSync('logs') || []).map(log => {
    //     return util.formatTime(new Date(log))
    //   })
    // })
  },
  onShow: function () {
    console.log(this.data.history)
    this.setData({ history: wx.getStorageSync('history') })
  },

  onTapItem: function (e) {
    console.log(e)
    wx.reLaunch({
      url: `/pages/index/index?query=${e.currentTarget.dataset.query}&index=${e.currentTarget.dataset.index}&language=${e.currentTarget.dataset.language}`
    })
  },
})
