import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { UtilitiesProvider } from '../../../providers/utilities/utilities'

import { FleetManagementService } from '../fleet-management/fleet-management.service';

@Component({
	selector: 'page-fleet-home',
	templateUrl: 'fleet-home.html',
})
export class FleetHomePage {

	title: string = 'Home';

	latitude: number = 13.0353193;
	longitude: number = 80.250078;

	options: Object[] = [{ a: 'Jose Tom' }, { a: 'Ashwin' }, { a: 'Prashanth' }];

	constructor(public navCtrl: NavController, public utils: UtilitiesProvider, private fleetManagementService: FleetManagementService) {

	}

	ionViewDidLoad() {
		this.fleetManagementService.loadData(false);
	}

}
