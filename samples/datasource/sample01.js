// Custom Application Logic

class AppCustomizations {
  applicationInitialized(app) {
    this.app = app;

    // listen to event before-put-data fired on datasources
    this.onBeforePutData = this.onBeforePutData.bind(this);
    this.app.on('before-put-data', this.onBeforePutData);
  }

  pageInitialized(page, app) {
    this.app = app;
    this.page = page;
  }

  pageResumed(page, app) {
    this.app = app;
    this.page = page;
  }

  onDatasourceInitialized(datasource, owner, app) {
    if (['woDetailsReportWork', 'woDetailResource'].includes(datasource.name)) {
      this.onBeforeUpdateData = this.onBeforeUpdateData.bind(this);
      datasource.on('before-update-data', this.onBeforeUpdateData);
    }
    if (datasource.name === 'SOMEDATASOURCE') {
      this.onAfterInvokeAction = this.onAfterInvokeAction.bind(this);
      this.onBeforeInvokeAction = this.onBeforeInvokeAction.bind(this);
      datasource.on('after-invoke-action', this.onAfterInvokeAction);
      datasource.on('before-invoke-action', this.onBeforeInvokeAction);
    }
  }

  onBeforeUpdateData({ datasource, record, options }) {
    if (datasource.name === 'woDetailResource') {
      // logic
    }
    if (datasource.name === 'woDetailsReportWork') {
      // logic
    }
  }

  onAfterInvokeAction({ datasource, response, action, options }) {
    // check if action is changeStatus and coming from datasources where the change status can be called
    if (action === 'changeStatus' && ['todaywoassignedDS','woDetailResource', 'woDetailsReportWork'].includes(datasource.name)) {
      
      if (options.parameters.status === 'COMP') {
        // logic
      } 
    }
  }

  onBeforeInvokeAction({ datasource, action, options }) {
    if (action === 'changeStatus' && ['todaywoassignedDS','woDetailResource', 'woDetailsReportWork'].includes(datasource.name)) {
      // set memo to indicate status was changed from mobile
      options.parameters.memo = 'Mobile - ' + new Date().getTime() / 1000;
    }
  }

  onBeforePutData({ datasource, record, options }) {
    if (datasource.name === 'reportWorkMaterialDetailDs') {
      record.memo = datasource.item.memo;
    }
    if (datasource.name === 'reportworkLaborDetailds') {
      // add custom field from labour to payload
      if (datasource.item.customfield) {
        record.customfield = datasource.item.customfield;
      }
    }
  }
  
}

export default AppCustomizations;

