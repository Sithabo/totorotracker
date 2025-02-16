import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class UsagesController {
  async getDailyUsage({ params }: HttpContext) {
    const userId = params.userId
    const dailyUsage = await db
      .from('app_usages')
      .innerJoin('apps', 'app_usages.app_id', 'apps.id')
      .where('app_usages.user_id', userId)
      .select(
        'app_usages.hour',
        'app_usages.time_spent',
        db.raw(
          'SUM(CASE WHEN apps.productive = false THEN app_usages.time_spent ELSE 0 END) as unproductive_time'
        )
      )
      .groupBy('app_usages.hour', 'app_usages.time_spent')
      .orderBy('app_usages.hour')

    return dailyUsage
  }

  async getWeeklyUsage({ params }: HttpContext) {
    const { userId } = params
    const insights = await db
      .from('app_usages')
      .innerJoin('apps', 'app_usages.app_id', 'apps.id')
      .where('app_usages.user_id', userId)
      .select(
        db.raw('SUM(app_usages.time_spent) as total_time'),
        db.raw(
          'SUM(CASE WHEN apps.productive = false THEN app_usages.time_spent ELSE 0 END) as unproductive_time'
        )
      )
      .first()

    return insights
  }

  async getInsights({ params }: HttpContext) {
    const { userId } = params
    return { message: `Welcome to TuturoTracker, ${userId}` }
  }
}
