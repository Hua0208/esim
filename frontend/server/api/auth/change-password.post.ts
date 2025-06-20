import { getServerSession } from '#auth'

export default defineEventHandler(async (event): Promise<any> => {
  try {
    const body = await readBody(event)
    
    // 獲取用戶會話
    const session = await getServerSession(event)
    if (!session?.user) {
      throw createError({
        statusCode: 401,
        statusMessage: '未授權'
      })
    }

    // 構建認證token（base64編碼的用戶資料）
    const authData = {
      username: session.user.username,
      role: session.user.role,
      email: session.user.email,
      timestamp: Date.now()
    }
    const token = Buffer.from(JSON.stringify(authData)).toString('base64')

    // 調用後端API
    const backendUrl = 'http://localhost:3030'
    const response = await $fetch(`${backendUrl}/api/auth/change-password`, {
      method: 'POST',
      body: {
        currentPassword: body.currentPassword,
        newPassword: body.newPassword
      },
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    return response
  } catch (error: any) {
    console.error('密碼修改API錯誤:', error)
    
    // 處理後端返回的錯誤
    if (error.data) {
      throw createError({
        statusCode: error.statusCode || 500,
        statusMessage: error.data.message || '修改密碼失敗'
      })
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: '修改密碼失敗，請稍後再試'
    })
  }
}) 