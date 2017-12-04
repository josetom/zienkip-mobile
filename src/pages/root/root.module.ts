import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { RootPage } from './root';
import { FleetPageModule } from '../fleet/fleet.module';

@NgModule({
	declarations: [
		RootPage,
	],
	imports: [
		IonicPageModule.forChild(RootPage),
		FleetPageModule
	],
})
export class RootPageModule { }
