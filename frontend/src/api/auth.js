import request from '@/utils/request'
export function getAuthList (params) {
  return request({
    url: '/v1/auth/list',
    method: 'get',
    params: params
  })
}

export function getAllAuth () {
  return request({
    url: '/v1/auth/all',
    method: 'get'
  })
}

export function getParentAuth () {
  return request({
    url: '/v1/auth/parentAuth',
    method: 'get'
  })
}

export function createAuth (params) {
  return request({
    url: '/v1/auth/create',
    method: 'post',
    data: params
  })
}

export function deleteAuth (params) {
  return request({
    url: '/v1/auth/delete',
    method: 'post',
    data: params
  })
}

export function getDetail (params) {
  return request({
    url: '/v1/auth/detail',
    method: 'post',
    data: params
  })
}

export function saveEditAuth (params) {
  return request({
    url: '/v1/auth/update',
    method: 'post',
    data: params
  })
}