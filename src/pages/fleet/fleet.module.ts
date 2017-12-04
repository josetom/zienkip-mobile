import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ComponentsModule } from '../../components/components.module';
import { UtilitiesProvider } from '../../providers/utilities/utilities'

import { FleetHomePage } from './fleet-home/fleet-home';
import { FleetManagementPage } from './fleet-management/fleet-management';

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
		UtilitiesProvider
	]
})
export class FleetPageModule { }
