import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';

import { LoggerProvider } from '../logger/logger'

@Injectable()
export class UtilitiesProvider {

	httpRequest: Function = (method: string, url: string, data: any, httpOptions: any): Observable<any> => {
		httpOptions = {
			headers: new HttpHeaders({ 'Content-Type': 'application/json' })
		};
		return this.http.post(url, data, httpOptions);
	}

	constructor(protected http: HttpClient, protected LOGGER: LoggerProvider) {

	}

}
