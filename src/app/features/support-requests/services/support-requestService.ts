import { Injectable } from '@angular/core';


import { SupportRequestModelTs } from '../models/support-request.model.ts.js';
import { Metrics } from '../models/metrics.model.js';
import { CreateSupportRequestDto } from '../dtos/CreateSupportRequestDto .js';
import { environment } from '../../../../environments/environment.js';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 



@Injectable({
providedIn:'root'
})
export class SupportRequestService {
  private apiUrl =
`${environment.apiUrl}/supportrequests`;



constructor(
private http:HttpClient
){}



getAll():
Observable<SupportRequestModelTs[]>{

return this.http.get<SupportRequestModelTs[]>(
this.apiUrl
);

}



getById(
id:string
){
    const url = `${this.apiUrl}/${id}`;
console.log('URL GET DETAIL:', url);
return this.http.get<SupportRequestModelTs>(
`${this.apiUrl}/${id}`
);
}

create(
request:CreateSupportRequestDto
){
return this.http.post<SupportRequestModelTs>(
this.apiUrl,
request
);
}

approve(
id:string
){
return this.http.put(
`${this.apiUrl}/${id}/approve`,
{}
);
}
reject(
id:string
){
return this.http.put(
`${this.apiUrl}/${id}/reject`,
{}
);

}

getMetrics(){

    return this.http.get<Metrics>(
        `${this.apiUrl}/metrics`
    );

}

}
