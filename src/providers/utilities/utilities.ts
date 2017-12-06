import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

import { LoggerProvider } from '../logger/logger';
import { StaticDataProvider } from '../static-data/static-data';

@Injectable()
export class UtilitiesProvider {

	constructor(private http: HttpClient, private LOGGER: LoggerProvider) {

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
	 * Function to set token and bos
	 *
	 * @param token : Token string
	 * @param bos : api url
	 **/
	postLogin: Function = (token: string, bos: any): void => {
		StaticDataProvider.token = token;
		StaticDataProvider.bos = bos;
	}

}
