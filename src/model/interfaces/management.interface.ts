export interface IManagement {

    /**
     * Contains the items which can get modified in functions
     **/
	data: IManagementData;

    /**
	 * Loads the factory data
     *
     * @param forceReload : (Optional) Force reload the data even if data exists
	 **/
	loadData(forceReload: boolean): any;

    /**
     *  Success call back function for data load request
     *
     *  @param data    : Response data
     **/
	onLoadDataSuccess(data: any);

    /**
     *  Failure call back function for data load request
     *
     *  @param data    : Response data
     **/
	onLoadDataFailure(data: any);

}

export interface IManagementData {
    /**
     * Contains the items which can get modified in functions
     **/
	items: any[];

    /**
     * Report parameters for the management screen
     **/
	reportParams: IManagementReportParams[];

    /**
     * Contains the clone of items which will not get updated unless underlying object is updated in server
     **/
	clone: any[];

    /**
     * Aggregated stats of the items
     **/
	stats: any;
}

export interface IManagementReportParams {

	/**
	 * Column Id
	 **/
	colId: string;

	/**
	 * Server special handling
	 **/
	sh?: boolean;

	/**
	 * UI Meta
	 **/
	meta?: IManagementReportMeta;

}

export interface IManagementReportMeta {

	/**
	 * UI Special Handling
	 **/
	uish?: string;

	/**
	 * Display name
	 **/
	dn?: string;

	/**
	 * Display Order
	 **/
	do?: string;

	/**
	 * Visibility
	 **/
	v?: boolean;

	/**
	 * Filter
	 **/
	f?: string;

	/**
	 * Style
	 **/
	s?: any;

	/**
	 * Parent Object
	 **/
	p?: any;

	/**
	 * Async
	 **/
	q?: boolean;

	/**
	 * Column is sortable or not
	 **/
	sortable?: boolean;

	/**
	 * Click params
	 **/
	click?: string;

	/**
	 * Array of actions
	 **/
	actions?: IManagementActions[];
}

export interface IManagementActions {

	/**
	 * Details for function that decides whether the action is visible or not
	 **/
	show: any,

	/**
	 * Class
	 **/
	class: string,

	/**
	 * Click function details
	 **/
	click: any,

	/**
	 * Tooltip for the action
	 **/
	tooltip: string,

	/**
	 * Image class
	 **/
	imgClass: string,

	/**
	 * Aria label
	 **/
	ariaLabel: string
}
