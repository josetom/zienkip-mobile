import { Component, Input } from '@angular/core';
import { IManagementReportParams } from '../../model/interfaces/management.interface';

@Component({
	selector: 'ui-creator',
	templateUrl: 'ui-creator.html'
})
export class UiCreatorComponent implements UiCreatorAutocomplete {

	@Input() type: string;

	@Input() options: any[];

	constructor() {

	}

}

export interface UiCreator {
	/**
	 * Used for all ui components
	 **/
	type: string;
}

export interface UiCreatorAutocomplete extends UiCreator {

	/**
	 * Used for select / autocomplete components
	 **/
	options: any[];

}

export interface UiCreatorTable extends UiCreator {
	/**
	 * Report data
	 **/
	data: any[];

	/**
	 * Report params
	 **/
	reportParams: IManagementReportParams[];


}
