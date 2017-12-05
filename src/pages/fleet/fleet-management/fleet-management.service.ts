import { Injectable } from '@angular/core';

import { Constants } from '../../../model/constants/constants';
import { IManagement, IManagementData } from '../../../model/interfaces/management.interface';

import { LoggerProvider } from '../../../providers/logger/logger';
import { UtilitiesProvider } from '../../../providers/utilities/utilities';

@Injectable()
export class FleetManagementService implements IManagement {

	data: IManagementData = {
		items: [],
		reportParams: [],
		clone: [], //clone of fleet,
		stats: { // reduced data for quick use
			vehicleLegals: {},
			vehicleStatus: {}
		}
	};

	onLoadDataSuccess = (response) => {
		this.LOGGER.debug("Loaded the  data", response);
		this.data.reportParams = response.clientReportDef;
		this.data.items = response.clientResultSet;
		this.data.clone = response.clientResultSet;
		// utilFactory.specialHandlingForReportsAndClone(data.clientResultSet, fac.data.reportParams, fac.data.items, fac.specialHandling, fac.data.clone, undefined, undefined, fac.postSpecialHandling);
	}

	onLoadDataFailure = (response) => {
		this.LOGGER.debug("Unable to load the fleet data", response);
	}


	loadData = (forceReload: boolean) => {

		this.LOGGER.debug("Load data called", this.data);

		if ((this.data.reportParams && this.data.reportParams.length <= 0) || forceReload) {

			this.LOGGER.debug("Loading the data");

			let data: any = {
				action: "getVehicleReport",
				data: {
					type: "profile",
					subtype: "vehicle"
				},
				bo: {
					id: "bo_trade_fleet_management"
				},
				resolveDeps: false
			};

			this.utils.httpRequest(Constants.HTTP_POST, Constants.URL_ENTITY, data).subscribe(this.onLoadDataSuccess, this.onLoadDataFailure);

		} else {
			this.LOGGER.debug("Data already loaded", this.data);
		}

	};

	constructor(private LOGGER: LoggerProvider, private utils: UtilitiesProvider) {

	}

}
