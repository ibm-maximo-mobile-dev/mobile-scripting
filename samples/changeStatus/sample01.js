// Custom Application Logic
/**
 * Restrict the list of WO Status values
(Author: Steven Shull)

October 2022

This document provides information on how a MAF (Maximo Mobile or Role-based ) application, such as Technician (TECHMOBILE), can be configured to support different use cases.

In the example that follows, changes will be made to the app.xml and AppCustomization.js of TECHMOBILE on release 8.9.  The goal of this example is to restrict the list of available WO statuses that the user can choose in the Technician application.


Overview

In the Maximo Mobile Technician (TECHMOBILE) application, it displays to users all WO statuses allowed on the record. An organization may want to restrict this to a subset of statuses for all users that are using the Technician application. For example, you may not want users to be able to change the status to COMP,  but allow the status to be changed to a synonym of COMP (such as CUSTOMCOMP). 

The Technician app loads Status data, from either a) synonymdomain (when running as a mobile app) or b) getting allowedstates for each Work Order from the REST API (when running from browser), into a JSON data source called dsstatusDomainList. 

Filtering the synonym domain data source is an issue because Maximo Mobile needs to have all statuses to know what state the WO is in and to allow/disallow certain changes. Since modifying the synonym domain data source would impact core functionality, we need an alternative method to restrict statuses.  As well, changing just the synonym domain datasource would not impact the application when it is run from the browser (non-mobile use).

**Solution Summary**: 
We will create an "onAfterLoadData" method in our AppCustomizations.js. This method has two arguments (dataSource & items) that are passed in. This will fire for each datasource so we need to check the dataSource name to ensure it's the one we need. 

We will generate a separate array of items we want to remove from the list by filtering the array with a function we define called woStatusFilter. For each item in the list, it will execute the function (providing just a single value) that we then compare based on our hardcoded array of allowed values. Because we want to return items we want to delete (not keep), we return the inverse by using the exclamation mark (!). We then call the dataSource.deleteItems to remove all items in our filtered list.

NOTE: You should NOT call deleteItems on most data sources as that will flag the record for deletion in Maximo. Since this data source is a temporary JSON data source on the device, we're able to safely remove records from it without impacting data in Maximo. You could also utilize the setQbe functionality to filter the dataset. 
 */
class AppCustomizations {
  applicationInitialized(app) {
    this.app = app;
  }

  pageInitialized(page, app) {
    this.app = app;
    this.page = page;
  }

  woStatusFilter(item) {
    // Because this will return items to delete, we need the "inverse" of our desired results.
    return !['WMATL', 'INPRG', 'CUSTOMCOMP'].includes(item.value);
  }

  async onAfterLoadData(dataSource, items) {
    if (dataSource && dataSource.name === 'dsstatusDomainList') {
      // Ensure we have at least one record
      if (items && items.length > 0) {
        let filteredItems = items.filter(this.woStatusFilter);
        await dataSource.deleteItems(filteredItems);
      }
    }
  }
}

export default AppCustomizations;
