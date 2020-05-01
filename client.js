// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"

import { ReactInstance, Surface, Location } from "react-360-web";
import repositioningModule from "./repositioningModule";

function init(bundle, parent, options = {}) {
  const r360 = new ReactInstance(bundle, parent, {
    nativeModules: [(ctx) => new repositioningModule(ctx)],
    fullScreen: true,
    ...options,
  });

  const plane = new Surface(
    1000 /* width */,
    1000 /* height */,
    Surface.SurfaceShape.Flat /* shape */
  );
  plane.setAngle(0, -Math.PI / 2);

  r360.renderToSurface(r360.createRoot("model_container", {}), plane);

  // Render your app content to the default cylinder surface
  r360.renderToSurface(
    r360.createRoot("xr_mandatory", {
      /* initial props */
    }),
    r360.getDefaultSurface()
  );

  // r360.renderToLocation(
  //   r360.createRoot('model', {
  //   }),
  //   new Location([0, 0, 3])
  // );

  // Load the initial environment
  r360.compositor.setBackground(r360.getAssetURL("360_world.jpg"));
}

window.React360 = { init };
