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

  dummyManager:any = {
    "employee_id":1,
    "first_name":"dummy",
    "last_name": "manager", 
    "department": "DEV",
    "salary":25000,
    "manager_id":"1",
    "is_manager":true,
    "dob":"1978-02-27T14:55:55.401+00:00"
  };

  constructor(private service: ApiServiceService,private http:HttpClient) {
    
  }

  InsertDummyData(){
    console.log(this.dummyManager);
    this.service.addEmployee(this.dummyManager).subscribe((res:any)=>{
      console.log(res);
    });

  }

  ngOnInit(): void {
    this.InsertDummyData();
    this.loadDepartments();
    this.loadEmployees();
    this.loadManagers();
    
  }

  ngOnChanges():void {
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
    this.employeeObject = item;
    console.log(item);
    this.service.deleteEmployee(this.employeeObject).subscribe((res:any)=>{
      console.log(res);
      this.loadEmployees();
    });
  }

}
