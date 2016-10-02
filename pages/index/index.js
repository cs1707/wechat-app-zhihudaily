const util = require('../../utils/util.js')

Page({
  data: {
    list: [],
    top_stories: [],
    date: null,
    loading: false
  },
  onLoad () {
    this.fetchLatest()
  },
  fetchLatest () {
    if (this.data.loading) {
      return
    }
    this.setData({
      loading: true
    })
    wx.request({
      url: 'http://news-at.zhihu.com/api/4/news/latest',
      header: {
          'Content-Type': 'application/json'
      },
      success: ({data}) => {
        this.setData({
          top_stories: data.top_stories,
          list: [ data ],
          date: data.date
        })
      },
      complete: () => {
        this.setData({
          loading: false
        })
      }
    })
  },
  fetchBefore () {
    if (!this.data.date || this.data.loading) {
      return
    }
    this.setData({
      loading: true
    })
    wx.request({
      url: `http://news-at.zhihu.com/api/4/news/before/${this.data.date}`,
      header: {
          'Content-Type': 'application/json'
      },
      success: ({data}) => {
        data.title = util.formatDate(data.date)
        this.setData({
          list: [ ...this.data.list, data ],
          date: data.date
        })
      },
      complete: () => {
        setTimeout(() => {
          this.setData({
            loading: false
          })
        }, 300)
      }
    })
  },
  viewDetail (e) {
    wx.navigateTo({
      url: `../detail/detail?id=${e.currentTarget.dataset.id}`
    })
  }
})
