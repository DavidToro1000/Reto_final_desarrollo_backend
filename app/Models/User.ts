import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import TypesDocument from './TypesDocument'
import Role from './Role'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public first_name: string

  @column()
  public second_name: string

  @column()
  public surname: string

  @column()
  public second_sur_name: string

  @column()
  public type_document: number

  @column()
  public document_number: number

  @column()
  public email: string

  @column()
  public password: string

  @column()
  public rol_id: number

  @column()
  public phone: string

  @column()
  public state: boolean

  @hasOne (() => TypesDocument)
  public types_documents: HasOne<typeof TypesDocument>

  @hasOne (() => Role)
  public roles: HasOne<typeof Role>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
