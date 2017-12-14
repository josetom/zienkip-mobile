export class Constants {

	static DEVICE: string = "MOBILE-APP";

	// api
	static API_LOGIN: string = "/api/login";
	static API_AUTHENTICATE: string = "/api/authenticate";
	static API_ENTITY: string = "/api/trade/fleet/entity";
	static API_STATIC: string = "/api/trade/fleet/static";

	// http methods
	static HTTP_GET: string = "get";
	static HTTP_POST: string = "post";

	// maps
	static MAPS_API_KEY: string = 'AIzaSyBZwjtfxXrP_lYHayzysutAU8ucbrwky-E';
	static MAPS_REGION: string = 'IN';

	// params static data load
	static PARAMS_STATIC_DATA_LOAD: any = {
		UI_CONSTANTS: {
			ACTION: "filterTypeSubtype",
			TYPE: "constants",
			SUBTYPE: "ui"
		},
		UI_CONSTANT_FILES: [
			{
				KEY: 'moment-timezone',
				FILE_PATH: '../node_modules/moment-timezone/data/meta/latest.json'
			}
		]
	}
}
