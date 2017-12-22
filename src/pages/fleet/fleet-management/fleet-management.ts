import { Component } from '@angular/core';

import { LoggerProvider } from '../../../providers/logger/logger';
import { UtilitiesProvider } from '../../../providers/utilities/utilities';

import { FleetManagementService } from './fleet-management.service';

@Component({
	selector: 'page-fleet-management',
	templateUrl: 'fleet-management.html',
})
export class FleetManagementPage {

	data: any = this.fleetManagementService.data;

	constructor(private LOGGER: LoggerProvider, private utils: UtilitiesProvider, private fleetManagementService: FleetManagementService) {
	}

	ionViewDidLoad() {
		this.fleetManagementService.loadData(false);
	}

}
