import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { UploadComponent } from './upload.component';
import { ProgressComponent } from '../progress/progress.component';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { TestComponent } from '../test/test.component';

@NgModule({
  imports: [BrowserModule, FormsModule, MatDialogModule, MatDialog],
  declarations: [UploadComponent, ProgressComponent, TestComponent],
  bootstrap: [UploadComponent],
})
export class UploadModule {}
