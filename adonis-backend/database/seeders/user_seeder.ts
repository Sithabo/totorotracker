import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await User.createMany([
      {
        fullName: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      },
      {
        fullName: 'Jane Doe',
        email: 'jane@example.com',
        password: 'password123',
      },
      {
        fullName: 'Alice Smith',
        email: 'alice@example.com',
        password: 'password123',
      },
      {
        fullName: 'Bob Jones',
        email: 'bob@example.com',
        password: 'password123',
      },
    ])
  }
}
