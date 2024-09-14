import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SubHeaderComponent } from '../sub-header/sub-header.component';
import { Module } from '../../../core/models/module.models';
import { TableService } from '../../../core/services/table.service';
import { Departments, Divisions, People, Policy, PolicyTransact, RBU, Role, Roles, Training, Units, User, UserAccounts, Users } from '../../../core/models/table-data.model';
import { addDepartment, addDivision, addPeople, addPolicy, addRBU, addRole, addTraining, addUnit, addUser, FormConfig, FormType } from '../../../core/models/forms.model';
import { FormsComponent } from '../forms/forms.component';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { SharedService } from '../../shared.services';
import { AddTrainingComponent } from '../add-training/add-training.component';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CreateProcessService } from '../../../core/services/create-process.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../../core/services/auth.service';
import { DeleteProcessService } from '../../../core/services/delete-process.service';

@Component({
  selector: 'app-app-table',
  standalone: true,
  imports: [ CommonModule, 
            SubHeaderComponent, 
            FormsComponent,
            AddTrainingComponent,
            MatPaginatorModule, 
            MatTableModule,
            MatSortModule,
            MatInputModule,
            MatSelectModule,
            MatFormFieldModule,
            FormsModule
          ],
  templateUrl: './app-table.component.html',
  styleUrl: './app-table.component.scss'
})
export class AppTableComponent implements OnInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  pageTitle!: string;
  feature!: keyof typeof Module;  // Ensure feature is a valid key of Module
  tableHeaders!: string[];
  columnWidths!: string[];
  tableColumns!: string[];
  columnItems: any = [];
  process: string = '';
  filterOptions: string[] = ["JP RBU", "ASIA-RBU", "APMS", "SSS", "GREAT"];
  isModalOpen = false;
  isFilterVisible = false;
  isFilterActive = false;
  empty!: string;
  menus!: any;
  menuSelectedIndex: number = 3;
  @Output() submitForm = new EventEmitter<any>();

  rbuOptions = [
    { value: 'rbu1', viewValue: 'RBU 1' },
    { value: 'rbu2', viewValue: 'RBU 2' },
    { value: 'rbu3', viewValue: 'RBU 3' }
  ];

  departments = [
    { value: 'hr', viewValue: 'HR' },
    { value: 'it', viewValue: 'IT' },
    { value: 'finance', viewValue: 'Finance' },
    { value: 'marketing', viewValue: 'Marketing' }
  ];

  divisions = [
    { value: 'division1', viewValue: 'Division 1' },
    { value: 'division2', viewValue: 'Division 2' },
    { value: 'division3', viewValue: 'Division 3' }
  ];

  units = [
    { value: 'unit1', viewValue: 'Unit 1' },
    { value: 'unit2', viewValue: 'Unit 2' },
    { value: 'unit3', viewValue: 'Unit 3' }
  ];

  // Define user types for selection
  userTypes = [
    { value: 'admin', viewValue: 'Admin' },
    { value: 'user', viewValue: 'User' }
  ];

  // Define people for selection
  people = [
    { value: 'person1', viewValue: 'Person 1' },
    { value: 'person2', viewValue: 'Person 2' }
  ];

  // Toggle password visibility
  passwordFieldType: string = 'password'; // Default to password field

  policyTopHeader: any[] = [
    { ModuleName: "User Management", ModuleId: 1 }, 
    { ModuleName: "System Setup", ModuleId: 2 }, 
    { ModuleName: "HR", ModuleId: 3 }, 
    { ModuleName: "Trainer", ModuleId: 4 }, 
    { ModuleName: "Manager", ModuleId: 5 }
  ];
  policyLeftHeader: any[] = [
    { name: "Create", access: "CreateAccess" }, 
    { name: "Update", access: "UpdateAccess" }, 
    { name: "View", access: "ReadAccess" }, 
    { name: "Restore", access: "RestoreAccess" }, 
    { name: "Delete", access: "DeleteAccess"}
  ];
  isFormOpen: boolean = false;
  formConfig: FormConfig = { groups: [] };
  modalTitle: string = '';
  currentFormType: string | null = null;
  formType!: any;
  dataSource = new MatTableDataSource<any>();
  roles: any[] = [];

  @Input() isUserAccModalOpen: boolean = false;
  @Input() isAddPeopleModalOpen: boolean = false;
  @Input() isAddRMModalOpen: boolean = false;
  @Input() isAddReferenceModalOpen: boolean = false;
  

  // MatPaginator Inputs
  length = 100;
  pageSize = 10;
  pageSizeOptions = [1, 2, 25, 100];

  // MatPaginator Output
  pageEvent!: PageEvent;

  // Define form configurations as class properties
  formConfigurations: { [key: string]: FormConfig } = {
    'user': addUser,
    'people': addPeople,
    'rbu': addRBU,
    'department': addDepartment,
    'division': addDivision,
    'unit': addUnit,
    'training': addTraining,
    'policy': addPolicy,
    'role': addRole
  };

  constructor(private route:ActivatedRoute, 
              private router: Router, 
              private tableService: TableService,
              private sharedService: SharedService,
              private createService: CreateProcessService,
              private deleteService: DeleteProcessService,
              private authService: AuthService){ }
              

  ngOnInit():void{

    this.people = [
      { value: 'person1', viewValue: 'Person 1' },
      { value: 'person2', viewValue: 'Person 2' }
    ];
    this.userTypes = [
      { value: 'type1', viewValue: 'User Type 1' },
      { value: 'type2', viewValue: 'User Type 2' }
    ];
    this.roles = [
      { value: 'role1', viewValue: 'Role 1' },
      { value: 'role2', viewValue: 'Role 2' }
    ];


    this.route.params.subscribe((param: Params) => {
      this.pageTitle = param['page'];
      this.feature = param['feature'] as keyof typeof Module; // Ensure feature is a valid key
      if (this.feature in Module) {
        this.tableHeaders = Module[this.feature].table.value.header[param['page']];   // Gets the table headers for the page
        this.columnWidths = Module[this.feature].table.columnWidths[param['page']];   // Gets the column widths for the table
        this.tableColumns = Module[this.feature].table.value.content[param['page']];  // Gets the column name according to database for the table
        this.formType = FormType[this.pageTitle];
        this.getTableData();
      }

      
      this.menus = Module[this.feature].menus // call the menus under admin
      this.menuSelectedIndex = this.menus.findIndex((x:any) => x.applications.includes(this.pageTitle));
    })
  }

  getMenu(menuSelectedIndex: number){
    this.menuSelectedIndex = menuSelectedIndex; // gets the index of the menu being selected
  }

  onClickBackButton(){
    let fragment = this.menus[this.menuSelectedIndex].name;
    this.router.navigate([this.feature], {fragment: fragment});
  }

  onClickBtn(process: string){
    this.process = process;
  }

  toggleFilter() {
    this.isFilterVisible = !this.isFilterVisible;
    this.isFilterActive = !this.isFilterActive; // Toggle active state
  }

  applyFilter() {
    console.log('Filter applied');
    this.isFilterVisible = false; // Hide the pop-up after applying the filter
    this.isFilterActive = false;  // Reset the active state
  }
  
  //ADDED CODE
  // userCode: any = "TRAINER01"; //connect this to th database
  // userName: any = "Zedrick"; //connect this to th database
  // userDescription: any = "de Ocampo"; //connect this to th database
  // userUser: any = "TRAINER"; //connect this to th database
  // userRole: any = "Lead Trainer"; //connect this to th database
  policyData: Policy = {};
  users: Users[] = [];

  tempPolicyTransact: PolicyTransact[] = [];
  // checkbox data
  checkboxStates: boolean[][] = [
    [false, false, false, false , false], // Create
    [false, false, false, false , false], // Update
    [false, false, false, false , false], // View
    [false, false, false, false , false], // Restore
    [false, false, false, false , false], // Delete
  ];

  isChecked(rowIndex: number, colIndex: number): boolean {
    return this.checkboxStates[rowIndex][colIndex];
  }

  onCheckboxChange(event: Event, rowIndex: number, colIndex: number): void {
    const checkbox = event.target as HTMLInputElement;
    this.checkboxStates[rowIndex][colIndex] = checkbox.checked;
  }

  onChangeSelection(data:string, value: string){
    if(data == 'user'){
      this.policyData.UserId = value;
    } else if(data == 'role'){
      this.policyData.RoleId = value;
    }
  }

  onClickSave(){
    this.policyTopHeader.forEach((x:any,index:number)=>{
      let policytransac: PolicyTransact = {};
      this.policyLeftHeader.forEach((y:any,i) => {
        policytransac.ModuleId = x.ModuleId;
        policytransac.CreateAccess = this.checkboxStates[0][index];
        policytransac.UpdateAccess = this.checkboxStates[1][index];
        policytransac.ReadAccess = this.checkboxStates[2][index];
        policytransac.RestoreAccess = this.checkboxStates[3][index];
        policytransac.DeleteAccess = this.checkboxStates[4][index];
      });
      this.tempPolicyTransact.push(policytransac);
    })
    this.policyData.PolicyTransact = this.tempPolicyTransact;
    Swal.fire({
      title: 'Confirm Save',
      text: 'Do you want to save the Policy data?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, save it!',
      cancelButtonText: 'No, cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.createService.createPolicy(this.policyData).subscribe({
          next: ((data:any) => {
            Swal.fire('Saved!', 'Your data has been saved.', 'success');
          }),
          error: ((error:any) => {
            console.log(error);
          }),
          complete: (() => {
            this.getTableData();
            this.closeModal();
          })
        })
      }
    });
    
  }
  reloadTable(){
    this.columnItems = [];
    this.dataSource.data = [];
  }

  getTableData(){
    switch(this.pageTitle){
      case "Department":
        this.tableService.getAllDepartment().subscribe({
          next: ((data:Departments[]) => {
             this.columnItems = data;
             this.dataSource.data = this.columnItems;
             this.dataSource.paginator = this.paginator;
             this.dataSource.sort = this.sort;
            }), 
          error: ((error: any) => { 
            this.reloadTable();
            this.empty = error.error.text; 
          })
        });
        break;
      case "User's":
        this.tableService.getAllUsers().subscribe({
          next: ((data:Users[]) => { 
            this.columnItems = data; 
            this.dataSource.data = this.columnItems;
             this.dataSource.paginator = this.paginator;
             this.dataSource.sort = this.sort;
          }),
          error: ((error: any) => { 
            this.reloadTable();
            this.empty = error.error.text; 
          })
        });
        break;
      case "RBU":
        this.tableService.getAllRBU().subscribe({
          next: ((data:RBU[]) => {
             this.columnItems = data;
             this.dataSource.data = this.columnItems;
             this.dataSource.paginator = this.paginator;
             this.dataSource.sort = this.sort;
            }), 
          error: ((error: any) => { 
            this.reloadTable();
            this.empty = error.error.text; 
          })
        });
        break;
      case "People":
      case "Employee List":
        this.tableService.getAllPeople().subscribe({
          next: ((data:People[]) => { 
            this.columnItems = data;
            this.dataSource.data = this.columnItems;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }),
          error: ((error: any) => { 
            this.reloadTable();
            this.empty = error.error.text; 
          })
         })
        break;
      case "Role":
        this.tableService.getAllRoles().subscribe({
          next: ((data:Roles[]) => {
             this.columnItems = data;
             this.dataSource.data = this.columnItems;
             this.dataSource.paginator = this.paginator;
             this.dataSource.sort = this.sort;
            }), 
          error: ((error: any) => { 
            this.reloadTable();
            this.empty = error.error.text; 
          })
        });
        break;
      case "Training List":
        this.tableService.getAllTraining().subscribe({
          next: ((data:Training[]) => {
             this.columnItems = data;
             this.dataSource.data = this.columnItems;
             this.dataSource.paginator = this.paginator;
             this.dataSource.sort = this.sort;
            }), 
          error: ((error: any) => { 
            this.reloadTable();
            this.empty = error.error.text; 
          })
        });
        break;
      case "Policy":
        this.tableService.getAllPolicies().subscribe({
          next: ((data:Policy[]) => {
             this.columnItems = data;
             this.dataSource.data = this.columnItems;
             this.dataSource.paginator = this.paginator;
             this.dataSource.sort = this.sort;
            }), 
          error: ((error: any) => { 
            this.reloadTable();
            this.empty = error.error.text; 
          })
        });
        break;
      case "Division":
        this.tableService.getAllDivisions().subscribe({
          next: ((data:Divisions[]) => {
            console.log("bakit?")
            this.columnItems = data;
            this.dataSource.data = this.columnItems;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            }), 
          error: ((error) => { 
            this.reloadTable();
            this.empty = error.error.text; 
          })
        });
        break;
      case "Unit":
        this.tableService.getAllUnits().subscribe({
          next: ((data:Units[]) => {
             this.columnItems = data;
             this.dataSource.data = this.columnItems;
             this.dataSource.paginator = this.paginator;
             this.dataSource.sort = this.sort;
            }), 
          error: ((error: any) => { 
              this.reloadTable();
              this.empty = error.error.text; 
            })
          });
        break;
      case "User Account":
        this.tableService.getAllUsersAccount().subscribe({
          next: ((data:UserAccounts[]) => {
             this.columnItems = data;
             this.dataSource.data = this.columnItems;
             this.dataSource.paginator = this.paginator;
             this.dataSource.sort = this.sort;
             console.log(this.dataSource.data);
            }), 
          error: ((error: any) => { 
            this.reloadTable();
              this.empty = error.error.text; 
            })
          });
        break;
    }
  }


  openModal(type: string) {
    this.isFormOpen = true;
    this.currentFormType = type;
    this.formConfig = this.formConfigurations[type];
    this.modalTitle = `Add ${this.pageTitle}`;

    if(type == 'policy'){
      this.tableService.getAllUsers().subscribe((data:Users[]) => this.users = data);
      this.tableService.getAllRoles().subscribe((data:Roles[]) => this.roles = data);
    }


  }

  closeForm() {
    this.isFormOpen = false;
    this.currentFormType = null;
  }

  // onSubmit() {

  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: `Are you sure you want to submit the form?`,
  //     icon: 'question',
  //     showCancelButton: true,
  //     confirmButtonText: 'Yes, submit!',
  //     cancelButtonText: 'Cancel'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       console.log(this.isAddPeopleModalOpen)
  //       if (this.isAddRMModalOpen) {
  //         this.getRMDetails();
  //       } else if (this.isAddPeopleModalOpen) {
  //         this.getPeopleDetails();
  //       } else if (this.isAddReferenceModalOpen) {
  //         this.getReferenceData();
  //       } else {
  //         const asd = this.getUserAccountData();
  //         // this.submitForm.emit(asd);

  //       }
  //       this.close(); // Close the modal after submission
  //     }
  //   });


  //   let relevantFormConfig = {};

  //   // if (this.currentFormType) {
  //   //   for (const group of this.formConfig.groups) {
  //   //     if (group.className === `${this.currentFormType}Details`) { 
  //   //       relevantFormConfig = group;
  //   //       break;
  //   //     }
  //   //   }
  //   // }

  //   // console.log('Form submitted with configuration:', relevantFormConfig);
  //   // this.closeForm();
  // }
  closeModal() {
    this.closeForm();
  }
  handleSubmit(event: any) {
    // this.onSubmit();
  }

  searchChange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  handleTrainingCloseModal(isClose: boolean){
    this.isFormOpen = isClose;
  }

  togglePassword() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  // getRMDetails() {
  //   const { user } = this;
  //   const addRMData = { ...user };
  //   console.log('Add RM Details:', addRMData);
  //   this.submitForm.emit(addRMData);
  // }

  // getPeopleDetails() {
  //   const { user } = this;
  //   const addPeopleData = { ...user };
  //   console.log('Add People Details:', addPeopleData); // Log the "Add People" form data
  //   // this.submitForm.emit(addPeopleData);
  //   console.log(addPeopleData);
  // }
  getReferenceData() {
    // const { refData } = this;
    // const addRefData = { refData };
    // console.log('Add Reference Data:', addRefData);
    // this.submitForm.emit(addRefData);
  }
  
  // getUserAccountData() {
  //   return {
  //     email: this.user.email,
  //     password: this.user.password,
  //     selectedPerson: this.user.selectedPerson,
  //     selectedUserType: this.user.selectedUserType,
  //     selectedOption: this.user.selectedOption
  //   };
  // }

  // onSubmitAddRM() {
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: `Are you sure you want to submit the form?`,
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonText: 'Yes, submit!',
  //     cancelButtonText: 'Cancel'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       if (this.isAddRMModalOpen) {
  //         this.getRMDetails();
  //       } else if (this.isAddPeopleModalOpen) {
  //         this.getPeopleDetails();
  //       } else if (this.isAddReferenceModalOpen) {
  //         this.getReferenceData();
  //       } else {
  //         const asd = this.getUserAccountData();
  //         this.submitForm.emit(asd);
  //       }
  //       this.close(); // Close the modal after submission
  //     }
  //   });
  // }

  // onSubmitWithSwal() {
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: `Are you sure you want to add this?`,
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonText: 'Yes, submit!',
  //     cancelButtonText: 'Cancel'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       const formData = this.getUserAccountData();
  //       console.log('Submited User Account Details:', formData); // Log the user account data
  //       this.submitForm.emit(formData);
  //       this.close(); // Close the modal after submission
  //     }
  //   });
  // }

  close() {
    this.isUserAccModalOpen = false;
  }

  getPage(): any{
    switch(this.pageTitle){
      case "User's":
        return { name:"User", id:"UserId" };
      case "Employee List":
        return { name:"People", id:"PersonId" };
      case "Training List":
        return { name:"Training", id:"TrainingId" };
      case "People":
        return { name: this.pageTitle, id:"PersonId"};
      case "Role":
        return { name: this.pageTitle, id:"RoleId"};
      case "Policy":
        return { name: this.pageTitle, id:"PolicyId"};
      case "RBU":
        return { name: this.pageTitle, id:"RBUId"};
      case "Department":
        return { name: this.pageTitle, id:"DepartmentId"};
      case "Division":
        return { name: this.pageTitle, id:"DivisionId"};
      case "Unit":
        return { name: this.pageTitle, id:"UnitId"};
      case "User Account":
        return { name: "UserAccount", id: "UserAccountId"};
    }
  }

  onClickDelete(data: any){
    let userId: number = parseInt(this.authService.getItem('user')!.UserId);
    console.log(this.getPage());
    Swal.fire({
      text: `Are you sure you want to delete ${this.pageTitle}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteService.deleteItem(data[this.getPage().id], userId, this.getPage().name).subscribe({
          next: ((data) => {
            console.log(data);
          }),
          error: ((error) => {
            console.log(error);
          }),
          complete: (() => {
            
            this.getTableData();
            this.closeForm();
          })
        })
        
      }
    });
    
  }

  data: any = {}

  onClickEdit(data:any){
    this.process = "edit"
    this.data = data;
    this.openModal(this.formType);
    this.modalTitle = `Update ${this.pageTitle}`;
  }

  onClickView(data:any){
    this.process = "view"
    this.data = data;
    this.openModal(this.formType);
    this.modalTitle = `View ${this.pageTitle}`;
  }

}
