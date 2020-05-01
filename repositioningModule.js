import { Module } from "react-360-web";

export default class repositioningModule extends Module {
  constructor(ctx) {
    super("repositioningModule"); // Makes this module available at NativeModules.repositioningModule
    this._rnctx = ctx;
    console.log(this._rnctx);
  }

  something() {
    console.log(this._rnctx);
  }
  // This method will be exposed to the React app
  $getConfirmation(message, resolve, reject) {
    const result = window.confirm(message);
    if (this._rnctx) {
      console.log("sucka");
      if (result) {
        this._rnctx.invokeCallback(resolve, result);
      } else {
        // When rejecting a Promise, a message should be provided to populate
        // the Error object on the React side
        this._rnctx.invokeCallback(reject, [
          { message: "Canceled the dialog" },
        ]);
      }
    }
  }
}
