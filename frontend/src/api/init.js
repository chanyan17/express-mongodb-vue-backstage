import request from '@/utils/request'
export function getInitData () {
  return request({
    url: '/v1/init/data',
    method: 'get'
  })
}