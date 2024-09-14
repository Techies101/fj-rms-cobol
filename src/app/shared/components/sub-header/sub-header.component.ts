import { NgClass, NgForOf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Module } from '../../../core/models/module.models';

@Component({
  selector: 'app-sub-header',
  standalone: true,
  imports: [ NgForOf, NgClass],
  templateUrl: './sub-header.component.html',
  styleUrl: './sub-header.component.scss'
})
export class SubHeaderComponent {
  @Input() menuIndex: number = 0;
  @Input() menus!: any;   // this will have the menus for the sub-header
                          // check admin.component as sample
  @Output() menuEvent = new EventEmitter<number>(); // this will send the selected menu index to the page
  @Input() feature!: keyof typeof Module;

  constructor(private router: Router, private route: ActivatedRoute){ }

  ngOnInit():void{
    if (!this.feature){
      this.route.params.subscribe((param: Params) => {
        this.feature = param['feature'] as keyof typeof Module; // Ensure feature is a valid key
      })
    }
    this.route.params.subscribe((param: Params) => {
      if(!param['page']){
        this.route.fragment.subscribe((fragment: any) => {
          if (fragment) {
            this.menuIndex = this.menus.findIndex((x:any) => x.name === fragment);
          }
        })
      }
    });
    console.log(this.menuIndex);
  }

  onClickMenu(menuIndex: number){
    this.menuIndex = menuIndex;
    document.getElementById("menu"+menuIndex)?.classList.add("selected");
    this.menuEvent.emit(menuIndex);
    this.router.navigate([this.feature], {fragment: Module[this.feature].menus[menuIndex].name});
  }
}
