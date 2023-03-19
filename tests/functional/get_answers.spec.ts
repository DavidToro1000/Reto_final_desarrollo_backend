import { test } from '@japa/runner'

test('get answers', async({client, assert}) => {
    const response = await client.get('api/v1/questions/getOptions/1')
    response.assertStatus(200)
    assert.isObject(response.body())
})