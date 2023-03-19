import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Answer from 'App/Models/Answer';
import Form from 'App/Models/Form';
import User from 'App/Models/User';
import Question from 'App/Models/Question';

export default class FormsController {
    public async register({request, response}: HttpContextContract){
        const {estudianteId, answers} = request.all();
        let existe = await User.findBy('id', estudianteId)
        if (!existe){
            response.status(400).json({"state": false,"message": "No se pudieron almacenar las respuestas"})
            return(0);
        }
        for (const answer of answers){
            let existe1= await Answer.findBy('id', answer)
            if (!existe1){
                response.status(400).json({"state": false,"message": "No se pudieron almacenar las respuestas"})
                return(0);
            }
        }
                for (const answer of answers){
                    const formulario = new Form();
                    formulario.student_id = estudianteId;
                    formulario.state= true;
                    formulario.answer_id=answer;
                    formulario.save();
                    
                }
            response.status(200).json({"state": true,"message": "Respuestas almacenadas con exito"})
        }
    
    public async todasPreguntas({response}:HttpContextContract){
        try{
            const questions = await Question.query().select('question', 'id');
            const salida: any = [];
            for (const question1 of questions){
                const respuestas = await Answer.query().where('question_id', question1.id).select('id', 'answer');
                    let objetivo: any= []
                    respuestas.forEach((respuesta) => {
                        const obj1 = { id: respuesta.id, option: respuesta.answer }
                        objetivo.push(obj1)
                    });
                const obj1 = { question: question1.question, id: question1.id, options: objetivo }
                salida.push(obj1)
            }
            response.status(200).json({"state": true, "questions": salida})
        }catch(error){
            console.log(error)
            response.status(400).json({"state": false,"message": "Error al obtener el listado"})
        }
    }

}

