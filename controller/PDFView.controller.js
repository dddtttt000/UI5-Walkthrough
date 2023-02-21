sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/routing/History",
    "libs/assets/pspdfkit",
  ],
  function (Controller, JSONModel, History) {
    "use strict"

    return Controller.extend("sap.ui.demo.walkthrough.controller.PDFView", {
      // onInit: function () {
      //   this.getView().setModel(
      //     new JSONModel({
      //       // pdfsource: ""
      //       pdfSource: "static/OpenUI5.pdf",
      //     })
      //   )
      // },
      onFileChange: function (oEvent) {
        var reader = new FileReader(),
          me = this
        reader.onload = function (oEvent) {
          me.getView()
            .getModel()
            .setProperty("/pdfsource", oEvent.target.result)
        }
        reader.readAsDataURL(oEvent.getParameter("files")[0])
      },
      onOpenPDFViewer: function (oEvent) {
        if (!this._oDialog) {
          this._oDialog = sap.ui.xmlfragment(
            "be.wl.PDFExample.view.dialog.PDFViewer",
            this
          )
          this.getView().addDependent(this._oDialog)
        }
        this._oDialog.open()
      },
      onShowPDF: function () {
        this._sValidPath = "/model/sample.pdf"
        this._sInvalidPath = sap.ui.require.toUrl(
          "sap/m/sample/PDFViewerEmbedded/sample_nonexisting.pdf"
        )
        this._oModel = new JSONModel({
          Source: this._sValidPath,
          Title: "PDF view now",
          Height: "600px",
        })
        this.getView().setModel(this._oModel)

        PSPDFKit.load({
          container: "#container-walkthrough---PDFView--pspdfkit",
          document: "document.pdf",
        })
          .then(function (instance) {
            console.log("PSPDFKit loaded", instance)
          })
          .catch(function (error) {
            console.error(error.message)
          })
      },

      onCorrectPathClick: function () {
        this._oModel.setProperty("/Source", this._sValidPath)
      },

      onIncorrectPathClick: function () {
        this._oModel.setProperty("/Source", this._sInvalidPath)
      },

      onNavBack: function () {
        var oHistory = History.getInstance()
        var sPreviousHash = oHistory.getPreviousHash()

        if (sPreviousHash !== undefined) {
          window.history.go(-1)
        } else {
          var oRouter = this.getOwnerComponent().getRouter()
          oRouter.navTo("overview", {}, true)
        }
      },
    })
  }
)
