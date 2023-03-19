import { test } from '@japa/runner'

test('get questions', async({client, assert}) => {
    const response = await client.get('api/v1/questions/getQuestions')
    response.assertStatus(200)
    assert.isObject(response.body())
})