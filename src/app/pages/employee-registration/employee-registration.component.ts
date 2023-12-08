import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { IEmployee } from './employee';

@Component({
  selector: 'app-employee-registration',
  templateUrl: './employee-registration.component.html',
  styleUrls: ['./employee-registration.component.css']
})
export class EmployeeRegistrationComponent implements OnInit  {

  departments: any[]= [];
  employeeList: any[]=[];
  managerList: any[]=[];
  isListView: boolean = true;
  employeeObject: any ={
    "employee_id":"",
    "first_name":"",
    "last_name": "", 
    "department": "",
    "salary":"",
    "manager_id":"",
    "is_manager":"",
    "dob":""
  }
  constructor(private service: ApiServiceService,private http:HttpClient) {
    
  }

  ngOnInit(): void {
    this.loadDepartments();
    this.loadEmployees();
    this.loadManagers();
  }

  updateOrAdd(){
    console.log(this.isListView);
    if(this.isListView){
      this.employeeObject={};
    }
    this.isListView = !this.isListView;
  }

  loadDepartments() {
    this.http.get("assets/departments.json").subscribe((res:any)=>{ 
      this.departments =  res.data;
    })
  }

  loadEmployees() {
    this.service.getEmployees().subscribe((res: any)=>{
      
      this.employeeList = res;
      console.warn(res);
    })
  }

  loadManagers() {
    this.service.getManagers().subscribe((res: any)=>{
      
      this.managerList = res;
      console.warn(res);
    })
  }

  onCreateEmp() {
      console.log(this.employeeObject);

      this.service.addEmployee(this.employeeObject).subscribe((res:any)=>{
        console.log(res);
      })

      this.ngOnInit();
    
    
  }

  onEdit(item: any) { 
    console.log(this.isListView)
    console.log(item);
    this.employeeObject = item;
    this.isListView = false;
  }

  onDelete(item: any) {

  }

}
