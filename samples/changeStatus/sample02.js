// Custom Application Logic

class AppCustomizations {
  applicationInitialized(app) {
    this.app = app;
  }

  pageInitialized(page, app) {
    this.app = app;
    this.page = page;
  }

  _filterWOStatusList(dialog) {
    let parentView = dialog.parent;
    // current WO status
    let woStatus = parentView.state.woItem.status;
    let statusList = [];
    switch (woStatus) {
      case 'APPR':
        statusList = ['INPRG'];
        break;
      case 'INPRG':
        statusList = ['CUSTOMSTATUS1', 'CUSTOMSTATUS2'];
        break;
      case 'CUSTOMSTATUS1':
        statusList = ['INPRG'];
        break;
      case 'CUSTOMSTATUS2':
        statusList = ['COMP'];
        break;
      default:
        statusList = ['INVALID']; // remove all status from the pick up list
        break;
    }
    var statusDS = parentView.findDatasource('dsstatusDomainList');
    if (statusDS && statusDS.dataAdapter.items.length > 0 && statusList.length > 0) {
      let filteredStatus = statusDS.dataAdapter.items.filter((item) => {
        return statusList.includes(item.value);
      });
      console.log(TAG + ' Filtered Status -->', JSON.stringify(filteredStatus));
      statusDS.load({ src: filteredStatus, noCache: true });
    }
  }

  dialogOpened({ dialog }) {
    if (dialog.name == 'woStatusChangeDialog') {
      this._filterWOStatusList(dialog);
    }
  }

  dialogInitialized(dialog) {
    if (dialog.name == 'woStatusChangeDialog') {
      // Filtering the data for the fist change status dialog loading
      this._filterWOStatusList(dialog);
    }
  }
  
}

export default AppCustomizations;
