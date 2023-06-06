import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserData } from 'src/app/models/user-data';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {
  user?: UserData | null;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.currentUser.subscribe(x => this.user = x);
    console.log(this.user);
  }

  logout(): void {
    this.userService.logoutUser();
    this.router.navigate(['/login']);
  }
}
