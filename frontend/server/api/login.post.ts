import { db } from '@/server/fake-db/auth'

export default defineEventHandler(async event => {
  const { email, password } = await readBody(event)

  if (!email || !password) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Username and Password is required to login',
      data: {
        username: ['Username and Password is required to login'],
      },
    })
  }

  const dbUser = db.users.find(u => u.email === email && u.password === password)

  if (!dbUser) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Invalid username or password',
      data: {
        username: ['Invalid username or password'],
      },
    })
  }

  // ℹ️ Don't send password in response
  const { password: _, ...user } = dbUser

  return {
    user,
  }
})
