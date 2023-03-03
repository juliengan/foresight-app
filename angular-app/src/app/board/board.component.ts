import { Component, OnInit } from '@angular/core';
import { BoardService } from './board.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  public data: any;
  public tables: string[] = [];
  public selectedTable: string = '';
  public columns: string[] = [];
  constructor(private BoardService: BoardService) {}

  ngOnInit() {
    document.body.classList.add('bg');
    this.BoardService.getData(this.selectedTable).subscribe(
      (data) => {
        this.data = data;
        this.columns = Object.keys(data[0]);
      },
      (error) => console.log(error)
    );
    this.BoardService.getTables().subscribe(
      (data) => {
        this.tables = data;
        console.log(data);
      },
      (error) => console.log(error)
    );
  }

  onChange(selectedTable: any) {
    console.log(selectedTable);
    this.selectedTable = selectedTable;
    this.BoardService.getData(this.selectedTable).subscribe(
      (data) => {
        this.data = data;
        this.columns = Object.keys(data[0]);
      },
      (error) => console.log(error)
    );
  }

  onSubmit() {
    this.BoardService.trainAndPredict(this.selectedTable).subscribe(
      (res: any) => {
        if (res.success) {
          console.log('incrr');
        }
      },
      (error: any) => {
        console.error('Error : ', error);
      }
    );
  }
}
