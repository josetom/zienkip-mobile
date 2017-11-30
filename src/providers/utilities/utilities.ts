import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class UtilitiesProvider {

	constructor(public http: HttpClient) {

	}

}
