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

	loadStaticData = (): Observable<any> => {

		let dataLoadPromises = [];
		let preDataLoadObservables = [];

		let modifyStaticData = () => {
			if (StaticDataProvider.staticData) {
				if (StaticDataProvider.staticData['countries']) {
					StaticDataProvider.staticData['countries'][0].states.forEach(function(state) {
						StaticDataProvider.staticData['permitTypes'].push({
							display: state.display + " - State Permit",
							value: state.value
						})
					});
				}
			}
		}

		let setDataLoadPromises = () => {
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

		var onDataLoadPromises = function() {
			// Object.keys(fac.factories).forEach(function(factoryName) {
			// 	var factory = fac.factories[factoryName];
			// 	if (factory && factory.data && factory.data.clone) {
			// 		utilFactory.specialHandlingForReportsAndClone(factory.data.clone, factory.data.reportParams, factory.data.items, factory.specialHandling, factory.data.clone);
			// 	}
			// });
		}

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

		/**
		 * Loads the constants from the DB
		 *
		 * @return Observable
		 **/
		let loadConstants = (): Observable<any> => {

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
					if (!this.utils.isEmpty(response) && response instanceof Array) {
						response.forEach(function(constant) {
							StaticDataProvider.staticData[constant.key] = constant.value;
						});
					}
					observer.next(response);
					observer.complete();
				}

				let loadConstantsFailure = (response): void => {
					this.LOGGER.debug("Fetching constants failed", response);
					observer.error(response);
				}

				this.utils.httpRequest(Constants.HTTP_POST, Constants.API_STATIC, data).subscribe(loadConstantsSuccess, loadConstantsFailure);

			}

			return Observable.create(observable);

		};


		/**
		 * Loads the constants file from server
		 *
		 * @return Observable
		 **/
		let loadConstantFile = (key, filePath): Observable<any> => {

			let observable = (observer): void => {

				let loadConstantFileSuccess = (response): void => {
					this.LOGGER.debug("Fetched ", key, response);
					if (!this.utils.isEmpty(response)) {
						StaticDataProvider.staticData[key] = response;
					}
					observer.next(response);
					observer.complete();
				}

				let loadConstantFileFailure = (response): void => {
					this.LOGGER.debug("Fetching constant file failed", response);
					observer.error(response);
				}

				this.utils.httpRequest(Constants.HTTP_GET, filePath).subscribe(loadConstantFileSuccess, loadConstantFileFailure);

			}

			return Observable.create(observable);

		}

		let loadFactoryData = () => {
			// 	$q.all(dataLoadPromises).then(function(datas) {
			// 		deferred.resolve("Data Loaded" + datas);
			// 		$log.debug("Static Data loaded " + datas, fac);
			// 		onDataLoadPromises();
			// 	},
			// 		function(error) {
			// 			$log.debug("Static Data load failed - dataLoadPromises " + error);
			// 		})
			// }, function(error) {
			// 	$log.debug("Static Data load failed - preDataLoadObservables" + error);
		}

		let onPreDataLoadPromises = () => {
			modifyStaticData();
			setDataLoadPromises();
			loadFactoryData();
		}

		/**
		 * creates observables for all the static calls
		 **/
		preDataLoadObservables.push(loadConstants());
		// preDataLoadObservables.push(loadTruckBrands());
		Constants.PARAMS_STATIC_DATA_LOAD.UI_CONSTANT_FILES.forEach((file) => {
			preDataLoadObservables.push(loadConstantFile(file.KEY, file.FILE_PATH));
		})


		let outerObservable = (observer) => {

			Observable.forkJoin(preDataLoadObservables).subscribe({
				next: (response) => { this.LOGGER.debug('Static data fork - ', response) },
				error: (error) => { this.LOGGER.debug('Static data fork error - ', error) },
				complete: () => {
					onPreDataLoadPromises();
					observer.next();
					observer.complete();
				}
			});
		}

		return Observable.create(outerObservable);


	}

	constructor(private LOGGER: LoggerProvider, private utils: UtilitiesProvider) {

	}

}
