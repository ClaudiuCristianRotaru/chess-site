import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    MatPaginatorModule,
    RouterModule,
  ]
})
export class ProfileModule { }
