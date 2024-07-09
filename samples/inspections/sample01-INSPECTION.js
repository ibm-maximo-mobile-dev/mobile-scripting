// Custom Application Logic

class AppCustomizations {
  applicationInitialized(app) {
    this.app = app;
  }

  pageInitialized(page, app) {
    this.app = app;
    this.page = page;
  }

  onDatasourceInitialized(datasource, owner, app) {
    if (datasource.name === 'executeInspections') {
      datasource.on('after-invoke-action', this.onAfterInvokeAction);
    }
  }

  onAfterLoadData(datasource, items, query) {
    if (datasource.name === 'assignedworktolist' || datasource.name === 'executeInspections') {
      let inspStatusList = JSON.parse(localStorage.getItem('inspStatusList'));
      items.forEach((item) => {
        if (inspStatusList?.[item.inspectionresultid] !== item.status) {
          this._saveToLocalStorage(item);
        }
      });
    }
  }

  onAfterInvokeAction({ datasource, action, options, response }) {
    if (datasource.name === 'executeInspections' && action === 'changeResultStatusMobile') {
      const { record, parameters } = options;
      this._saveToLocalStorage(record, parameters.status);
    }
  }

  _saveToLocalStorage(insp, status) {
    let inspStatusList = JSON.parse(localStorage.getItem('inspStatusList'));
    if (!inspStatusList) inspStatusList = {};
    inspStatusList[insp.inspectionresultid] = status || insp.status;
    localStorage.setItem('inspStatusList', JSON.stringify(inspStatusList));
  }
}

export default AppCustomizations;
