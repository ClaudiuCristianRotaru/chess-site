import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { GameComponent } from './game.component';
import { DisableRightClickDirective } from 'src/app/disable-right-click.directive';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    GameComponent,
    DisableRightClickDirective
  ],
  imports: [
    CommonModule,
    DragDropModule,
    FormsModule,
    HttpClientModule,
    MatInputModule,
    RouterModule,
    MatDialogModule
  ]
})
export class GameModule { }
