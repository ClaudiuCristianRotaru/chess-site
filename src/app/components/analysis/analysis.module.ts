import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalysisComponent } from './analysis.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [AnalysisComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class AnalysisModule { }
