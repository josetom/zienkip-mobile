import { Component, Input } from '@angular/core';

import { LoggerProvider } from '../../providers/logger/logger';

import { UiCreatorComponent, UiCreatorAutocomplete } from '../ui-creator/ui-creator';

@Component({
	selector: 'autocomplete',
	templateUrl: 'autocomplete.html'
})
export class AutocompleteComponent implements UiCreatorAutocomplete {

	@Input() type: string;

	@Input() options: any[];

	inputText: string;

	showAutocompleteSuggestions: boolean = false;

	onFocus: Function = () => {
		this.showAutocompleteSuggestions = true;
	}

	onBlur: Function = () => {
		this.showAutocompleteSuggestions = false;
	}

	onSearchTextChange: Function = (event: Event) => {
		this.onFocus();
	}

	onItemClick: Function = (event: Event, caller: any) => {
		this.inputText = caller.regNo;
		this.onBlur();
	}

	constructor(private LOGGER: LoggerProvider) {

	}

}
