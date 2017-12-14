import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { LoggerProvider, UtilitiesProvider, StaticDataProvider } from '../../providers/providers';

import { ComponentsModule } from '../../components/components.module';

import { FleetHomePage } from './fleet-home/fleet-home';
import { FleetManagementPage } from './fleet-management/fleet-management';
import { FleetManagementService } from './fleet-management/fleet-management.service';

@NgModule({
	declarations: [
		FleetHomePage,
		FleetManagementPage
	],
	imports: [
		IonicPageModule.forChild(FleetHomePage),
		IonicPageModule.forChild(FleetManagementPage),
		ComponentsModule
	],
	providers: [
		// providers
		LoggerProvider,
		UtilitiesProvider,
		StaticDataProvider,
		// services
		FleetManagementService
	]
})
export class FleetPageModule { }
