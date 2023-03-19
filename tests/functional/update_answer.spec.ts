import { test } from '@japa/runner'

test('update answer', async({client, assert}) => {
    const response =await client.put('api/v1/questions/updateAnswer/2').form({
        "opcion": "correcta",
        "iscorrect":true
    })
    response.assertStatus(200)
    assert.isObject(response.body())
})