import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { LoggerProvider } from '../../providers/logger/logger';
import { UtilitiesProvider } from '../../providers/utilities/utilities';
import { StaticDataProvider } from '../../providers/static-data/static-data';

import { Employee } from '../../model/vo/vo.entity';
import { Constants } from '../../model/constants/constants';

import { RootPage } from '../root/root';

@IonicPage()
@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})

export class LoginPage {

	user: Employee = new Employee();

	constructor(public navCtrl: NavController, public navParams: NavParams, private LOGGER: LoggerProvider, private utils: UtilitiesProvider, private storage: Storage) {
	}

	private loginSuccess: Function = (data) => {
		if (data.token) {
			this.LOGGER.debug("login successful", data);

			var tokenString = JSON.stringify(data.token);
			if (tokenString) {
				var token = tokenString.substring(1, tokenString.length - 1);
				this.storage.set("kipenzi-token", token);
			}

			var boString = JSON.stringify(data.bos);
			if (boString) {
				this.storage.set("kipenzi-bos", boString);
			}

			this.utils.postLogin(data.token, data.bos);
			this.navCtrl.push(RootPage, { token: token });

		} else {
			this.loginFailure(data);
		}

		// else {
		// 	if (data && data.errorType == "beeconAppError") {
		// 		sweetAlert({
		// 			title: "Oops !",
		// 			text: data.message || "Unable to login. Please contact support",
		// 			type: "error"
		// 		});
		// 	} else {
		// 		$scope.showLoginAlert = true;
		// 	}
		// },
	}

	private loginFailure: Function = (data) => {
		this.LOGGER.debug("login failed", data);
		// sweetAlert({
		// 			title: "Oops !",
		// 			text: "Unable to login. Please contact support",
		// 			type: "error"
		// 		});
	}

	login: Function = () => {

		let data: any = {
			username: this.user.email,
			password: this.user.password,
			device: Constants.DEVICE,
			domain: window.location.origin
		}

		this.utils.httpRequest(Constants.HTTP_POST, Constants.URL_LOGIN, data).subscribe(this.loginSuccess, this.loginFailure);


	}

}
