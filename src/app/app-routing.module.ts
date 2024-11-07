import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { RecoveryPasswordComponent } from './components/auth/recovery-password/recovery-password.component';
import { AccountComponent } from './components/account/account.component';
import { OffersComponent } from './components/offers/offers.component';
import { CreateOfferComponent } from './components/offers/create-offer/create-offer.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: NavbarComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
      {
        path: 'recovery',
        component: RecoveryPasswordComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'myaccount',
        component: AccountComponent,
        canActivate: [AuthGuard],
      },
      { path: 'offers', component: OffersComponent, canActivate: [AuthGuard] },
      {
        path: 'create-offer',
        component: CreateOfferComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
