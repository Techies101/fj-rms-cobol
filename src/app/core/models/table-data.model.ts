export class Departments {
    DepartmentId?: string;
    Code?: string | any;
    Name?: string | any;
    Description?: string | any;
    RBUId?: number;
    DateCreated?: string;
    CreatedByUserId?: string;
    DateUpdated?: string;
    UpdatedByUserId?: string;
    DateDeleted?: string;
    DeletedByUserId?: string;
    DateRestore?: string;
    RestoredByUserId?: string;
    IsActive?: boolean;
}
 
export class Divisions {
    DivisionId?: string;
    Code?: string;
    Name?: string;
    Description?: string;  
    RBUId?: string;
    DepartmentId?: string;  
    DateCreated?: string;  
    CreatedByUserId?: string;  
    DateUpdated?: string;  
    UpdatedByUserId?: string;  
    DateDeleted?: string;  
    DeletedByUserId?: string;  
    DateRestore?: string;  
    RestoredByUserId?: string;  
    IsActive?: string;
}
 
export class Modules {
    ModuleId!: string;  
    ModuleCode!: string;    
    ModuleName!: string;    
    ModuleDescription!: string;
    IsActive!: string;
}
 
export class People {
    PersonId?: number;  
    FirstName?: string;
    LastName?: string;  
    MiddleName?: string;    
    Position?: string;
    ZinzaiId?: string;  
    EmployeeEmail?: string;
    PersonTitle?: string;
    EmployeeStatus?: string;
    EmployeeTitle?: string;
    EmployeeLocation?: string;
    Grade_Level?: string;
    FJLevel?: string;
    JLPTLevel?: string;
    EmployeeContractStatus?: string;
    DateHired?: string;
    RegularizationDate?: string;
    EmployeeProjects?: string;
    EmployeeSkills?: string[];
    Gender?: string;
    EndOfEmployment?: string;
    ResignationDate?: string;
    IsBench?: boolean;
    RBUId?: string;
    DepartmentId?: string; 
    DivisionId?: string;  
    UnitId?: string;
    IsReference?: boolean;  
    IsManager?: boolean;
    IsOperationManager?: boolean;
    IsHR?: boolean;
    IsTrainer?: boolean;
    fullName?: string;
    fullname?: string;
    IsActive?: boolean;
}
 
export class RBU {
    RBUId?: string;
    Code?: string;  
    Name?: string;  
    Description?: string;  
    DateCreated?: string;  
    CreatedByUserId?: string;  
    DateUpdated?: string;  
    UpdatedByUserId?: string;  
    DateDeleted?: string;  
    DeletedByUserId?: string;  
    DateRestore?: string;  
    RestoredByUserId?: string;  
    IsActive?: string;
}
 
export class Roles {
    RoleId?: string;    
    Code?: string;  
    Name?: string;  
    Description?: string;  
    DateCreated?: string;  
    CreatedByUserId?: string;  
    DateUpdated?: string;  
    UpdatedByUserId?: string;  
    DateDeleted?: string;  
    DeletedByUserId?: string;  
    DateRestore?: string;  
    RestoredByUserId?: string;  
    IsActive?: string;
}
 
export class Units {
    UnitId!: string;    
    Code!: string;  
    Name!: string;  
    Description!: string;  
    RBUId!: string;
    DepartmentId!: string;  
    DivisionId!: string;    
    DateCreated!: string;  
    CreatedByUserId!: string;  
    DateUpdated!: string;  
    UpdatedByUserId!: string;  
    DateDeleted!: string;  
    DeletedByUserId!: string;  
    DateRestore!: string;  
    RestoredByUserId!: string;  
    IsActive!: string;
}
 
export class UserAccounts {
    userAccountId?: string;
    username?: string;  
    password?: string;  
    enforcePasswordExpirePolicy?: string;  
    passwordExpiration?: string;    
    personId?: string;  
    roleId?: string;    
    dateCreated?: Date;  
    createdByUserId?: string;  
    dateUpdated?: string;  
    updatedByUserId?: string;  
    dateDeleted?: string;  
    deletedByUserId?: string;  
    dateRestore?: string;  
    restoredByUserId?: string;  
    isActive?: boolean;  
    userId?: string;
}
 
export class UserPolicies {
    UserPolicyId!: string;  
    UserId!: string;    
    RoleId!: string;    
    DateCreated!: string;  
    CreatedByUserId!: string;  
    DateUpdated!: string;  
    UpdatedByUserId!: string;  
    DateDeleted!: string;  
    DeletedByUserId!: string;  
    DateRestore!: string;  
    RestoredByUserId!: string;  
    IsActive!: string;
}
 
export class UserPolicyTransactions {
    UserPolicyTransactId!: string;  
    UserPolicyId!: string;  
    ModuleId!: string;  
    CreateAccess!: string;  
    UpdateAccess!: string;  
    DeleteAccess!: string;  
    ReadAccess!: string;    
    RestoreAccess!: string;
    DateCreated!: string;  
    CreatedByUserId!: string;  
    DateUpdated!: string;  
    UpdatedByUserId!: string;  
    DateDeleted!: string;  
    DeletedByUserId!: string;  
    DateRestore!: string;  
    RestoredByUserId!: string;  
    IsActive!: string;
}
 
export class Users {
    UserId?: number;        
    Code?: string;      
    Name?: string;      
    Description?: string;      
    CreatedByUserId?: string;      
    DateCreated?: string;      
    DateDeleted?: string;      
    DateRestore?: string;      
    DateUpdated?: string;      
    DeletedByUserId?: string;      
    IsActive?: string;      
    RestoredByUserId?: string;      
    UpdatedByUserId?: string;  
}

export class Policy {
    UserPolicyId?: string;
    PolicyCode?: string;
    PolicyName?: string;
    PolicyDescription?: string;
    UserId?: string;
    UserType?: string;
    RoleId?: string; // Role: HR Specialist/ HR Manager/ TRAINER/ SUB-TRAINER/MANAGER/ ASSISTANT MANAGER/ SUPERADMIN/ADMIN
    Role?: string;
    PolicyTransact?: PolicyTransact[]
}

export class PolicyTransact {
    UserPolicyTransactId?: string;
    UserPolicyId?: string;
    ModuleId?: number | undefined;
    CreateAccess?: boolean | undefined;
    UpdateAccess?: boolean;
    DeleteAccess?: boolean;
    ReadAccess?: boolean;
    RestoreAccess?: boolean;
}

export class Training {
    TrainingId?: string;
    TrainingCode?: string;
    TrainingName?: string;
    TrainingDescription?: string;
    TrainingStartDate?: string;
    TrainingEndDate?: string;
    TrainingDurationInDays?: string;
    NoOfTrainees?: number;
    TrainerFullName?: string;
    DateCreated?: string;
    CreatedByUserId?: string;
    DateUpdated?: string;
    UpdatedByUserId?: string;
    DateDeleted?: string;
    DeletedByUserId?: string;
    DateRestore?: string;
    RestoredByUserId?: string;
    IsActive?: string;
    TrainerId?: string;
    Trainees?: Trainees[] | [];
}

export class Trainees {
    TrainingTransactId?: number;
    TrainingId?: number;
    PersonId?: number;
    ZinzaiId?: string;
    TraineeFullname?: string;
    Position?: string;
    Skills?: string[];
    GradingInPercentage?: number;
    TraineeActivitiesLink?: string;
}

export class UserLogin {
    UserAccountId?: number;
    Username?: string;
    Fullname?: string;
    Role!: string;
    RoleId?: string;
    UserId!: string;
}

export class Trainer {
    PersonId?: string;
    fullname?: string;
}

export interface User {
    value: string;
    viewValue: string;
  }
export interface Role {
    value: string;
    viewValue: string;
  }