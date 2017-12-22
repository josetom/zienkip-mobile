import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { StaticDataProvider } from '../../providers/static-data/static-data';

import { FleetHomePage } from '../fleet/fleet-home/fleet-home';
import { FleetManagementPage } from '../fleet/fleet-management/fleet-management';

@IonicPage()
@Component({
	selector: 'page-root',
	templateUrl: 'root.html',
})
export class RootPage {

	rootPage: any = FleetHomePage;

	pages: Array<{ title: string, component: any }> = [{ title: "Home", component: FleetHomePage }, { title: "Fleet Management", component: FleetManagementPage }];

	openPage: Function = function(page: any) {
		this.navCtrl.push(page.component, {
			item: page
		});
	};

	constructor(public navCtrl: NavController, public navParams: NavParams, private staticData: StaticDataProvider) {

	}

}
