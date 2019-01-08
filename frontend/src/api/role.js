import request from '@/utils/request'

export function createRole (params) {
  return request({
    url: '/v1/role/create',
    method: 'post',
    data: params
  })
}