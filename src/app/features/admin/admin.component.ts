import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { SubHeaderComponent } from "../../shared/components/sub-header/sub-header.component";
import { Module } from '../../core/models/module.models';
import { AppNavComponent } from "../../shared/components/app-nav/app-nav.component";
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, SubHeaderComponent, AppNavComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit{
  @Input() menus!: any;
  @Input() menuSelectedIndex: number = 0;
  @Input() feature!: keyof typeof Module;

  constructor(private route: ActivatedRoute, private router: Router){ }

  ngOnInit():void{
    this.menus = Module.admin.menus // call the menus under admin
    this.feature = "admin" as keyof typeof Module;
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