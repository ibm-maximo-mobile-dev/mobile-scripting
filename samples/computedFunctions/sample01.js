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
   * Called only once in the lifetime of the datasource.
   *
   * @param {Datasource} datasource  Datasource instance.
   * @param {Page} owner - Owner of the datasource.  Usually the Page or Application.
   * @param {Application} app - Application instance.
   */
  onDatasourceInitialized(datasource, owner, app) {
    if (datasource.name === 'assetDetailsDS') {
      datasource.controllers[0].computedClassification = this.computedClassification;
    }
  }

  /**
   * Concat the hierarchypath and the classification description
   * @param {Object} item Current Object from the Datasource
   * @returns {String}
   */
  computedClassification(item) {
    return item.hierarchypath + ' - ' + item.classstructure.description;
  }
}

export default AppCustomizations;
