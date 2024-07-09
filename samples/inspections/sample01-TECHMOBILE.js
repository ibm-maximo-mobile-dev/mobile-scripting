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
   * Check if Inspection form has been completed
   * @param {object} workorder Workorder item
   * @returns {boolean} True if inspection is completed. Otherwise, false
   */
  checkInspection(workorder) {
    let inspStatusList = JSON.parse(localStorage.getItem('inspStatusList'));
    let inspection = workorder?.inspectionresult?.[0].inspresultid;
    if (!inspStatusList || !inspection || !(inspStatusList?.[inspection] === 'COMPLETED')) {
      return false;
    }
    
    return true;
  }
}

export default AppCustomizations;
