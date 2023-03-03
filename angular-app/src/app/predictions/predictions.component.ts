import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PredictionsService } from './predictions.service';
import { ChartOptions } from 'chart.js';
import { ActivatedRoute, Params } from '@angular/router';
import {Chart} from 'chart.js/auto';

@Component({
  selector: 'app-predictions',
  templateUrl: './predictions.component.html',
  styleUrls: ['./predictions.component.css'],
})
export class PredictionsComponent implements OnInit {
  public lossData: any;
  public label: any;
  chart: any;
  table_name: string = '';
  @ViewChild('myChart') myChart!: ElementRef<HTMLCanvasElement>;

  constructor(
    private predictionsServices: PredictionsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    document.body.classList.add('bg');
    this.route.params.subscribe(
      (params: Params) => (this.table_name = params['table_name'])
    );
    this.predictionsServices
      .getData(this.table_name)
      .subscribe((res: any) => {
        console.log(res);
        this.label = res.map((d: any) => d.Anomaly);
        this.lossData = res.map((d: any) => d.Loss);
        const threshold = 0.075;

        const timestamps = [];
        const startDate = new Date();
        const endDate = new Date();
        endDate.setDate(startDate.getDate() + 50); // Set end date to 10 days from now
        for (
          let date = startDate;
          date <= endDate;
          date.setDate(date.getDate() + 1)
        ) {
          const timestamp = date.toLocaleDateString();
          timestamps.push(timestamp);
        }
        console.log(timestamps);
        this.chart = new Chart('canvas', {
          type: 'line',
          data: {
            labels: timestamps,
            datasets: [
              {
                label: 'Machine',
                data: this.lossData,
                fill: false,
                borderColor: 'blue',
                borderWidth: 2,
              },
              {
                label: 'Threshold',
                data: Array(this.lossData.length).fill(threshold),
                fill: false,
                borderColor: 'red',
                borderWidth: 2,
                borderDash: [5, 5],
              },
            ],
          },
        });
      });
  }
}
