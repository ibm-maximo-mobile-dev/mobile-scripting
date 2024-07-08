// Custom Application Logic

class AppCustomizations {
  applicationInitialized(app) {
    this.app = app;
  }

  pageInitialized(page, app) {
    this.app = app;
    this.page = page;
  }

  /**
   * Validate the workorder object before changing the status
   * @param {Object} param - Object containing the new Status, app, page, and the AppCustomization scope
   */
  async onBeforeChangeStatus({ newStatus, dialog }) {
    let { valid, message } = await this.canChangeStatus(newStatus);

    if (!valid) {
      this.app.error(message);
      dialog.state.canChangeStatus = false;
    }
  }

  /**
   * Checks if the current user can change the status of the work order to the specified new status.
   *
   * @param {string} newStatus - the new status to be checked
   * @return {Object} an object containing the validity of the status change and a message explaining the result
   */
  async canChangeStatus(newStatus) {
    let workorder = this.page.name === 'schedule' ? this.page.state.woItem : this.page.getMainDatasource().currentItem;
    let valid = true;
    let message = '';
    if (workorder) {
      if (newStatus === 'INPRG') {
        // Pass an array of values to check whether the last work log is one of the types
        // valid = await this._checkLogExist(workorder, ['UPDATE','WORK'])
        valid = await this._checkLogExist(workorder, 'UPDATE')
        message = 'A work log of type UPDATE is required to change the status to INPRG';
      } 
    }
    return { valid, message };
  }

  /**
   * Check if the latest log for a given work order exists with a given log type.
   *
   * @param {Object} workorder - The work order object
   * @param {string|string[]} logtype - The log type or an array of log types to check
   * @return {boolean} True if the log exists, false otherwise
   */
  async _checkLogExist(workorder, logtype) {
    let worklogDsResource = 'woDetailsWorklogDs';

    if (this.page.name === 'schedule') {
      worklogDsResource = 'woWorklogDs';
      const wodetails = this.page.findDatasource('wodetails');
      await wodetails.load({ noCache: true, itemUrl: workorder.href });
    }

    const woWorkLogDs = this.page.findDatasource(worklogDsResource);
    await woWorkLogDs.load();
    const items = woWorkLogDs.getItems();
    if (items.length) {
      if (Array.isArray(logtype)) {
        // The latest log is included in the logtype list
        if (logtype.includes(items[0].logtype)) return true;
      }
      
      if (logtype === items[0].logtype) return true;
    }

    return false;
  }

  dialogInitialized(dialog) {
    if (dialog.name == 'woStatusChangeDialog') {
      let controller = dialog.controllers[0];
      // Save the OOTB Change status function
      let coreChangeStatus = controller.changeStatus.bind(controller);

      // initialise state
      dialog.state.canChangeStatus = true;
      controller.changeStatus = async (evt) => {
        
        await this.onBeforeChangeStatus({
          newStatus: dialog.state.selectedStatus,
          dialog,
        });
        console.log('[%s] - Can change status: %b', dialog.name, dialog.state.canChangeStatus);

        if (dialog.state.canChangeStatus) {
          // change the WO status
          coreChangeStatus();
        } else {
          // clean up and close the dialogue
          dialog.state.canChangeStatus = true;
          dialog.closeDialog();
        }
      };
    }
  }

  dialogOpened({ dialog }) {
    if (dialog.name === 'woStatusChangeDialog') {
      // initialise state
      dialog.state.canChangeStatus = true;
    }
  }
}

export default AppCustomizations;
