import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  async login({ request }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    const user = await User.verifyCredentials(email, password)

    if (!user) {
      return { message: 'Invalid credentials' }
    }

    const token = await User.accessTokens.create(user, ['*'], {
      expiresIn: '7 days',
    })

    return token
  }

  async register({ request }: HttpContext) {
    const { fullName, email, password } = request.only(['fullName', 'email', 'password'])
    const user = await User.create({ fullName, email, password })

    return user
  }

  async delete({ request }: HttpContext) {
    const { id } = request.only(['id'])
    const user = await User.findOrFail(id)

    user.delete()

    return { message: 'User deleted' }
  }

  async update({ request }: HttpContext) {
    const { id, fullName, email, password } = request.only(['id', 'fullName', 'email', 'password'])

    const user = await User.findOrFail(id)

    user.email = email
    user.password = password
    user.fullName = fullName

    user.save()

    return user
  }

  async getUser({ auth }: HttpContext) {
    return auth.user
  }
}
