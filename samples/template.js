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
}

export default AppCustomizations;
