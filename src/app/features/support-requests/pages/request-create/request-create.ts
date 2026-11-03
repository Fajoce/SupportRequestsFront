import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

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

MatSelectModule

],
  templateUrl: './request-create.html',
  styleUrl: './request-create.css',
})
export class RequestCreate {
form:FormGroup;



constructor(

private fb:FormBuilder,

private service:SupportRequestService,

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


requestDate:[
new Date()
.toISOString()
.substring(0,10),

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

return;

}



this.service.create(
this.form.value
)
.subscribe({

next:()=>{

alert(
'Solicitud creada correctamente'
);


this.router.navigate(['/']);

}


});


}

}
