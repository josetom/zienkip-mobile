import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { LoggerProvider, UtilitiesProvider, StaticDataProvider } from '../../providers/providers';

import { LoginPage } from './login';

@NgModule({
	declarations: [
		LoginPage,
	],
	imports: [
		IonicPageModule.forChild(LoginPage),
		IonicStorageModule.forRoot()
	],
	providers: [
		// app
		LoggerProvider,
		UtilitiesProvider,
		StaticDataProvider
	]
})
export class LoginPageModule { }
