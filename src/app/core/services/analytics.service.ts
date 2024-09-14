import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeesStatus, StatusCount } from '../models/analytics.models';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  private apiUrl = 'http://localhost:3000/status';

  constructor(private http: HttpClient) { }

  getEmployeeStatusCounts(): Observable<StatusCount> {
    return this.http.get<EmployeesStatus[]>(this.apiUrl).pipe(
      map(response => {
        
        const statusCount: StatusCount = {
          internal: 0,
          billable: 0,
          management: 0,
          bench: 0
        }

        // Reduce the array to count occurrences of each status
        return response.reduce((acc, employee) => {
          switch (employee.status) {
            case 'In Project (Internal)':
              acc.internal++
              break;
            case 'In Project (Billable)':
              acc.billable++;
              break;
            case 'In Management':
              acc.management++;
              break;
            case 'In Bench':
              acc.bench++;
              break;
            default:
              break;
          }
          return acc;
        }, statusCount);
      
    })
  );
    
  }


}
