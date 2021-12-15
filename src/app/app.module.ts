import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import {
	MessageComponent,
	MessagesComponent,
	MessagesUserStatusComponent,
	UserListComponent,
	UsersListComponent,
	UserStatusComponent
} from './components';


@NgModule({
	declarations: [
		AppComponent,
		UsersListComponent,
		UserListComponent,
		UserStatusComponent,
		MessagesComponent,
		MessageComponent,
		MessagesUserStatusComponent,
	],
	imports: [
		CommonModule,
		BrowserModule,
		HttpClientModule,
		BrowserAnimationsModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
