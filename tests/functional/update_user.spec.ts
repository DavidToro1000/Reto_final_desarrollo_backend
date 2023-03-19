import { test } from '@japa/runner'

test('update users', async({client, assert}) => {
    const response =await client.put('api/v1/user/update/1234567899').form({
        "firstName": "danielEditado",
        "secondName": "jose",
        "surname": "cruz",
        "secondSurName": "casallas",
        "typeDocument": 2,
        "documentNumber": 1234567899,
        "email": "danielc88@gmail.co",
        "phone": "32123122314"

    })
    response.assertStatus(200)
    assert.isObject(response.body())
})