const roleList = () => {
  return {
    rows: [
      {
        createdAt: 1546998704524,
        createdBy: '-',
        desc: '测试用',
        id: '5c3553b054539e2a7026b69d',
        key: 'admin',
        name: '管理员'
      }, {
        createdAt: 1547628597766,
        createdBy: '-',
        desc: 'aa',
        id: '5c3553b054539e2a7026b69a',
        key: 'aa',
        name: 'cc'
      }
    ],
    totalCount: 2
  }
}

const roleDetail = () => {
  let data = {
    createdAt: 1546998704524,
    createdBy: '-',
    desc: '测试用',
    id: '5c3553b054539e2a7026b69d',
    key: 'admin',
    name: '管理员'
  }
  return data
}

const roleAuth = () => {
  return [
    {
      authId: '5c3da5d2671ac11a741d56b6',
      createdAt: 1548051079643,
      id: '5c456287e9e12d05705fc5a5',
      roleId: '5c3553b054539e2a7026b69d',
      updatedAt: 1548051079643
    },
    {
      authId: '5c3dac40671ac11a741d56b9',
      createdAt: 1548051079644,
      id: '5c456287e9e12d05705fc5a6',
      roleId: '5c3553b054539e2a7026b69d',
      updatedAt: 1548051079644
    },
    {
      authId: '5c3e8ea2aa6d031f90bfcf43',
      createdAt: 1548051079644,
      id: '5c456287e9e12d05705fc5a7',
      roleId: '5c3553b054539e2a7026b69d',
      updatedAt: 1548051079644
    },
    {
      authId: '5c3e91dcaa6d031f90bfcf45',
      createdAt: 1548051079644,
      id: '5c456287e9e12d05705fc5a8',
      roleId: '5c3553b054539e2a7026b69d',
      updatedAt: 1548051079644
    },
    {
      authId: '5c3e9340aa6d031f90bfcf46',
      createdAt: 1548051079644,
      id: '5c456287e9e12d05705fc5a9',
      roleId: '5c3553b054539e2a7026b69d',
      updatedAt: 1548051079644
    },
    {
      authId: '5c3e966caa6d031f90bfcf47',
      createdAt: 1548051079644,
      id: '5c456287e9e12d05705fc5aa',
      roleId: '5c3553b054539e2a7026b69d',
      updatedAt: 1548051079644
    }
  ]
}

export default {
  getRoleList: () => roleList(),
  getRoleDetail: () => roleDetail(),
  getRoleAuth: () => roleAuth()
}