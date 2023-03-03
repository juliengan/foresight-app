import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
import { UploadComponent } from './upload/upload.component';
import { BoardComponent } from './board/board.component';
import { TestComponent } from './test/test.component';

import { AuthGuard } from './auth.guard';
import { PredictionsComponent } from './predictions/predictions.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'upload', component: UploadComponent },
  { path: 'board', component: BoardComponent },
  { path: 'test', component: TestComponent },
  { path: 'predictions/:table_name', component: PredictionsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
