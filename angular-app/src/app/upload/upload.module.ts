import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DndDirective } from './dnd.directive';
import { UploadComponent } from './upload.component';
import { ProgressComponent } from '../progress/progress.component';
import {
  NoopAnimationsModule,
  BrowserAnimationsModule,
} from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { PopupComponent } from '../popup/popup.component';
import { ModalPopupService } from '../providers/modalPopup.service';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [
    UploadComponent,
    DndDirective,
    ProgressComponent,
    PopupComponent,
    NgIdleKeepaliveModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule,
  ],
  bootstrap: [UploadComponent],
  providers: [ModalPopupService],
  entryComponents: [PopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UploadModule {
    
}
