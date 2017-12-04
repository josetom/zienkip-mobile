import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { LoggerProvider } from '../../providers/logger/logger';
import { UtilitiesProvider } from '../../providers/utilities/utilities';
import { StaticDataProvider } from '../../providers/static-data/static-data';

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
		LoggerProvider,
		StaticDataProvider
	]
})
export class LoginPageModule { }
