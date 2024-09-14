import { Component, EventEmitter, input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { TableService } from '../../../core/services/table.service';
import { Trainees, Trainer } from '../../../core/models/table-data.model';
import { CreateProcessService } from '../../../core/services/create-process.service';
import { MatIconModule } from '@angular/material/icon';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-training',
  standalone: true,
  templateUrl: './add-training.component.html',
  styleUrls: ['./add-training.component.scss'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatIconModule]
})
export class AddTrainingComponent implements OnInit {
  
  trainingForm!: FormGroup;
  searchForm!: FormGroup;
  trainers: Trainer[] = [];  
  trainees: Trainees[] = [];
  daysBetween: number | null = null;
  isListVisible = false;
  searchQuery: string = '';
  selectedTrainees: Trainees[] = [];
  tempSelectedTrainees: Trainees[] = [];

  @Output() closeMe = new EventEmitter<boolean>();
  @Output() getTableData = new EventEmitter<void>();
  @Output() closeForm = new EventEmitter<void>();
  traineeMSG: string = "No trainees selected";

  constructor(private authService: AuthService, 
              private fb: FormBuilder,
              private tableService: TableService,
              private createProcessService: CreateProcessService) {
    
    // Add Trainee Form Group
    this.searchForm = this.fb.group({
      searchQuery: ['']
    })

    // Add Training Form Group
    this.trainingForm = this.fb.group({
      CreatedByUserId: this.authService.getItem('user')?.UserAccountId,
      IsActive: true,
      TrainingDescription: '',
      TrainingDurationInDays: [{value: this.daysBetween, disabled: true}],
      TrainingStartDate: null,
      TrainingEndDate: null,
      TrainingName: '',
      TrainingCode: '',
      Trainees: { ...this.tempSelectedTrainees },
      TrainerId: '',
      search: this.fb.group({
        searchQuery: ['']
      })
    }), 
    
    // Filtered trainer
    this.getFilteredTrainers()

  }

  ngOnInit(): void {

    // Subscribe to value changes for both date controls
    this.trainingForm.get('TrainingStartDate')?.valueChanges.subscribe(() => this.calculateDays());
    this.trainingForm.get('TrainingEndDate')?.valueChanges.subscribe(() => this.calculateDays());

    // subscribe to search form value changes
    this.trainingForm.get('search.searchQuery')?.valueChanges.subscribe(value => {
      console.log(value)
      this.performSearch(value);
      this.searchQuery = value;
    });
    
  }


  onSubmit() {
    

    // Get raw form values 
    const formData = this.prepareFormData(this.trainingForm.getRawValue());
    delete formData.search;

    console.log(formData)
    console.log(this.trainingForm.valid)

    if (this.trainingForm.valid) {

      let newTraining: any = {...formData}

      console.log(newTraining)

      this.createProcessService.createTraining(newTraining)
      .subscribe({
        next: (res) => {
          console.log(res)
        },
        error: (err) => {
          console.log(err.error)
        },
        complete: () => {
          this.trainingForm.reset();
          this.getTableData.emit();
          this.closeModal()
        }
      });
      

    }
  }
  

  handleAddTrainees(trainee: Trainees):void{
    console.log(trainee);
    this.addTrainees(trainee);
  }

  // Method to confirm saving the form data
  confirmSave() {
    Swal.fire({
      title: 'Confirm Save',
      text: 'Do you want to save the training data?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, save it!',
      cancelButtonText: 'No, cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Saved!', 'Your data has been saved.', 'success');
        this.trainingForm.reset();
        this.getTableData.emit();
        this.closeModal();
      }
    });
  }


  // Method to add a trainee to the selected list
  addTrainees(newTrainee: Trainees): void{

        // Check if there's already a trainee with the same personId
        const isDuplicate = this.tempSelectedTrainees.some(trainee => trainee.PersonId === newTrainee.PersonId);

        if (isDuplicate) {
          // Show error alert for duplicate
            Swal.fire({
              icon: 'error',
              title: 'Duplicate Found',
              text: 'This trainee is already in the list!',
              confirmButtonText: 'Okay',
              backdrop: true, // Optional: dark background
            });
        } else {
            // Add new trainee to the array
            newTrainee.TraineeActivitiesLink = "https://sf.dataon.com/sf6/index.cfm?refresh=%7Bts%20%272024%2D09%2D12%2007%3A23%3A45%27%7D##";
            this.tempSelectedTrainees.push(newTrainee);

            console.log(this.tempSelectedTrainees)
            
            console.log(newTrainee);

            this.trainingForm.get('Trainees')?.setValue(this.tempSelectedTrainees);
            
              // Show success alert
            Swal.fire({
              icon: 'success',
              title: 'Trainee Added',
              text: 'The trainee has been successfully added to the list.',
              confirmButtonText: 'Great',
              backdrop: true, // Optional: dark background
            });


            console.log(newTrainee)
           
        }
}

   // Close the modal
  closeModal() {
    this.closeForm.emit();
  }

  handleDelete(personId: any) {
    this.tempSelectedTrainees = this.trainees.filter(trainee => trainee.PersonId !== personId);
  }

  getFilteredTrainers() {
    this.tableService.getTrainer().subscribe((data:Trainer[]) => {
      this.trainers = data;
    })
  }
  
  stopPropagation(event: Event) {
    event.stopPropagation(); // Prevent event bubbling to parent
  }

  // Method to calculate days between the selected dates
  private calculateDays(): void {
    const startDate = this.trainingForm.get('TrainingStartDate')?.value;
    const endDate = this.trainingForm.get('TrainingEndDate')?.value;

    if (startDate && endDate) {
      const inputDuration = this.trainingForm.get('TrainingDurationInDays');
      this.daysBetween = this.calculateDaysBetweenDates(new Date(startDate), new Date(endDate));
      inputDuration?.setValue(`${this.daysBetween} Day's`) 
    } else {
      this.daysBetween = null; // Reset or handle case when dates are not both provided
    }
  }

  private calculateDaysBetweenDates(startDate: Date, endDate: Date): number {
    // Calculate the difference in milliseconds
    const differenceInMilliseconds = endDate.getTime() - startDate.getTime();
    
    // Convert milliseconds to days
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    return Math.floor(differenceInMilliseconds / millisecondsPerDay);
  }

  private prepareFormData(data: any): any {
    // Remove 'Days' string from the duration field value
    console.log(data);
    if (data.TrainingDurationInDays) {
      data.TrainingDurationInDays = data.TrainingDurationInDays.replace(/Day's/g, '').trim(); // Remove 'Days' and trim whitespace
    }
    return data;
  }

  performSearch(query: string): void {

    if (query) {
      
    
       // Fetch data from the API
      this.tableService.getTrainees().subscribe({
        next: (peoples: Trainees[]) => {

          // Apply filtering based on the search query
          this.trainees = peoples.filter((trainee: Trainees) => {
            // Condition firstName & lastName
            const nameMatches = trainee.TraineeFullname?.toLowerCase().includes(query.toLowerCase()) || false;
            return nameMatches;
          });

          console.log(peoples);
        },
        error: (err) => {
          console.error('Error fetching people:', err); // Handle error
        }
      });
    }

  }
  
//   mapPeopleToTrainees(people: People[]): any[] {
//     return people.map(person => ({
//         TrainingTransactId: 1, 
//         TrainingId: 1,  
//         PersonId: person.PersonId,
//         ZinzaiId: person.ZinzaiId, 
//         TraineeFullname: person.fullName,
//         Position: person.Position,
//         Skills: person.EmployeeSkills, 
//         GradingInPercentage: 90,
//         TraineeActivitiesLink: "www.example.com/activity"
//     }));
// }

  // Toggle the visibility of the trainee list
  toggleListVisibility() {
    this.isListVisible = !this.isListVisible;
    this.tableService.getTrainees().subscribe({
      next: ((data:Trainees[]) => {
        this.trainees = data;
        console.log(data)
      }),
      error: ((error: any) => {
        this.traineeMSG = error.error.text
      })
    })
  }

}
