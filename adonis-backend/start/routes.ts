/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import UsersController from '#controllers/users_controller'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import UsagesController from '#controllers/usages_controller'

router
  .group(() => {
    router.get('/', async () => {
      return { message: 'welcome to TuturoTracker' }
    })
    router.post('/login', [UsersController, 'login'])
    router.post('/register', [UsersController, 'register'])

    // ========================
    // Usage routes
    // ========================
    router
      .group(() => {
        router.get('daily/:userId', [UsagesController, 'getDailyUsage'])

        router.get('weekly/:userId', [UsagesController, 'getWeeklyUsage'])

        router.get('insights/:userId', [UsagesController, 'getInsights'])
      })
      .prefix('usage')
      .use(middleware.auth())

    router
      .group(() => {
        router.get('/', [UsersController, 'getUser'])
        router.put('/', [UsersController, 'update'])
        router.delete('/', [UsersController, 'delete'])
      })
      .prefix('dashboard')
      .use(middleware.auth())
  })
  .prefix('api/v1')
