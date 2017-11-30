import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { Beecon } from './app.component';
import { HomePageModule } from '../pages/home/home.module';
import { ComponentsModule } from '../components/components.module';

@NgModule({
	declarations: [
		Beecon
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		IonicModule.forRoot(Beecon),
		HomePageModule,
		ComponentsModule
	],
	bootstrap: [IonicApp],
	entryComponents: [
		Beecon
	],
	providers: [
		StatusBar,
		SplashScreen,
		{ provide: ErrorHandler, useClass: IonicErrorHandler },
		HttpClient
	]
})
export class AppModule { }
