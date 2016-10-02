function formatDate (input) {
  input = '' + input

  let year = input.slice(0, 4)
  let month = input.slice(4, 6)
  let day = input.slice(6)
  let weekday = new Date(year, month - 1, day).getDay()

  let weekdays = ['日', '一', '二', '三', '四', '五', '六']

  return `${month}月${day}日 星期${weekdays[weekday]}`
}

module.exports = {
  formatDate
}
