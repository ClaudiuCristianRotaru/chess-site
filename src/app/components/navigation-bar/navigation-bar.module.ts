import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationBarComponent } from './navigation-bar.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [NavigationBarComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule
  ],
  exports: [
    NavigationBarComponent
  ]
})
export class NavigationBarModule { }
