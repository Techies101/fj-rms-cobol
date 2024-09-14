import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { UserLogin } from '../../../core/models/table-data.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  user!: UserLogin | null;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {
    this.user = this.authService.getItem('user');
  }
  

  ngOnInit():void{
    
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login'])
  }

  toggleSideNav() {
    const sideNav = document.getElementById('side-nav');
    if (sideNav) {
      sideNav.classList.toggle('open');
    }
  }

  redirectToLanding(){
    var feature: string = "";
    this.route.params.subscribe((param: Params) => {
      feature = param['feature'];
      console.log(param);
    });
  }
}
