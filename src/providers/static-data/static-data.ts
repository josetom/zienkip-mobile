import { HttpClient } from '@angular/common/http';
import { Injectable, Injector, ReflectiveInjector } from '@angular/core';

import { LoggerProvider } from '../logger/logger';

@Injectable()
export class StaticDataProvider {

	private injector: Injector = ReflectiveInjector.resolveAndCreate([]);

	static bos: any;
	static token: string;

	loadData: Function = () => {
		// this.fleetManagementService.loadData(false);
	}

	constructor(public http: HttpClient, private LOGGER: LoggerProvider) {
		// this.LOGGER.debug("in static data provider")
	}

}
