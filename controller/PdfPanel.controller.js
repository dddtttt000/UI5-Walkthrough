sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
  ],
  function (Controller, JSONModel) {
    "use strict"

    return Controller.extend("sap.ui.demo.walkthrough.controller.PdfPanel", {
      onInit: function () {
        var oViewModel = new JSONModel({
          currency: "EUR",
        })
        this.getView().setModel(oViewModel, "view")
        var oRouter = this.getOwnerComponent().getRouter()
        oRouter.getRoute("PDFView")
      },

      onShowViewImg: function () {
        if (!this.pDialog) {
          this.pDialog = this.loadFragment({
            name: "sap.ui.demo.walkthrough.view.PdfDialog",
          })
        }
        this.pDialog.then(function (oDialog) {
          oDialog.open()
        })
      },

      onCloseDialog: function () {
        // note: We don't need to chain to the pDialog promise, since this event-handler
        // is only called from within the loaded dialog itself.
        this.byId("PdfDialog").close()
      },

      onPress: function () {
        var oRouter = this.getOwnerComponent().getRouter()
        oRouter.navTo("PDFView")
      },
    })
  }
)
