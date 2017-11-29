import { Component, Input } from '@angular/core';

@Component({
	selector: 'maps',
	templateUrl: 'maps.html',
	// styles: ['maps.scss']
})
export class MapsComponent {

	@Input() latitude: number;
	@Input() longitude: number;

	constructor() {

	}

}
