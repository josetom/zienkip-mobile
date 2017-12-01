import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { UtilitiesProvider } from '../../providers/utilities/utilities'

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	title: string = 'Home';

	latitude: number = 13.0353193;
	longitude: number = 80.250078;

	options: Object[] = [{ a: 'Jose Tom' }, { a: 'Ashwin' }, { a: 'Prashanth' }];

	constructor(public navCtrl: NavController, public utils: UtilitiesProvider) {

	}

}
