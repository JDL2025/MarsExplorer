/* =====================================================================
   MARS EXPLORER — SETTINGS
   Change these to customize the explorer for your class.
   ===================================================================== */
window.MARS_CONFIG = {
  // Text shown in the top-left corner.
  title: "Mars Explorer",
  subtitle: "Tap a pin to learn about it",

  // Where the camera starts: longitude, latitude, height above Mars in km.
  startView: { lon: -75, lat: 5, heightKm: 11000 },

  // Show the "How to explore" help screen the first time a student opens the page.
  showHelpOnFirstVisit: true,

  // Map picture sources (free public services). These load in the student's
  // browser while they explore. If your school's network blocks them, the
  // explorer still works using the low-detail map that is saved in /assets.
  imagery: {
    // Color photo map of the whole planet (Viking orbiters, about 230 m per pixel)
    color: {
      type: "trek",
      layer: "Mars_Viking_MDIM21_ClrMosaic_global_232m",
      maxLevel: 7,
      credit: "Color map: NASA/JPL-Caltech/USGS (Viking MDIM 2.1), via NASA Mars Trek"
    },
    // Close-up pictures from Mars Reconnaissance Orbiter's CTX camera (about 5 m per pixel).
    // These are black-and-white photos; the explorer tints them Mars-colored.
    ctx: {
      type: "esri",
      url: "https://astro.arcgis.com/arcgis/rest/services/OnMars/CTX1/MapServer/tile/{z}/{y}/{x}",
      maxLevel: 12,
      credit: "Close-ups: NASA/JPL-Caltech/MSSS; Global CTX Mosaic by the Bruce Murray Laboratory, Caltech; hosted by Esri"
    },
    // Super close-ups from Mars Reconnaissance Orbiter's HiRISE camera (25–50 cm per pixel).
    // Only about 3% of Mars has HiRISE pictures, mostly at landing sites and famous places.
    hirise: {
      type: "esri",
      url: "https://astro.arcgis.com/arcgis/rest/services/OnMars/HiRISE/MapServer/tile/{z}/{y}/{x}",
      maxLevel: 17,
      credit: "Super close-ups: NASA/JPL-Caltech/University of Arizona (HiRISE); hosted by Esri"
    },
    // Colored height map (Mars Global Surveyor laser altimeter, MOLA)
    height: {
      type: "trek",
      layer: "Mars_MGS_MOLA_ClrShade_merge_global_463m",
      maxLevel: 7,
      credit: "Height map: NASA/JPL-Caltech/GSFC (MGS MOLA), via NASA Mars Trek"
    }
  },

  // Tint color for the black-and-white close-up photos.
  closeupTint: "#e9b98e"
};
