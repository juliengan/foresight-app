import { Component, OnInit } from '@angular/core';
import { BoardService } from './board.service';
import { Router, NavigationExtras } from '@angular/router';
import { TestComponent } from '../test/test.component';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  public data: any;
  public tables: string[] = [];
  public selectedTable: string = '';
  public columns: string[] = [];
  public selectedColumns: string[] = [];
  testDialog!: TestComponent;

  constructor(
    private BoardService: BoardService,
    private router: Router,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private LoginService: LoginService
  ) {
    this.testDialog = new TestComponent(config, modalService);
  }

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

    console.log(this.LoginService.getLoggedIn());
  }

  openDialog(content: any): void {
    this.testDialog.open(content);
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

  onSubmit(content: any) {
    console.log(this.selectedColumns);
    let checkedColumns = this.getCheckedColumns();
    let new_table_train = '';
    let new_table_test = '';
    this.openDialog(content);
    this.BoardService.filter(this.selectedTable, checkedColumns).subscribe(
      (res: any) => {
        if (res.success) {
          new_table_train = res.new_table_train;
          new_table_test = res.new_table_test;
          this.BoardService.trainAndPredict(
            new_table_train,
            new_table_test
          ).subscribe(
            (res: any) => {
              if (res.success) {
                this.testDialog.close();
                let result = new_table_test + '_Result';
                this.router.navigate(['/predictions', result]);
              }
            },
            (error: any) => {
              console.error('Error : ', error);
            }
          );
        }
      },
      (error: any) => {
        console.error('Error : ', error);
      }
    );
  }

  getCheckedColumns(): string[] {
    let checkedColumns: string[] = [];

    for (let i = 0; i < this.selectedColumns.length; i++) {
      if (this.selectedColumns[i]) {
        checkedColumns.push(this.columns[i]);
      }
    }

    return checkedColumns;
  }
}
