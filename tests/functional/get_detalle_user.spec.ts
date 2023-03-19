import { test } from '@japa/runner'

test('get detalle users', async({client, assert}) => {
    const response = await client.get('api/v1/user/getUser/1234567899')
    response.assertStatus(200)
    assert.isObject(response.body())
})