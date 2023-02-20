sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    // "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel",
  ],
  function (Controller, JSONModel) {
    "use strict"

    return Controller.extend("sap.ui.demo.walkthrough.controller.PdfPanel", {
      onShowPDF: function () {
        // this._sValidPath = sap.ui.require.toUrl("./model/sample.pdf")
        this._sValidPath =
          "https://github.com/dddtttt000/UI5-Walkthrough/blob/main/model/sample.pdf"
        console.log("this._sValidPath ===>", this._sValidPath)
        this._sInvalidPath = sap.ui.require.toUrl(
          "sap/m/sample/PDFViewerEmbedded/sample_nonexisting.pdf"
        )
        this._oModel = new JSONModel({
          Source: this._sValidPath,
          Title: "PDF view now",
          Height: "600px",
        })
        this.getView().setModel(this._oModel)
      },

      onCorrectPathClick: function () {
        this._oModel.setProperty("/Source", this._sValidPath)
      },

      onIncorrectPathClick: function () {
        this._oModel.setProperty("/Source", this._sInvalidPath)
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
    })
  }
)
