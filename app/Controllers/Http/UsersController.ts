import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import jwt from 'jsonwebtoken'
import Env from '@ioc:Adonis/Core/Env'
import Role from 'App/Models/Role'
import TypesDocument from 'App/Models/TypesDocument'
const bcryptjs = require('bcryptjs')

export default class UsersController {

    public async registrar({request, response}: HttpContextContract){
        const roles: number = await this.getValidarRoles()
        const doc: number = await this.getValidarDocuments()
        if (roles==0) {
            const student = new Role()
            const admin = new Role()
            student.id=1;
            student.name="administrador";
            student.state=true;

            admin.id=2;
            admin.name="estudiante";
            admin.state=true;
            await student.save()
            await admin.save()
        }
        if (doc==0) {
            const one = new TypesDocument()
            const two = new TypesDocument()
            const three = new TypesDocument()
            one.id=1;
            one.name="CC";
            one.state=true;

            two.id=2;
            two.name="CE";
            two.state=true;

            three.id=3;
            three.name="TI";
            three.state=true;

            await one.save()
            await two.save()
            await three.save()
        }
        const {firstName, secondName, surname, secondSurName, typeDocument, documentNumber, email, rol, phone, password}= request.all();
        const salt = bcryptjs.genSaltSync();
        const user = new User();
        user.first_name=firstName;
        user.second_name=secondName;
        user.surname=surname;
        user.second_sur_name=secondSurName;
        user.type_document=typeDocument;
        user.document_number=documentNumber;
        user.email=email;
        user.phone=phone;
        user.state=true;
        user.rol_id=rol;
        user.id=documentNumber;
        user.password= bcryptjs.hashSync( password, salt) ;;
        try {
            await user.save();
            response.status(200).json({"state": true, "msg": "Estudiante creado corectamente"});
        }
        catch (error){
            console.log(error)
            response.status(400).json({"state": false, "msg": "Fallo en la creacion del estudiante"});
        }    
    }

    private async getValidarRoles(): Promise<number> {
        const total = await Role.all()
        return total.length
    }

    private async getValidarDocuments(): Promise<number> {
        const total = await TypesDocument.all()
        return total.length
    }

    public async login({request, response}: HttpContextContract) {
        const {email, password} = request.all();
        try{
            const user = await User.findBy('email', email)
            if (!user){
                response.status(400).json({"state":false, "message": "contraseña o email invalido"});
            }

            const validPassword = bcryptjs.compareSync( password, user?.password);
            if (!validPassword) {
                response.status(400).json({"state":false, "message": "contraseña o email invalido"});
            }

            const payload ={
                'first_name': user?.first_name,
                'second_name': user?.second_name,
                'surname': user?.surname,
                'second_sur_name': user?.second_sur_name,
                'type_document':user?.type_document,
                'document_number':user?.document_number,
                'phone': user?.phone,
                'state': user?.state,
                'rol_id': user?.rol_id,    
                'id': user?.id
            }
            
            const token:string = this.generarToken(payload);
            const rol = await Role.find(user?.rol_id);
            console.log(token)

            response.status(200).json({"state": true, "id":user?.id, "name":user?.first_name, "role":rol?.name, "message": "Ingreso exitoso"})
        } catch (error){
            console.log(error)
            response.status(400).json({"state":false, "message": "contraseña o email invalido"});
        }
    }

    public generarToken(payload: any):string {
        const opciones = {
            expiresIn: "5 mins"
        }
        return jwt.sign(payload, Env.get('JWT_SECRET_KEY'), opciones)
    }

    public async getListarUsuarios({response}: HttpContextContract){
        try{
            const user = await User.all();
            let objetivo: any= []
                user.forEach((us) => {
                    const obj1 = { firstName: us.first_name, secondName: us.second_name, surname: us.surname, secondSurName: us.second_sur_name, typeDocument: us.type_document, documentNumber: us.document_number, email: us.email, phone: us.phone }
                    objetivo.push(obj1)

                });
            response.status(200).json({"state":true, "message": "Listado de estudiantes", "users": objetivo});
        }
        catch(error){
            console.log(error)
            response.status(400).json({"state":false, "message": "Fallo en el listado de estudiantes"});
        }
    }

    public async actualizarUsuario({request, response}: HttpContextContract){
        const id = request.param('id_user');
        const user = request.all();
        try{
        await User.query().where('id', id).update({
            first_name: user.firstName,
            second_name: user.secondName,
            surname: user.surname,
            second_sur_name: user.secondSurName,
            type_document:user.typeDocument,
            document_number:user.documentNumber,
            email:user.email,
            phone: user.phone
        });
        response.status(200).json({"state":true, "message": "Se actualizo correctamente"});
        }
        catch(error){
            console.log(error)
            response.status(400).json({"state":false, "message": "Error al actualizar"});
        }
    }

    public async buscarPorId({ request, response}: HttpContextContract){
        const identificacion = request.param('id_user');
            let user = await User.findBy('id', identificacion)
            if (!user){
                response.status(400).json({"state":false, "message": "Error al consultar el detalle del usuario"});
            }
            else {
                user = await User.find(identificacion);
                response.status(200).json({"firstName": user?.first_name, "secondName": user?.second_name, "surname": user?.surname, "secondSurName": user?.second_sur_name, "typeDocument": user?.type_document, "documentNumber": user?.document_number, "email": user?.email, "phone": user?.phone});
            }
    }


}
