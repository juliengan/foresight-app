import { Component, OnInit, ViewChild } from '@angular/core';
import { TestComponent } from '../test/test.component';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UploadService } from './upload.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {
  testDialog!: TestComponent;

  openDialog(content: any): void {
    this.testDialog.open(content);
  }

  files: any[] = [];

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private UploadService: UploadService,
    private router: Router
  ) {
    this.testDialog = new TestComponent(config, modalService);
  }

  ngOnInit() {
    document.body.classList.add('bg');
  }

  /**
   * on file drop handler
   */
  onFileDropped($event: any, content: any) {
    this.prepareFilesList($event, content);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler($event: any, content: any) {
    this.prepareFilesList($event.target.files[0], content);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    this.files.splice(index, 1);
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number, content: any) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1, content);
            this.openDialog(content);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: any, content: any) {
    var array: Array<any> = [];
    array.push(files);
    console.log(files);
    for (const item of array) {
      item.progress = 0;
      this.files.push(item);
    }
    this.uploadFilesSimulator(0, content);
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes: any, decimals: any) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  uploadFile() {
    this.UploadService.upload(this.files[0]).subscribe(
      (res: any) => {
        if (res.success) {
          this.onClickNo();
          this.router.navigate(['/board']);
        }
      },
      (error: any) => {
        console.error('Error uploading file: ', error);
      }
    );
  }

  onClickNo() {
    this.testDialog.close();
  }
}
