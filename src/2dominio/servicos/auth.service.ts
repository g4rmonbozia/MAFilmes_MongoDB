import { NextFunction, Request, Response } from "express";
import UnauthorizedException from '../exceptions/unauthorized.exception';

class AuthService{
    private checkToken(req: Request, res: Response, next:NextFunction): void{
        const apikey = req.headers['api-key'];
        if(apikey){
          if(apikey === 'MAFilmesSegredo'){
            next();
            return;
          }
        }
        throw new UnauthorizedException();
      }
    
    public static protect(){
        const authService = new AuthService();
        return authService.checkToken.bind(authService);
    }
}

AuthService.protect();

export default AuthService;