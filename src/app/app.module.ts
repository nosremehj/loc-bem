import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RecoveryPasswordComponent } from './components/auth/recovery-password/recovery-password.component';
import { AccountComponent } from './components/account/account.component';
import { OffersComponent } from './components/offers/offers.component';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CreateOfferComponent } from './components/offers/create-offer/create-offer.component';
import { HttpClientModule } from '@angular/common/http';
import { CreateLoginComponent } from './components/auth/create-login/create-login.component';
import { ChatBotComponent } from './components/chat-bot/chat-bot/chat-bot.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DetailsComponent } from './components/offers/details-offers/details/details.component';
import { CarouselModule } from './components/shared/carousel/carousel.module';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    HomeComponent,
    RecoveryPasswordComponent,
    AccountComponent,
    OffersComponent,
    CreateOfferComponent,
    CreateLoginComponent,
    ChatBotComponent,
    DetailsComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule,
    MatFormFieldModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      closeButton: true,
      progressBar: true,
    }),
    NgxSpinnerModule,
    CarouselModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
