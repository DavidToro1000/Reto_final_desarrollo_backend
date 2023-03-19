import { test } from '@japa/runner'

test('login', async({client, assert}) => {
    const response =await client.post('api/v1/login').form({
        "email": "danielc88@gmail.co",
        "password": "32jdkdi"
    })
    response.assertStatus(200)
    assert.isObject(response.body())
})