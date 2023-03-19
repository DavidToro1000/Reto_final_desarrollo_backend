import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Answer from 'App/Models/Answer';
import Question from 'App/Models/Question';

export default class QuestionsController {

    public async register({request, response}: HttpContextContract){
        const {question, options} = request.all();
        try{
            const question1 = new Question()
            question1.question = question;
            question1.state = true;
            await question1.save();
            options.forEach((option) => {
                const answer1 = new Answer()
                answer1.answer= option.opcion;
                answer1.is_correct=option.iscorrect;
                answer1.question_id=question1.id;
                answer1.state=true;
                answer1.save();
            })
            response.status(200).json({"state": true, "message": "Pregunta creada exitosamente"})
        }
        catch(error){
            console.log(error)
            response.status(400).json({"state": false, "msg": "Error al crear la pregunta"});
        }
    }

    public async getListarPreguntas({response}: HttpContextContract){
        try{
            const question = await Question.query().select('question', 'id');
            response.status(200).json({"state":true, "questions": question});
        }
        catch(error){
            console.log(error)
            response.status(400).json({"state":false, "message": "Error al listar las preguntas"});
        }
    }

    public async eliminarPregunta({ request, response}: HttpContextContract){
        const id = request.param('id_question');
        let question = await Question.findBy('id', id)
            if (!question){
                response.status(400).json({"state":false, "message": "Error al eliminar la pregunta"});
            }
            else {
                await Question.query().where('id', id).delete();
                response.status(200).json({"state":true, "message": "Pregunta Eliminada con exito"})
            }
    } 
    
    public async actualizarPregunta({request, response}: HttpContextContract){
        const id = request.param('id_question');
        const question1 = request.all();
        try{
            await Question.query().where('id', id).update({
                question: question1.question
            });
            response.status(200).json({"state":true, "message": "Se actualizo correctamente"});
        }
        catch(error){
            console.log(error)
            response.status(400).json({"state":false, "message": "Error al actualizar"});
        }
    }

    public async opciones ({request, response}:HttpContextContract){
        try{
            const id = request.param('id_question');
            let question = await Question.findBy('id', id)
            if (!question){
                response.status(400).json({"state":false, "message": "Error al obtener el listado de opciones"});
            }
            else {
                const respuestas = await Answer.query().where('question_id', id).select('id', 'answer');
                let objetivo: any= []
                respuestas.forEach((respuesta) => {
                    const obj1 = { id: respuesta.id, option: respuesta.answer }
                    objetivo.push(obj1)

                });
                response.status(200).json({"state": true, "message": "Listado de opciones", "options": objetivo})
            }
            
        }
        catch(error){
            console.log(error)
            response.status(400).json({"state":false, "message": "Error al obtener el listado de opciones"})
        }

    }
}
