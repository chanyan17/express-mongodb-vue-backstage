import request from '@/utils/request'

export function createRole (params) {
  return request({
    url: '/v1/role/create',
    method: 'post',
    data: params
  })
}

export function getRoleList (params) {
  return request({
    url: '/v1/role/list',
    method: 'get',
    params: params
  })
}

export function deleteRole (params) {
  return request({
    url: '/v1/role/delete',
    method: 'post',
    data: params
  })
}

export function getRoleDetail (params) {
  return request({
    url: '/v1/role/detail',
    method: 'post',
    data: params
  })
}

export function updateRole (params) {
  return request({
    url: '/v1/role/update',
    method: 'post',
    data: params
  })
}

export function getRoleAuth (params) {
  return request({
    url: '/v1/role/update',
    method: 'post',
    data: params
  })
}