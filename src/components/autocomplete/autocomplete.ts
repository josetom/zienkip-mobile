import { Component } from '@angular/core';

@Component({
	selector: 'autocomplete',
	templateUrl: 'autocomplete.html'
})
export class AutocompleteComponent {

	options: Object[] = [{ a: 'a' }, { a: 'b' }, { a: 'c' }];

	showAutocompleteSuggestions: boolean = false;

	onFocus: Function = () => {
		this.showAutocompleteSuggestions = true;
	}
	onBlur: Function = () => {
		this.showAutocompleteSuggestions = false;
	}

	constructor() {

	}

}
