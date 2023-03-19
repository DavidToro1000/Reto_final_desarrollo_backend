import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('id').primary()
      table.string('first_name', 50).notNullable()
      table.string('second_name', 50)
      table.string('surname', 50).notNullable()
      table.string('second_sur_name', 50)
      table.integer('type_document').references('types_documents.id').onDelete('cascade').notNullable()
      table.integer('document_number').notNullable()
      table.string('email', 100).notNullable()
      table.string('password', 100).notNullable()
      table.integer('rol_id').references('roles.id').onDelete('cascade').notNullable()
      table.string('phone', 50).notNullable()
      table.boolean('state').notNullable()
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
