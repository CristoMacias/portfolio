import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProjectVisit, ProjectVisitsService } from '../../services/admin-service.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit, OnDestroy {

today = new Date();
 
  visits: ProjectVisit[]  = [];
  loading                 = true;
  connectionError         = false;
 
  private sub: Subscription | null = null;
 
  constructor(private projectVisits: ProjectVisitsService) {}
 
  get totalVisits(): number {
    return this.visits.length;
  }
 
  get totalUsers(): number {
    return new Set(this.visits.map(v => v.email)).size;
  }
 
  ngOnInit(): void {
    this.sub = this.projectVisits.getVisitsStream().subscribe({
      next: (visits: ProjectVisit[]) => {
        this.visits          = visits;
        this.loading         = false;
        this.connectionError = false;
      },
      error: () => {
        this.loading         = false;
        this.connectionError = true;
      }
    });
  }
 
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
 
  getInitials(name: string): string {
    return name
      .split(' ')
      .slice(0, 2)
      .map(n => n[0])
      .join('')
      .toUpperCase();
  }

}
