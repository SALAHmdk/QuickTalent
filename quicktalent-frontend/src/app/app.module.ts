// -------------------------------------------
// src/app/app.module.ts
// -------------------------------------------

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Nécessaires pour faire des requêtes HTTP vers votre backend Spring Boot
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

// Nécessaires pour les formulaires (template‐driven et reactive)
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Nécessaire pour les animations (ngx-toastr en dépend)
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// ngx-toastr pour les notifications toast
import { ToastrModule } from 'ngx-toastr';

// Votre routing principal (qui va lazy‐loader les modules “auth”, “candidat”, “recruteur”, etc.)
import { AppRoutingModule } from './app-routing.module';

// Composant racine
import { AppComponent } from './app.component';

// Intercepteur JWT (si vous en avez un pour transmettre automatiquement le token)
import { TokenInterceptor } from './core/interceptors/token.interceptor';

// Modules “features” de votre application :
import { AuthModule } from './features/auth/auth.module';
import { CandidatModule } from './features/auth/candidat/candidat.module';
import { RecruteurModule } from './features/recruteur/recruteur.module';

@NgModule({
  declarations: [

    // … vous pouvez ajouter ici d’autres composants “globaux” (navbar, footer, etc.)
  ],
  imports: [
    AppComponent,
    BrowserModule,
    BrowserAnimationsModule,  // requis par ngx-toastr
    HttpClientModule,         // requis pour HttpClient (AuthService, etc.)
    FormsModule,              // pour ngModel et formulaires template-driven
    ReactiveFormsModule,      // si vous utilisez des reactive forms
    ToastrModule.forRoot({    // configuration de ngx-toastr
      positionClass: 'toast-top-right',
      preventDuplicates: true
    }),

    // ** Modules de fonctionnalité **
    // Ils peuvent être “lazy‐loaded” via AppRoutingModule ou importés directement ici
    AuthModule,
    CandidatModule,
    RecruteurModule,

    // Routing principal (doit apparaître **APRES** l’import des modules de fonctionnalité si vous
    // faites un import direct, ou bien, si vous souhaitez lazy‐loader, AppRoutingModule suffit)
    AppRoutingModule
  ],
  providers: [
    // Si vous avez un intercepteur pour ajouter automatiquement le header “Authorization: Bearer …”
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class AppModule { }
