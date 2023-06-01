import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt.handle";

const checkJWT = (req: Request, res: Response, next: NextFunction) => {
    try {
        const jwtByUser = req.headers.authorization || null;
        const jwt = jwtByUser?.split(' ').pop();
        const isUser = verifyToken(`${jwt}`);
        if (!isUser) {
            res.status(401)
            res.send('NO TIENES UN JWT VALIDO')
        } else {
            console.log({ jwtByUser });
            next();
        }
    } catch (e) {
        res.status(400)
        res.send('SESSION NO VALIDA')
    }
};

export { checkJWT };