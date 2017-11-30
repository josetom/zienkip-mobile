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

	rootPage: any = HomePage;

	pages: Array<{ title: string, component: any }> = [{ title: "Login", component: HomePage }, { title: "Home", component: HomePage }];
	openPage: Function = function(page: any) {
		// this.utils.go(page.component, page);
		this.navCtrl.push(page.component, {
			item: page
		});
	};

	constructor(public navCtrl: NavController, public utils: UtilitiesProvider) {

	}

}
