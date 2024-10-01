import { Request, Response, NextFunction } from "express";
import NotFoundException from "../../2dominio/exceptions/not-found.exception";

const rotaNaoEncontradaMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const error = new NotFoundException(`Rota não encontrada - ${req.originalUrl}`);
    next(error);
}

export default rotaNaoEncontradaMiddleware;