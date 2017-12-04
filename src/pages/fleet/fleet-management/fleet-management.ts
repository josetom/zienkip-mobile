import { Component } from '@angular/core';

import { LoggerProvider } from '../../../providers/logger/logger';
import { UtilitiesProvider } from '../../../providers/utilities/utilities';

@Component({
	selector: 'page-fleet-management',
	templateUrl: 'fleet-management.html',
})
export class FleetManagementPage {

	constructor(private LOGGER: LoggerProvider, private utils: UtilitiesProvider) {
	}

}
