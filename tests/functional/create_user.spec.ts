import { test } from '@japa/runner'

test('create users', async({client, assert}) => {
    const response =await client.post('api/v1/user/create').form({
        "firstName": "daniel",
        "secondName": "jose",
        "surname": "cruz",
        "secondSurName": "casallas",
        "typeDocument": 1,
        "documentNumber": 1234567899,
        "email": "danielc88@gmail.co",
        "password":"32jdkdi",
        "rol":2,
        "phone": "32123122314"
    })
    response.assertStatus(200)
    assert.isObject(response.body())
})