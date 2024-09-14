import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Departments, Divisions, People, Policy, RBU, Roles, Trainees, Trainer, Training, Units, User, UserAccounts, Users } from '../models/table-data.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  private url: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllDepartment(): Observable<Departments[]>{
    return this.http.get<Departments[]>(`${this.url}/Department/getAll`);
  }

  getAllUsers(): Observable<Users[]>{
    return this.http.get<Users[]>(`${this.url}/User/getAll`);
  }

  getAllRBU(): Observable<RBU[]>{
    return this.http.get<RBU[]>(`${this.url}/RBU/getAll`);
  }

  getAllDivisions(): Observable<Divisions[]>{
    return this.http.get<Divisions[]>(`${this.url}/Division/getAll`);
  }

  getAllRoles(): Observable<Roles[]>{
    return this.http.get<Roles[]>(`${this.url}/Role/getAll`);
  }

  getAllPeople(): Observable<People[]>{
    return this.http.get<People[]>(`${this.url}/People/getAll`)
    .pipe(
     map(users => users.map(user => this.formatUserData(user)))
    );
  }

  getAllTraining(): Observable<Training[]>{
    return this.http.get<Training[]>(`${this.url}/Training/getAll`);
  }

  private formatUserData(data: any): People {
    return {
      ...data,
      fullName: `${data.LastName}, ${data.FirstName}`
    };
  }

  getTrainer(): Observable<Trainer[]>{
    return this.http.get<Trainer[]>(`${this.url}/Training/GetTrainerSelection`);
    
  }

  getTrainees(): Observable<Trainees[]>{
    return this.http.get<Trainees[]>(`${this.url}/Training/GetTraineeSelection`);
  }

  getAllPolicies(): Observable<Policy[]>{
    return this.http.get<Policy[]>(`${this.url}/Policy/GetAll`);
  }

  getAllUnits(): Observable<Units[]>{
    return this.http.get<Units[]>(`${this.url}/Unit/GetAll`);
  }

  getAllUsersAccount(): Observable<UserAccounts[]>{
    return this.http.get<UserAccounts[]>(`${this.url}/UserAccount/GetAll`);
  }


  
}
