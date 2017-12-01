import { Component, Input } from '@angular/core';

@Component({
	selector: 'autocomplete',
	templateUrl: 'autocomplete.html'
})
export class AutocompleteComponent {

	@Input() options: Object[];

	showAutocompleteSuggestions: boolean = false;

	onFocus: Function = () => {
		this.showAutocompleteSuggestions = true;
	}
	onBlur: Function = () => {
		this.showAutocompleteSuggestions = false;
	}

	onItemClick: Function = (event: Event, caller: Object) => {
		console.log(event, caller);
	}

	constructor() {

	}

}
