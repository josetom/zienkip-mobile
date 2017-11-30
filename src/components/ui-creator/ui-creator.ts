import { Component, Input } from '@angular/core';

@Component({
	selector: 'ui-creator',
	templateUrl: 'ui-creator.html'
})
export class UiCreatorComponent {

	@Input() type: string;

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
