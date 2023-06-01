import { Auth } from "../interfaces/auth.interface"
import { User } from "../interfaces/user.interface";
import UserModel from "../models/users";
import { encrypt, verified } from "../utils/bcrypt.handle";
import { generateToken } from "../utils/jwt.handle";

const registerNewUser = async ({ email, password, name, lastname }: User) => {
    const checkIs = await UserModel.findOne({ email });
    if (checkIs) return "ALREADY USER";
    const passHash = await encrypt(password)
    const registerNewUser = await UserModel.create({ email, password: passHash, name, lastname });
    return registerNewUser;
};
const loginUser = async ({ email, password }: Auth) => {
    const checkIs = await UserModel.findOne({ email });
    if (!checkIs) return "NOT FOUND USER";
    const passwordHash = checkIs.password;
    const isCorrect = await verified(password, passwordHash);
    if (!isCorrect) return "PASSWORD INCORRECT";
    const token = generateToken(checkIs.email);
    const data = {
        token,
        user: checkIs,
    }
    return data;
}

export { registerNewUser, loginUser }