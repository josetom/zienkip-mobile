import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';

@IonicPage()
@Component({
	selector: 'page-root',
	templateUrl: 'root.html',
})
export class RootPage {

	rootPage: any = HomePage;

	pages: Array<{ title: string, component: any }> = [{ title: "Login", component: HomePage }, { title: "Home", component: HomePage }];
	openPage: Function = function(page: any) {
		// this.utils.go(page.component, page);
		this.navCtrl.push(page.component, {
			item: page
		});
	};

	constructor(public navCtrl: NavController, public navParams: NavParams) {
	}

	ionViewDidLoad() {

	}

}
