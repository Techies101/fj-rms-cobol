export interface EmployeesStatus {
   id: string
   name: string
   status: string
}

export interface StatusCount {
    "internal": number
    "billable": number
    "management": number
    "bench": number
}