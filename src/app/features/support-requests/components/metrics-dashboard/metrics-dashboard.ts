import { Component, OnInit } from '@angular/core';

import { CommonModule } 
from '@angular/common';

import { MatCardModule }
from '@angular/material/card';


import { SupportRequestService } from '../../services/support-requestService';


import { Metrics }
from '../../models/metrics.model';



@Component({

selector:'app-metrics-dashboard',

standalone:true,

imports:[

CommonModule,

MatCardModule

],
  templateUrl: './metrics-dashboard.html',
  styleUrl: './metrics-dashboard.css',
})
export class MetricsDashboard implements OnInit {


metrics?:Metrics;



constructor(
private service:SupportRequestService
){}



ngOnInit():void {

this.load();

}



load(){

this.service.getMetrics()
.subscribe({

next:data=>{

this.metrics=data;

}

});

}


}
