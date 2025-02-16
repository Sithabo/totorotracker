import AppUsage from '#models/app_usage'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await AppUsage.createMany([
      {
        userId: 1,
        appId: 1, // Slack
        timeSpent: 59,
        usageDate: DateTime.local(2025, 2, 10, 9, 0),
        hour: 9,
      },
      {
        userId: 1,
        appId: 2, // YouTube
        timeSpent: 59,
        usageDate: DateTime.local(2025, 2, 10, 10, 0),
        hour: 10,
      },
      {
        userId: 1,
        appId: 3, // VS Code
        timeSpent: 59,
        usageDate: DateTime.local(2025, 2, 11, 11, 0),
        hour: 11,
      },
      {
        userId: 1,
        appId: 4, // Facebook
        timeSpent: 59,
        usageDate: DateTime.local(2025, 2, 11, 12, 0),
        hour: 12,
      },
      {
        userId: 1,
        appId: 5, // Gmail
        timeSpent: 30,
        usageDate: DateTime.local(2025, 2, 12, 13, 0),
        hour: 13,
      },
      {
        userId: 2,
        appId: 1, // Slack
        timeSpent: 45,
        usageDate: DateTime.local(2025, 2, 12, 14, 0),
        hour: 14,
      },
      {
        userId: 2,
        appId: 2, // YouTube
        timeSpent: 59,
        usageDate: DateTime.local(2025, 2, 13, 15, 0),
        hour: 15,
      },
      {
        userId: 2,
        appId: 3, // VS Code
        timeSpent: 59,
        usageDate: DateTime.local(2025, 2, 13, 16, 0),
        hour: 16,
      },
      {
        userId: 2,
        appId: 4, // Facebook
        timeSpent: 59,
        usageDate: DateTime.local(2025, 2, 14, 17, 0),
        hour: 17,
      },
      {
        userId: 2,
        appId: 5, // Gmail
        timeSpent: 20,
        usageDate: DateTime.local(2025, 2, 14, 18, 0),
        hour: 18,
      },
    ])
  }
}
