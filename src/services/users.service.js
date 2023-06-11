import { UserModel } from "../DAO/models/users.model.js";

//@ts-check
class UserService {

    validatePostUser(firstName, lastName, email) {
        //VALIDAR SI LOS DATOS DEL BODY ESTAN OK
        if (!firstName || !lastName || !email) {
            console.log(
                "validation error: please complete firstName, lastname and email."
            );
            //RETORNA SI ES ERROR
            throw "Validarion Error";
        }
    }

    validatePutUser(id, firstName, lastName, email) {
        //VALIDAR SI LOS DATOS DEL BODY ESTAN OK
        if ((id, !firstName || !lastName || !email)) {
            console.log(
                "validation error: please complete firstName, lastname and email."
            );
            //RETORNA SI ES ERROR
            throw "Validarion Error";
        }
    }

    validateId(id) {
        if (!id) {
            console.log('validation error: please complete firstName, lastname and email.');
            throw 'VALDIATION ERROR';
        }
    }

    async getAllUsers() {
        const users = await UserModel.find({});
        return users;
    }

    async createUser(firstName, lastName, email) {
        this.validatePostUser(firstName, lastName, email);
        const userCreated = await UserModel.create({ firstName, lastName, email });
        return userCreated;
    }

    async updateUser(id, firstName, lastName, email) {
        this.validatePutUser(id, firstName, lastName, email);
        //BIEN!
        const userUptaded = await UserModel.updateOne(
            { _id: id },
            { firstName, lastName, email }
        );

        return userUptaded;
    }

    async deleteUser(id) {
        this.validateId(id);
        const deleted = await UserModel.deleteOne({ _id: id });
        return deleted;
    }

}

export const userService = new UserService();