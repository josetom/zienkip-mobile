import { Component, Input } from '@angular/core';

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
