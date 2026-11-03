import {
  HttpInterceptorFn
} from '@angular/common/http';


import {
  catchError,
  throwError
} from 'rxjs';


export const httpErrorInterceptor:
HttpInterceptorFn = (req,next)=>{


return next(req)
.pipe(

catchError(error=>{


console.error(
'HTTP Error',
error
);


let message =
'Error inesperado';


if(error.status===400)
{
 message =
 'Datos inválidos';
}


if(error.status===404)
{
 message =
 'Registro no encontrado';
}


return throwError(
()=>message
);


})


);


};