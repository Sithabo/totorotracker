import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'app_usages'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('app_id').unsigned().references('id').inTable('apps').onDelete('CASCADE')
      table.integer('time_spent').unsigned().notNullable().checkBetween([1, 59])
      table.date('usage_date').notNullable()
      table.integer('hour').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}