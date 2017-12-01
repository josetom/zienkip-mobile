import { Component, Input } from '@angular/core';

@Component({
	selector: 'autocomplete',
	templateUrl: 'autocomplete.html'
})
export class AutocompleteComponent {

	@Input() options: Object[];

	inputText: string;

	showAutocompleteSuggestions: boolean = false;

	onFocus: Function = () => {
		this.showAutocompleteSuggestions = true;
	}
	onBlur: Function = () => {
		this.showAutocompleteSuggestions = false;
	}

	onItemClick: Function = (event: Event, caller: any) => {
		console.log(event, caller);
		this.inputText = caller.a;
		this.onBlur();
	}

	constructor() {

	}

}
