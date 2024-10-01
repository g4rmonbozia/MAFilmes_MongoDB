import CustomError from "./custom-error.error";

class UnauthorizedException extends CustomError {
    constructor (mensagem: string = 'Acesso não encontrado'){
        super(mensagem, 401);
    }
}

export default UnauthorizedException;