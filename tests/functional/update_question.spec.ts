import { test } from '@japa/runner'

test('update question', async({client, assert}) => {
    const response =await client.put('api/v1/questions/updateQuestion/1').form({
        "question": "¿que dia es hoy?"
    })
    response.assertStatus(200)
    assert.isObject(response.body())
})