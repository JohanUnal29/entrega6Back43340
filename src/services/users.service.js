import { UserModel } from "../DAO/models/users.model";

//@ts-check
class UserService{
    async getAllUsers(){
        const users = await UserModel.find({});
        return users;
    }
}