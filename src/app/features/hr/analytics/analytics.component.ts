import { Component, OnInit } from '@angular/core';
import { SubHeaderComponent } from '../../../shared/components/sub-header/sub-header.component';
import { AppNavComponent } from '../../../shared/components/app-nav/app-nav.component';
import { ChartComponent } from '../../../shared/components/chart/chart.component';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Module } from '../../../core/models/module.models';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [SubHeaderComponent, AppNavComponent, ChartComponent],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss'
})
export class AnalyticsComponent implements OnInit {
  menus!: any;
  menuSelectedIndex: number = 3;
  feature!: keyof typeof Module;
  pageTitle: string = 'Analytics';

  constructor(private route:ActivatedRoute, private router: Router){ }

  ngOnInit():void{
    this.route.params.subscribe((param: Params) => {
      this.feature = param['feature'] as keyof typeof Module; // Ensure feature is a valid key
      this.menus = Module[this.feature].menus // call the menus under admin
      this.menuSelectedIndex = this.menus.findIndex((x:any) => x.applications.includes(this.pageTitle));
      console.log(this.menuSelectedIndex);
    })
  }

  getMenu(menuSelectedIndex: number){
    this.menuSelectedIndex = menuSelectedIndex; // gets the index of the menu being selected
  }

}
