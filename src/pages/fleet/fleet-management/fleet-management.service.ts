import { Injectable } from '@angular/core';

import { Constants } from '../../../model/constants/constants';
import { IManagement, IManagementData } from '../../../model/interfaces/management.interface';

import { LoggerProvider } from '../../../providers/logger/logger';
import { StaticDataProvider } from '../../../providers/static-data/static-data';
import { UtilitiesProvider } from '../../../providers/utilities/utilities';

@Injectable()
export class FleetManagementService implements IManagement {

	constructor(private LOGGER: LoggerProvider, private utils: UtilitiesProvider) {

	}

	data: IManagementData = {
		items: [],
		reportParams: [],
		clone: [], //clone of fleet,
		stats: { // reduced data for quick use
			vehicleLegals: {},
			vehicleStatus: {}
		}
	};

	onLoadDataSuccess = (response: any): void => {
		this.LOGGER.debug('Loaded the  data', response);
		this.data.reportParams = response.clientReportDef;
		this.data.items = response.clientResultSet;
		this.data.clone = response.clientResultSet;
		// this.utils.specialHandlingForReportsAndClone(this.data.items, this.data.reportParams, this.data.items, this.specialHandling, this.data.clone, undefined, undefined, this.postSpecialHandling);
	}

	onLoadDataFailure = (response: any): void => {
		this.LOGGER.debug('Unable to load the fleet data', response);
	}


	loadData = (forceReload: boolean): void => {

		this.LOGGER.debug('Load data called', this.data);

		if ((this.data.reportParams && this.data.reportParams.length <= 0) || forceReload) {

			this.LOGGER.debug('Loading the data');

			let data: any = {
				action: 'getVehicleReport',
				data: {
					type: 'profile',
					subtype: 'vehicle'
				},
				bo: {
					id: 'bo_trade_fleet_management'
				},
				resolveDeps: false
			};

			this.utils.httpRequest(Constants.HTTP_POST, Constants.API_ENTITY, data).subscribe(this.onLoadDataSuccess, this.onLoadDataFailure);

		} else {
			this.LOGGER.debug('Data already loaded', this.data);
		}

	};

	specialHandling = (key: string, obj: any, existingEntity: any): any => {
		// item is valid only when report param q is true
		if (!this.utils.isEmpty(existingEntity)) {
			this.LOGGER.debug('special handling item', key, existingEntity);
		}

		if (key == 'status' && obj) {
			return '<span class="' + this.utils.getClass(obj, 'general', 'value') + '">' + this.utils.getExpiryStateDisplay(obj, 'general', 'value') + '</span>';
		}
		if (key == 'telematicData_deviceStatus') {
			var deviceStatus = 'na';
			if (!this.utils.isEmpty(obj) && !this.utils.isEmpty(obj.imei)) {
				deviceStatus = 'on';
			}
			return '<span class="' + this.utils.getClass(deviceStatus, 'telematics', 'value') + '">' + this.utils.getExpiryStateDisplay(deviceStatus, 'telematics', 'value') + '</span>';
		}
		if (key == 'telematicData_ignition') {
			var ignition = 'na';
			if (!this.utils.isEmpty(obj)) {
				if (!this.utils.isEmpty(obj.imei)) {
					if (obj.ignition == 1) {
						ignition = 'on';
					} else {
						ignition = 'off';
					}
				}
			}
			return '<span class="' + this.utils.getClass(ignition, 'telematics', 'value') + '">' + this.utils.getExpiryStateDisplay(ignition, 'telematics', 'value') + '</span>';
		}
		if (key == 'telematicData_speed') {
			if (!this.utils.isEmpty(obj) && !this.utils.isEmpty(obj.gps) && !this.utils.isEmpty(obj.gps.speed)) {
				return obj.gps.speed + ' km/h';
			} else {
				return ' ';
			}
		}
		if (key == 'telematicData_temperature') {
			if (!this.utils.isEmpty(obj) && !this.utils.isEmpty(obj.temperature) && obj.temperature != '3000' && obj.temperature != '85' && obj.temperature != '200') {
				return obj.temperature + ' Celsius';
			} else {
				return undefined;
			}
		}
		// if (key == 'telematicData_location') {
		// 	var deferred = $q.defer();
		// 	$log.debug('printing existingEntity for telematicData_location', existingEntity);
		// 	$log.debug('printing obj for telematicData_location', obj);
		// 	if (!isEmpty(existingEntity) && !isEmpty(existingEntity.telematicData) && obj && obj.gps && obj.gps.location && obj.gps.location.lat && obj.gps.location.long) {
		// 		// remove log statements from here
		// 		// $log.debug('new ignition', obj.ignition);
		// 		// $log.debug('existing ignition', existingEntity.telematicData.ignition);
		// 		// $log.debug('new timestamp', obj.unixTimeStamp);
		// 		// $log.debug('new latlong', obj.gps.location);
		// 		// if (!isEmpty(existingEntity.telematicData.gps) && !isEmpty(existingEntity.locationDetails)) {
		// 		// 	$log.debug('existing latlong', existingEntity.telematicData.gps.location);
		// 		// 	$log.debug('distance', utilFactory.getDistanceBetweenCoordinates(obj.gps.location, existingEntity.locationDetails.coordinates));
		// 		// }
		// 		// if (!isEmpty(existingEntity.locationDetails)) {
		// 		// 	$log.debug('existing location', existingEntity.locationDetails.location);
		// 		// 	$log.debug('existing timestamp', existingEntity.locationDetails.last_location_updated_at);
		// 		// 	$log.debug('time difference in seconds', utilFactory.getTimeDifference(obj.unixTimeStamp, existingEntity.locationDetails.last_location_updated_at, 's'));
		// 		// }
		// 		// remove log statements till here
		// 		if (existingEntity.locationDetails && !isEmpty(existingEntity.locationDetails.location) && !isEmpty(existingEntity.locationDetails.last_location_updated_at) && utilFactory.getTimeDifference(obj.unixTimeStamp, existingEntity.locationDetails.last_location_updated_at, 's') < 120) {
		// 			$log.debug('reverse geocoding skipped: low time diff, existingEntity,obj', existingEntity, obj);
		// 			// dont make a call if previous location exists and time difference is less than 2 minutes
		// 			deferred.resolve(existingEntity.telematicData_location);
		// 		} else if (existingEntity.locationDetails && !isEmpty(existingEntity.locationDetails.location) && existingEntity.telematicData.ignition == 0 && obj.ignition == 0) {
		// 			$log.debug('reverse geocoding skipped: vehicle idle, existingEntity,obj', existingEntity, obj);
		// 			// dont make a call if previous location exists and vehicle is still idle
		// 			deferred.resolve(existingEntity.telematicData_location);
		// 		} else if (existingEntity.locationDetails && !isEmpty(existingEntity.locationDetails.location) && obj.ignition == 1 && existingEntity.locationDetails.coordinates && existingEntity.locationDetails.coordinates.lat && existingEntity.locationDetails.coordinates.long && utilFactory.getDistanceBetweenCoordinates(obj.gps.location, existingEntity.locationDetails.coordinates) < 0.5) {
		// 			$log.debug('reverse geocoding skipped: short distance, existingEntity,obj', existingEntity, obj);
		// 			// dont make a call if previous location exists and distance change is less than 0.5 km
		// 			deferred.resolve(existingEntity.telematicData_location);
		// 		} else {
		// 			$log.debug('ready for reverse geocoding', existingEntity, obj);
		// 			utilFactory.reverseGeoCode(obj.gps.location.lat, obj.gps.location.long, function(err, result) {
		// 				if (err) {
		// 					$log.debug('Location unknown', obj, err);
		// 					deferred.reject('Location Unknown !!');
		// 				} else if (result) {
		// 					$log.debug('Location known', obj, result);
		// 					$log.debug('Vehicle Id', existingEntity.id);
		// 					$log.debug('Fleet Management', fac.data.items);
		// 					var vehicle = utilFactory.findArrayObject('id', existingEntity.id, fac.data.items);
		// 					vehicle.locationDetails = {
		// 						last_location_updated_at: obj.unixTimeStamp,
		// 						coordinates: obj.gps.location,
		// 						location: result.formatted_address
		// 					};
		// 					deferred.resolve(result.formatted_address);
		// 				}
		// 			});
		// 		}
		// 	} else {
		// 		this.LOGGER.debug('else', existingEntity, obj);
		// 		deferred.resolve(undefined);
		// 	}
		// 	return deferred.promise;
		// }
		if (key == 'telematicData_unixTimeStamp') {
			if (!this.utils.isEmpty(obj) && obj.unixTimeStamp) {
				return obj.unixTimeStamp;
			} else {
				return undefined;
			}
		}
		if (key == 'telematicData_powerVoltage') {
			// >30 check is for rejecting some old data in millivolts
			if (!this.utils.isEmpty(obj) && obj < 1000) {
				return obj;
			} else if (!this.utils.isEmpty(obj) && obj > 1000) {
				return obj / 1000;
			} else {
				return undefined;
			}
		}

		if (key == 'calculatedOdometer_reading' && !this.utils.isEmpty(obj)) {
			return obj.reading;
		}

		// last statement
		return obj;
	}

	reloadFleetStats = (): void => {
		this.data.stats.vehicleLegals = {};
		this.data.stats.vehicleStatus = {};

		this.data.clone.forEach(function(item) {
			if (!this.utils.isEmpty(item)) {
				var regex = /(.*?)_count$/;
				Object.keys(item).forEach(function(key) {
					// Vehicle legals update
					if (regex.test(key) && !this.utils.isEmpty(item[key])) {
						Object.keys(item[key]).forEach(function(expState) {
							this.data.stats.vehicleLegals[expState] = (this.data.stats.vehicleLegals[expState]) ? (this.data.stats.vehicleLegals[expState] + item[key][expState]) : (item[key][expState]);
						})
					}

					// Vehicle status update
					if (key == 'status' && !this.utils.isEmpty(item[key])) {
						var statusKey = item[key];
						this.data.stats.vehicleStatus[statusKey] = (this.data.stats.vehicleStatus[statusKey]) ? (this.data.stats.vehicleStatus[statusKey] + 1) : (1);
					}
				})
			}
		})
	}

	postSpecialHandling = (): void => {
		this.reloadFleetStats();
	}

}
