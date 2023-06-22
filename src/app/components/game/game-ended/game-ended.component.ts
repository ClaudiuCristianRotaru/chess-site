import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-ended',
  templateUrl: './game-ended.component.html',
  styleUrls: ['./game-ended.component.scss']
})
export class GameEndedComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {gameId: string, status:any},
  private router:Router,
  private dialogRef: MatDialogRef<GameEndedComponent>) {  }

  ngOnInit(): void {
    console.log(this.data.gameId);
  }

  navigateToAnalysis() {
    this.router.navigate(["/analysis", this.data.gameId]);
    this.dialogRef.close();
  }

  navigateToHomepage() {
    this.router.navigate(["/home"]);
    this.dialogRef.close();
  }

  navigateToMatchmaking() {
    this.router.navigate(["/matchmaking"]);
    this.dialogRef.close();
  }
}
