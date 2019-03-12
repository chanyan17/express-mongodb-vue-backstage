import request from '@/utils/request'
export function userLogin (params) {
  return request({
    url: '/v1/user/login',
    method: 'post',
    data: params
  })
}
export function userLogout (params) {
  return request({
    url: '/v1/user/login',
    method: 'post'
  })
}

export function getUserList (params) {
  return request({
    url: '/v1/user/list',
    method: 'get',
    params: params
  })
}

export function createUser (params) {
  return request({
    url: '/v1/user/create',
    method: 'post',
    data: params
  })
}

export function getUserDetail (params) {
  return request({
    url: '/v1/user/detail',
    method: 'post',
    data: params
  })
}

export function updateUser (params) {
  return request({
    url: '/v1/user/update',
    method: 'post',
    data: params
  })
}

export function unusableUser (params) {
  return request({
    url: '/v1/user/unusable',
    method: 'post',
    data: params
  })
}

export function prohibiteUser (params) {
  return request({
    url: '/v1/user/prohibite',
    method: 'post',
    data: params
  })
}

export function normalUser (params) {
  return request({
    url: '/v1/user/normal',
    method: 'post',
    data: params
  })
}

export function resetPwd (params) {
  return request({
    url: '/v1/user/resetPwd',
    method: 'post',
    data: params
  })
}