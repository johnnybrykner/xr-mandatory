import { ReactInstance, Surface, Location } from "react-360-web";

function init(bundle, parent, options = {}) {
  const r360 = new ReactInstance(bundle, parent, {
    fullScreen: true,
    ...options,
  });

  const plane = new Surface(
    1000 /* width */,
    1000 /* height */,
    Surface.SurfaceShape.Flat /* shape */
  );
  plane.setAngle(0, Math.PI / 4);

  r360.renderToSurface(r360.createRoot("model_container", {}), plane);

  const cylinder = new Surface(
    2500 /* width */,
    1500 /* height */,
    Surface.SurfaceShape.Cylinder /* shape */
  );

  r360.renderToSurface(
    r360.createRoot("xr_mandatory", {
      /* initial props */
    }),
    cylinder
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
