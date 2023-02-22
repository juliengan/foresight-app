import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Injectable()
export class ModalPopupService {
  constructor(private dialog: MatDialog) {}

  openPopup<T>(component: any, data: any): MatDialogRef<any> {
    return this.dialog.open(component, {
      width: '550px',
      data: data,
      disableClose: true,
    });
  }

  closePopup(dialogRef: MatDialogRef<any>) {
    dialogRef.close('closed forcefully');
  }
}
