import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {ApiService} from "sharedlibrary/api.service";
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HashService} from "sharedlibrary/hash.service";
import {HomeComponent} from './home/home.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
    ],
    providers: [
        HashService,
        ApiService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
