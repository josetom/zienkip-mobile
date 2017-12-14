import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { LoggerProvider, UtilitiesProvider } from '../providers';

import { Constants } from '../../model/constants/constants';

@Injectable()
export class StaticDataProvider {

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

	loadStaticData = () => {

		let dataLoadPromises = [];
		let preDataLoadPromises = [];

		let onPreDataLoadPromises = () => {
			StaticDataProvider.staticData['countries'][0].states.forEach(function(state) {
				StaticDataProvider.staticData['permitTypes'].push({
					display: state.display + " - State Permit",
					value: state.value
				})
			});

			// var bos = [];
			// if (typeof utilFactory.getAllBOs == "function") {
			// 	bos = utilFactory.getAllBOs();
			// }
			//
			// $log.debug("static data load - bos ", bos);
			//
			// fac.factories = {};
			// bos.forEach(function(bo) {
			// 	var factory = (bo.stateDef) ? bo.stateDef.factory : undefined;
			// 	if (factory) {
			// 		fac.factories[factory] = $injector.get(factory);
			// 		if (fac.factories[factory] && typeof fac.factories[factory].loadData == "function") {
			// 			dataLoadPromises.push(fac.factories[factory].loadData($http, true));
			// 			fac[utilFactory.getStaticDataKey(bo.state)] = fac.factories[factory].data.clone;
			// 			fac[utilFactory.getStaticDataKey(bo.state) + "_stats"] = fac.factories[factory].data.stats;
			// 		}
			// 	}
			// });

		}

		// var onDataLoadPromises = function() {
		// 	Object.keys(fac.factories).forEach(function(factoryName) {
		// 		var factory = fac.factories[factoryName];
		// 		if (factory && factory.data && factory.data.clone) {
		// 			utilFactory.specialHandlingForReportsAndClone(factory.data.clone, factory.data.reportParams, factory.data.items, factory.specialHandling, factory.data.clone);
		// 		}
		// 	});
		// }

		// var loadTruckBrands = function () {
		//
		// 	var loadTruckBrandsDeferred = $q.defer();
		//
		// 	var data = {
		// 		"action": "getTruckBrands",
		// 		"data": {
		// 			"type": "vehicleModel",
		// 			"subtype": "truck"
		//
		// 		}
		// 	};
		// 	return $http({
		// 		method: "POST",
		// 		url: window.location.origin + "/api/trade/fleet/searchTruckModels",
		// 		data: data
		// 	}).then(function (response) {
		// 		$log.debug("Fetched all manufacturers", response.data);
		// 		fac.vehicleManufacturers = response.data;
		// 		loadTruckBrandsDeferred.resolve('loadTruckBrands');
		// 	}, function (response) {
		// 		$log.debug("Fetching manufacturers failed", response);
		// 		fac.vehicleManufacturers = [];
		// 		loadTruckBrandsDeferred.resolve('loadTruckBrandsDeferred');
		// 	});
		//
		// 	return loadTruckBrandsDeferred.promise;
		// };

		let loadConstants = () => {

			let observable = (observer): void => {

				let data = {
					action: Constants.PARAMS_STATIC_DATA_LOAD.UI_CONSTANTS.ACTION,
					data: {
						type: Constants.PARAMS_STATIC_DATA_LOAD.UI_CONSTANTS.TYPE,
						subtype: Constants.PARAMS_STATIC_DATA_LOAD.UI_CONSTANTS.SUBTYPE,

					}
				};

				let loadConstantsSuccess = (response): void => {
					this.LOGGER.debug("Fetched all constants", response);
					if (!this.utils.isEmpty(response.data) && response.data instanceof Array) {
						response.data.forEach(function(constant) {
							StaticDataProvider.staticData[constant.key] = constant.value;
						});
					}
					observer.next();
					observer.complete();
				}

				let loadConstantsFailure = (response): void => {
					this.LOGGER.debug("Fetching constants failed", response);
					observer.error(response);
				}

				this.utils.httpRequest(Constants.HTTP_POST, Constants.API_STATIC, data).subscribe(loadConstantsSuccess, loadConstantsFailure);

			}

			return observable;

		};

		let loadConstantsObservable: Observable<any> = Observable.create(loadConstants());

		let loadConstantFile = (key, filePath) => {

			let observable = (observer): void => {

				let loadConstantFileSuccess = (response): void => {
					this.LOGGER.debug("Fetched ", key, response);
					if (!this.utils.isEmpty(response)) {
						StaticDataProvider.staticData[key] = response.data;
					}
					observer.next()
					observer.complete();
				}

				let loadConstantFileFailure = (response): void => {
					this.LOGGER.debug("Fetching constant file failed", response);
					observer.error(response);
				}

				this.utils.httpRequest(Constants.HTTP_GET, filePath).subscribe(loadConstantFileSuccess, loadConstantFileFailure);

			}

			return observable;

		}

		let loadConstantFileObservable: Observable<any> = Observable.create(loadConstantFile(Constants.PARAMS_STATIC_DATA_LOAD.UI_CONSTANT_FILES[0].KEY, Constants.PARAMS_STATIC_DATA_LOAD.UI_CONSTANT_FILES[0].FILE_PATH));

		loadConstantsObservable.subscribe();
		loadConstantFileObservable.subscribe();

		// preDataLoadPromises.push(loadTruckBrands());
		// preDataLoadPromises.push(loadConstantFile("moment-timezone", "/bower_components/moment-timezone/data/meta/latest.json"));
		//
		// $q.all(preDataLoadPromises).then(function() {
		//
		// 	onPreDataLoadPromises();
		//
		// 	$q.all(dataLoadPromises).then(function(datas) {
		// 		deferred.resolve("Data Loaded" + datas);
		// 		$log.debug("Static Data loaded " + datas, fac);
		// 		onDataLoadPromises();
		// 	},
		// 		function(error) {
		// 			$log.debug("Static Data load failed - dataLoadPromises " + error);
		// 		})
		// }, function(error) {
		// 	$log.debug("Static Data load failed - preDataLoadPromises" + error);
		// });
		//
		// return deferred.promise;
	}

	constructor(private LOGGER: LoggerProvider, private utils: UtilitiesProvider) {

	}

}
