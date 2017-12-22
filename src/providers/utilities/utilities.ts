import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import { Platform, AlertController, LoadingController } from 'ionic-angular';

import * as moment from 'moment-timezone';

import { LoggerProvider, StaticDataProvider } from '../providers';

import { Constants } from '../../model/constants/constants';
import { Organization, Employee } from '../../model/vo/vo.entity';

// import { PushNotification } from '../../native/push-notification/push-notification';

@Injectable()
export class UtilitiesProvider {

	constructor(private http: HttpClient, private LOGGER: LoggerProvider, private storage: Storage, private platform: Platform, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {

	}

	/**
	 * Makes an http request and returns an Observable
	 * this.utils.httpRequest(..., ..., ..., ...).subscribe(..., ...);
	 *
	 * @param method : http method; GET, POST, etc.
	 * @param url : api url
	 * @param data : request data
	 * @param httpOptions : HTTP request options
	 *
	 * @return Observable<any>	: subscribe to the Observable and handle the callbacks
	 **/
	httpRequest: Function = (method: string, url: string, data?: any, httpOptions?: any): Observable<any> => {
		let defaultHttpOptions = {
			headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + StaticDataProvider.token })
		};
		httpOptions = Object.assign(defaultHttpOptions, httpOptions);
		return this.http[method](url, data, httpOptions);
	}

	/**
	 * Checks if a given object is empty or not
	 *
	 * @param obj : object to be checked
	 *
	 * @return boolean
	 **/
	isEmpty = (obj: any) => {
		if (obj == null) return true;
		if (typeof obj === 'boolean') return false;
		else if (obj instanceof String) {
			if (obj.trim().length > 0) return false;
			if (obj.trim().length === 0) return true;
		} else if (obj instanceof Date) {
			return 'Invalid Date' == obj.toString();
		} else if (typeof obj == 'number') {
			return isNaN(obj);
		} else {
			if (obj.length > 0) return false;
			if (obj.length === 0) return true;
		}
		for (let key in obj) {
			if (Object.hasOwnProperty.call(obj, key)) return false;
		}

		return true;
	};

	/**
	 * Function to set token and bos and initialize native components
	 *
	 * @param token : Token string
	 * @param bos : api url
	 **/
	postLogin = (token: string, bos: any): void => {
		StaticDataProvider.token = token;
		StaticDataProvider.bos = bos;

		let tokenString = JSON.stringify(token);
		if (tokenString) {
			let token = tokenString.substring(1, tokenString.length - 1);
			this.storage.set('kipenzi-token', token);
		}

		let boString = JSON.stringify(bos);
		if (boString) {
			this.storage.set('kipenzi-bos', boString);
		}

		this.initNativeComponents();
	}

	/**
	 * initializes all the required native components
	 **/
	private initNativeComponents = (): void => {
		this.LOGGER.debug('Initializing native plugins', this.platform);
		if (this.platform.is('cordova')) {
			// PushNotification.init();
		}
	}

	/**
	 * Creates an alert with given details
	 *
	 * @param title		: Title text
	 * @param message	: Alert message
	 * @param buttons	: Array of buttons
	 **/
	showAlert = (title: string, message: string, buttons: Array<string>): void => {
		this.alertCtrl.create({
			title: title,
			subTitle: message,
			buttons: buttons
		}).present();
	}

	/**
	 * Displays a loading icon box
	 *
	 * @param content	: content to be displayed with spinner
	 *
	 * @return cancelHook	: Function that needs to be called to dismiss the loader
	 **/
	showLoading = (content: string): Function => {
		let loading = this.loadingCtrl.create({
			content: content
		});

		loading.present();

		let cancelHook: Function = () => {
			loading.dismiss();
		}

		return cancelHook;
	}

	/**
	 * Displays a loading icon box
	 *
	 * @param successCallback	: authenticate success callback
	 * @param failureCallback	: authenticate failure callback
	 **/
	authenticate = (successCallback: Function, failureCallback?: Function): void => {
		this.storage.get('kipenzi-token').then((token: string) => {
			StaticDataProvider.token = token;
			this.httpRequest(Constants.HTTP_POST, Constants.API_AUTHENTICATE).subscribe(successCallback, failureCallback);
		});
	}

	/**
	 * ISO Date string regex
	 **/
	iso8601RegEx = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/;

	/**
	 * Parses the date string into date object, to be used with JSON.parse to directly parse string to date
	 *
	 * @param key	: key of the date string
	 * @param value	: value string
	 *
	 * @return any	: Parsed date if date, else passed object
	 **/
	dateParser = (key: string, value: any): any => {
		let type = typeof value;
		if (type === 'string' && this.iso8601RegEx.test(value)) {
			return new Date(value);
		}
		return value;
	};

	/**
	 * Deep clones any JSON object
	 * will fail for circular references and functions
	 *
	 * @param obj	: object to be cloned
	 *
	 * @return any	: Cloned object
	 **/
	deepClone: Function = (obj: any): any => {
		if (obj != undefined) {
			return JSON.parse(JSON.stringify(obj), this.dateParser);
		}
	};

	/**
	 *	Finds an object in the array which satisfies the condition for a given 'Value' for a given 'key' and 'path' if specified
	 *
	 *	@param key		: [String]	: key that is checked in every array object
	 *	@param value	: [String]	: search value
	 *	@param array	: [Array]	: Source array
	 *	@param path		: [Array]	: Path till the key in its order
	 **/
	findArrayObject: Function = (key: string, value: string, array: Array<any>, path: Array<string>): any => {
		if (!this.isEmpty(array)) {
			return array.find((a) => {
				if (path) {
					for (let i = 0; i < path.length; i++) {
						if (typeof a == 'object') {
							a = a[path[i]]
						}
					}
				}
				if (typeof a == 'object' && a[key] == value) return a
			})
		}
	};

	/** updates the values in sink with values corresponding to keys in source
	 *
	 *	@param source		: [Object]	: source object from which the keys are iterated and value is mapped to the sink object
	 *	@param sink			: [Object]	: sink object to which the values are mapped to from the source
	 *	@param updateKeys 	: [Array] 	: updates values for only the specified keys; if undefined, will update for all
	 *
	 *	@return sink object
	 **/
	updateJSON = (source: any, sink: any, updateKeys: Array<string>): any => {

		let sourceIterator = Object.keys(source);

		if (updateKeys instanceof Array && updateKeys.length > 0) {
			sourceIterator = updateKeys;
		}

		sourceIterator.forEach((key) => {
			sink[key] = source[key];

		})

		return sink;
	}

	/**
	 * Returns the days difference between two dates
	 *
	 * @param a    : [Date]    : Date
	 * @param b    : [Date]    : Date
	 *
	 * @return number
	 **/
	getDateDifference = (a: Date, b: Date): number => {
		if (!(a instanceof Date) || !(b instanceof Date)) {
			return undefined;
		}
		return (a.getTime() - b.getTime()) / (60 * 60 * 24 * 1000);
	}

	/**
	 * Returns the getTimeAsDuration formatted time difference
	 *
	 * @param a    : [Date]    : Date
	 * @param b    : [Date]    : Date
	 *
	 * @return number
	 **/
	getFormattedDateDifference = (a: Date, b: Date): string => {
		if (!(a instanceof Date) || !(b instanceof Date)) {
			return undefined;
		}
		return this.getTimeAsDuration(a.getTime() - b.getTime());
	}

	/**
	 * Returns the time difference between the given datetimes
	 *
	 * @param date1    	: [DateTime]    : DateTime
	 * @param date2    	: [DateTime]    : DateTime
	 * @param timeFormat: [String]     	: The time difference in 'seconds' or 'minutes'
	 *
	 * @return number
	 **/
	getTimeDifference = (date1: Date, date2: Date, timeFormat: string): number => {
		let timeDifference = Math.abs(this.newDate(date1).getTime() - this.newDate(date2).getTime());
		if (timeFormat == 'seconds' || timeFormat == 's') {
			return timeDifference / 1000;
		} else if (timeFormat == 'minutes' || timeFormat == 'm') {
			return timeDifference / (1000 * 60);
		} else if (timeFormat == 'hours' || timeFormat == 'h') {
			return timeDifference / (1000 * 60 * 60);
		} else {
			return timeDifference;
		}
	}

	/**
	 * Returns formatted version of time into x days, y hours, z mins
	 *
	 * @param time : [number]    : Time difference in long format
	 *
	 * @return string
	 **/
	getTimeAsDuration = (time: number): string => {
		time = Math.abs(time);
		if (time <= 0) {
			return '-';
		}

		let days = Math.floor(time / (60 * 60 * 24 * 1000));
		let hours = Math.floor((time % (60 * 60 * 24 * 1000)) / (60 * 60 * 1000));
		let mins = Math.floor((time % (60 * 60 * 1000)) / (60 * 1000));

		return ((days) ? (days + ' days ') : '') + ((hours) ? (hours + ' hours ') : '') + ((mins) ? (mins + ' mins ') : '');
	}

	/**
	 * Returns the time zone offset for a give org or date or browser
	 *
	 * @param format	: [String]	: [Optional] returns in the requested format; moment default if undefined
	 *
	 * @return
	 **/
	getTimeZoneOffset = (format): any => {

		if (!format) {
			return this.newMoment()._offset;
		} else {
			return this.newMoment().format(format);
		}
	}

	/**
	 * Returns the moment with org timezone
	 *
	 * @param dateLike	: [Date like]	: [Optional] Any moment accepted date like
	 *
	 * @return moment
	 **/
	newMoment = (dateLike?: any): any => {
		let timeZone = this.getOrgTimeZone();
		return moment(dateLike).tz(timeZone);
	}

	/**
	 * Returns the date with org timezone
	 *
	 * @param dateLike	: [Date like]	: [Optional] Any moment accepted date like
	 *
	 * @return Date
	 **/
	newDate = (dateLike: any): Date => {
		return this.newMoment(dateLike).toDate();
	}

	/**
	 * Returns the organization time zone for the user
	 *
	 * @return timezone string
	 **/
	getOrgTimeZone = (): string => {
		let timeZone = moment.tz.guess();

		let organization = this.getOrganization();
		if (!this.isEmpty(organization) && !this.isEmpty(organization.timeZone)) {
			timeZone = organization.timeZone;
		}

		return timeZone;
	}

	/**
	 * Parses given date string using the format
	 *
	 * @param dateString	: [String]	: date string
	 * @param format		: [String]	: date format
	 *
	 * @return Date
	 **/
	parseDate = (dateString: string, format: string): Date => {
		let m = moment.tz(dateString, format, this.getOrgTimeZone());
		return m.isValid() ? m.toDate() : new Date(NaN);
	};

	/**
	 * Formats given date into String with given format
	 *
	 * @param date			: [Date]	: date
	 * @param format		: [String]	: [Optional] date format
	 *
	 * @return string
	 **/
	formatDate = (date: Date, format: string): string => {
		let m = this.newMoment(date);
		return m.format(format || 'DD MMM YYYY');
	};


	/**
	 *	Returns expiry state
	 *
	 *	@param value		: [String]	: value of expiry state
	 *	@param specificSet	: [String]	: set from which the value needs to be picked from
	 *	@param refKey		: [String]	: reference key for the value
	 *
	 *	@return status object
	 **/
	getStatus = (value: string, specificSet: string, refKey: string): any => {
		let staticData = StaticDataProvider.staticData;
		let statusArray = staticData['status']['general'];

		refKey = (refKey) ? refKey : 'display';

		if (specificSet && staticData['status'][specificSet]) {
			statusArray = staticData['status'][specificSet];
		}
		return this.findArrayObject(refKey, value, statusArray);
	}

	/**
	 *	Returns css class for expiry state
	 *
	 *	@param value		: [String]	: value of expiry state
	 *	@param specificSet	: [String]	: set from which the value needs to be picked from
	 *	@param refKey		: [String]	: reference key for the value
	 *
	 *	@return string status class
	 **/
	getClass = (value: string, specificSet: string, refKey: string): string => {

		let obj = undefined;
		obj = this.getStatus(value, specificSet, refKey);

		return (obj) ? obj.class : ''
	}

	/**
	 *	Returns display value of expiry state
	 *
	 *	@param value		: [String]	: value of expiry state
	 *	@param specificSet	: [String]	: set from which the value needs to be picked from
	 *	@param refKey		: [String]	: reference key for the value
	 *
	 *	@return string status display
	 **/
	getExpiryStateDisplay = (value: string, specificSet: string, refKey: string): string => {

		let obj = undefined;
		obj = this.getStatus(value, specificSet, refKey);

		return (obj) ? obj.display : ''
	}

	/**
	 * Returns expiry state object for given date and flags
	 *
	 *	@param expiryDate	: [Date]	: expiry dates
	 *	@param active		: [Boolean]	: active flag
	 *	@param renewalDate	: [Date]	: renewal date
	 * 	@param cancelled	: [Boolean]	: cancelled flag
	 *
	 *	@return string expiryState
	 **/
	getExpiryState = (expiryDate: Date, active?: boolean, renewalDate?: Date, cancelled?: boolean): string => {

		active = (this.isEmpty(active)) ? true : active;

		if (this.isEmpty(expiryDate)) {
			return 'na'
		}

		if (expiryDate instanceof Date) {
			expiryDate = new Date(expiryDate);
		} else {
			return 'invalid'
		}

		if (renewalDate instanceof Date) {
			renewalDate = new Date(renewalDate);
		} else {
			renewalDate = undefined;
		}

		let diff = this.getDateDifference(expiryDate, new Date());
		let expiryThreshold = (StaticDataProvider.preferences && StaticDataProvider.preferences.expiryThreshold) ? StaticDataProvider.preferences.expiryThreshold : 10;

		if (!active && cancelled) {
			return 'cancelled';
		} else if (!active) {
			return 'inactive';
		} else if (diff < 0) {
			return 'expired';
		} else if (diff < expiryThreshold) {
			return 'expiring';
		} else if (diff > expiryThreshold && renewalDate && (this.getDateDifference(new Date(), renewalDate) < 1)) {
			return 'new';
		} else if (diff > expiryThreshold) {
			return 'active';
		}
	}

	/**
	 * 	Function called for doing all the special handling in a report.
	 *	Data is updated based on the uish configured and is replaced or updated in the sink.
	 *	Whenever something is modified a key with _mod appended is added with the modified value.
	 *
	 *	Arguments
	 *	--------------------------
	 *	@param source			: [Array]	: Array of report objects
	 *	@param reportParams		: [Array]	: Array of report parameters
	 *	@param sink				: [Array]	: Sink to which the modified source is updated to
	 *	@param customHandling	: [function]: Function executed if the report param.meta.uish = 'custom'
	 *	@param clone			: [Array]	: Cloned version of the source; contains actual data and modified version as _mod
	 *	@param replaceOrUpdate	: [String]	: Replaces / Updates the value in sink & clone; default - replace
	 *	@param updateKeys		: [Array]	: specific keys that needs to be updated; used along with replaceOrUpdate = 'update'
	 *	@param postProcessing	: [function]: Any function that needs to be called post report handling. eg: statsUpdation
	 *
	 *	uish - UI Special Handling
	 *	---------------------------
	 *	date 	: expiry check on a date
	 *	aod	 	: expiry check on an array of dates
	 *	custom	: customHandling function needs to be called for modifying object
	 *	aiobj	: expiry check on array in object; (shp - special handling params)
	 *
	 **/
	specialHandlingForReportsAndClone = (source: Array<any>, reportParams: Array<any>, sink: Array<any>, customHandling: Function, clone: Array<any>, replaceOrUpdate: string, updateKeys: Array<string>, postProcessing: Function): Array<any> => {

		if (!(sink instanceof Array)) {
			sink = [];
		}

		if (clone && !(clone instanceof Array)) {
			clone = [];
		}

		source.forEach((item: any, itemIndex: number) => {

			//add item to sink checking after it already exists or not
			let existingItem = this.findArrayObject('id', item.id, sink);

			let index = sink.indexOf(existingItem);

			let clonedItem;
			let existingClone;
			let cloneIndex;

			//add item to clone checking after it already exists or not
			if (clone) {
				clonedItem = this.deepClone(item);
				existingClone = this.findArrayObject('id', clonedItem.id, clone);

				cloneIndex = clone.indexOf(existingClone);

			}

			reportParams.forEach((param: any, paramIndex: number) => {

				if (param.meta.p && !item[param.colId]) {
					item[param.colId] = item[param.meta.p]
				}

				if (param.meta.uish == 'date' || param.meta.uish == 'aod' || param.meta.uish == 'aiobj') {

					let expiryState;

					if (param.meta.uish == 'date') {
						// this.LOGGER.debug('special handling on reports - date', item[param.colId]);
						expiryState = this.handleArrayOfDateInReport([{
							to: new Date(item[param.colId])
						}], param.meta.uish);

					} else if (param.meta.uish == 'aod') {
						// this.LOGGER.debug('special handling on reports - array of date (aod)', item[param.colId]);
						expiryState = this.handleArrayOfDateInReport(item[param.colId], param.meta.uish);
						clonedItem[param.colId] = this.deepClone(item[param.colId]);

					} else if (param.meta.uish == 'aiobj') {
						// this.LOGGER.debug('special handling on reports - array in object (aiobj)', item[param.colId]);
						let anItem = item[param.colId]
						let path = param.meta.shp.split(';');

						for (let i = 0; i < path.length; i++) {
							if (typeof anItem == 'object' && !this.isEmpty(path[i])) {
								anItem = anItem[path[i]]
							}
						}
						expiryState = this.handleArrayOfDateInReport(anItem, param.meta.uish);
						clonedItem[param.colId] = this.deepClone(item[param.colId]);
					}
					item[param.colId] = '<span class="' + this.getClass(expiryState.status, 'general', 'value') + '">' + this.getExpiryStateDisplay(expiryState.status, 'general', 'value') + '</span>';
					clonedItem[param.colId + '_mod'] = this.deepClone(item[param.colId]);
					clonedItem[param.colId + '_count'] = expiryState.expiryCount;

				} else if (param.meta.uish == 'custom') {
					// this.LOGGER.debug('special handling on reports - custom', item[param.colId], param.meta.q);
					if (param.meta.q) {
						let qHandler = (result) => {
							item[param.colId] = result;
							//this is required where a new object is pushed and callback comes after insertion
							let newExistingItem = this.findArrayObject('id', item.id, sink);
							let newIndex = sink.indexOf(newExistingItem);
							sink[newIndex] = this.updateJSON(item, sink[newIndex], updateKeys);

							// same for clone
							clonedItem[param.colId + '_mod'] = this.deepClone(item[param.colId]);
							let newExistingClone = this.findArrayObject('id', clonedItem.id, clone);
							let newCloneIndex = clone.indexOf(newExistingClone);
							let cloneUpdateKeys = this.deepClone(updateKeys);
							if (replaceOrUpdate == 'update' && !this.isEmpty(updateKeys)) {
								updateKeys.forEach((key) => {
									cloneUpdateKeys.push(key + '_mod');
									cloneUpdateKeys.push(key + '_count');
								});
							}
							clone[newCloneIndex] = this.updateJSON(clonedItem, clone[newCloneIndex], cloneUpdateKeys);
						}
						customHandling(param.colId, item[param.colId], existingItem).subscribe((result) => {
							qHandler(result);
						}, (error) => {
							let oldItem;
							if (existingItem && existingItem[param.colId]) {
								oldItem = existingItem[param.colId];
								qHandler(oldItem);
							}
							this.LOGGER.debug('special handling on reports - custom - q - failed', item[param.colId], 'using existingItem', oldItem);
						});
					} else {
						item[param.colId] = customHandling(param.colId, item[param.colId]);
						clonedItem[param.colId + '_mod'] = this.deepClone(item[param.colId]);
					}
				}
			});

			if (existingClone) {
				if (replaceOrUpdate == 'update') {
					clone[cloneIndex] = this.updateJSON(clonedItem, clone[cloneIndex], updateKeys);
				} else {
					clone[cloneIndex] = clonedItem;
				}
			} else {
				clone.push(clonedItem);
			}

			if (existingItem) {
				if (replaceOrUpdate == 'update') {
					sink[index] = this.updateJSON(item, sink[index], updateKeys);
				} else {
					sink[index] = item;
				}
			} else {
				sink.push(item);
			}

		});

		if (typeof postProcessing == 'function') {
			postProcessing();
		}

		return sink;
	};

	/**
	 * 	Function to handle array of date objects
	 *	eg : array of permit expiry dates
	 *
	 *	@param arr		: [Array]	: subject array
	 *	@param uish		: [Object]	: UI Special Handling parameters
	 *
	 *	@return ExpiryState object
	 **/
	handleArrayOfDateInReport = (arr: Array<any>, uish: string): any => {

		let expiryStates = [];
		let expiryCount = {};

		if (this.isEmpty(arr)) {
			return {
				status: 'na',
				expiryCount: {
					na: 1
				}
			};
		}

		arr.forEach((item, index) => {
			let expState = this.getExpiryState(new Date(item.to), item.active)
			if (uish != 'date') {
				item.status = expState;
			}
			expiryStates.push(expState);
			expiryCount[expState] = (expiryCount[expState]) ? (expiryCount[expState] + 1) : (1);
		});

		let retState = 'na';

		if (expiryStates.includes('expired')) {
			retState = 'expired';
		} else if (expiryStates.includes('expiring')) {
			retState = 'expiring';
		} else if (expiryStates.includes('active')) {
			retState = 'active';
		} else {
			retState = 'na';
		}

		return {
			status: retState,
			expiryCount: expiryCount
		};
	};

	/**
	 * Returns user's organization
	 *
	 * @return organization
	 **/
	getOrganization = (): Organization => {
		let organization: Organization = undefined;
		let user: Employee = this.getUserData();

		if (!this.isEmpty(user) && !this.isEmpty(user.org) && !this.isEmpty(user.org.id)) {
			organization = this.getStaticDetails(user.org.id, 'organization');
		}
		return organization;
	};

	/**
	 * 	Returns user data
	 *
	 * @return Employee
	 **/
	getUserData = (): Employee => {
		return StaticDataProvider.staticData['user'];
	}

	/**
	 *	Gets the static details for the given id and type
	 *	Useful in cases where id is known and data needs to be fetched; say user name for a given id
	 *
	 *	@param id		: [String]	: id of the item
	 *	@param type		: [String]	: what item needs to be fetched; (send the stateKey of the corresponding bo) eg: employee, fleet
	 *
	 * @return staticData
	 **/
	getStaticDetails = (id: string, type: string): any => {

		// if (id.toUpperCase() == "SYSTEM") {
		// 	return {
		// 		id: "SYSTEM",
		// 		firstName: "SYSTEM"
		// 	}
		// }
		//
		// if (type == "fleet" || type == "vehicle") {
		// 	type = "fleet";
		// }
		//
		// var bo = {
		// 	state: "menu." + type
		// };
		//
		// if (type && type.split(".")[0] == "report") {
		// 	var bo = utilFactory.getBO(bo.state, "state");
		// 	var factory = $injector.get(bo.stateDef.factory);
		// 	if (factory) {
		// 		return utilFactory.findArrayObject("id", id, factory.data.clone);
		// 	}
		// } else {
		// 	var staticKey = utilFactory.getStaticDataKey(bo.state);
		// 	if (staticKey) {
		// 		return utilFactory.findArrayObject("id", id, staticData[staticKey]);
		// 	}
		// }

		return {};
	}

}
