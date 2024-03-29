import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { RootPage } from './root';
import { FleetPageModule } from '../fleet/fleet.module';

import { LoggerProvider, UtilitiesProvider, StaticDataProvider } from '../../providers/providers';

@NgModule({
	declarations: [
		RootPage,
	],
	imports: [
		IonicPageModule.forChild(RootPage),
		FleetPageModule
	],
	providers: [
		LoggerProvider,
		UtilitiesProvider,
		StaticDataProvider
	]
})
export class RootPageModule { }
