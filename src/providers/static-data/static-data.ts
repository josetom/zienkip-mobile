import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class StaticDataProvider {

	bos: any;

	constructor(public http: HttpClient) {

	}

}
