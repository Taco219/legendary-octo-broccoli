import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HttpModule} from "@angular/http";
import {AppComponent} from './app.component';
import {GameComponent} from './game/game.component';
import {ApiService} from './api.service'

// Define the routes
const ROUTES = [
    {
        path: '',
        redirectTo: 'posts',
        pathMatch: 'full'
    },
    {
        path: 'posts',
        component: GameComponent
    }
];

@NgModule({
    declarations: [
        AppComponent,
        GameComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(ROUTES)
    ],
    providers: [ApiService],
    bootstrap: [AppComponent]
})
export class AppModule { }
