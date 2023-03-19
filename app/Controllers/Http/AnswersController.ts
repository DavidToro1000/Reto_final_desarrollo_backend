import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Answer from 'App/Models/Answer';

export default class AnswersController {
    public async actualizarRespuesta({request, response}: HttpContextContract){
        const id = request.param('id_opcion');
        const answer1 = request.all();
        try{
            await Answer.query().where('id', id).update({
                answer: answer1.opcion,
                is_correct: answer1.iscorrect
            });
            response.status(200).json({"state":true, "message": "opcion Editada con exito"});
        }
        catch(error){
            console.log(error)
            response.status(400).json({"state":false, "message": "Error al editar la opcion"});
        }
    }
}
