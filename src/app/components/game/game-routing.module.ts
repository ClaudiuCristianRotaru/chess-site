import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { RouterModule, Routes } from '@angular/router';

const gameRoutes: Routes = [
  {
    path: '',
    component: GameComponent,
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forChild(gameRoutes)
  ]
})
export class GameRoutingModule { }
