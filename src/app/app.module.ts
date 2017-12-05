import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule, HttpClient } from '@angular/common/http';

// App level components
import { Beecon } from './app.component';

// Pages
import { RootPageModule } from '../pages/root/root.module';
import { LoginPageModule } from '../pages/login/login.module';

// components
import { ComponentsModule } from '../components/components.module';

@NgModule({
	declarations: [
		Beecon
	],
	imports: [
		// Vendors
		BrowserModule,
		HttpClientModule,
		IonicModule.forRoot(Beecon),
		// App level imports
		LoginPageModule,
		RootPageModule,
		ComponentsModule
	],
	bootstrap: [IonicApp],
	entryComponents: [
		Beecon
	],
	providers: [
		// Vendors
		StatusBar,
		SplashScreen,
		{ provide: ErrorHandler, useClass: IonicErrorHandler },
		HttpClient
	]
})
export class AppModule { }
