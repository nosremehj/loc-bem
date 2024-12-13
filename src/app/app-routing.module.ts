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
import { CreateLoginComponent } from './components/auth/create-login/create-login.component';
import { DetailsComponent } from './components/offers/details-offers/details/details.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'create',
    component: CreateLoginComponent,
  },
  {
    path: '',
    component: NavbarComponent,
    children: [
      { path: 'home', component: HomeComponent },
      {
        path: 'recovery',
        component: RecoveryPasswordComponent,
      },
      {
        path: 'myaccount',
        component: AccountComponent,
      },
      { path: 'offers', component: OffersComponent },
      {
        path: 'create-offer',
        component: CreateOfferComponent,
      },
      {
        path: 'offers/details/:id',
        component: DetailsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
