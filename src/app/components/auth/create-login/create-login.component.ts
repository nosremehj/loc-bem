import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { LoginService } from '../login/services/login.service';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';
@Component({
  selector: 'app-create-login',
  templateUrl: './create-login.component.html',
  styleUrls: ['./create-login.component.scss'],
})
export class CreateLoginComponent implements OnInit {
  hide: boolean = true;
  errorMessage = '';
  loginForm: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      personRegistration: ['', [Validators.required, Validators.minLength(11)]],
      cep: ['', [Validators.required, Validators.minLength(8)]],
      longitude: ['', [Validators.minLength(2)]],
      latitude: ['', [Validators.minLength(2)]],
    });
  }
  ngOnInit(): void {}

  createUser() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.userService.registerPerson(this.loginForm.value).subscribe(
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
