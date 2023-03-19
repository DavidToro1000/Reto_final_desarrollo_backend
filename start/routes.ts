/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.post("user/create", "UsersController.registrar")
  Route.post("login", "UsersController.login")
  Route.get("user/getUsers", "UsersController.getListarUsuarios")
  Route.put("user/update/:id_user", "UsersController.actualizarUsuario")
  Route.get("user/getUser/:id_user", "UsersController.buscarPorId")
  Route.post("questions/create", "QuestionsController.register")
  Route.get("questions/getQuestions", "QuestionsController.getListarPreguntas")
  Route.delete("questions/deleteQuestion/:id_question", "QuestionsController.eliminarPregunta")
  Route.put("questions/updateQuestion/:id_question", "QuestionsController.actualizarPregunta")
  Route.put("questions/updateAnswer/:id_opcion", "AnswersController.actualizarRespuesta")
  Route.get("questions/getOptions/:id_question", "QuestionsController.opciones")
  Route.get("form/getquestions", "FormsController.todasPreguntas")
  Route.post("form/postquestions", "FormsController.register")
 }).prefix("api/v1")
