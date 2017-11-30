import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { RootPage } from './root';
import { HomePageModule } from '../home/home.module';

@NgModule({
	declarations: [
		RootPage,
	],
	imports: [
		IonicPageModule.forChild(RootPage),
		HomePageModule
	],
})
export class RootPageModule { }
