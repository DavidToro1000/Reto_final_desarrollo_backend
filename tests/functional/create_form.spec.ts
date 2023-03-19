import { test } from '@japa/runner'

test('create form', async({client, assert}) => {
    const response =await client.post('api/v1/form/postquestions').form({
        "estudianteId": 123456789,
        "answers": [4, 1, 3, 2]
    })
    response.assertStatus(200)
    assert.isObject(response.body())
})