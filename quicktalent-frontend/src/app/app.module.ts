// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module'; // routing principal

import { AppComponent } from './app.component';
import { TokenInterceptor } from './core/interceptors/token.interceptor';

// Importez ici vos modules « features » (auth / candidat / recruteur)
import { AuthModule } from './features/auth/auth.module';
import { CandidatModule } from './features/auth/candidat/candidat.module';
import { RecruteurModule } from './features/recruteur/recruteur.module';

@NgModule({
  declarations: [

    // (éventuellement d’autres composants « globaux » : NavbarComponent, FooterComponent, etc.)
  ],
  imports: [
    AppComponent,
    BrowserModule,
    BrowserAnimationsModule,    // requis par ngx-toastr
    HttpClientModule,           // pour HttpClient (AuthService, etc.)
    FormsModule,                // pour ngModel et formulaires template-driven
    ReactiveFormsModule,        // si vous utilisez ReactiveForms dans certains composants
    ToastrModule.forRoot({      // configuration de ngx-toastr
      positionClass: 'toast-top-right',
      preventDuplicates: true
    }),

    // ** Modules de fonctionnalités **
    AuthModule,
    CandidatModule,
    RecruteurModule,

    // ** Enfin le routing principal (qui peut lazy-loader les modules ci-dessus) **
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
