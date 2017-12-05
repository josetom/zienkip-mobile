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
	reportParams: any[];

    /**
     * Contains the clone of items which will not get updated unless underlying object is updated in server
     **/
	clone: any[];

    /**
     * Aggregated stats of the items
     **/
	stats: any;
}
