import md5 from './md5.min.js'
var appid = '20190328000282122'
var key = 'gEeqf_RkzqSHW7sJysVH'

function translate(q,from,to){
  // console.log(q, from, to)
  return new Promise((resolve, reject) => {
    var salt = Date.now()

    var sign = md5(`${appid}${q}${salt}${key}`)
    wx.request({
      url: 'https://fanyi-api.baidu.com/api/trans/vip/translate',
      data: {
        q,
        from,
        to,
        appid,
        salt,
        sign
      },
      success(res) {
        if (res.data && res.data.trans_result) {
          resolve(res.data)
        } else {
          reject({ status: 'error', msg: '翻译失败' })
          wx.showToast({
            title: '翻译失败',
            icon: 'none',
            duration: 3000
          })
        }
      },
      fail() {
        reject({ status: 'error', msg: '翻译失败' })
        wx.showToast({
          title: '网络异常',
          icon: 'none',
          duration: 3000
        })
      }
    })
  })


  // wx.request({
  //   url: 'https://api.fanyi.baidu.com/api/trans/vip/translate', // 仅为示例，并非真实的接口地址
  //   data: {
  //     q,
  //     from,
  //     to,
  //     appid,
  //     salt,
  //     sign
  //   },
  //   success(res) {
  //     return(res.data)
  //     // self.data.transmsg = res.data.trans_result[0].dst
  //     // self.setData({ transmsg: self.data.transmsg })
  //   }
  // })
}
module.exports.translate = translate