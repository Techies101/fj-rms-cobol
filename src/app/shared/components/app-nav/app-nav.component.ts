import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Module } from '../../../core/models/module.models';

@Component({
  selector: 'app-app-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app-nav.component.html',
  styleUrl: './app-nav.component.scss'
})
export class AppNavComponent {
  @Input() menus!: any;
  @Input() menuSelectedIndex: number = 0;
  @Input() feature!: keyof typeof Module;

  constructor(private router: Router, private route: ActivatedRoute){}

  ngOnInit():void{ 
    this.route.params.subscribe((param: Params) => {
      if(!param['page']){
        this.route.fragment.subscribe((fragment: any) => {
          this.menuSelectedIndex = this.menus.findIndex((x:any) => x.name === fragment);
          console.log(this.menuSelectedIndex);
        })
      }
    });
  }

  onClickOption(options: string, url: string){
    if(options != ""){
      this.router.navigate([url]);
    }
  }
}
