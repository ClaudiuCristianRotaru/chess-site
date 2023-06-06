import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { JwtService } from 'src/app/services/jwt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  errorMessage: String = null;
  loginForm: FormGroup;
  loginInProgress: boolean= false;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  onSubmit(): void {
    this.errorMessage = null;
    if(!this.loginForm.valid) return;
    this.loginInProgress = true;
    this.userService.loginUser(this.loginForm.value.username, this.loginForm.value.password).subscribe((response) => {
      console.log(response);
      this.loginInProgress = false;
      this.router.navigate(['/home']);
      
    }, (err) => {
      this.loginInProgress = false;
      this.errorMessage = err.message[0];
      console.log(err);
    });
  }

}
