// 初始化数据
const initData = () => {
  return {
    authTypes: [
      {id: 'catalog', name: '目录', isUsed: false},
      {id: 'menu', name: '菜单', isUsed: true},
      {id: 'button', name: '按钮', isUsed: true}
    ],
    displayModes: [
      {id: 'currentWindow', name: '当前窗口'},
      {id: 'newwindow', name: '新窗口/新标签'},
      {id: 'dialogWindow', name: '弹出窗口'},
      {id: 'browserWindow', name: '弹出浏览器窗口'}
    ],
    sexes: [
      {id: 'male', name: '男'},
      {id: 'female', name: '女'}
    ],
    status: [
      {id: 'prohibite', name: '禁用'},
      {id: 'normal', name: '正常'},
      {id: 'unusable', name: '停用'}
    ]
  }
}
export default {
  getInitData: () => initData()
}