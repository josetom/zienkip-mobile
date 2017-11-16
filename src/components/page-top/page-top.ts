import { Component, Input } from '@angular/core';

@Component({
	selector: 'page-top',
	templateUrl: 'page-top.html'
})
export class PageTopComponent {

	@Input() title: string;

	constructor() {
		this.title = this.title || 'Beecon';
	}

}
