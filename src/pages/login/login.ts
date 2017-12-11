import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

export class LoginPage implements OnInit {

	user: Employee = new Employee();

	loginAlert: any = {
		visible: false,
		alertTitle: 'Login Failed',
		alertText: 'Unable to login. Please contact support'
	};

	private loadingCancelHook: Function;

	constructor(public navCtrl: NavController, public navParams: NavParams, private LOGGER: LoggerProvider, private utils: UtilitiesProvider) {
	}

	ngOnInit() {
		// this.loadingCancelHook = this.utils.showLoading('Loading ...');
		// this.utils.authenticate(this.loginSuccess, () => { this.loadingCancelHook.apply(this, []); })
	}

	private loginSuccess: Function = (data) => {
		if (data.token) {
			this.LOGGER.debug('login successful', data);

			this.utils.postLogin(data.token, data.bos);
			this.navCtrl.push(RootPage, { token: data.token });

			if (this.loadingCancelHook) {
				this.loadingCancelHook.apply(this, []);
			}

		} else {
			this.loginFailure(data);
		}

	}

	private loginFailure: Function = (data) => {
		this.LOGGER.debug('login failed', data);
		if (data && data.errorType == 'beeconAppError') {
			this.loginAlert.visible = true;
			this.loginAlert.alertText = data.message || 'Unable to login. Please contact support';
		} else {
			this.loginAlert.visible = true;
			this.loginAlert.alertText = data.message || 'Unable to login. Please contact support';
		}

		if (this.loadingCancelHook) {
			this.loadingCancelHook.apply(this, []);
		}

		this.utils.showAlert(this.loginAlert.alertTitle, this.loginAlert.alertText, ['OK']);

	}

	private login: Function = () => {

		this.loadingCancelHook = this.utils.showLoading('Logging in ...');

		let data: any = {
			username: this.user.email,
			password: this.user.password,
			device: Constants.DEVICE,
			domain: window.location.origin
		}

		this.utils.httpRequest(Constants.HTTP_POST, Constants.URL_LOGIN, data).subscribe(this.loginSuccess, this.loginFailure);

	}

}
