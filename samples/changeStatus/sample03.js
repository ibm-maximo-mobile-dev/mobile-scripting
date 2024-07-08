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
  onBeforeChangeStatus({ newStatus, dialog }) {
    let { valid, message } = this.canChangeStatus(newStatus);

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
  canChangeStatus(newStatus) {
    let workorder = this.page.name === 'schedule' ? this.page.state.woItem : this.page.getMainDatasource().currentItem;
    let valid = true;
    let message = '';
    if (workorder) {
      if (newStatus === 'INPRG') {
        valid = !!workorder.schedstart;
        message = 'A value is required for the Scheduled Start field on the WORKORDER object.';
      } 
    }
    return { valid, message };
  }

  /**
   * Custom Complete Work validation on Report Work Page
   * Runs the same validations from the changeStatus button
   * 
   * *********
   * Replace the Complete Work button on-click function by customCompleteWork
   * To get the same validations when completing the WO from the Report Page.
   * You may need to modify the woDetailsReportWork datasource and add the attributes
   * you are using to validate.
   * *********
   *
   * @param {ButtonEventArgs} evt Event on click button
   */
  async customCompleteWorkorder(evt) {
    const { status } = evt;
    let { valid, message } = await this.canChangeStatus(status);

    if (!valid) {
      this.app.error(message);
    } else {
      this.page.callController('completeWorkorder', evt);
    }
  }

  dialogInitialized(dialog) {
    if (dialog.name == 'woStatusChangeDialog') {
      let controller = dialog.controllers[0];
      // Save the OOTB Change status function
      let coreChangeStatus = controller.changeStatus.bind(controller);

      // initialise state
      dialog.state.canChangeStatus = true;
      controller.changeStatus = async (evt) => {
        
        this.onBeforeChangeStatus({
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
