import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { UtilitiesProvider } from '../../../providers/utilities/utilities';
import { LoggerProvider } from '../../../providers/logger/logger';

import { FleetManagementService } from '../fleet-management/fleet-management.service';

@Component({
	selector: 'page-fleet-home',
	templateUrl: 'fleet-home.html',
})
export class FleetHomePage {

	title: string = 'Home';

	options: any = {
		streetViewControl: true,
		mapTypeControl: true,
		fullscreenControl: true
	};

	data: any = this.fleetManagementService.data;

	onDataChange: Function = (items) => {
		let retItems = items.filter(function(vehicle) {
			if (vehicle && vehicle.telematicData && vehicle.telematicData.gps && vehicle.telematicData.gps.location && (vehicle.telematicData.gps.location.lat > 0 || vehicle.telematicData.gps.location.long > 0)) {
				return true;
			} else {
				return false;
			}
		}).map(function(vehicle) {
			return {
				latitude: vehicle.telematicData.gps.location.lat,
				longitude: vehicle.telematicData.gps.location.long,
				vehicle: vehicle
			};
		})
		return retItems;
	}

	constructor(public navCtrl: NavController, public utils: UtilitiesProvider, private fleetManagementService: FleetManagementService, private LOGGER: LoggerProvider) {

	}

	ionViewDidLoad() {
		this.fleetManagementService.loadData(false);
	}

}
