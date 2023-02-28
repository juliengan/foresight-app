import { Component, OnInit } from '@angular/core';
import { BoardService } from './board.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  constructor(private BoardService: BoardService) {}

  ngOnInit() {
    document.body.classList.add('bg');
  }

  onSubmit() {
    this.BoardService.predict().subscribe((res: any) => {
      console.log(res);
    });
  }
}
