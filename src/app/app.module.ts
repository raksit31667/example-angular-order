import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AngularFireModule} from "@angular/fire";
import {AngularFireMessagingModule} from "@angular/fire/messaging";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {LanguageSelectComponent} from "./i18n/language-select/language-select.component";
import {AppConfigurationProvider} from "./app.config.service";

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export function AppConfigurationProviderFactory(appConfigurationProvider: AppConfigurationProvider) {
  return () => appConfigurationProvider.load();
}

@NgModule({
  declarations: [
    AppComponent,
    LanguageSelectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp({
      apiKey: '<your-key>',
      authDomain: '<your-project-authdomain>',
      databaseURL: '<your-database-URL>',
      projectId: '<your-project-id>',
      storageBucket: '<your-storage-bucket>',
      messagingSenderId: '<your-messaging-sender-id>',
      appId: '<your-app-id>'
    }),
    AngularFireMessagingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: AppConfigurationProviderFactory,
      deps: [ AppConfigurationProvider ],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
