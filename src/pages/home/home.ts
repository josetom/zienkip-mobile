import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	title: string = 'Home';

	latitude: number = 13.0353193;
	longitude: number = 80.250078;

	constructor(public navCtrl: NavController) {

	}

}
