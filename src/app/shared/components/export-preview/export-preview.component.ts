import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-export-preview',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './export-preview.component.html',
  styleUrls: ['./export-preview.component.scss']
})
export class ExportPreviewComponent {
  @Input() isPreviewOpen: boolean = false;

  // Data to be paginated
  data2 = [
    { id: 1, name: 'John Doe', department: 'Engineering', code: "001", manager: 'Jomar, Rosario', rbu: 'JP-RBU', division: "Major", unit: 'Unit 3', status: 'active', aaa: 1, bbb: 'John Doe', ccc: 'Engineering' },
    { id: 2, name: 'Jane Smith', department: 'HR', code: "002", manager: 'Marta, Johnson', rbu: 'HR-RBU', division: "Minor", unit: 'Unit 1', status: 'inactive', aaa: 2, bbb: 'Jane Smith', ccc: 'HR' },
    { id: 3, name: 'Emily Davis', department: 'Marketing', code: "003", manager: 'Liam, Williams', rbu: 'MR-RBU', division: "Major", unit: 'Unit 4', status: 'active', aaa: 3, bbb: 'Emily Davis', ccc: 'Marketing' },
    { id: 4, name: 'Michael Brown', department: 'Finance', code: "004", manager: 'Sophia, Martinez', rbu: 'FR-RBU', division: "Minor", unit: 'Unit 2', status: 'inactive', aaa: 4, bbb: 'Michael Brown', ccc: 'Finance' },
    { id: 5, name: 'Sarah Wilson', department: 'Engineering', code: "005", manager: 'Jackson, Clark', rbu: 'JP-RBU', division: "Major", unit: 'Unit 3', status: 'active', aaa: 5, bbb: 'Sarah Wilson', ccc: 'Engineering' },
    { id: 6, name: 'Chris Lee', department: 'Marketing', code: "006", manager: 'Isabella, Moore', rbu: 'MR-RBU', division: "Minor", unit: 'Unit 1', status: 'inactive', aaa: 6, bbb: 'Chris Lee', ccc: 'Marketing' },
    { id: 7, name: 'Katie Taylor', department: 'HR', code: "007", manager: 'James, Anderson', rbu: 'HR-RBU', division: "Major", unit: 'Unit 4', status: 'active', aaa: 7, bbb: 'Katie Taylor', ccc: 'HR' },
    { id: 8, name: 'David Johnson', department: 'Finance', code: "008", manager: 'Olivia, Jackson', rbu: 'FR-RBU', division: "Minor", unit: 'Unit 2', status: 'inactive', aaa: 8, bbb: 'David Johnson', ccc: 'Finance' },
    { id: 1, name: 'John Doe', department: 'Engineering', code: "001", manager: 'Jomar, Rosario', rbu: 'JP-RBU', division: "Major", unit: 'Unit 3', status: 'active', aaa: 1, bbb: 'John Doe', ccc: 'Engineering' },
    { id: 2, name: 'Jane Smith', department: 'HR', code: "002", manager: 'Marta, Johnson', rbu: 'HR-RBU', division: "Minor", unit: 'Unit 1', status: 'inactive', aaa: 2, bbb: 'Jane Smith', ccc: 'HR' },
    { id: 3, name: 'Emily Davis', department: 'Marketing', code: "003", manager: 'Liam, Williams', rbu: 'MR-RBU', division: "Major", unit: 'Unit 4', status: 'active', aaa: 3, bbb: 'Emily Davis', ccc: 'Marketing' },
    { id: 4, name: 'Michael Brown', department: 'Finance', code: "004", manager: 'Sophia, Martinez', rbu: 'FR-RBU', division: "Minor", unit: 'Unit 2', status: 'inactive', aaa: 4, bbb: 'Michael Brown', ccc: 'Finance' },
    { id: 5, name: 'Sarah Wilson', department: 'Engineering', code: "005", manager: 'Jackson, Clark', rbu: 'JP-RBU', division: "Major", unit: 'Unit 3', status: 'active', aaa: 5, bbb: 'Sarah Wilson', ccc: 'Engineering' },
    { id: 6, name: 'Chris Lee', department: 'Marketing', code: "006", manager: 'Isabella, Moore', rbu: 'MR-RBU', division: "Minor", unit: 'Unit 1', status: 'inactive', aaa: 6, bbb: 'Chris Lee', ccc: 'Marketing' },
    { id: 7, name: 'Katie Taylor', department: 'HR', code: "007", manager: 'James, Anderson', rbu: 'HR-RBU', division: "Major", unit: 'Unit 4', status: 'active', aaa: 7, bbb: 'Katie Taylor', ccc: 'HR' },
    { id: 8, name: 'David Johnson', department: 'Finance', code: "008", manager: 'Olivia, Jackson', rbu: 'FR-RBU', division: "Minor", unit: 'Unit 2', status: 'inactive', aaa: 8, bbb: 'David Johnson', ccc: 'Finance' },
    { id: 1, name: 'John Doe', department: 'Engineering', code: "001", manager: 'Jomar, Rosario', rbu: 'JP-RBU', division: "Major", unit: 'Unit 3', status: 'active', aaa: 1, bbb: 'John Doe', ccc: 'Engineering' },
    { id: 2, name: 'Jane Smith', department: 'HR', code: "002", manager: 'Marta, Johnson', rbu: 'HR-RBU', division: "Minor", unit: 'Unit 1', status: 'inactive', aaa: 2, bbb: 'Jane Smith', ccc: 'HR' },
    { id: 3, name: 'Emily Davis', department: 'Marketing', code: "003", manager: 'Liam, Williams', rbu: 'MR-RBU', division: "Major", unit: 'Unit 4', status: 'active', aaa: 3, bbb: 'Emily Davis', ccc: 'Marketing' },
    { id: 4, name: 'Michael Brown', department: 'Finance', code: "004", manager: 'Sophia, Martinez', rbu: 'FR-RBU', division: "Minor", unit: 'Unit 2', status: 'inactive', aaa: 4, bbb: 'Michael Brown', ccc: 'Finance' },
    { id: 5, name: 'Sarah Wilson', department: 'Engineering', code: "005", manager: 'Jackson, Clark', rbu: 'JP-RBU', division: "Major", unit: 'Unit 3', status: 'active', aaa: 5, bbb: 'Sarah Wilson', ccc: 'Engineering' },
    { id: 6, name: 'Chris Lee', department: 'Marketing', code: "006", manager: 'Isabella, Moore', rbu: 'MR-RBU', division: "Minor", unit: 'Unit 1', status: 'inactive', aaa: 6, bbb: 'Chris Lee', ccc: 'Marketing' },
    { id: 7, name: 'Katie Taylor', department: 'HR', code: "007", manager: 'James, Anderson', rbu: 'HR-RBU', division: "Major", unit: 'Unit 4', status: 'active', aaa: 7, bbb: 'Katie Taylor', ccc: 'HR' },
    { id: 8, name: 'David Johnson', department: 'Finance', code: "008", manager: 'Olivia, Jackson', rbu: 'FR-RBU', division: "Minor", unit: 'Unit 2', status: 'inactive', aaa: 8, bbb: 'David Johnson', ccc: 'Finance' },
    { id: 1, name: 'John Doe', department: 'Engineering', code: "001", manager: 'Jomar, Rosario', rbu: 'JP-RBU', division: "Major", unit: 'Unit 3', status: 'active', aaa: 1, bbb: 'John Doe', ccc: 'Engineering' },
    { id: 2, name: 'Jane Smith', department: 'HR', code: "002", manager: 'Marta, Johnson', rbu: 'HR-RBU', division: "Minor", unit: 'Unit 1', status: 'inactive', aaa: 2, bbb: 'Jane Smith', ccc: 'HR' },
    { id: 3, name: 'Emily Davis', department: 'Marketing', code: "003", manager: 'Liam, Williams', rbu: 'MR-RBU', division: "Major", unit: 'Unit 4', status: 'active', aaa: 3, bbb: 'Emily Davis', ccc: 'Marketing' },
    { id: 4, name: 'Michael Brown', department: 'Finance', code: "004", manager: 'Sophia, Martinez', rbu: 'FR-RBU', division: "Minor", unit: 'Unit 2', status: 'inactive', aaa: 4, bbb: 'Michael Brown', ccc: 'Finance' },
    { id: 5, name: 'Sarah Wilson', department: 'Engineering', code: "005", manager: 'Jackson, Clark', rbu: 'JP-RBU', division: "Major", unit: 'Unit 3', status: 'active', aaa: 5, bbb: 'Sarah Wilson', ccc: 'Engineering' },
    { id: 6, name: 'Chris Lee', department: 'Marketing', code: "006", manager: 'Isabella, Moore', rbu: 'MR-RBU', division: "Minor", unit: 'Unit 1', status: 'inactive', aaa: 6, bbb: 'Chris Lee', ccc: 'Marketing' },
    { id: 7, name: 'Katie Taylor', department: 'HR', code: "007", manager: 'James, Anderson', rbu: 'HR-RBU', division: "Major", unit: 'Unit 4', status: 'active', aaa: 7, bbb: 'Katie Taylor', ccc: 'HR' },
    { id: 8, name: 'David Johnson', department: 'Finance', code: "008", manager: 'Olivia, Jackson', rbu: 'FR-RBU', division: "Minor", unit: 'Unit 2', status: 'inactive', aaa: 8, bbb: 'David Johnson', ccc: 'Finance' }
  ];

  // Pagination variables
  pageSize: number = 14;
  currentPage: number = 1;
  totalPages: number = Math.ceil(this.data2.length / this.pageSize);

  // Computed property to get data for current page
  get pagedData() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.data2.slice(start, end);
  }

  // Method to navigate to the previous page
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  // Method to navigate to the next page
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  // Method to close the preview
  closePreview() {
    this.isPreviewOpen = false;
  }

   // Method to handle export functionality (console log data)
   exportData() {
    // Get all data to export
    const exportData = this.data2; // Use this.pagedData if you only want the current page's data

    // Log data to console
    console.log('Exported Data:', exportData);
  }
}
