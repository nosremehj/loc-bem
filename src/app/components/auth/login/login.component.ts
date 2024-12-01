import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Credentials } from './models/Credentials';
import { LoginService } from './services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide: boolean = true;
  errorMessage = '';
  loginForm: FormGroup;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      cpf: ['', [Validators.required, Validators.minLength(11)]],
      cep: ['', [Validators.required, Validators.minLength(8)]],
      longitude: ['', [Validators.minLength(8)]],
      latitude: ['', [Validators.minLength(8)]],
    });
  }
  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.loginService.getUser().subscribe(
      (res) => {},
      (ex) => {
        console.error(ex);
      }
    );
  }

  login() {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value).subscribe(
        (success) => {
          if (success) {
            this.router.navigate(['/home']); // Redireciona para a página principal
          } else {
            this.errorMessage = 'Credenciais inválidas';
          }
        },
        (error) => {
          this.errorMessage = 'Erro ao fazer login';
        }
      );
    } else {
      this.errorMessage = 'Preencha todos os campos';
    }
  }

  validFields(): boolean {
    return this.loginForm.valid;
  }
}
