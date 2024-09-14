import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SubHeaderComponent } from '../../shared/components/sub-header/sub-header.component';
import { AdminComponent } from '../admin/admin.component';
import { Module } from '../../core/models/module.models';
import { AppNavComponent } from '../../shared/components/app-nav/app-nav.component';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-trainer',
  standalone: true,
  imports: [CommonModule, SubHeaderComponent, AppNavComponent, AdminComponent],
  templateUrl: './trainer.component.html',
  styleUrl: './trainer.component.scss'
})
export class TrainerComponent {
  menus!: any;
  menuSelectedIndex: number = 0;
  feature!: keyof typeof Module;

  constructor(private route: ActivatedRoute, private router: Router){ }

  ngOnInit():void{
    this.menus = Module.trainer.menus // call the menus under trainer
    this.feature = "trainer";
    this.route.params.subscribe((param: Params) => {
      if(!param['page']){
        this.route.fragment.subscribe((fragment: any) => {
          if(!fragment){
            this.router.navigate([this.feature], {fragment: 'Me'});
          }
          this.menuSelectedIndex = this.menus.findIndex((x:any) => x.name === fragment);
        })
      }
    });
  }

  getMenu(menuSelectedIndex: number){
    this.menuSelectedIndex = menuSelectedIndex; // gets the index of the menu being selected
  }
}
