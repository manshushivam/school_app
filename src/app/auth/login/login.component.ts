import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']  // 👈 'styleUrls' not 'styleUrl'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;  // 👈 declare here
  schools = [
    { code: 'DELHI001', name: 'Delhi Public School' },
    { code: 'BANG002', name: 'Bangalore International School' },
    { code: 'MUM003', name: 'Mumbai High School' },
  ];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      schoolCode: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    if (this.loginForm.invalid) return;

    const { email, password, schoolCode } = this.loginForm.value;

    this.authService.login({ email, password, schoolCode }).subscribe({
      next: (res: any) => {
        this.authService.storeToken(res.token);
        const role = this.authService.getUserRole();
        this.router.navigate([`/${role.toLowerCase()}/dashboard`]);
      },
      error: () => {
        alert('Login failed. Please check your credentials and school.');
      }
    });
  }
}
