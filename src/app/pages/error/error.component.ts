import { Component } from '@angular/core';
import { SharedService } from '../../shared/shared.services';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss'
})
export class NotFoundComponent {
  constructor(public sharedService: SharedService) {}
}
