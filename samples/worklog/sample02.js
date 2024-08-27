// Custom Application Logic

class AppCustomizations {
  applicationInitialized(app) {
    this.app = app;
  }

  pageInitialized(page, app) {
    this.app = app;
    this.page = page;
  }

  pageResumed(page, app) {
    this.app = app;
    this.page = page;
  }

  /**
  * Set the default work log type
  */
  dialogOpened({ dialog }) {
    if (dialog.name === 'workLogDrawer' || dialog.name === 'woWorkLogDrawer') {
      this.page.state.initialDefaultLogType = '!TECHNOTE!';
    }
  }
}

export default AppCustomizations;
