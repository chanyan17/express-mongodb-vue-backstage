import Mock from 'mockjs'

const Random = Mock.Random

const userLogin = function () {
  return {
    token: Mock.Random.guid()
  }
}

// 用户列表
const userList = function () {
  let data = {
    rows: [],
    totalCount: 10
  }
  for (let i = 0; i < data.totalCount; i++) {
    let userObject = Mock.mock({
      email: Random.email(),
      id: Random.id(),
      mobile: /^1[34578]\d{9}$/,
      remark: Random.cword(3),
      'sex|1': [
        'male',
        'female'
      ],
      'status|1': [
        'unusable',
        'normal',
        'prohibite'
      ],
      username: Random.cname()
    })
    data.rows.push(userObject)
  }
  return data
}

const userDetail = function () {
  let data = Mock.mock({
    email: Random.email(),
    id: Random.id(),
    mobile: /^1[34578]\d{9}$/,
    remark: Random.cword(3),
    'sex|1': [
      'male',
      'female'
    ],
    'status|1': [
      'unusable',
      'normal',
      'prohibite'
    ],
    username: Random.cname(),
    createdAt: (new Date()).getTime() - 3 * 24 * 60 * 60 * 1000,
    updatedAt: (new Date()).getTime()
  })
  return data
}

export default {
  userLogin: () => userLogin(),
  getUserList: () => userList(),
  getUserDetail: () => userDetail()
}