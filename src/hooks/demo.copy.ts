// 用户相关类型
interface User {
  id: string
  name: string
  email: string
}

interface CreateUserData {
  name: string
  email: string
}

interface UpdateUserData {
  name?: string
  email?: string
}

function UserList() {
  const userApi = useApi<User[]>('/users')
  const queryClient = useQueryClient()

  // 获取用户列表
  const { data, isLoading, error } = userApi.useGet(
    { page: 1, limit: 10 },
    {
      staleTime: 5 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
    }
  )

  // 创建用户
  const createUser = userApi.usePost<CreateUserData>({
    onSuccess: () => {
      queryClient.invalidateQueries(['/users'])
    },
  })

  // 更新用户
  const updateUser = userApi.usePut<UpdateUserData>({
    onSuccess: () => {
      queryClient.invalidateQueries(['/users'])
    },
  })

  // 删除用户
  const deleteUser = userApi.useDelete({
    onSuccess: () => {
      queryClient.invalidateQueries(['/users'])
    },
  })

  // 使用示例
  const handleCreate = (userData: CreateUserData) => {
    createUser.mutate(userData)
  }

  const handleUpdate = (userId: string, userData: UpdateUserData) => {
    updateUser.mutate(userData, {
      params: { id: userId }
    })
  }

  const handleDelete = (userId: string) => {
    deleteUser.mutate(undefined, {
      params: { id: userId }
    })
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      {data?.data.map(user => (
        <div key={user.id}>
          {user.name}
          <button onClick={() => handleUpdate(user.id, { name: 'New Name' })}>
            Update
          </button>
          <button onClick={() => handleDelete(user.id)}>Delete</button>
        </div>
      ))}
    </div>
  )
}