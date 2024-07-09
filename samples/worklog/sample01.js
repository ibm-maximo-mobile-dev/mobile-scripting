// Custom Application Logic

class AppCustomizations {
  applicationInitialized(app) {
    this.app = app;
  }

  pageInitialized(page, app) {
    this.app = app;
    this.page = page;
  }


  onAfterLoadData(datasource, items, query) {
    if (datasource.name === 'woWorklogDs' || datasource.name === 'woDetailsWorklogDs') {
      /**
       * This will loop into each worklog and add the logtype to the user name
       */
      items.forEach((item) => {
        item.createby = `${item.createby} - ${item.logtype}`;
      });
    }
  }
}

export default AppCustomizations;
