import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SupportRequestService } from '../../services/support-requestService';
import { SupportRequestModelTs } from '../../models/support-request.model.ts';
import { FormsModule } from '@angular/forms';
import { MetricsDashboard } from '../../components/metrics-dashboard/metrics-dashboard';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-request-list',
  imports: [
    RouterLink,
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MetricsDashboard,
    MatIconModule
  ],
  standalone: true,
  templateUrl: './request-list.html',
  styleUrl: './request-list.css',
})
export class RequestList implements OnInit {
  requests: SupportRequestModelTs[] = [];
  filteredRequests: SupportRequestModelTs[] = [];
  loading = false;
  selectedStatus?: string;
  selectedPriority?: string;

  displayedColumns = ['id', 'category', 'description', 'priority', 'status', 'date', 'actions'];

  constructor(private service: SupportRequestService) {}

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests() {
    this.loading = true;
    this.service.getAll().subscribe({
      next: (data) => {
        console.log('RESPUESTA API:', data);
        this.requests = data;
        this.filteredRequests = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  filter() {
    this.filteredRequests = this.requests.filter((x) => {
      const statusOk = !this.selectedStatus || x.status === this.selectedStatus;
      const priorityOk = !this.selectedPriority || x.priority === this.selectedPriority;

      console.log(x.status, x.priority, statusOk, priorityOk);
      return statusOk && priorityOk;
    });
    console.log('Resultado:', this.filteredRequests);
  }

  approve(id: string) {
    this.service.approve(id).subscribe(() => {
      this.loadRequests();
    });
  }

  reject(id: string) {
    this.service.reject(id).subscribe(() => {
      this.loadRequests();
    });
  }

  getStatusName(status: number) {
    switch (status) {
      case 1:
        return 'Pendiente';

      case 2:
        return 'Aprobada';

      case 3:
        return 'Rechazada';

      default:
        return '';
    }
  }

  getPriorityName(priority: number) {
    switch (priority) {
      case 1:
        return 'Baja';

      case 2:
        return 'Media';

      case 3:
        return 'Alta';

      default:
        return '';
    }
  }
}
