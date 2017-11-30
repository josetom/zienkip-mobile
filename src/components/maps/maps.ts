import { Component, Input } from '@angular/core';
import { ControlPosition, MapTypeControlStyle, MapTypeControlOptions, StreetViewControlOptions, FullscreenControlOptions } from '@agm/core/services/google-maps-types'

@Component({
	selector: 'maps',
	templateUrl: 'maps.html'
})
export class MapsComponent {

	@Input() latitude: number;
	@Input() longitude: number;
	@Input() streetViewControl: boolean;
	@Input() mapTypeControl: boolean;
	@Input() fullscreenControl: boolean;

	mapTypeControlOptions: MapTypeControlOptions = { style: MapTypeControlStyle.DEFAULT, position: ControlPosition.BOTTOM_CENTER };
	streetViewControlOptions: StreetViewControlOptions = { position: ControlPosition.TOP_RIGHT };
	fullscreenControlOptions: FullscreenControlOptions = { position: ControlPosition.RIGHT_CENTER };

	constructor() {

	}

}
