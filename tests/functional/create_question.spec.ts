import { test } from '@japa/runner'

test('create question', async({client, assert}) => {
    const response =await client.post('api/v1/questions/create').form({
        "question": "¿que dia es hoy?",
        "options": [
            {
                "opcion":"esta es correcta",
                "iscorrect":true
            },{
                "opcion":"incorrecta",
                "iscorrect":false
            },{
                "opcion":"incorrecta",
                "iscorrect":false
            },{
                "opcion":"incorrecta",
                "iscorrect":false
            } ]
        })
    response.assertStatus(200)
    assert.isObject(response.body())
})

test('create question2', async({client, assert}) => {
    const response =await client.post('api/v1/questions/create').form({
        "question": "¿que dia es?",
        "options": [
            {
                "opcion":"sabado",
                "iscorrect":true
            },{
                "opcion":"lunes",
                "iscorrect":false
            },{
                "opcion":"martes",
                "iscorrect":false
            },{
                "opcion":"viernes",
                "iscorrect":false
            } ]
        })
    response.assertStatus(200)
    assert.isObject(response.body())
})