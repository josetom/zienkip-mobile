import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'; //, Injector, ReflectiveInjector

import { LoggerProvider } from '../logger/logger';

@Injectable()
export class StaticDataProvider {

	// private injector: Injector = ReflectiveInjector.resolveAndCreate([]);

	static bos: any;
	static token: string;

	static preferences = {
		pagination_size: {
			vehicle: 100,
			vehicle_save: 5,
			tripRoute: 100,
			employee: 100,
			trip: 100,
			tyre: 100,
			sim: 100,
			device: 100,
			client: 100
		},
		expiryThreshold: 10
	}

	static defaultTablePreferences = {
		paginationSizes: [5, 10, 15, 25, 100],
		pageSize: 100,
		rowSelection: false,
		multiSelect: false,
		autoSelect: false,
		largeEditDialog: false,
		boundaryLinks: true,
		limitSelect: true,
		pageSelect: true
	};

	static staticData = {};

	loadData: Function = () => {
		// this.fleetManagementService.loadData(false);
	}

	constructor(public http: HttpClient, private LOGGER: LoggerProvider) {
		// this.LOGGER.debug("in static data provider")
	}

}
