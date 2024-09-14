import { Component, Input, Output, EventEmitter, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormConfig } from '../../../core/models/forms.model'; // Ensure this path is correct
import { AuthService } from '../../../core/services/auth.service';
import { CreateProcessService } from '../../../core/services/create-process.service';
import { Departments, People, Role, Roles, UserAccounts, Users } from '../../../core/models/table-data.model';
import { catchError, Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { TableService } from '../../../core/services/table.service';

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent {
  @Input() isFormOpen: boolean = false;
  @Input() formConfig: FormConfig = { groups: [] };
  @Input() currentFormType: string | null = null;
  @Output() submitForm = new EventEmitter<any>();
  @Output() closeForm = new EventEmitter<void>();
  @Input() modalTitle!: string;
  @Input() pageTitle!: string;
  @Output() getTableData = new EventEmitter<void>();
  @Input() data!: any;
  @Input() process!: string;

  // BALOLONG CODE
  @Input() isUserAccModalOpen: boolean = false;
  @Input() isAddPeopleModalOpen: boolean = false;
  @Input() isAddRMModalOpen: boolean = false;
  @Input() isAddReferenceModalOpen: boolean = false;
  @Output() reloadTable = new EventEmitter<void>();

  userAccount: UserAccounts = {};
  userDetails: People = {};
  // refData = { ...refTableData};

  passwordFieldType: string = 'password'; // Default to password field

  
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

  people: People[] = [];
  userTypes: Users[] = [];
  roles: Roles[] = [];

  newUserAccount: UserAccounts = {};


  checkboxValues: { [key: string]: { [key: string]: boolean } } = {};
  rowData: Array<{ rowName: string; columns: string[] }> = [];
  tableHeaders: string[] = [];

  constructor(private authService: AuthService, 
              private createAPI: CreateProcessService, 
              private tableService: TableService) {}

  ngOnInit(): void {
    this.tableService.getAllRoles().subscribe({
      next: ((data:Roles[]) => {
        this.roles = data;
      }),
      error: ((error) => {
        this.roles = error.error.text
      })
    })
    this.tableService.getAllUsers().subscribe({
      next: ((data:Users[]) => {
        this.userTypes = data;
      }),
      error: ((error) => {
        this.userTypes = error.error.text
      })
    })
    this.tableService.getAllPeople().subscribe({
      next: ((data:People[]) => {
        this.people = data;
      }),
      error: ((error) => {
        this.people = error.error.text
      })
    })

    console.log(this.process)
    this.initializeCheckboxValues();
    if(this.process == "view" || this.process == "edit"){
      this.getDataforView();
    }
  }

  getDataforView(){
    console.log(this.formConfig.groups)
  }

  initializeCheckboxValues() {
    if (this.formConfig) {
      for (const group of this.formConfig.groups) {
        if (group.className === 'permissionsTable') {
          group.checkboxes?.forEach((row: { row: string | number; columns: any[]; }) => {
            this.checkboxValues[row.row] = {};
            row.columns.forEach((column) => {
              this.checkboxValues[row.row][column] = false;
            });
          });
          this.rowData = this.processTableData(group.checkboxes || []);
          this.tableHeaders = group.tableHeaders || [];
        }
      }
    }
  }

  processTableData(checkboxes: any[]) {
    return checkboxes.map((row) => ({
      rowName: row.row,
      columns: row.columns
    }));
  }

  close() {
    const hasUnsavedChanges = this.hasUnsavedChanges();
    if (hasUnsavedChanges) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You have unsaved changes. Are you sure you want to close without saving?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, close it!',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          this.closeForm.emit();
        }
      });
    } else {
      this.closeForm.emit();
    }
  }

  onSubmit(className: string) {
    console.log(className);
    Swal.fire({
      title: 'Confirm Save',
      text: `Do you want to save the ${this.pageTitle} data?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, save it!',
      cancelButtonText: 'No, cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        let form: any = {
          'IsActive' : true,
          'CreatedByUserId' : this.authService.getItem('user')?.UserAccountId,
        };
        switch(className){
          case 'departmentDetails':
            this.formConfig.groups[0].fields?.forEach((x) => {
              form[`${x.id.charAt(0).toUpperCase()}${x.id.slice(1)}`] = x.value;
            });
            form['RBUId'] = 1;
            this.createAPI.createDepartment(form)
            .subscribe({
              next: ((value: any) => { console.log(value); }),
              error: ((error) => { console.log(error.error); }),
              complete: (() => {  this.getTableData.emit(); })
            })
            break;
          case 'rbuDetails':
            this.formConfig.groups[0].fields?.forEach((x) => {
              form[`${x.id.charAt(0).toUpperCase()}${x.id.slice(1)}`] = x.value;
            });
            this.createAPI.createRBU(form)
            .subscribe({
              next: ((value: any) => { console.log(value); }),
              error: ((error) => { console.log(error.error); }),
              complete: (() => {  this.getTableData.emit(); })
            })
            break;
          case 'userDetails':
            this.formConfig.groups[0].fields?.forEach((x) => {
              form[`${x.id.charAt(0).toUpperCase()}${x.id.slice(1)}`] = x.value;
            });
            this.createAPI.createUser(form)
            .subscribe({
              next: ((value: any) => { console.log(value); }),
              error: ((error) => { console.log(error.error); }),
              complete: (() => {  this.getTableData.emit(); })
            })
            break;
          case 'roleDetails':
            this.formConfig.groups[0].fields?.forEach((x) => {
              form[`${x.id.charAt(0).toUpperCase()}${x.id.slice(1)}`] = x.value;
            });
            this.createAPI.createRole(form)
              .subscribe({
              next: ((value: any) => { console.log(value); }),
              error: ((error) => { console.log(error.error); }),
              complete: (() => {  this.getTableData.emit(); })
            })
            break;
          case 'divisionDetails':
            this.formConfig.groups[0].fields?.forEach((x) => {
              form[`${x.id.charAt(0).toUpperCase()}${x.id.slice(1)}`] = x.value;
            });
            this.createAPI.createDivision(form)
              .subscribe({
              next: ((value: any) => { console.log(value); }),
              error: ((error) => { console.log(error.error); }),
              complete: (() => {  this.getTableData.emit(); })
            })
            break;
            case 'unitDetails':
              this.formConfig.groups[0].fields?.forEach((x) => {
                form[`${x.id.charAt(0).toUpperCase()}${x.id.slice(1)}`] = x.value;
              });
              this.createAPI.createUnit(form)
                .subscribe({
                next: ((value: any) => { console.log(value); }),
                error: ((error) => { console.log(error.error); }),
                complete: (() => {  this.getTableData.emit(); })
              })
              break;
        }
        this.close();
      }
    });
    
  }

  hasUnsavedChanges(): boolean {
    // Implement logic to check if there are unsaved changes
    return Object.keys(this.checkboxValues).length > 0;
  }


  closeModal() {
    this.isUserAccModalOpen = false;
    this.isAddPeopleModalOpen = false;
    this.isAddRMModalOpen = false;
    this.closeForm.emit();
  }


  onSubmitB() {
    console.log(this.userAccount)
    Swal.fire({
      title: 'Are you sure?',
      text: `Are you sure you want to submit the form?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, submit!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.currentFormType == 'userAccount') {
          this.logAddPeopleDetails();
        }

        this.close(); // Close the modal after submission
      }
    });
  }

  logAddPeopleDetails() {
    console.log('Add People Details:', this.userAccount); // Log the "Add People" form data
    // this.submitForm.emit(addPeopleData);
    this.userAccount.isActive = true;
    this.userAccount.createdByUserId = this.authService.getItem('user')?.UserId;
    this.userAccount.dateCreated = new Date();
    this.createAPI.createUserAccount(this.userAccount).subscribe({
      next: ((data:UserAccounts) => {
        Swal.fire({
          text: 'User Account Successfully added!',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
      }),
      error: ((error:any) => {
        Swal.fire({
          text: `${error.error.text}`,
          icon: 'warning',
          confirmButtonText: 'Ok'
        })
      }),
      complete: (() => {
        this.getTableData.emit();
        this.reloadTable.emit();
      })
    })
  }
  // logReferenceData() {
  //   const addRefData = {
  //     code: this.refData.code,
  //     name: this.refData.name,
  //     description: this.refData.description,
  //     dropdown: this.refData.dropdown,
  //   };
  //   console.log('Add Reference Data:', addRefData); // Log the "Add People" form data
  //   this.submitForm.emit(addRefData);
  // }


  togglePassword() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }
}
