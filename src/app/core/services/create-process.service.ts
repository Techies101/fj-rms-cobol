import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Departments, Divisions, Policy, RBU, Roles, Training, Units, UserAccounts, Users } from '../models/table-data.model';

@Injectable({
  providedIn: 'root'
})
export class CreateProcessService {
  private url: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  createDepartment(newDepartment: Departments){
    return this.http.post(`${this.url}/Department/Create`, newDepartment);
  }

  createRBU(newRBU: RBU){
    return this.http.post(`${this.url}/RBU/Create`, newRBU);
  }

  createUser(newUser: Users){
    return this.http.post(`${this.url}/User/Create`, newUser);
  }

  createRole(newRole: Roles){
    return this.http.post(`${this.url}/Role/Create`, newRole);
  }
  
  createTraining(newTraining: Training) {
    return this.http.post(`${this.url}/Training/Create`, newTraining);
  }

   createPolicy(newPolicy: Policy){
    return this.http.post(`${this.url}/Policy/Create`, newPolicy)
   }

   createDivision(newDivision: Divisions){
    return this.http.post(`${this.url}/Division/Create`, newDivision);
   }

   createUnit(newUnit: Units){
    return this.http.post(`${this.url}/Unit/Create`, newUnit);
   }

   createUserAccount(newAccount: UserAccounts){
    return this.http.post(`${this.url}/UserAccount/Create`, newAccount);
   }
}
