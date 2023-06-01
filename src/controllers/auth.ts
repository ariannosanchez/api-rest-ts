import { Request, Response } from "express"
import { registerNewUser, loginUser } from "../services/auth"
import { handleHttp } from "../utils/error.handle"

const registerCtrl = async ({ body }: Request, res: Response) => {
    try {
        const responseUser = await registerNewUser(body)
        res.send(responseUser)
    } catch (e) {
        handleHttp(res, 'ERROR REGISTER USER')
    }
}

const loginCtrl = async ({ body }: Request, res: Response) => {
    try {
        const { email, password } = body;
        const responseUser = await loginUser({ email, password });

        if (responseUser === "PASSWORD INCORRECT") {
            res.status(403)
            res.send(responseUser)
        } else {
            res.send(responseUser)
        }
    } catch (e) {
        handleHttp(res, 'ERROR LOGIN USER')
    }
}

export { loginCtrl, registerCtrl }