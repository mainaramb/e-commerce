import { HttpInterceptorFn } from "@angular/common/http";
import { tap } from "rxjs";
import { catchError } from "rxjs";
import { throwError } from "rxjs";

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
    console.log('Inteceptando Requisição: ', req.url);
    //! Adiciona lógica para modificar a requisião
    const token = 'fake-token-jwt';
    const novaReq =req.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`,
        },
    });
    return next(novaReq).pipe(
        tap({
            next: (event) => console.log('Responde: ', event),
            error: (error) => console.error('Erro de Requisição', error)
        }), 
        catchError((error) =>{
            console.error('ERRO GLOBAL:', error);
            if (error.status === 401){
                console.warn('Erro de autenticação de Usuário:', error);
        }
            if (error.status === 500){
                console.warn('Erro interno do servidor!', error);
        } 
    return throwError(() => error);
        }),
    );
};