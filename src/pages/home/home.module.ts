import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ComponentsModule } from '../../components/components.module';
import { UtilitiesProvider } from '../../providers/utilities/utilities'
import { HomePage } from './home';

@NgModule({
	declarations: [
		HomePage,
	],
	imports: [
		ComponentsModule,
		IonicPageModule.forChild(HomePage),
	],
	providers: [
		UtilitiesProvider
	]
})
export class HomePageModule { }
