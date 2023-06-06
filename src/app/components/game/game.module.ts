import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game.component';
import { DisableRightClickDirective } from 'src/app/disable-right-click.directive';
import { MatInputModule } from '@angular/material/input';



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
    GameRoutingModule,
    MatInputModule,
  ]
})
export class GameModule { }
