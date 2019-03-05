const authList = () => {
  return {
    rows: [
      {
        authSign: 'system:home:view',
        authType: 'menu',
        id: '5c3c54f286885e2788b43fd2',
        isDisplay: true,
        location: '#/home/index',
        name: '主页',
        remark: '均有权限'
      },
      {
        authSign: 'system:userManage:view',
        authType: 'menu',
        id: '5c3da5d2671ac11a741d56b6',
        isDisplay: true,
        location: '#/userManage/index',
        name: '用户管理'
      },
      {
        authSign: 'system:roleManage:view',
        authType: 'menu',
        id: '5c3da64a671ac11a741d56b7',
        isDisplay: true,
        location: '#/roleManage/index',
        name: '角色管理'
      },
      {
        authSign: 'system:authManage:index',
        authType: 'menu',
        id: '5c3da85c671ac11a741d56b8',
        isDisplay: true,
        location: '#/authManage/index',
        name: '权限管理'
      },
      {
        authSign: 'system:userManage:create',
        authType: 'button',
        id: '5c3dac40671ac11a741d56b9',
        isDisplay: true,
        location: '#/userManage/create',
        name: '新建用户'
      },
      {
        authSign: 'system:userManage:edit',
        authType: 'button',
        id: '5c3e8ea2aa6d031f90bfcf43',
        isDisplay: true,
        location: '#/userManage/edit',
        name: '编辑用户'
      },
      {
        authSign: 'system:userManage:resetPwd',
        authType: 'button',
        id: '5c3e91dcaa6d031f90bfcf45',
        isDisplay: true,
        location: '#/userManage/index',
        name: '重置密码'
      },
      {
        authSign: 'system:userManage:index',
        authType: 'button',
        id: '5c3e9340aa6d031f90bfcf46',
        isDisplay: true,
        location: '#/userManage/index',
        name: '停用用户'
      },
      {
        authSign: 'system:userManage:prohibite',
        authType: 'button',
        id: '5c3e966caa6d031f90bfcf47',
        isDisplay: true,
        location: '#/userManage/index',
        name: '禁用账号'
      },
      {
        authSign: 'system:roleManage:create',
        authType: 'button',
        id: '5c3e96cbaa6d031f90bfcf48',
        isDisplay: true,
        location: '#/roleManage/create',
        name: '新建角色'
      }
    ],
    totalCount: 12
  }
}
const parentAuth = () => [
  {id: '5c3c54f286885e2788b43fd2', name: '主页'},
  {id: '5c3da5d2671ac11a741d56b6', name: '用户管理'},
  {id: '5c3da64a671ac11a741d56b7', name: '角色管理'},
  {id: '5c3da85c671ac11a741d56b8', name: '权限管理'}
]

const authAll = () => {
  return [
    {
      authSign: 'system:home:view',
      authType: 'menu',
      id: '5c3c54f286885e2788b43fd2',
      isDisplay: true,
      location: '#/home/index',
      name: '主页',
      parentId: '0',
      remark: '均有权限'
    },
    {
      authSign: 'system:userManage:view',
      authType: 'menu',
      id: '5c3da5d2671ac11a741d56b6',
      isDisplay: true,
      location: '#/userManage/index',
      name: '用户管理',
      parentId: '0'
    },
    {
      authSign: 'system:roleManage:view',
      authType: 'menu',
      id: '5c3da64a671ac11a741d56b7',
      isDisplay: true,
      location: '#/roleManage/index',
      name: '角色管理',
      parentId: '0'
    },
    {
      authSign: 'system:authManage:index',
      authType: 'menu',
      id: '5c3da85c671ac11a741d56b8',
      isDisplay: true,
      location: '#/authManage/index',
      name: '权限管理',
      parentId: '0'
    },
    {
      authSign: 'system:userManage:create',
      authType: 'button',
      id: '5c3dac40671ac11a741d56b9',
      isDisplay: true,
      location: '#/userManage/create',
      name: '新建用户',
      parentId: '5c3da5d2671ac11a741d56b6'
    },
    {
      authSign: 'system:userManage:edit',
      authType: 'button',
      id: '5c3e8ea2aa6d031f90bfcf43',
      isDisplay: true,
      location: '#/userManage/edit',
      name: '编辑用户',
      parentId: '5c3da5d2671ac11a741d56b6'
    },
    {
      authSign: 'system:userManage:resetPwd',
      authType: 'button',
      id: '5c3e91dcaa6d031f90bfcf45',
      isDisplay: true,
      location: '#/userManage/index',
      name: '重置密码',
      parentId: '5c3da5d2671ac11a741d56b6'
    },
    {
      authSign: 'system:userManage:index',
      authType: 'button',
      id: '5c3e9340aa6d031f90bfcf46',
      isDisplay: true,
      location: '#/userManage/index',
      name: '停用用户',
      parentId: '5c3da5d2671ac11a741d56b6'
    },
    {
      authSign: 'system:userManage:prohibite',
      authType: 'button',
      id: '5c3e966caa6d031f90bfcf47',
      isDisplay: true,
      location: '#/userManage/index',
      name: '禁用账号',
      parentId: '5c3da5d2671ac11a741d56b6'
    },
    {
      authSign: 'system:roleManage:create',
      authType: 'button',
      id: '5c3e96cbaa6d031f90bfcf48',
      isDisplay: true,
      location: '#/roleManage/create',
      name: '新建角色',
      parentId: '5c3da64a671ac11a741d56b7'
    },
    {
      authSign: 'system:roleManage:edit',
      authType: 'button',
      id: '5c3e9707aa6d031f90bfcf49',
      isDisplay: true,
      location: '#/roleManage/edit',
      name: '编辑角色',
      parentId: '5c3da64a671ac11a741d56b7'
    },
    {
      authSign: 'system:roleManage:authConfig',
      authType: 'button',
      id: '5c3e9abaaa6d031f90bfcf4a',
      isDisplay: true,
      location: '#/roleManage/authConfig',
      name: '权限配置',
      parentId: '5c3da64a671ac11a741d56b7'
    },
    {
      authSign: 'system:roleManage:delete',
      authType: 'button',
      id: '5c3ea473aa6d031f90bfcf4b',
      isDisplay: true,
      location: '#/roleManage/index',
      name: '删除角色',
      parentId: '5c3da64a671ac11a741d56b7'
    },
    {
      authSign: 'system:authManage:detail',
      authType: 'button',
      id: '5c3ea6b5aa6d031f90bfcf4c',
      isDisplay: true,
      location: '#/authManage/detail',
      name: '权限详情',
      parentId: '5c3da85c671ac11a741d56b8'
    },
    {
      authSign: 'system:authManage:delete',
      authType: 'button',
      id: '5c3ead88aa6d031f90bfcf4d',
      isDisplay: true,
      location: '#/authManage/index',
      name: '删除权限',
      parentId: '5c3da85c671ac11a741d56b8'
    }
  ]
}

const authDetail = () => {
  return {
    authSign: 'system:userManage:view',
    authType: 'menu',
    createdAt: 1547544018232,
    displayMode: 'currentWindow',
    isDisplay: true,
    location: '#/userManage/index',
    name: '用户管理',
    parentId: '0',
    updatedAt: 1547544018232
  }
}
export default {
  getAuthList: () => authList(),
  getParentAuth: () => parentAuth(),
  getAuthAll: () => authAll(),
  getAuthDetail: () => authDetail()
}