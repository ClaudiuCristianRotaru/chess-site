import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchmakingComponent } from './matchmaking.component';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [MatchmakingComponent],
  imports: [
    CommonModule,
    MatButtonModule,
  ]
})
export class MatchmakingModule { }
