Page({
  data: {
    detail: {}
  },
  onLoad ({id}) {
    this.fetchDetail (id)
  },
  fetchDetail (id) {
    wx.request({
      url: `http://news-at.zhihu.com/api/4/news/${id}`,
      headers: {
        'Content-Type': 'application/json'
      },
      success: ({data}) => {
        data.content = data.body.replace(/<[^>]+>/g, '').replace(/\n{3,}/g, '\n\n')
        this.setData({
          detail: data
        })
      }
    })
  }
})
