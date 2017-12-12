import { Component, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ControlPosition, MapTypeControlStyle, MapTypeControlOptions, StreetViewControlOptions, FullscreenControlOptions } from '@agm/core/services/google-maps-types'
import { AgmMap, MapsAPILoader } from '@agm/core';

import { UtilitiesProvider } from '../../providers/utilities/utilities';
import { LoggerProvider } from '../../providers/logger/logger';

@Component({
	selector: 'maps',
	templateUrl: 'maps.html'
})
export class MapsComponent implements OnChanges {

	@ViewChild(AgmMap) public agmMap: AgmMap

	@Input() latitude: number;
	@Input() longitude: number;

	/**
	 * Use mapMarkers in the component; markers is only for receiving input
	 **/
	@Input() markers: Array<any>;
	@Input() options: MapOptions;
	@Input() onDataChange: Function;

	/**
	 * Use mapMarkers in the component; markers is only for receiving input
	 **/
	mapMarkers: Array<any>;

	generateBounds: Function = (markers) => {
		let google: any = window['google'];

		this.LOGGER.log("generating bounds for ", markers);

		if (google && markers && markers.length > 0) {
			var bounds = new google.maps.LatLngBounds();

			markers.forEach((marker: any) => {
				if (!this.utils.isEmpty(marker.latitude) && !this.utils.isEmpty(marker.longitude)) {
					bounds.extend(new google.maps.LatLng({ lat: marker.latitude, lng: marker.longitude }));
				}
			});

			//check if there is only one marker
			if (bounds.getNorthEast().equals(bounds.getSouthWest())) {
				var extendPoint = new google.maps.LatLng(bounds.getNorthEast().lat() + 0.01, bounds.getNorthEast().lng() + 0.01);
				bounds.extend(extendPoint);
			}

			return {
				northeast: {
					latitude: bounds.getNorthEast().lat(),
					longitude: bounds.getNorthEast().lng()
				},
				southwest: {
					latitude: bounds.getSouthWest().lat(),
					longitude: bounds.getSouthWest().lng()
				}
			}
		}
		//return empty object when no bundle selected
		return {};
	}

	clickMarker: Function = (marker: any) => {
		// this.LOGGER.debug('clicked marker', marker);
	}

	constructor(private utils: UtilitiesProvider, private mapsAPILoader: MapsAPILoader, private LOGGER: LoggerProvider) {

		let defaultOptions = {
			mapTypeControl: false,
			mapTypeControlOptions: { style: MapTypeControlStyle.DEFAULT, position: ControlPosition.BOTTOM_CENTER },
			streetViewControl: false,
			streetViewControlOptions: { position: ControlPosition.TOP_RIGHT },
			fullscreenControl: false,
			fullscreenControlOptions: { position: ControlPosition.RIGHT_CENTER }
		}
		this.options = Object.assign(defaultOptions, this.options)

	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes.markers) {
			this.mapMarkers = this.onDataChange(changes.markers.currentValue);
			this.options.latLngBounds = this.generateBounds(this.mapMarkers);

			if (!this.utils.isEmpty(this.options.latLngBounds) && !this.utils.isEmpty(this.options.latLngBounds.northeast) && !this.utils.isEmpty(this.options.latLngBounds.southwest)) {
				this.latitude = (this.options.latLngBounds.northeast.latitude + this.options.latLngBounds.southwest.latitude) / 2;
				this.longitude = (this.options.latLngBounds.northeast.longitude + this.options.latLngBounds.southwest.longitude) / 2;
			}
			// this.agmMap.triggerResize(true);
		}
	}
}

export interface MapOptions {
	latLngBounds: any,
	mapTypeControl: boolean;
	mapTypeControlOptions: MapTypeControlOptions;
	streetViewControl: boolean;
	streetViewControlOptions: StreetViewControlOptions;
	fullscreenControl: boolean;
	fullscreenControlOptions: FullscreenControlOptions;
}
