import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ChangeDetectorRef } from '@angular/core';
import { SupportRequestService } 
from '../../services/support-requestService';
import { MatIconModule } from '@angular/material/icon';
import { SupportRequestModelTs } from '../../models/support-request.model.ts'; 

@Component({
selector: 'app-request-detail',
standalone: true,
imports: [
CommonModule,
MatCardModule,
MatButtonModule,
MatIconModule
],
 templateUrl: './request-detail.html',
  styleUrl: './request-detail.css',
})
export class RequestDetail implements OnInit {


request?: SupportRequestModelTs;



constructor(
private route: ActivatedRoute,
private service: SupportRequestService,
private router: Router,
private cd: ChangeDetectorRef
){}



ngOnInit(): void {
const id = this.route.snapshot.paramMap.get('id');
if(id){
this.loadRequest(id);
}
}



loadRequest(id:string){
this.service.getById(id)
.subscribe({
next:data=>{
console.log('Respuesta detalle API:', data);
this.request=data;
this.cd.detectChanges();
},
error:error=>{
console.error(
'Error cargando detalle:',
error
);

}
});
}

approve(){
if(!this.request)
return;
this.service.approve(this.request.id)
.subscribe({
next:()=>{
this.loadRequest(this.request!.id);
},
error:error=>{
console.error(error);
}
});
}
reject(){
if(!this.request)
return;
this.service.reject(this.request.id)
.subscribe({
next:()=>{
this.loadRequest(this.request!.id);
},
error:error=>{
console.error(error);
}
});
}





back(){


this.router.navigate(['/']);


}

}
