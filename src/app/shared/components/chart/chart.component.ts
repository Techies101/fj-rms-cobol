import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { AnalyticsService } from '../../../core/services/analytics.service';
import { StatusCount } from '../../../core/models/analytics.models';
import ChartDataLabels from 'chartjs-plugin-datalabels';
Chart.register(...registerables)

@Component({
  selector: 'app-chart',
  standalone: true,
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent implements OnInit {

  statusData: StatusCount | undefined;
  statusLabels: string[] = ['Bench', 'Management', 'In Project (Internal)', 'In Project (Billable)'];
  statusCounts: number[] = [];
  totalValues: number = 0;


  constructor(private service: AnalyticsService) {}
  
  ngOnInit(): void {
      this.loadStatusData();
  }

  loadStatusData() {
    this.service.getEmployeeStatusCounts().subscribe( data => {
      this.statusData = data;
      this.statusCounts = Object.values(data);
      this.totalValues = this.statusCounts.reduce((sum, value) => sum + value, 0);
      this.RenderChart(this.statusCounts, this.totalValues);
    })
  }

  RenderChart(statusCounts: number[], totalValues: number) {
    const myChart = new Chart("barchart", {
      type: "bar",
      data: {
        labels: this.statusLabels,
        datasets: [{
          label: "Employees Count",
          data: statusCounts,
          backgroundColor: [
            '#F7FC04',
            '#FC2C09',
            '#94B06F',
            '#A31015'
          ],
          barThickness: 80,
        }]
      },
      options: {
        plugins: {
          legend: {
            display: false 
          },
          tooltip: {
            callbacks: {
              label: function(context: any) {
                const label = context.dataset.label || '';
                const value = context.raw as number;
                const percentage = ((value / totalValues) * 100).toFixed(2);
                return `${label}: ${value}`;
              }
            }
          },
          datalabels: {
            display: true,
            formatter: (value: any) => {
                const percentage = ((value / totalValues) * 100).toFixed(2);
                return `${percentage}%`; // Display percentage
            },
            color: 'white',
        },
          title: {
            display: true,
            text: 'Employees Status Graph',
            font: {
              size: 24 
            }
          },
        },
        scales: {
          x: {
            ticks: {
                font: {
                    size: 14, // Change this to the desired font size
                    weight: 'bold'
                },
            }
        },
        }
      },
      plugins: [ChartDataLabels] 
    })
   
  }

}
