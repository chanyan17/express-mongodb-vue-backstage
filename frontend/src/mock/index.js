import Mock from 'mockjs'
import { isSimulateData, baseUrl } from '@/config/api'
import userAPI from './user'
import initAPI from './init'
import authAPI from './auth'
import roleAPI from './role'

function returnResult (data) {
  return {
    ok: 0,
    data: data
  }
}

if (isSimulateData) {
  Mock.mock(RegExp(baseUrl + '/v1/init/data' + '.*'), 'get', returnResult(initAPI.getInitData()))
  Mock.mock(RegExp(baseUrl + '/v1/user/list' + '.*'), 'get', returnResult(userAPI.getUserList()))
  Mock.mock(RegExp(baseUrl + '/v1/user/detail' + '.*'), 'post', returnResult(userAPI.getUserDetail()))
  Mock.mock(RegExp(baseUrl + '/v1/user/prohibite'), 'post', returnResult(''))
  Mock.mock(RegExp(baseUrl + '/v1/user/normal'), 'post', returnResult(''))
  Mock.mock(RegExp(baseUrl + '/v1/user/unusable'), 'post', returnResult(''))
  Mock.mock(RegExp(baseUrl + '/v1/user/resetPwd'), 'post', returnResult(''))
  Mock.mock(RegExp(baseUrl + '/v1/auth/list' + '.*'), 'get', returnResult(authAPI.getAuthList()))
  Mock.mock(RegExp(baseUrl + '/v1/auth/parentAuth' + '.*'), 'get', returnResult(authAPI.getParentAuth()))
  Mock.mock(RegExp(baseUrl + '/v1/auth/delete'), 'post', returnResult(''))
  Mock.mock(RegExp(baseUrl + '/v1/auth/all' + '.*'), 'get', returnResult(authAPI.getAuthAll()))
  Mock.mock(RegExp(baseUrl + '/v1/auth/detail' + '.*'), 'post', returnResult(authAPI.getAuthDetail()))
  Mock.mock(RegExp(baseUrl + '/v1/role/list' + '.*'), 'get', returnResult(roleAPI.getRoleList()))
  Mock.mock(RegExp(baseUrl + '/v1/role/detail' + '.*'), 'post', returnResult(roleAPI.getRoleDetail()))
  Mock.mock(RegExp(baseUrl + '/v1/role/roleAuth' + '.*'), 'get', returnResult(roleAPI.getRoleAuth()))
  Mock.mock(RegExp(baseUrl + '/v1/role/delete'), 'post', returnResult(''))
}
export default Mock