// src/app/core/models/forms.model.ts

// Define the structure of a form field
export interface Field {
    id: string;
    label: string;
    type: 'text' | 'select' | 'date';
    name: string;
    value: string;
    options?: string[]; // Only used if type is 'select'
  }
  
  // Define the structure of a form group
  export interface Group {
    className: string;
    fields?: Field[];
    tableHeaders?: string[];
    tableRows?: string[];
    checkboxes?: {
      row: string;
      columns: string[];
    }[];
  }
  
  // Define the structure of the form configuration
  export interface FormConfig {
    groups: Group[];
  }
  
  // Example form configurations
  export const addUser: FormConfig = {
    groups: [
      {
        className: 'userDetails',
        fields: [
          { id: 'code', label: 'Code', type: 'text', name: 'code', value: '' },
          { id: 'name', label: 'Name', type: 'text', name: 'name', value: '' },
          { id: 'description', label: 'Description', type: 'text', name: 'description', value: '' }
        ]
      }
    ]
  };

  export const addRole: FormConfig = {
    groups: [
      {
        className: 'roleDetails',
        fields: [
          { id: 'code', label: 'Code', type: 'text', name: 'code', value: '' },
          { id: 'name', label: 'Name', type: 'text', name: 'name', value: '' },
          { id: 'description', label: 'Description', type: 'text', name: 'description', value: '' }
        ]
      }
    ]
  };
  
  export const addPeople: FormConfig = {
    groups: [
      {
        className: 'name',
        fields: [
          { id: 'lastname', label: 'Last Name', type: 'text', name: 'lastname', value: '' },
          { id: 'firstname', label: 'First Name', type: 'text', name: 'firstname', value: '' },
          { id: 'middlename', label: 'Middle Name', type: 'text', name: 'middlename', value: '' }
        ]
      },
      {
        className: 'userDetails',
        fields: [
          { id: 'email', label: 'Email', type: 'text', name: 'email', value: '' },
          { id: 'initialpassword', label: 'Initial Password', type: 'text', name: 'initialpassword', value: '' }
        ]
      },
      {
        className: 'position',
        fields: [
          { id: 'position', label: 'Position', type: 'text', name: 'position', value: '' }
        ]
      }
    ]
  };
  
  export const addRBU: FormConfig = {
    groups: [
      {
        className: 'rbuDetails',
        fields: [
          { id: 'code', label: 'Code', type: 'text', name: 'code', value: '' },
          { id: 'name', label: 'Name', type: 'text', name: 'name', value: '' },
          { id: 'description', label: 'Description', type: 'text', name: 'description', value: '' }
        ]
      }
    ]
  };
  
  export const addDepartment: FormConfig = {
    groups: [
      {
        className: 'departmentDetails',
        fields: [
          { id: 'code', label: 'Code', type: 'text', name: 'code', value: '' },
          { id: 'name', label: 'Name', type: 'text', name: 'name', value: '' },
          { id: 'description', label: 'Description', type: 'text', name: 'description', value: '' }
        ]
      }
    ]
  };
  
  export const addDivision: FormConfig = {
    groups: [
      {
        className: 'divisionDetails',
        fields: [
          { id: 'code', label: 'Code', type: 'text', name: 'code', value: '' },
          { id: 'name', label: 'Name', type: 'text', name: 'name', value: '' },
          { id: 'description', label: 'Description', type: 'text', name: 'description', value: '' }
        ]
      }
    ]
  };
  
  export const addUnit: FormConfig = {
    groups: [
      {
        className: 'unitDetails',
        fields: [
          { id: 'code', label: 'Code', type: 'text', name: 'code', value: '' },
          { id: 'name', label: 'Name', type: 'text', name: 'name', value: '' },
          { id: 'description', label: 'Description', type: 'text', name: 'description', value: '' }
        ]
      }
    ]
  };
  
  export const addTraining: FormConfig = {
    groups: [
      {
        className: 'trainingDetails',
        fields: [
          { id: 'trainingCode', label: 'Training Code', type: 'text', name: 'trainingCode', value: '' },
          { id: 'trainingName', label: 'Training Name', type: 'text', name: 'trainingName', value: '' },
          { id: 'trainingDescription', label: 'Training Description', type: 'text', name: 'trainingDescription', value: '' },
          { id: 'trainerSME', label: 'Trainer/SME', type: 'select', name: 'trainerSME', value: '', options: ['Trainer1', 'Trainer2'] },
          { id: 'duration', label: 'Duration of Training', type: 'select', name: 'duration', value: '', options: ['1 Hour', '2 Hours', 'Half Day', 'Full Day'] },
          { id: 'startDate', label: 'Start Date', type: 'date', name: 'startDate', value: '' },
          { id: 'endDate', label: 'End Date', type: 'date', name: 'endDate', value: '' }
        ]
      }
    ]
  };
  
  export const addPolicy: FormConfig = {
    groups: [
      {
        className: '',
        fields: [
          { id: 'code', label: 'Code', type: 'text', name: 'code', value: '' },
          { id: 'name', label: 'Name of Policy', type: 'text', name: 'name', value: '' },
          { id: 'description', label: 'Description', type: 'text', name: 'description', value: '' },
          { id: 'name', label: 'Name', type: 'text', name: 'name', value: '' }
        ]
      },
      {
        className: 'permissionsTable',
        tableHeaders: ['HR Module', 'Trainer Module', 'Manager Module', 'User Management', 'System Setup'],
        tableRows: ['Create', 'Update', 'View', 'Restore', 'Delete'],
        checkboxes: [
          { row: 'Create', columns: ['hrModule', 'trainerModule', 'managerModule', 'userManagement', 'systemSetup'] },
          { row: 'Update', columns: ['hrModule', 'trainerModule', 'managerModule', 'userManagement', 'systemSetup'] },
          { row: 'View', columns: ['hrModule', 'trainerModule', 'managerModule', 'userManagement', 'systemSetup'] },
          { row: 'Restore', columns: ['hrModule', 'trainerModule', 'managerModule', 'userManagement', 'systemSetup'] },
          { row: 'Delete', columns: ['hrModule', 'trainerModule', 'managerModule', 'userManagement', 'systemSetup'] }
        ]
      }
    ]
  };

  export const addUserAccount: FormConfig = {
    groups: [
      {
        className: 'trainingDetails',
        fields: [
          { id: 'trainingCode', label: 'Training Code', type: 'text', name: 'trainingCode', value: '' },
          { id: 'trainingName', label: 'Training Name', type: 'text', name: 'trainingName', value: '' },
          { id: 'trainingDescription', label: 'Training Description', type: 'text', name: 'trainingDescription', value: '' },
          { id: 'trainerSME', label: 'Trainer/SME', type: 'select', name: 'trainerSME', value: '', options: ['Trainer1', 'Trainer2'] },
          { id: 'duration', label: 'Duration of Training', type: 'select', name: 'duration', value: '', options: ['1 Hour', '2 Hours', 'Half Day', 'Full Day'] },
          { id: 'startDate', label: 'Start Date', type: 'date', name: 'startDate', value: '' },
          { id: 'endDate', label: 'End Date', type: 'date', name: 'endDate', value: '' }
        ]
      }
    ]
  };


  // Select option lists
export const RBU_OPTIONS: SelectOption[] = [
  { value: 'rbu1', label: 'RBU 1' },
  { value: 'rbu2', label: 'RBU 2' },
  { value: 'rbu3', label: 'RBU 3' }
];

export const DEPARTMENTS: SelectOption[] = [
  { value: 'hr', label: 'HR' },
  { value: 'it', label: 'IT' },
  { value: 'finance', label: 'Finance' },
  { value: 'marketing', label: 'Marketing' }
];

export const DIVISIONS: SelectOption[] = [
  { value: 'division1', label: 'Division 1' },
  { value: 'division2', label: 'Division 2' },
  { value: 'division3', label: 'Division 3' }
];

export const UNITS: SelectOption[] = [
  { value: 'unit1', label: 'Unit 1' },
  { value: 'unit2', label: 'Unit 2' },
  { value: 'unit3', label: 'Unit 3' }
];

export const PEOPLE: SelectOption[] = [
  { value: 'person1', label: 'Person 1' },
  { value: 'person2', label: 'Person 2' }
];

export const USER_TYPES: SelectOption[] = [
  { value: 'type1', label: 'User Type 1' },
  { value: 'type2', label: 'User Type 2' }
];

export const ROLES: SelectOption[] = [
  { value: 'role1', label: 'Role 1' },
  { value: 'role2', label: 'Role 2' }
];


export const rmFormData = {
  firstName: '',
  middleName: '',
  lastName: '',
  position: '',
  zinzaiId: '',
  email: '',
  dateHired: '',
  regularizationDate: '',
  resignationDate: '',
  endOfEmployment: '',
  employeeProjects: '',
  employeeSkills: '',
  personTitle: '',
  employeeStatus: '',
  employeeLocation: '',
  gradeLevel: '',
  fjLevel: '',
  employeeContractStatus: '',
  gender: '',
  rbu: '',
  department: '',
  division: '',
  unit: '',
  isBench: '',
  selectedOption: '',
  employeeTitle: '',
  isManager: false,
  isTrainer: false,
  isOperationManager: false,
  isHR: false,
  password: '',
  selectedPerson: '',
  selectedUserType: ''
};

export const refTableData = {
    code: '',
    name: '',
    description: '',
    dropdown: ''
}

  export const FormType: any = {
    "User's": "user",
    'People': "people",
    'RBU': "rbu",
    'Department': "department",
    'Division': "division",
    'Unit': "unit",
    'Training': "training",
    'Policy': "policy",
    'Role': 'role',
    "User Account": 'userAccount'
  };

  // Define the structure of a select option
export interface SelectOption {
  value: string;
  label: string;
}

// export const userAccount = {
//   email: '',
//   password: '',
//   selectedPerson: '',
//   selectedUserType: '',
//   selectedOption: ''
// }