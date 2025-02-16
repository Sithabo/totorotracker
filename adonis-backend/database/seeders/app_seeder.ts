import App from '#models/app'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await App.createMany([
      {
        name: 'Slack',
        productive: true,
      },
      {
        name: 'YouTube',
        productive: false,
      },
      {
        name: 'VS Code',
        productive: true,
      },
      {
        name: 'Facebook',
        productive: false,
      },
      {
        name: 'Gmail',
        productive: true,
      },
    ])
  }
}
