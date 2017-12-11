import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import { Platform, AlertController } from 'ionic-angular';

import { LoggerProvider } from '../logger/logger';
import { StaticDataProvider } from '../static-data/static-data';

// import { PushNotification } from '../../native/push-notification/push-notification';

@Injectable()
export class UtilitiesProvider {

	constructor(private http: HttpClient, private LOGGER: LoggerProvider, private platform: Platform, private alertCtrl: AlertController, private storage: Storage) {

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
	 * @return Observable<any>
	 **/
	httpRequest: Function = (method: string, url: string, data: any, httpOptions: any): Observable<any> => {
		let defaultHttpOptions = {
			headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + StaticDataProvider.token })
		};
		httpOptions = Object.assign(defaultHttpOptions, httpOptions);
		return this.http.post(url, data, httpOptions);
	}

	/**
	 * Checks if a given object is empty or not
	 *
	 * @param obj : object to be checked
	 *
	 * @return boolean
	 **/
	isEmpty = function(obj) {
		if (obj == null) return true;
		if (typeof obj === "boolean") return false;
		else if (obj instanceof String) {
			if (obj.trim().length > 0) return false;
			if (obj.trim().length === 0) return true;
		} else if (obj instanceof Date) {
			return "Invalid Date" == obj.toString();
		} else if (typeof obj == "number") {
			return isNaN(obj);
		} else {
			if (obj.length > 0) return false;
			if (obj.length === 0) return true;
		}
		for (var key in obj) {
			if (Object.hasOwnProperty.call(obj, key)) return false;
		}

		return true;
	};

	/**
	 * Function to set token and bos
	 *
	 * @param token : Token string
	 * @param bos : api url
	 **/
	postLogin: Function = (token: string, bos: any): void => {
		StaticDataProvider.token = token;
		StaticDataProvider.bos = bos;

		var tokenString = JSON.stringify(token);
		if (tokenString) {
			var token = tokenString.substring(1, tokenString.length - 1);
			this.storage.set('kipenzi-token', token);
		}

		var boString = JSON.stringify(bos);
		if (boString) {
			this.storage.set('kipenzi-bos', boString);
		}

		this.initNativeComponents();
	}

	showAlert: Function = (title: string, message: string, buttons: Array<string>) => {
		this.alertCtrl.create({
			title: title,
			subTitle: message,
			buttons: buttons
		}).present();
	}


	private initNativeComponents: Function = () => {
		this.LOGGER.debug("Initializing native plugins", this.platform);
		if (this.platform.is('cordova')) {
			// PushNotification.init();
		}
	}

}
