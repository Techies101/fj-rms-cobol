import { Component, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Module } from '../../core/models/module.models';
import { CommonModule } from '@angular/common';
import { SubHeaderComponent } from '../../shared/components/sub-header/sub-header.component';
import { AppNavComponent } from '../../shared/components/app-nav/app-nav.component';

@Component({
  selector: 'app-manager',
  standalone: true,
  imports: [CommonModule, SubHeaderComponent, AppNavComponent],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.scss'
})
export class ManagerComponent {
  @Input() menus!: any;
  @Input() menuSelectedIndex: number = 0;
  @Input() feature!: keyof typeof Module;

  constructor(private route: ActivatedRoute, private router: Router){ }

  ngOnInit():void{
    this.menus = Module.manager.menus // call the menus under admin
    this.feature = "manager" as keyof typeof Module;
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
