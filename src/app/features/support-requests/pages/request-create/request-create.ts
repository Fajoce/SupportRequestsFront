import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { provideNativeDateAdapter } from '@angular/material/core';

import {
 FormBuilder,
 FormGroup,
 Validators,
 ReactiveFormsModule
}
from '@angular/forms';


import {
 Router
}
from '@angular/router';


import {
 MatCardModule
}
from '@angular/material/card';


import {
 MatButtonModule
}
from '@angular/material/button';


import {
 MatInputModule
}
from '@angular/material/input';


import {
 MatSelectModule
}
from '@angular/material/select';


import { SupportRequestModelTs } from '../../models/support-request.model.ts';
import { SupportRequestService } from '../../services/support-requestService';


@Component({
  selector: 'app-request-create',
  standalone:true,

imports:[
CommonModule,
ReactiveFormsModule,
MatCardModule,
MatButtonModule,
MatInputModule,
MatSelectModule,
  MatDatepickerModule,
    MatNativeDateModule
],
 providers: [
    provideNativeDateAdapter()
  ],
  templateUrl: './request-create.html',
  styleUrl: './request-create.css',
})
export class RequestCreate {
  maxDate = new Date();
form:FormGroup;
constructor(

private fb:FormBuilder,

private service:SupportRequestService,
 private snackBar: MatSnackBar,
private router:Router

){


this.form=this.fb.group({

category:[
null,
Validators.required
],


description:[
'',
[
Validators.required,
Validators.minLength(10)
]
],


priority:[
null,
Validators.required
],


requestDate: [
  new Date(),
  Validators.required
],


requester:[
'',
Validators.required
]


});


}




save(){

  if(this.form.invalid){

    this.form.markAllAsTouched();

    this.snackBar.open(
      'Por favor complete los campos obligatorios',
      'Cerrar',
      {
        duration:3000
      }
    );

    return;
  }


  this.service.create(
    this.form.value
  )
  .subscribe({
    next:()=>{
      this.snackBar.open(
        'Solicitud creada correctamente',
        'Cerrar',
        {
          duration:3000
        }
      );


      this.router.navigate(['/']);
    },
    error:(error)=>{
      console.error(
        'Error creando solicitud:',
        error
      );
      let message =
      'Ocurrió un error al crear la solicitud';
      // Error enviado por tu Middleware .NET
      if(error.error?.message){
        message = error.error.message;
      }


      this.snackBar.open(
        message,
        'Cerrar',
        {
          duration:5000
        }
      );
    }

  });

}
}


