import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  errorMessage: String = null;
  registerForm: FormGroup;
  registerInProgress: boolean = false;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(30)]),
      rating: new FormControl(null, Validators.required)
    });
  }

  onSubmit(): void {
    this.errorMessage = null;
    if (!this.registerForm.valid) return;
    this.registerInProgress = true;
    this.userService.registerUser(
      this.registerForm.value.username,
      this.registerForm.value.email,
      this.registerForm.value.password,
      this.registerForm.value.rating).pipe(take(1)).subscribe({
        next: (response) => {
          this.registerInProgress = false;
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.errorMessage = err.error.message[0];
          console.error(err);
          this.registerInProgress = false;
        }
      })
  }
}
