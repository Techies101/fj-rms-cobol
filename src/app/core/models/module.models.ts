import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class Module { 

  static readonly admin: any = {
    menus: [
      {
        name: "Me", // name of the menu
        goTo: ["Organization chart", "Training list", "Employee list"], // options under Go To
        shortcut: ["Account Information"],  // options under applications
        applications: ["Go To", "Account Information", "", ""], // applications options, also added the Go To here as it is important for counting the loop
        icon: ["", "person", "", ""], //icons for the ones under Shortcut and Applications
        goToIcon: ["group", "list", "list"],  // icons for the ones under Go To
        goToUrl: ["/a", "/b", "/c"],  // urls for the options under Go To column
        url: ["", "/d", "", ""],  // urls for the options under Shortcut and Applications
      },
      {
        name: "User Management",
        applications: ["User's", "People", "Role", "Policy", "User Account"],
        icon: ["person", "group", "person_check", "description", "person_add"],
        url: ["admin/table/User's", "admin/table/People", "admin/table/Role", "admin/table/Policy", "admin/table/User Account"]
      },
      {
        name: "System Setup",
        applications: ["RBU", "Department", "Division", "Unit"],
        icon: ["language", "work", "view_comfy_alt", "pie_chart"],
        url: ["admin/table/RBU", "admin/table/Department", "admin/table/Division", "admin/table/Unit"]
      },
      {
        name: "HR Module",
        applications: ["Employee List"],
        icon: ["person"],
        url: ["admin/table/Employee List"]
      },
      {
        name: "Manager Module",
        applications: [],
        icon: [],
        url: []
      },
      {
        name: "Trainer Module",
        applications: ["Training List"],
        icon: ["list"],
        url: ["admin/table/Training List"]
      }
    ],
    table: {
      value: {
        header: {
          "User's": ["Code", "Name", "Description", "Actions"],           
          "People": ["Zinzai ID", "Name", "Position", "Actions"],           
          "Role": ["Code", "Name", "Description", "Actions"],             // lists the table headers
          "Policy": ["Code", "Name", "Description", "Actions"],           // for each pages
          "User Account": ["User Name", "User", "Role", "Full Name", "Actions"],
          "RBU": ["Code", "Name", "Description", "Actions"],
          "Department": ["Code", "Name", "Description", "Actions"],
          "Division": ["Code", "Name", "Description", "Actions"],
          "Unit": ["Code", "Name", "Description", "Actions"],
          "Employee List": ["Zinzai ID", "Name", "Position", "Actions"],
          "Training List" : ["Training Code", "Training Name", "Trainer/SME", "Actions"],
        },
        content: {
          "User's": ["Code", "Name", "Description"],           
          "People": ["ZinzaiId", "fullName", "EmployeeTitle"],           
          "Role": ["Code", "Name", "Description"],             // lists the table column names according
          "Policy": ["PolicyCode", "PolicyName", "PolicyDescription"],           // to the database for each pages
          "User Account": ["Username", "UserType", "RoleName", "Fullname", "Actions"],
          "RBU": ["Code", "Name", "Description"], 
          "Department": ["Code", "Name", "Description"], 
          "Division": ["Code", "Name", "Description"], 
          "Unit": ["Code", "Name", "Description"],
          "Employee List": ["ZinzaiId", "fullName", "EmployeeTitle"], 
          "Training List" : ["TrainingCode", "TrainingName", "TrainerFullname"],
        }
      },
      columnWidths: {
        "User's": ["w-5", "w-25", "w-40", "w-20"],           
        "People": ["w-15", "w-25", "w-40", "w-20"],           
        "Role": ["w-15", "w-25", "w-40", "w-20"],                     // lists the column width
        "Policy": ["w-15", "w-25", "w-40", "w-20"],
        "User Account": ["w-15", "w-15", "w-20", "w-30", "w-20"],                     // for each pages
        "RBU": ["w-15", "w-25", "w-40", "w-20"],  
        "Department": ["w-15", "w-25", "w-40", "w-20"],   
        "Division": ["w-15", "w-25", "w-40", "w-20"],  
        "Unit": ["w-15", "w-25", "w-40", "w-20"],  
        "Employee List": ["w-20", "w-35", "w-35", "w-10"],
        "Training List" : ["w-20", "w-35", "w-35", "w-10"],
      }
    }
  };
  
  static readonly hr: any = {
    menus: [
      {
        name: "Me", // name of the menu
        goTo: ["Organization chart", "Training list", "Employee list"], // options under Go To
        shortcut: ["Account Information"],  // options under applications
        applications: ["Go To", "Account Information", "", ""], // applications options, also added the Go To here as it is important for counting the loop
        icon: ["", "person", "", ""], //icons for the ones under Shortcut and Applications
        goToIcon: ["group", "list", "list"],  // icons for the ones under Go To
        goToUrl: ["/a", "/b", "/c"],  // urls for the options under Go To column
        url: ["", "/d", "", ""],  // urls for the options under Shortcut and Applications
      },
      {
        name: "Resource Management",
        applications: ["Employee List", "Organization Chart"],
        icon: ["list", "group"],
        url: ["hr/table/Employee List", ""]
      },
      {
        name: "Training Management",
        applications: ["Training List"],
        icon: ["list"],
        url: ["hr/table/Training List"]
      },
      {
        name: "Reports",
        applications: ["Reports", "Analytics", "Export Report"],
        icon: ["assignment", "equalizer", "download"],
        url: ["hr/table/Reports", "hr/table/Analytics", "hr/table/Export Report"]
      },
    ],
    table: {
      value: {
        header: {
          "Employee List" : ["Zinzai ID", "Name", "Position", "Actions"],
          "Training List" : ["Training Code", "Training Name", "Trainer/SME", "Actions"],
          "Reports"       : ["ID No", "Name", "Department", "Manager"],
          "Export Report" : ["Date", "Filename", "Size", "Actions"]
        },
        content: {
          "Employee List" : ["zinzaiId", "fullname", "EmployeeTitle"], 
          "Training List" : ["TrainingCode", "TrainingName", "TrainerFullname"],
          "Reports"       : ["userId", "name", "department", "manager"],
          "Export Report" : ["date_created", "filename", "size"]
        }
      },
      columnWidths: {
        "Employee List" : ["w-20", "w-35", "w-35", "w-10"],
        "Training List" : ["w-20", "w-35", "w-35", "w-10"],
        "Reports"       : ["w-15", "25", "w-35", "w-25"],
        "Export Report" : ["w-15", "w-55", "w-10", "w-20"]
      }
    }
  };

  static readonly trainer: any = {
    menus: [
      {
        name: "Me", // name of the menu
        goTo: ["Organization chart", "Training list", "Employee list"], // options under Go To
        shortcut: ["Account Information"],  // options under applications
        applications: ["Go To", "Account Information", "", ""], // applications options, also added the Go To here as it is important for counting the loop
        icon: ["", "person", "", ""], //icons for the ones under Shortcut and Applications
        goToIcon: ["group", "list", "list"],  // icons for the ones under Go To
        goToUrl: ["/a", "/b", "/c"],  // urls for the options under Go To column
        url: ["", "/d", "", ""],  // urls for the options under Shortcut and Applications
      },
      {
        name: "Training Management",
        applications: ["Training List", "Organization Chart"],
        icon: ["list", "group"],
        url: ["trainer/table/Training List", ""]
      },
    ],
    table: {
      value: {
        header: {
          "Training List": ["Training Code", "Training Name", "Trainer/SME", "Actions"]
        },
        content: {
          "Training List" : ["TrainingCode", "TrainingName", "TrainerFullname"],
        }
      },
      columnWidths: {
        "Training List" : ["w-20", "w-35", "w-35", "w-10"]
      }
    }
  };

  static readonly manager: any = {
    menus: [
      {
        name: "Me", // name of the menu
        goTo: ["Organization chart", "Training list", "Employee list"], // options under Go To
        shortcut: ["Account Information"],  // options under applications
        applications: ["Go To", "Account Information", "", ""], // applications options, also added the Go To here as it is important for counting the loop
        icon: ["", "person", "", ""], //icons for the ones under Shortcut and Applications
        goToIcon: ["group", "list", "list"],  // icons for the ones under Go To
        goToUrl: ["/a", "/b", "/c"],  // urls for the options under Go To column
        url: ["", "/d", "", ""],  // urls for the options under Shortcut and Applications
      },
      {
        name: "Resource Management",
        applications: ["Employee List", "Training List", "Organization Chart"],
        icon: ["list", "list", "group"],
        url: ["manager/table/Training List", "manager/table/Training List", ""]
      },
    ],
    table: {
      value: {
        header: {
          "Employee List" : ["Zinzai ID", "Name", "Position", "Actions"],
          "Training List": ["Training Code", "Training Name", "Trainer/SME", "Actions"]
        },
        content: {
          "Employee List": ["zinzaiId", "fullname", "Position"], 
          "Training List" : ["TrainingCode", "TrainingName", "TrainerFullname"],
        }
      },
      columnWidths: {
        "Employee List" : ["w-20", "w-35", "w-35", "w-10"],
        "Training List" : ["w-20", "w-35", "w-35", "w-10"]
      }
    }
  };
  
}
