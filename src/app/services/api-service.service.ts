import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEmployee } from '../pages/employee-registration/employee';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  
  baseUrl = 'http://localhost:8080/api/employees/';
  employee:IEmployee[] = [];

  constructor(private http: HttpClient) { }

getEmployees():Observable<IEmployee[]>{
    return this.http.get<IEmployee[]>(`${this.baseUrl}`);
}

getManagers():Observable<IEmployee[]>{
  return this.http.get<IEmployee[]>(`${this.baseUrl}managers`);
}

getEmployeeById(id:number):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}${id}`);
}

addEmployee(employee:any):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}save`,employee);
}

updateEmployee(employee:any):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}update`,employee);
}

deleteEmployee(employee:any):Observable<any>{
  return this.http.post<any>(`${this.baseUrl}delete`,employee);
}


}
