import { Request, Response, Router } from "express";
import multerMiddleware from "../middleware/file";
import { getFile } from "../controllers/upload";
import { checkJWT } from "../middleware/session";

const router = Router()

router.post('/', checkJWT, multerMiddleware.single('myfile'), getFile);

export { router }