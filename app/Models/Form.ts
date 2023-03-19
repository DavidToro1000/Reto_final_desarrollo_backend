import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Answer from './Answer'
import User from './User'

export default class Form extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public student_id: string

  @column()
  public answer_id: boolean

  @column()
  public state: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne (() => Answer)
  public answers: HasOne<typeof Answer>

  @hasOne (() => User)
  public users: HasOne<typeof User>
}
