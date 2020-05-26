import { ReactInstance, Surface, Location } from "react-360-web";

function init(bundle, parent, options = {}) {
  const r360 = new ReactInstance(bundle, parent, {
    fullScreen: true,
    ...options,
  });

  const cylinder = new Surface(
    4096 /* width */,
    1250 /* height */,
    Surface.SurfaceShape.Cylinder /* shape */
  );

  r360.renderToSurface(
    r360.createRoot("xr_mandatory", {
      /* initial props */
    }),
    cylinder
  );

  r360.renderToLocation(
    r360.createRoot("model", {
      name: "astronaut",
    }),
    new Location([50, -25, -25])
  );

  r360.compositor.setBackground(r360.getAssetURL("360_world.jpg"));

  const video = r360.compositor.createVideoPlayer("backgroundVideo");
  video.setSource("./static_assets/test4.mp4", "2D", "mp4");
  video.setLoop(true);
}

window.React360 = { init };
