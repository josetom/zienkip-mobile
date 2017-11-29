import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
@Component({
	templateUrl: 'app.html'
})
export class Beecon {
	rootPage: any = HomePage;
	pages: Array<{ title: string, component: any }>;
	openPage: Function = function(page: any) {
		console.log(page);
	};

	constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
		this.pages = [{ title: "1", component: HomePage }, { title: "2", component: HomePage }, { title: "3", component: HomePage }]
		platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			statusBar.styleDefault();
			splashScreen.hide();
		});
	}
}
