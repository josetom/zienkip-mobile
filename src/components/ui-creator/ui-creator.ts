import { Component, Input } from '@angular/core';

@Component({
	selector: 'ui-creator',
	templateUrl: 'ui-creator.html'
})
export class UiCreatorComponent {

	@Input() type: string;
	@Input() options: Object[];

	constructor() {

	}

}
