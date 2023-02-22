import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MatDialog,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm',
  templateUrl: 'popup.component.html',
})
export class PopupComponent {
  constructor(
    public dialogRef: MatDialogRef<PopupComponent>,
    public dataDialogHandler: MatDialog
  ) {}
  onClose(response: boolean) {
    this.dialogRef.close(response);
  }
}
