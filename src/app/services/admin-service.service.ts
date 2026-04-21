import { Injectable, NgZone, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';

export interface ProjectVisit {
  project: string;
  user: string;
  email: string;
  date: string;
}

const SSE_URL = 'http://localhost:3005/visits/stream';

@Injectable({ providedIn: 'root' })
export class ProjectVisitsService implements OnDestroy {

  private eventSource: EventSource | null = null;

  constructor(private zone: NgZone) {}
  getVisitsStream(): Observable<ProjectVisit[]> {
    return new Observable(observer => {

      this.eventSource = new EventSource(SSE_URL);

      this.eventSource.onmessage = (event) => {
        this.zone.run(() => {
          try {
            const visits: ProjectVisit[] = JSON.parse(event.data);
            observer.next(visits);
          } catch {
            observer.error('Error al parsear los datos del servidor');
          }
        });
      };

      this.eventSource.onerror = () => {
        this.zone.run(() => observer.error('Error en la conexión SSE'));
      };
      return () => this.closeConnection();
    });
  }

  closeConnection(): void {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
  }

  ngOnDestroy(): void {
    this.closeConnection();
  }
}