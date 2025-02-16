import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class UsagesController {
  async getDailyUsage({ params }: HttpContext) {
    const userId = params.userId
    const dailyUsage = await db
      .from('app_usages')
      .where('user_id', userId)
      .select('hour', 'time_spent', 'unproductive_time')
      .groupBy('hour')
      .orderBy('hour')

    return dailyUsage
  }

  async getWeeklyUsage({ params }: HttpContext) {
    const { userId } = params
    const insights = await db
      .from('app_usages')
      .where('user_id', userId)
      .select(
        db.raw('SUM(time_spent) as total_time'),
        db.raw('SUM(unproductive_time) as unproductive_time')
      )
      .first()

    return insights
  }

  async getInsights({ params }: HttpContext) {
    const { userId } = params
    return { message: `Welcome to TuturoTracker, ${userId}` }
  }
}
