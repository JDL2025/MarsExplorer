/* Mars Explorer — main app
   Built with CesiumJS (Apache 2.0). Content lives in js/data/places.js. */
(async function () {
  "use strict";
  const CFG = window.MARS_CONFIG;
  const PLACES = window.MARS_PLACES;
  const STOPS = window.ROVER_STOPS;
  const TRAV = window.MARS_TRAVERSES;
  const APPROX = window.APPROX_ROUTES;
  const TOURS = window.MARS_TOURS;
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => Array.from(document.querySelectorAll(s));
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* ignore */ } }
  };

  /* ------------------------------------------------------------
     TYPES: label, color, glyph, which filter group
     ------------------------------------------------------------ */
  const TYPES = {
    volcano:    { label: "Volcano",            color: "#ff6a3d", group: "landforms", list: "Volcanoes" },
    canyon:     { label: "Canyon",             color: "#ffb03b", group: "landforms", list: "Canyons" },
    channel:    { label: "River channel or valley", color: "#4fb3ff", group: "landforms", list: "River channels & valleys" },
    crater:     { label: "Crater",             color: "#c792ff", group: "landforms", list: "Craters" },
    basin:      { label: "Basin or plain",     color: "#45d6b5", group: "landforms", list: "Basins & plains" },
    ice:        { label: "Ice",                color: "#e8f4ff", group: "landforms", list: "Ice", dark: true },
    region:     { label: "Region",             color: "#f2c9a0", group: "landforms", list: "Other famous places", dark: true },
    rover:      { label: "Rover",              color: "#ffd23e", group: "missions",  list: "Rovers & helicopter", dark: true },
    helicopter: { label: "Helicopter",         color: "#3ee0ff", group: "missions",  list: "Rovers & helicopter", dark: true },
    lander:     { label: "Lander",             color: "#f4f4f4", group: "missions",  list: "Landers", dark: true },
    orbiter:    { label: "Orbiter",            color: "#b7c3d6", group: "space",     list: "Orbiters", dark: true },
    moon:       { label: "Moon",               color: "#9aa4b2", group: "space",     list: "Moons", dark: true },
    future:     { label: "Possible human landing site", color: "#ff9de2", group: "future", list: "Possible human landing sites", dark: true },
    photo:      { label: "Photo spot",         color: "#ffffff", group: "paths", dark: true },
    find:       { label: "Discovery",          color: "#ffd23e", group: "paths", dark: true }
  };
  const LIST_ORDER = ["volcano", "canyon", "channel", "crater", "basin", "ice", "region", "rover", "lander", "future", "orbiter", "moon"];
  const LANDFORM_TYPES = ["volcano", "canyon", "channel", "crater", "basin", "ice", "region"];
  const LANDFORM_LABELS = { volcano: "Volcanoes", canyon: "Canyons", channel: "River channels & valleys", crater: "Craters", basin: "Basins & plains", ice: "Ice & polar caps", region: "Other famous places" };

  const GLYPH = {
    volcano: '<path d="M3 19.5 9.3 9h5.4L21 19.5z" fill="G"/><path d="M10.5 9c.3-1.6-.6-2.4.4-3.8M13.5 9c.2-1.4 1.2-2 .6-3.6" stroke="G" stroke-width="1.6" fill="none" stroke-linecap="round"/>',
    canyon: '<path d="M2.5 7h5l2 5 1.5-2 2 4.5 1.5-2.5L17 7h4.5v12h-19z" fill="G"/>',
    channel: '<path d="M3 8c3-2.5 5 2.5 9 0s6 2.5 9 0M3 12.5c3-2.5 5 2.5 9 0s6 2.5 9 0M3 17c3-2.5 5 2.5 9 0s6 2.5 9 0" stroke="G" stroke-width="2" fill="none" stroke-linecap="round"/>',
    crater: '<circle cx="12" cy="12" r="7.5" stroke="G" stroke-width="2.2" fill="none"/><circle cx="12" cy="12" r="3" fill="G"/>',
    basin: '<path d="M2.5 9c2 7 17 7 19 0" stroke="G" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M6 14.5c3 2 9 2 12 0" stroke="G" stroke-width="1.6" fill="none" stroke-linecap="round"/>',
    ice: '<path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9M9.5 4.5 12 7l2.5-2.5M9.5 19.5 12 17l2.5 2.5" stroke="G" stroke-width="1.9" fill="none" stroke-linecap="round"/>',
    region: '<path d="M3 18h18M5 18l2.5-7h9L19 18M8.5 11 10 7h4l1.5 4" stroke="G" stroke-width="2" fill="none" stroke-linejoin="round"/>',
    rover: '<rect x="5" y="8" width="14" height="6" rx="1.5" fill="G"/><path d="M9 8V5.5h3" stroke="G" stroke-width="1.6" fill="none"/><circle cx="7" cy="17.5" r="2.2" fill="G"/><circle cx="12" cy="17.5" r="2.2" fill="G"/><circle cx="17" cy="17.5" r="2.2" fill="G"/>',
    helicopter: '<path d="M3 6h18M12 6v4" stroke="G" stroke-width="2" stroke-linecap="round"/><rect x="8" y="10" width="8" height="6" rx="2" fill="G"/><path d="M9 16l-2 4M15 16l2 4" stroke="G" stroke-width="1.6" stroke-linecap="round"/>',
    lander: '<path d="M7 12a5 5 0 0 1 10 0z" fill="G"/><path d="M8 12l-3.5 7M16 12l3.5 7M12 12v7M3 19h4M17 19h4" stroke="G" stroke-width="1.8" stroke-linecap="round"/>',
    orbiter: '<rect x="9.5" y="9.5" width="5" height="5" fill="G"/><path d="M2.5 9.5h5v5h-5zM16.5 9.5h5v5h-5z" fill="none" stroke="G" stroke-width="1.6"/><path d="M7.5 12h2M14.5 12h2M12 9.5V6" stroke="G" stroke-width="1.6"/><circle cx="12" cy="5" r="1.4" fill="G"/>',
    moon: '<circle cx="12" cy="12" r="7.5" fill="G"/><circle cx="9.5" cy="10" r="1.8" fill="B"/><circle cx="14.5" cy="14" r="1.3" fill="B"/><circle cx="13.5" cy="8.6" r="1" fill="B"/>',
    photo: '<path d="M4 8.5h3.5L9 6.5h6l1.5 2H20v10H4z" fill="G"/><circle cx="12" cy="13.2" r="3.2" fill="B"/><circle cx="12" cy="13.2" r="1.7" fill="G"/>',
    find: '<path d="M12 3.2l2.6 5.6 6.1.7-4.5 4.1 1.2 6-5.4-3.1-5.4 3.1 1.2-6-4.5-4.1 6.1-.7z" fill="G"/>',
    future: '<circle cx="12" cy="10.5" r="7" fill="G"/><rect x="7.6" y="7.6" width="8.8" height="5.4" rx="2.7" fill="B"/><path d="M6.5 20.5c1-2.6 3-3.6 5.5-3.6s4.5 1 5.5 3.6" stroke="G" stroke-width="2.2" fill="none" stroke-linecap="round"/>'
  };
  const iconCache = {};
  function icon(type, color) {
    const t = TYPES[type];
    const fill = color || t.color;
    const key = type + fill;
    if (iconCache[key]) return iconCache[key];
    const dark = color ? isLight(fill) : t.dark;
    const glyphColor = dark ? "#141a26" : "#ffffff";
    const g = GLYPH[type].replace(/="G"/g, '="' + glyphColor + '"').replace(/="B"/g, '="' + fill + '"');
    const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="-3 -3 30 30">' +
      '<circle cx="12" cy="12" r="13.4" fill="#141a26" fill-opacity=".55"/>' +
      '<circle cx="12" cy="12" r="12" fill="' + fill + '" stroke="#141a26" stroke-width="1.6"/>' +
      '<g transform="translate(3.6 3.6) scale(.7)">' + g + '</g></svg>';
    return (iconCache[key] = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg));
  }
  function isLight(hex) {
    const n = parseInt(hex.slice(1), 16);
    const r = n >> 16, g = (n >> 8) & 255, b = n & 255;
    return (0.299 * r + 0.587 * g + 0.114 * b) > 150;
  }

  /* ------------------------------------------------------------
     Globe setup
     ------------------------------------------------------------ */
  const R = 3396190; // Mars radius (m), matches the map pictures (Mars 2000 sphere)
  const MARS = new Cesium.Ellipsoid(R, R, R);
  Cesium.Ellipsoid.default = MARS;
  $("#appTitle").textContent = CFG.title;
  document.title = CFG.title;

  try { await document.fonts.load('800 20px "Big Shoulders Display"'); await document.fonts.load('700 20px "Big Shoulders Display"'); } catch (e) { /* fonts optional */ }

  const viewer = new Cesium.Viewer("globe", {
    ellipsoid: MARS,
    globe: new Cesium.Globe(MARS),
    baseLayer: false,
    terrainProvider: new Cesium.EllipsoidTerrainProvider({ ellipsoid: MARS }),
    mapProjection: new Cesium.GeographicProjection(MARS),
    skyBox: Cesium.SkyBox.createEarthSkyBox(),
    skyAtmosphere: new Cesium.SkyAtmosphere(MARS),
    animation: false, timeline: false, baseLayerPicker: false, geocoder: false, homeButton: false,
    sceneModePicker: false, navigationHelpButton: false, fullscreenButton: false, infoBox: false,
    selectionIndicator: false, scene3DOnly: true,
    requestRenderMode: true, maximumRenderTimeChange: Infinity,
    msaaSamples: 1
  });
  const scene = viewer.scene;
  const camera = scene.camera;
  const globe = scene.globe;
  globe.baseColor = Cesium.Color.fromCssColorString("#9a5b36");
  globe.showGroundAtmosphere = false;
  globe.enableLighting = false;
  globe.maximumScreenSpaceError = 1.5;  // a little sharper than default
  globe.tileCacheSize = 300;
  scene.fog.enabled = false;
  if (scene.sun) scene.sun.show = false;
  if (scene.moon) scene.moon.show = false;
  scene.backgroundColor = Cesium.Color.fromCssColorString("#05070b");
  // Thin butterscotch haze around the edge of the planet
  const sky = scene.skyAtmosphere;
  sky.hueShift = -0.47; sky.saturationShift = -0.35; sky.brightnessShift = -0.35;
  sky.atmosphereLightIntensity = 8;
  sky.atmosphereRayleighScaleHeight = 11000;
  sky.atmosphereMieScaleHeight = 11000;

  const ssc = scene.screenSpaceCameraController;
  ssc.minimumZoomDistance = 120;          // meters — close enough for HiRISE detail
  ssc.maximumZoomDistance = 75000000;
  ssc.inertiaSpin = 0.85; ssc.inertiaZoom = 0.8;
  ssc.zoomFactor = 15;                    // fast pinch zoom (Cesium's default is 5)
  viewer.cesiumWidget.creditContainer.style.display = "block";

  /* ------------------------------------------------------------
     Map pictures (imagery layers)
     ------------------------------------------------------------ */
  const geo = () => new Cesium.GeographicTilingScheme({ ellipsoid: MARS, numberOfLevelZeroTilesX: 2, numberOfLevelZeroTilesY: 1 });
  function makeProvider(spec) {
    if (spec.type === "trek") {
      return new Cesium.WebMapTileServiceImageryProvider({
        url: "https://trek.nasa.gov/tiles/Mars/EQ/" + spec.layer + "/1.0.0//{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpg",
        layer: spec.layer, style: "default", format: "image/jpeg", tileMatrixSetID: "default028mm",
        maximumLevel: spec.maxLevel, tilingScheme: geo(), credit: spec.credit
      });
    }
    return new Cesium.UrlTemplateImageryProvider({
      url: spec.url, tilingScheme: geo(), tileWidth: 512, tileHeight: 512,
      maximumLevel: spec.maxLevel, credit: spec.credit
    });
  }
  // Tint black-and-white tiles to Mars colors (draws each tile on a small canvas).
  function tinted(provider, color) {
    const original = provider.requestImage.bind(provider);
    provider.requestImage = function (x, y, level, request) {
      const p = original(x, y, level, request);
      if (!p) return p;
      return Promise.resolve(p).then((img) => {
        net.ok++;
        try {
          const w = img.width, h = img.height;
          const c = document.createElement("canvas"); c.width = w; c.height = h;
          const g = c.getContext("2d");
          g.drawImage(img, 0, 0);
          g.globalCompositeOperation = "multiply"; g.fillStyle = color; g.fillRect(0, 0, w, h);
          g.globalCompositeOperation = "destination-in"; g.drawImage(img, 0, 0);
          if (typeof ImageBitmap !== "undefined" && img instanceof ImageBitmap) {
            // ImageBitmaps arrive already flipped for WebGL; keep them that way.
            return createImageBitmap(c);
          }
          return c;
        } catch (e) { return img; }
      });
    };
    return provider;
  }
  function counted(provider) {
    const original = provider.requestImage.bind(provider);
    provider.requestImage = function (x, y, level, request) {
      const p = original(x, y, level, request);
      if (!p) return p;
      return Promise.resolve(p).then((img) => { net.ok++; return img; });
    };
    return provider;
  }
  const net = { ok: 0, fail: 0 };
  function quiet(provider) {
    provider.errorEvent.addEventListener((err) => { net.fail++; if (err) err.retry = false; });
    return provider;
  }

  const layers = viewer.imageryLayers;
  const baseLayer = Cesium.ImageryLayer.fromProviderAsync(
    Cesium.SingleTileImageryProvider.fromUrl("assets/mars-basemap.jpg", { ellipsoid: MARS, credit: "Basic map: NASA (NASA 3D Resources)" })
  );
  layers.add(baseLayer);
  const colorLayer = layers.addImageryProvider(quiet(counted(makeProvider(CFG.imagery.color))));
  const ctxLayer = new Cesium.ImageryLayer(quiet(tinted(makeProvider(CFG.imagery.ctx), CFG.closeupTint)), { minimumTerrainLevel: 6, alpha: 0.88, brightness: 1.12 });
  layers.add(ctxLayer);
  const hiriseLayer = new Cesium.ImageryLayer(quiet(tinted(makeProvider(CFG.imagery.hirise), CFG.closeupTint)), { minimumTerrainLevel: 11, brightness: 1.12 });
  layers.add(hiriseLayer);
  const heightLayer = layers.addImageryProvider(quiet(counted(makeProvider(CFG.imagery.height))));
  heightLayer.show = false;

  setTimeout(() => {
    if (net.ok === 0 && net.fail > 0) $("#netNotice").hidden = false;
  }, 9000);
  $("#netNoticeClose").onclick = () => { $("#netNotice").hidden = true; };

  /* ------------------------------------------------------------
     Markers
     ------------------------------------------------------------ */
  const billboards = scene.primitives.add(new Cesium.BillboardCollection({ scene }));
  const labels = scene.primitives.add(new Cesium.LabelCollection({ scene }));
  const lines = scene.primitives.add(new Cesium.PolylineCollection());
  const byId = {};
  const markers = [];   // {kind:'place'|'stop', obj, bb, lb, pos, rank, group}
  const LABEL_FONT = '700 19px "Big Shoulders Display", "Arial Narrow", sans-serif';

  function cart(lon, lat, h) { return Cesium.Cartesian3.fromDegrees(lon, lat, h || 0, MARS); }

  // Last known positions for rovers with real data; final stops for older rovers.
  function solPoint(rover, sol) {
    const pts = TRAV[rover].points;
    let best = pts[0];
    for (const p of pts) { if (p[2] <= sol) best = p; else break; }
    return best;
  }
  const roverNow = {};
  if (TRAV.perseverance) { const p = TRAV.perseverance.points[TRAV.perseverance.points.length - 1]; roverNow.perseverance = { lon: p[0], lat: p[1], sol: p[2] }; }
  if (TRAV.curiosity) { const p = TRAV.curiosity.points[TRAV.curiosity.points.length - 1]; roverNow.curiosity = { lon: p[0], lat: p[1], sol: p[2] }; }
  if (APPROX.opportunity) { const p = APPROX.opportunity[APPROX.opportunity.length - 1]; roverNow.opportunity = { lon: p[0], lat: p[1] }; }
  if (APPROX.spirit) { const p = APPROX.spirit[APPROX.spirit.length - 1]; roverNow.spirit = { lon: p[0], lat: p[1] }; }

  function addMarker(m) {
    m.bb = billboards.add({
      position: m.pos, image: m.icon, width: m.size, height: m.size,
      verticalOrigin: Cesium.VerticalOrigin.CENTER, disableDepthTestDistance: Number.POSITIVE_INFINITY,
      id: m, show: false
    });
    m.lb = labels.add({
      position: m.pos, text: m.title, font: LABEL_FONT,
      fillColor: Cesium.Color.WHITE, outlineColor: Cesium.Color.fromCssColorString("#0b0f17"), outlineWidth: 5,
      style: Cesium.LabelStyle.FILL_AND_OUTLINE, verticalOrigin: Cesium.VerticalOrigin.TOP,
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      pixelOffset: new Cesium.Cartesian2(0, m.size / 2 + 2), disableDepthTestDistance: Number.POSITIVE_INFINITY,
      id: m, show: false
    });
    markers.push(m);
  }

  PLACES.forEach((p) => {
    const t = TYPES[p.type];
    let lon = p.lon, lat = p.lat, h = 0;
    if (p.rover && roverNow[p.rover]) { lon = roverNow[p.rover].lon; lat = roverNow[p.rover].lat; }
    if (p.alt) h = p.alt * 1000;
    p._lon = lon; p._lat = lat; p._h = h;
    const m = {
      kind: "place", obj: p, pos: cart(lon, lat, h + (h ? 0 : 5)), rank: p.rank || 2, group: t.group,
      icon: icon(p.type, p.color), size: p.type === "rover" || p.type === "helicopter" ? 42 : 38,
      title: p.name.replace(/\s*\((orbiter|moon)[^)]*\)/i, "").replace(/ \(.*?\)$/, ""),
      space: !!h
    };
    byId[p.id] = m;
    addMarker(m);
  });

  /* Rover paths and stops */
  const roverPaths = {};
  function addPath(rover, coords, color, approximate) {
    const positions = coords.map((c) => cart(c[0], c[1], 25));
    // one dashed line: bright dashes with dark gaps, so it shows up on any ground color
    const dash = lines.add({
      positions, width: 5, show: false,
      material: Cesium.Material.fromType("PolylineDash", {
        color: Cesium.Color.fromCssColorString(color),
        gapColor: Cesium.Color.fromCssColorString("#0b0f17").withAlpha(approximate ? 0.35 : 0.8),
        dashLength: approximate ? 10 : 16
      })
    });
    const under = { show: false };
    // bounding info for flying to the path
    let minLon = 999, maxLon = -999, minLat = 999, maxLat = -999;
    coords.forEach((c) => { minLon = Math.min(minLon, c[0]); maxLon = Math.max(maxLon, c[0]); minLat = Math.min(minLat, c[1]); maxLat = Math.max(maxLat, c[1]); });
    const center = cart((minLon + maxLon) / 2, (minLat + maxLat) / 2, 0);
    const span = Math.max((maxLon - minLon) * Math.cos(((minLat + maxLat) / 2) * Math.PI / 180), maxLat - minLat) * (Math.PI / 180) * R;
    roverPaths[rover] = { under, dash, center, span, approximate, lon: (minLon + maxLon) / 2, lat: (minLat + maxLat) / 2 };
  }
  const roverColor = (id) => (PLACES.find((p) => p.rover === id) || {}).color || "#ffd23e";
  if (TRAV.perseverance) addPath("perseverance", TRAV.perseverance.points, roverColor("perseverance"), false);
  if (TRAV.curiosity) addPath("curiosity", TRAV.curiosity.points, roverColor("curiosity"), false);
  if (APPROX.opportunity) addPath("opportunity", APPROX.opportunity, roverColor("opportunity"), true);
  if (APPROX.spirit) addPath("spirit", APPROX.spirit, roverColor("spirit"), true);

  Object.entries(STOPS).forEach(([rover, list]) => {
    list.forEach((s, i) => {
      let lon = s.lon, lat = s.lat;
      if (s.sol !== undefined && TRAV[rover]) { const p = solPoint(rover, s.sol); lon = p[0]; lat = p[1]; }
      s._lon = lon; s._lat = lat; s.rover = rover; s.id = rover + "-" + i;
      const m = {
        kind: "stop", obj: s, pos: cart(lon, lat, 30), rank: 2, group: "paths",
        icon: icon(s.kind), size: 32, title: s.name, rover
      };
      byId[s.id] = m;
      addMarker(m);
    });
  });

  // Ingenuity sits beside Perseverance's sol-58 position
  const ing = PLACES.find((p) => p.roverSol);
  if (ing && TRAV.perseverance) {
    const p = solPoint(ing.roverSol.rover, ing.roverSol.sol);
    ing._lon = p[0] + 0.0012; ing._lat = p[1] + 0.0004;
    byId[ing.id].pos = cart(ing._lon, ing._lat, 5);
    byId[ing.id].bb.position = byId[ing.id].pos; byId[ing.id].lb.position = byId[ing.id].pos;
  }

  /* Orbit rings (not to scale, except moons) */
  function orbitRing(m, incDeg) {
    const r = Cesium.Cartesian3.magnitude(m.pos);
    const u = Cesium.Cartesian3.normalize(m.pos, new Cesium.Cartesian3());
    const z = Cesium.Cartesian3.UNIT_Z;
    let e = Cesium.Cartesian3.cross(z, u, new Cesium.Cartesian3());
    if (Cesium.Cartesian3.magnitude(e) < 1e-6) e = Cesium.Cartesian3.UNIT_X.clone();
    Cesium.Cartesian3.normalize(e, e);
    const w = Cesium.Cartesian3.normalize(Cesium.Cartesian3.cross(u, e, new Cesium.Cartesian3()), new Cesium.Cartesian3());
    const i = Cesium.Math.toRadians(incDeg);
    const n = Cesium.Cartesian3.normalize(Cesium.Cartesian3.add(Cesium.Cartesian3.multiplyByScalar(w, Math.cos(i), new Cesium.Cartesian3()), Cesium.Cartesian3.multiplyByScalar(e, Math.sin(i), new Cesium.Cartesian3()), new Cesium.Cartesian3()), new Cesium.Cartesian3());
    const v = Cesium.Cartesian3.normalize(Cesium.Cartesian3.cross(n, u, new Cesium.Cartesian3()), new Cesium.Cartesian3());
    const pts = [];
    for (let k = 0; k <= 180; k++) {
      const t = (k / 180) * Math.PI * 2;
      pts.push(Cesium.Cartesian3.add(Cesium.Cartesian3.multiplyByScalar(u, r * Math.cos(t), new Cesium.Cartesian3()), Cesium.Cartesian3.multiplyByScalar(v, r * Math.sin(t), new Cesium.Cartesian3()), new Cesium.Cartesian3()));
    }
    m.ring = lines.add({ positions: pts, width: 1.5, material: Cesium.Material.fromType("Color", { color: Cesium.Color.fromCssColorString(m.obj.moon ? "#9aa4b2" : "#8cc4f0").withAlpha(0.45) }), show: false });
  }
  const INC = { mariner9: 64, mgs: 93, odyssey: 93, marsexpress: 86, mro: 93, maven: 75, mom: 150, tgo: 74, hope: 25, tianwen1: 87, phobos: 1, deimos: 1 };
  markers.filter((m) => m.space).forEach((m) => orbitRing(m, INC[m.obj.id] ?? 60));

  /* ------------------------------------------------------------
     Visibility, decluttering, and the height readout
     ------------------------------------------------------------ */
  const filters = { missions: true, paths: true, space: true, labels: true, future: true, types: {} };
  LANDFORM_TYPES.forEach((t) => (filters.types[t] = true));
  const allLandformsOn = () => LANDFORM_TYPES.every((t) => filters.types[t]);
  let selected = null;
  let focusIds = null;   // when set, the globe shows only these search results
  const occluderPos = new Cesium.Cartesian3();
  const win = new Cesium.Cartesian2();
  let lastHeightText = "";

  function cameraHeightKm() {
    const c = MARS.cartesianToCartographic(camera.positionWC);
    return c ? c.height / 1000 : 99999;
  }

  scene.preUpdate.addEventListener(updateVisibility);
  function updateVisibility() {
    const hKm = cameraHeightKm();
    const occ = new Cesium.EllipsoidalOccluder(MARS, Cesium.Cartesian3.clone(camera.positionWC, occluderPos));
    const showPaths = (focusIds ? true : filters.paths && filters.missions) && hKm < 3000;
    Object.entries(roverPaths).forEach(([id, rp]) => { rp.under.show = rp.dash.show = showPaths && (!focusIds || focusIds.has(id)); });

    const cand = [];
    const everyLandform = allLandformsOn();
    for (const m of markers) {
      let ok;
      if (focusIds) {
        ok = focusIds.has(m.obj.id) || (m.kind === "stop" && focusIds.has(m.rover) && hKm < 700);
      }
      else if (m.kind === "stop") ok = showPaths && hKm < 700;
      else if (m.group === "landforms") ok = filters.types[m.obj.type] && (!everyLandform || m.rank === 1 || (m.rank === 2 && hKm < 9000) || (m.rank === 3 && hKm < 4500));
      else if (m.group === "missions") ok = filters.missions && (m.rank === 1 || hKm < 9000);
      else if (m.group === "future") ok = filters.future && (m.rank === 1 || hKm < 9000);
      else ok = filters.space && hKm > 900;
      if (m === selected) ok = true;
      if (ok) ok = occ.isPointVisible(m.pos);
      if (ok) {
        const w = Cesium.SceneTransforms.worldToWindowCoordinates(scene, m.pos, win);
        if (!w) ok = false; else { m.sx = w.x; m.sy = w.y; }
      }
      m.cand = ok;
      if (ok) cand.push(m);
      if (m.ring) m.ring.show = (focusIds ? m.cand : filters.space && hKm > 900) && (m.obj.moon || m === selected);
    }
    // Priority: selected first, then path stops (when close), then rank, missions before landforms
    cand.sort((a, b) => prio(a) - prio(b));
    const placed = [];
    for (const m of cand) {
      const minD = m.kind === "stop" ? 26 : 30;
      let clash = false;
      for (const q of placed) { if (Math.abs(q.sx - m.sx) < minD && Math.abs(q.sy - m.sy) < minD) { clash = true; break; } }
      if (clash && m !== selected) { m.bb.show = false; m.lb.show = false; continue; }
      placed.push(m);
      m.bb.show = true;
      m.bb.scale = m === selected ? 1.3 : 1;
    }
    // labels: must not cover other pins or other labels
    const boxes = placed.map((q) => ({ x0: q.sx - q.size / 2, x1: q.sx + q.size / 2, y0: q.sy - q.size / 2, y1: q.sy + q.size / 2, owner: q }));
    for (const m of placed) {
      let showLabel = filters.labels && (m === selected || (focusIds && m.kind === "place") || labelAllowed(m, hKm));
      if (showLabel) {
        const wLab = m.title.length * 8.4 + 8, top = m.sy + m.size / 2 + 2;
        const box = { x0: m.sx - wLab / 2, x1: m.sx + wLab / 2, y0: top, y1: top + 22, owner: m };
        if (m !== selected) {
          for (const b of boxes) { if (b.owner !== m && box.x0 < b.x1 && box.x1 > b.x0 && box.y0 < b.y1 && box.y1 > b.y0) { showLabel = false; break; } }
        }
        if (showLabel) boxes.push(box);
      }
      m.lb.show = showLabel;
    }
    for (const m of markers) if (!m.cand) { m.bb.show = false; m.lb.show = false; }

    // Height readout + picture source
    const txt = formatHeight(hKm);
    if (txt !== lastHeightText) {
      lastHeightText = txt;
      $("#heightText").textContent = txt;
      $("#sourceText").textContent = sourceText(hKm);
    }
  }
  function prio(m) {
    if (m === selected) return -10;
    if (m.kind === "stop") return 0;
    const g = m.group === "missions" ? 0 : m.group === "space" || m.group === "future" ? 0.5 : 1;
    return m.rank * 2 + g;
  }
  function labelAllowed(m, hKm) {
    if (m.kind === "stop") return hKm < 40;
    if (m.space) return true;
    if (m.rank === 1) return hKm < 20000;
    if (m.rank === 2) return hKm < 6000;
    return hKm < 2500;
  }
  function formatHeight(hKm) {
    if (hKm >= 10) return "You are " + Math.round(hKm).toLocaleString() + " km above Mars";
    if (hKm >= 1) return "You are " + hKm.toFixed(1) + " km above Mars";
    return "You are " + Math.round(hKm * 1000).toLocaleString() + " m above Mars";
  }
  function sourceText(hKm) {
    if (heightLayer.show) return "Colors show height, measured by laser from the Mars Global Surveyor orbiter.";
    if (hKm > 1200) return "Pictures: color map from the Viking orbiters (1976–1980).";
    if (hKm > 25) return "Pictures: Mars Reconnaissance Orbiter’s CTX camera (about 5 m per pixel).";
    return "Pictures: Mars Reconnaissance Orbiter’s CTX and HiRISE cameras (HiRISE: about 25–50 cm per pixel, only in some places).";
  }

  /* ------------------------------------------------------------
     Camera helpers
     ------------------------------------------------------------ */
  function isSheetLayout() { return window.matchMedia("(max-width: 760px), (orientation: portrait) and (max-width: 900px)").matches; }
  function flyTo(lon, lat, heightKm, opts) {
    opts = opts || {};
    camera.cancelFlight();
    camera.flyTo({
      destination: cart(lon, lat, heightKm * 1000),
      orientation: { heading: 0, pitch: -Cesium.Math.PI_OVER_TWO, roll: 0 },
      duration: opts.duration ?? 2.6,
      complete: () => {
        if (opts.shift && !$("#card").hidden) {
          // move the target out from under the info card
          const h = heightKm * 1000;
          const half = h * Math.tan(camera.frustum.fov / 2);
          if (isSheetLayout()) camera.moveDown(half * 0.42);
          else camera.moveRight(half * 0.36);
        }
        scene.requestRender();
      }
    });
  }
  function goHome() {
    const s = CFG.startView;
    flyTo(s.lon, s.lat, s.heightKm, { duration: 2.2 });
  }
  camera.setView({ destination: cart(CFG.startView.lon, CFG.startView.lat, CFG.startView.heightKm * 1000) });

  function flyToPlace(p) {
    if (p._h) {
      // spacecraft & moons: look past them toward Mars
      flyTo(p._lon, p._lat, p.view, { shift: true });
    } else {
      flyTo(p._lon, p._lat, p.view || 800, { shift: true });
    }
  }
  function flyToPath(rover) {
    const rp = roverPaths[rover];
    if (!rp) return;
    const hKm = Math.max(rp.span * 1.9, 5000) / 1000;
    flyTo(rp.lon, rp.lat, hKm, { shift: true });
  }

  /* ------------------------------------------------------------
     Info cards
     ------------------------------------------------------------ */
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const ICON_PLAY = '<svg viewBox="0 0 24 24"><rect x="2.5" y="5" width="19" height="14" rx="4"/><path d="M10 9.2v5.6l4.8-2.8z" fill="currentColor"/></svg>';
  const ICON_LINK = '<svg viewBox="0 0 24 24"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>';
  const ICON_ZOOM = '<svg viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5 21 21M10.5 7.5v6M7.5 10.5h6"/></svg>';
  const ICON_PATH = '<svg viewBox="0 0 24 24"><path d="M4 19c4 0 3-6 7-6s3-7 9-7" stroke-dasharray="2.5 2.5"/><circle cx="4" cy="19" r="1.6"/><circle cx="20" cy="6" r="1.6"/></svg>';
  const ICON_PHOTO = '<svg viewBox="0 0 24 24"><path d="M4 8.5h3.5L9 6.5h6l1.5 2H20v10H4z"/><circle cx="12" cy="13.2" r="3.2"/></svg>';
  const EARTH_SVG = '<svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="18" fill="#2a6fb5"/><path d="M9 12c4-1 6 1 7 4s-2 4 0 7 2 6-1 8c-4-2-8-8-8-13 0-2 .6-4 2-6zm16-5c3 1 7 4 8 8-2 1-5 0-6 2s1 4 3 5-1 5-4 6c-1-3-3-4-2-7s-1-4-3-6 2-5 4-8z" fill="#5fbf6a"/></svg>';

  function videoButton(v, name) {
    if (!v) return "";
    if (v.url) {
      return '<a class="act video" href="' + esc(v.url) + '" target="_blank" rel="noopener">' + ICON_PLAY +
        '<span>Watch the video<small>' + esc(v.title) + (v.by ? " (" + esc(v.by) + (v.len ? ", " + esc(v.len) : "") + ")" : "") + "</small></span></a>";
    }
    const q = encodeURIComponent(v.search);
    const url = v.ch ? "https://www.youtube.com/" + v.ch + "/search?query=" + q : "https://www.youtube.com/results?search_query=" + q;
    const who = v.ch === "@NASAJPL" ? "NASA JPL" : v.ch === "@EuropeanSpaceAgency" ? "European Space Agency" : v.ch === "@NASA" ? "NASA" : "YouTube";
    return '<a class="act video" href="' + esc(url) + '" target="_blank" rel="noopener">' + ICON_PLAY +
      "<span>Find videos<small>" + (v.ch ? who + " videos about " : "Videos about ") + esc(v.search) + "</small></span></a>";
  }
  function photoFigure(pia, alt) {
    if (!pia) return "";
    const base = "https://images-assets.nasa.gov/image/" + pia + "/" + pia;
    return '<figure class="photo"><img src="' + base + '~medium.jpg" data-fallback="' + base + '~small.jpg" alt="' + esc(alt) +
      '" onerror="marsPhotoFail(this)"><figcaption>NASA image ' + pia + "</figcaption></figure>";
  }

  /* Big photo at the top of each card (photos are listed in js/data/photos.js) */
  const PHOTOS = window.MARS_PHOTOS || {};
  const PHOTO_SEARCH = window.MARS_PHOTO_SEARCH || {};
  // Same link format NASA's image library uses itself (it needs the year range to search)
  const galleryUrl = (q) => "https://images.nasa.gov/search?media=image&page=1&q=" + encodeURIComponent(q).replace(/%20/g, "+") +
    "&yearEnd=" + new Date().getFullYear() + "&yearStart=1920";
  function heroPhoto(p, override, artMode) {
    const ph = override || PHOTOS[p.id];
    if (!ph) {
      const q = PHOTO_SEARCH[p.id];
      return q ? '<p class="more-photos"><a href="' + esc(galleryUrl(q)) + '" target="_blank" rel="noopener">' + ICON_PHOTO + "See photos in NASA’s image library</a></p>" : "";
    }
    const nid = ph[0], size = ph[1] || "medium", cap = ph[2] || p.name, q = ph[3] || p.name, art = !!ph[4];
    const base = "https://images-assets.nasa.gov/image/" + nid + "/" + nid;
    const fallbacks = ["~small.jpg", "~orig.jpg"].map((x) => base + x).filter((u) => u !== base + "~" + size + ".jpg");
    return '<figure class="hero' + (override || artMode ? " art" : "") + '">' +
      '<a class="hero-img" href="https://images.nasa.gov/details/' + encodeURIComponent(nid) + '" target="_blank" rel="noopener" aria-label="Open this picture on NASA’s website">' +
      '<img src="' + base + "~" + size + '.jpg" data-fallback="' + fallbacks.join("|") + '" alt="' + esc(cap) + '" onload="this.closest(\'figure\').classList.add(\'loaded\')" onerror="marsPhotoFail(this)"></a>' +
      "<figcaption><span>" + (art ? "<b>Artist’s drawing.</b> " : "") + esc(cap) + "</span>" +
      '<a href="' + esc(galleryUrl(q)) + '" target="_blank" rel="noopener">' + ICON_PHOTO + "See more photos</a></figcaption></figure>";
  }
  // If a picture can't load, try a smaller copy; if none work, hide the picture but keep the "See more photos" link.
  window.marsPhotoFail = function (img) {
    const list = (img.dataset.fallback || "").split("|").filter(Boolean);
    const next = list.shift();
    img.dataset.fallback = list.join("|");
    if (next) { img.src = next; return; }
    const fig = img.closest("figure");
    if (!fig) return;
    if (fig.classList.contains("hero")) fig.classList.add("failed");
    else fig.remove();
  };

  /* "Typical temperatures at this location" box (numbers live in js/data/temps.js) */
  function fmtF(n) { return (n < 0 ? "−" : "") + Math.abs(Math.round(n)) + "°F"; }
  function tempBlock(p) {
    const orbit = p.type === "orbiter";
    const T = orbit ? window.MARS_TEMPS_ORBIT : (window.MARS_TEMPS || {})[p.id];
    if (!T || typeof T.hi !== "number" || typeof T.lo !== "number") return "";
    const home = window.MARS_TEMPS_HOME || { city: "Chicago", recordLow: -27 };
    const MIN = -210, MAX = 50;
    const pos = (f) => Math.max(0, Math.min(100, ((f - MIN) / (MAX - MIN)) * 100));
    const est = !orbit && T.how !== "measured";
    const hiLabel = orbit ? "Warmest below" : (T.hiLabel || "Afternoon high");
    const loLabel = orbit ? "Coldest below" : (T.loLabel || "Night low");
    let h = '<section class="temps">';
    h += "<h3>" + (orbit ? "Temperatures on the planet below" : "Typical temperatures at this location") + "</h3>";
    h += '<div class="temp-pair">' +
      '<div class="temp warm"><span class="t-ico" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8"/></svg></span><b>' + (est ? "<i>about</i>" : "") + fmtF(T.hi) + "</b><small>" + esc(hiLabel) + "</small></div>" +
      '<div class="temp cold"><span class="t-ico" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z"/></svg></span><b>' + (est ? "<i>about</i>" : "") + fmtF(T.lo) + "</b><small>" + esc(loLabel) + "</small></div>" +
      "</div>";
    h += '<div class="thermo" aria-hidden="true"><div class="thermo-track">' +
      '<span class="thermo-range" style="left:' + pos(T.lo) + "%;right:" + (100 - pos(T.hi)) + '%"></span>' +
      '<span class="thermo-tick" style="left:' + pos(32) + '%"></span>' +
      '<span class="thermo-tick earth-low" style="left:' + pos(-128.6) + '%"></span>' +
      '</div><div class="thermo-labels">' +
      '<span style="left:' + pos(-128.6) + '%">Earth’s coldest ever<br>−129°F</span>' +
      '<span class="r" style="left:' + pos(32) + '%">Water freezes<br>32°F</span>' +
      "</div></div>";
    const lines = [];
    if (!orbit) {
      const when = T.loLabel ? "The coldest times here are" : "Nights here are";
      if (T.lo <= -129) lines.push(when + " colder than the coldest temperature ever measured on Earth (−129°F in Antarctica).");
      else lines.push(when + " nearly as cold as the coldest temperature ever measured on Earth (−129°F in Antarctica).");
      if (T.hi >= 32) lines.push("On the warmest afternoons it can get just above freezing.");
      else if (T.hi >= home.recordLow) lines.push("Even the warm part of the day feels like a freezing winter day in " + home.city + ".");
      else lines.push("Even the warmest part of the day is colder than " + home.city + "’s coldest day ever (" + fmtF(home.recordLow) + ").");
      if (p.type !== "moon" && T.hi - T.lo >= 60 && !T.hiLabel) {
        lines.push("That’s a drop of about " + (Math.round((T.hi - T.lo) / 10) * 10) + "°F from afternoon to night. Mars’ thin air can’t hold on to the day’s heat.");
      }
    }
    if (lines.length) h += '<p class="temp-cmp">' + lines.map(esc).join(" ") + "</p>";
    h += '<p class="temp-src"><span class="tag ' + (est ? "est" : "meas") + '">' + (orbit ? "Planet-wide" : est ? "Estimate" : "Measured") + "</span>" + esc(T.src || "") + "</p>";
    h += "</section>";
    return h;
  }

  function showCard(html, badgeType, badgeText, badgeColor) {
    $("#cardBadge").innerHTML = '<img src="' + icon(badgeType, badgeColor) + '" alt="">' + esc(badgeText);
    $("#cardContent").innerHTML = html;
    $("#card").hidden = false;
    $("#cardScroll").scrollTop = 0;
    $("#tourBar").hidden = !tour;
    if (tour) updateTourBar();
  }

  function openPlace(id, opts) {
    opts = opts || {};
    const m = byId[id];
    if (!m) return;
    closePanels();
    selected = m;
    if (m.kind === "stop") return openStop(m.obj, opts);
    const p = m.obj, t = TYPES[p.type];
    let html = heroPhoto(p, opts.tourPhoto, opts.tourArt);
    if (opts.tourStory) html += '<div class="photo-story"><h3>Why this photo is special</h3><p>' + esc(opts.tourStory) + "</p></div>";
    html += "<h2>" + esc(p.name) + "</h2>";
    html += '<p class="short">' + esc(p.short) + "</p>";
    html += p.body.map((b) => "<p>" + esc(b) + "</p>").join("");
    if (p.rover && roverNow[p.rover] && roverNow[p.rover].sol) {
      html += '<p class="note">The ' + esc(p.name.replace(" Rover", "")) + " pin shows the rover’s last position in this map’s data (sol " + roverNow[p.rover].sol.toLocaleString() + "). A sol is one Mars day — about 24 hours and 40 minutes.</p>";
    }
    if (p.rover && roverPaths[p.rover] && roverPaths[p.rover].approximate) {
      html += '<p class="note">The dotted line for this rover connects its main stops with straight lines and is approximate. Its real path wiggled around dunes and craters.</p>';
    }
    if (p.facts && p.facts.length) {
      html += '<dl class="facts">' + p.facts.map((f) => "<dt>" + esc(f[0]) + "</dt><dd>" + esc(f[1]) + "</dd>").join("") + "</dl>";
    }
    try { html += tempBlock(p); } catch (e) { /* never let the temperature box break a card */ }
    if (p.earth) {
      const heading = t.group === "landforms" ? "Compare it with Earth" : "Earth connection";
      html += '<div class="earth">' + EARTH_SVG + "<div><h3>" + heading + "</h3><p>" + esc(p.earth) + "</p></div></div>";
    }
    if (p.type === "orbiter") html += '<p class="note">Spacecraft and their orbits are drawn much farther from Mars than they really are, so you can see them.</p>';
    if (p.type === "moon") html += '<p class="note">This moon’s orbit is drawn at its real distance from Mars.</p>';
    if (p.type === "future") html += '<p class="note">No human landing site has been chosen yet. NASA has said it hopes to send astronauts to Mars as early as the 2030s.</p>';
    html += '<div class="actions">';
    if (p.rover && roverPaths[p.rover]) {
      html += '<button class="act primary" data-act="path">' + ICON_PATH + "<span>Follow the rover’s path<small>Tap camera and star dots along the way</small></span></button>";
    } else {
      html += '<button class="act" data-act="fly">' + ICON_ZOOM + "<span>Fly here again</span></button>";
    }
    html += videoButton(p.video, p.name);
    if (p.link) html += '<a class="act" href="' + esc(p.link.url) + '" target="_blank" rel="noopener">' + ICON_LINK + "<span>Learn more<small>" + esc(p.link.label) + "</small></span></a>";
    html += "</div>";
    if (p.rover && roverPaths[p.rover]) {
      html += '<div class="rover-key"><div><span class="key-path" style="border-color:' + esc(p.color || "#fff") + '"></span>Dotted line: where it drove</div>' +
        '<div><img class="key-ico" src="' + icon("photo") + '" alt="">Camera dot: real photo from that spot</div>' +
        '<div><img class="key-ico" src="' + icon("find") + '" alt="">Star dot: big discovery</div></div>';
    }
    showCard(html, p.type, t.label, p.color);
    $("#cardContent").querySelectorAll("[data-act]").forEach((b) => {
      b.onclick = () => { if (b.dataset.act === "path") flyToPath(p.rover); else flyToPlace(p); };
    });
    if (!opts.noFly && !(opts.fromTap && p.rover)) flyToPlace(p);
    scene.requestRender();
  }

  function openStop(s, opts) {
    const rover = PLACES.find((p) => p.rover === s.rover);
    const isPhoto = s.kind === "photo";
    let html = "<h2>" + esc(s.name) + "</h2>";
    html += '<p class="short">' + esc((rover ? rover.name : "") + (s.date ? ", " + s.date : "")) + "</p>";
    html += photoFigure(s.pia, s.name);
    html += "<p>" + esc(s.text) + "</p>";
    if (s.sol === undefined) html += '<p class="note">Location is approximate.</p>';
    html += '<div class="actions">';
    if (s.url) {
      html += '<a class="act primary" href="' + esc(s.url) + '" target="_blank" rel="noopener">' + (isPhoto || s.pia ? ICON_PHOTO : ICON_LINK) +
        "<span>" + (s.pia ? "See the full NASA photo" : "Read about it at NASA") + "<small>Opens a NASA web page</small></span></a>";
    }
    html += '<button class="act" data-act="rover">' + ICON_ZOOM + "<span>Back to " + esc(rover ? rover.name : "the rover") + "</span></button>";
    html += "</div>";
    showCard(html, s.kind, isPhoto ? "Photo spot" : "Discovery");
    const b = $("#cardContent").querySelector('[data-act="rover"]');
    if (b) b.onclick = () => openPlace(rover.id, { noFly: true });
    if (!(opts && opts.fromTap)) flyTo(s._lon, s._lat, 6, { shift: true });
  }

  function closeCard() {
    $("#card").hidden = true;
    selected = null;
    if (tour) endTour();
    scene.requestRender();
  }
  $("#cardClose").onclick = closeCard;

  /* Tapping the globe */
  const handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
  handler.setInputAction((e) => {
    const picked = scene.pick(e.position, 28, 28);
    const m = picked && picked.id && picked.id.kind ? picked.id : null;
    if (m && (m.bb.show)) {
      if (tour) endTour();
      openPlace(m.obj.id, { fromTap: true });
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

  /* ------------------------------------------------------------
     Panels
     ------------------------------------------------------------ */
  function closePanels() {
    $$(".panel").forEach((p) => (p.hidden = true));
    $$(".dock-btn[data-panel]").forEach((b) => b.setAttribute("aria-expanded", "false"));
  }
  function openPanel(name) {
    const panel = $("#panel-" + name);
    const wasOpen = !panel.hidden;
    closePanels();
    if (wasOpen) return;
    if (name !== "about" && name !== "help") { /* keep card */ }
    if (isSheetLayout()) { $("#card").hidden = true; }
    panel.hidden = false;
    if (name === "search") { try { $("#searchInput").focus({ preventScroll: true }); } catch (e) { /* ignore */ } }
    const b = $('.dock-btn[data-panel="' + name + '"]');
    if (b) b.setAttribute("aria-expanded", "true");
  }
  $$("[data-panel]").forEach((b) => (b.onclick = () => openPanel(b.dataset.panel)));
  $$("[data-close]").forEach((b) => (b.onclick = () => { closePanels(); store.set("mars-help-seen", "1"); }));
  $("#homeBtn").onclick = () => { closePanels(); goHome(); };

  // Explore list
  (function buildExplore() {
    const groups = {};
    PLACES.forEach((p) => { const g = TYPES[p.type].list; (groups[g] = groups[g] || []).push(p); });
    const seen = new Set();
    let html = "";
    LIST_ORDER.forEach((type) => {
      const g = TYPES[type].list;
      if (seen.has(g) || !groups[g]) return;
      seen.add(g);
      html += '<h3 class="group-title">' + esc(g) + "</h3>";
      groups[g].forEach((p) => {
        html += '<button class="place-row" data-id="' + p.id + '"><img src="' + icon(p.type, p.color) + '" alt=""><div><b>' + esc(p.name) + "</b><span>" + esc(p.short) + "</span></div></button>";
      });
    });
    $("#exploreList").innerHTML = html;
    $$("#exploreList .place-row").forEach((b) => (b.onclick = () => { if (tour) endTour(); openPlace(b.dataset.id); }));
  })();

  // Tours
  let tour = null;
  (function buildTours() {
    $("#tourList").innerHTML = TOURS.map((t) =>
      '<button class="tour-row" data-tour="' + t.id + '"><span class="t-icon" aria-hidden="true">' + t.icon + "</span><b>" + esc(t.name) +
      "</b><span>" + esc(t.blurb) + " " + t.stops.length + " stops.</span></button>").join("");
    $$("#tourList .tour-row").forEach((b) => (b.onclick = () => startTour(b.dataset.tour)));
  })();
  function startTour(id) {
    tour = { t: TOURS.find((x) => x.id === id), i: 0 };
    closePanels();
    showTourStop();
  }
  function showTourStop() {
    const id = tour.t.stops[tour.i];
    openPlace(id, {
      tourPhoto: tour.t.photos && tour.t.photos[id],
      tourStory: tour.t.stories && tour.t.stories[id],
      tourArt: !!tour.t.stories
    });
  }
  function updateTourBar() {
    $("#tourProgress").innerHTML = esc(tour.t.name) + "<br>Stop " + (tour.i + 1) + " of " + tour.t.stops.length;
    $("#tourPrev").disabled = tour.i === 0;
    $("#tourNext").textContent = tour.i === tour.t.stops.length - 1 ? "Finish tour" : "Next stop";
  }
  function endTour() { tour = null; $("#tourBar").hidden = true; }
  $("#tourNext").onclick = () => {
    if (!tour) return;
    if (tour.i >= tour.t.stops.length - 1) { endTour(); closeCard(); goHome(); return; }
    tour.i++; showTourStop();
  };
  $("#tourPrev").onclick = () => { if (tour && tour.i > 0) { tour.i--; showTourStop(); } };

  // Map style
  // Map style toggle (Photos / Heights) in the bottom bar
  $$("[data-style]").forEach((b) => (b.onclick = () => {
    const height = b.dataset.style === "height";
    $$("[data-style]").forEach((x) => x.setAttribute("aria-checked", String(x === b)));
    heightLayer.show = height;
    ctxLayer.show = hiriseLayer.show = !height;
    $("#legend").hidden = !height;
    lastHeightText = "";
    scene.requestRender();
  }));
  $$("[data-filter]").forEach((c) => (c.onchange = () => { filters[c.dataset.filter] = c.checked; scene.requestRender(); }));

  // Landform type toggles in the Layers panel
  (function buildTypeToggles() {
    const counts = {};
    PLACES.forEach((p) => (counts[p.type] = (counts[p.type] || 0) + 1));
    $("#typeToggles").innerHTML = LANDFORM_TYPES.filter((t) => counts[t]).map((t) =>
      '<label class="toggle"><input type="checkbox" data-type="' + t + '" checked><img src="' + icon(t) + '" alt=""><span>' +
      esc(LANDFORM_LABELS[t]) + " <small>" + counts[t] + " on the map</small></span></label>").join("");
    $$("[data-type]").forEach((c) => (c.onchange = () => { filters.types[c.dataset.type] = c.checked; scene.requestRender(); }));
    // "Show all" / "Hide all" buttons. Names on the map are left as they are.
    const MISSION_FILTERS = ["missions", "paths", "future", "space"];
    $$("[data-set-group]").forEach((b) => (b.onclick = () => {
      const on = b.dataset.set === "on", g = b.dataset.setGroup;
      if (g === "all") clearFocus();
      if (g === "landforms" || g === "all") {
        $$("[data-type]").forEach((c) => { c.checked = on; filters.types[c.dataset.type] = on; });
      }
      if (g === "missions" || g === "all") {
        MISSION_FILTERS.forEach((f) => { filters[f] = on; const c = $('[data-filter="' + f + '"]'); if (c) c.checked = on; });
      }
      scene.requestRender();
    }));
  })();

  // Full screen (iPad supports this in Safari; also works when added to the Home Screen)
  const fsEl = document.documentElement;
  const canFS = fsEl.requestFullscreen || fsEl.webkitRequestFullscreen;
  if (canFS) {
    $("#fullscreenBtn").hidden = false;
    $("#fullscreenBtn").onclick = () => {
      const isFS = document.fullscreenElement || document.webkitFullscreenElement;
      if (isFS) (document.exitFullscreen || document.webkitExitFullscreen).call(document);
      else canFS.call(fsEl);
    };
  }

  // Help icons
  $$("img[data-icon]").forEach((img) => (img.src = icon(img.dataset.icon)));

  // About
  $("#aboutBody").innerHTML =
    "<p><b>What you are looking at.</b> The globe is wrapped in real pictures of Mars taken by spacecraft. From far away you see a color map made from the Viking orbiters. As you zoom in, sharper black-and-white pictures from Mars Reconnaissance Orbiter’s CTX camera (about 5 m per pixel) appear. At some famous places, HiRISE pictures show details smaller than a car. The close-up pictures are tinted Mars-colored to match the color map.</p>" +
    "<p><b>Rover paths.</b> Perseverance’s and Curiosity’s paths use the real position data NASA publishes after each drive. Spirit’s and Opportunity’s lines connect their main stops and are approximate.</p>" +
    "<p><b>Spacecraft.</b> Orbiters are drawn much farther from Mars than they really are so you can see them. Phobos and Deimos are drawn at their real distances.</p>" +
    "<p><b>Picture and data credits.</b></p><ul>" +
    "<li>" + esc(CFG.imagery.color.credit) + "</li><li>" + esc(CFG.imagery.ctx.credit) + "</li><li>" + esc(CFG.imagery.hirise.credit) + "</li><li>" + esc(CFG.imagery.height.credit) + "</li>" +
    "<li>Basic offline map: NASA 3D Resources (Viking-based global map)</li>" +
    "<li>Rover positions: NASA/JPL-Caltech MMGIS rover maps (mars.nasa.gov)</li>" +
    "<li>Card photos: NASA Image and Video Library (images.nasa.gov) and NASA Photojournal. NASA/JPL-Caltech, NASA, ESA, University of Arizona, MSSS, and other mission partners.</li>" +
    "<li>3D globe: CesiumJS (Apache 2.0 license). Fonts: Big Shoulders Display and Atkinson Hyperlegible (SIL Open Font License).</li></ul>" +
    "<p>This explorer is an independent classroom project. It is not made by or endorsed by NASA.</p>";

  /* ------------------------------------------------------------
     Search
     ------------------------------------------------------------ */
  const norm = (t) => String(t || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[’'‘“”"]/g, "").replace(/[^a-z0-9]+/g, " ").trim();
  // Everyday words students might type, for each kind of pin
  const TYPE_WORDS = {
    volcano: "volcano volcanoes volcanic lava magma eruption shield caldera mons mountain",
    canyon: "canyon canyons chasm chasma gorge cliff",
    channel: "river rivers stream channel channels valley valleys valles vallis flood floods water delta meander outflow",
    crater: "crater craters impact meteor meteorite asteroid hole",
    basin: "basin basins plain plains planitia lowland lowlands impact",
    ice: "ice icy polar pole poles frozen glacier glaciers frost snow cap water",
    region: "region place mesa dunes sand",
    rover: "rover rovers robot robots wheels mission missions",
    helicopter: "helicopter drone flying flight aircraft robot mission",
    lander: "lander landers landing robot spacecraft mission missions",
    orbiter: "orbiter orbiters satellite satellites spacecraft orbit space mission missions",
    moon: "moon moons satellite orbit",
    future: "human humans astronaut astronauts people crew future spacex starship base colony landing site"
  };
  const CATEGORY_NAMES = {
    volcano: "volcanoes", canyon: "canyons", channel: "river channels & valleys", crater: "craters", basin: "basins & plains",
    ice: "ice & polar places", region: "other famous places", rover: "rovers", helicopter: "helicopters", lander: "landers",
    orbiter: "orbiters", moon: "moons", future: "possible human landing sites"
  };
  const words = (t) => norm(t).split(" ").filter(Boolean);
  const searchIndex = [];
  PLACES.forEach((p) => searchIndex.push({
    id: p.id, kind: "place", type: p.type, rank: p.rank || 2, name: p.name, sub: p.short,
    nameW: words(p.name), typeW: words(TYPE_WORDS[p.type] + " " + TYPES[p.type].label),
    shortW: words(p.short), bodyW: words((p.body || []).join(" ") + " " + (p.earth || ""))
  }));
  Object.values(STOPS).forEach((list) => list.forEach((st) => {
    const rover = PLACES.find((p) => p.rover === st.rover);
    searchIndex.push({
      id: st.id, kind: "stop", type: st.kind, rank: 4, name: st.name, sub: (rover ? rover.name : "") + (st.date ? ", " + st.date : ""),
      nameW: words(st.name), typeW: words(st.kind === "photo" ? "photo picture" : "discovery"), shortW: words(rover ? rover.name : ""), bodyW: words(st.text)
    });
  }));
  function stems(tok) {
    const out = [tok];
    if (tok.length > 4 && tok.endsWith("es")) out.push(tok.slice(0, -2));
    if (tok.length > 3 && tok.endsWith("s")) out.push(tok.slice(0, -1));
    return out;
  }
  const hit = (list, forms) => list.some((w) => forms.some((f) => w.startsWith(f)));
  function runSearch(q) {
    const toks = words(q);
    if (!toks.length) return { results: [], types: [] };
    // Which kinds of pins does the search describe? ("crater" -> all craters)
    const types = Object.keys(TYPE_WORDS).filter((t) => toks.every((tok) => hit(words(TYPE_WORDS[t]), stems(tok))));
    const results = [];
    for (const it of searchIndex) {
      let score = 0, ok = true;
      for (const tok of toks) {
        const f = stems(tok);
        if (hit(it.nameW, f)) score += 3;
        else if (hit(it.typeW, f)) score += 2;
        else if (hit(it.shortW, f)) score += 1;
        else if (tok.length > 3 && hit(it.bodyW, f)) score += 0.4;
        else { ok = false; break; }
      }
      if (ok) {
        if (norm(it.name).startsWith(norm(q))) score += 2;
        // "strong" = really this kind of thing (or named for it), not just mentioned in the text
        const named = toks.every((tok) => hit(it.nameW, stems(tok)));
        const strong = types.length ? (types.includes(it.type) || named) : score >= 1;
        results.push({ it, score: score + (strong ? 10 : 0), strong });
      }
    }
    results.sort((a, b) => b.score - a.score || a.it.rank - b.it.rank || a.it.name.localeCompare(b.it.name));
    return { results: results.filter((r) => r.strong).map((r) => r.it), more: results.filter((r) => !r.strong).map((r) => r.it), types };
  }

  const SUGGEST = [["Craters", "crater"], ["Volcanoes", "volcano"], ["Canyons", "canyon"], ["Rivers & valleys", "river"], ["Ice", "ice"],
    ["Rovers", "rover"], ["Landers", "lander"], ["Orbiters", "orbiter"], ["Moons", "moon"], ["Human landing sites", "astronaut"]];
  function renderSearch() {
    const q = $("#searchInput").value;
    $("#searchClear").hidden = !q;
    const box = $("#searchResults");
    if (!norm(q)) {
      box.innerHTML = '<h3 class="group-title">Quick searches</h3><div class="chips">' +
        SUGGEST.map((s) => '<button class="chip" data-q="' + esc(s[1]) + '">' + esc(s[0]) + "</button>").join("") + "</div>" +
        '<p class="hint">Type the name of a place or spacecraft, or a kind of thing, like “crater” or “river.”</p>';
      box.querySelectorAll("[data-q]").forEach((b) => (b.onclick = () => { $("#searchInput").value = b.dataset.q; renderSearch(); }));
      return;
    }
    const { results, more, types } = runSearch(q);
    if (!results.length && !more.length) {
      box.innerHTML = '<p class="hint">No matches for “' + esc(q) + '”. Check the spelling, or try a word like “crater,” “volcano,” “rover,” or “ice.”</p>';
      return;
    }
    const places = results.filter((r) => r.kind === "place");
    let html = "";
    if (places.length > 1) {
      const label = types.length === 1 ? "Show all " + places.length + " " + CATEGORY_NAMES[types[0]] + " on the globe" : "Show these " + places.length + " results on the globe";
      html += '<button class="act primary show-results" id="showResults"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c3 3 3 14 0 17M12 3.5c-3 3-3 14 0 17"/></svg><span>' + esc(label) + "<small>Hides everything else until you tap “Show everything”</small></span></button>";
    }
    const row = (r) => {
      const ic = r.kind === "stop" ? icon(r.type) : icon(r.type, (PLACES.find((p) => p.id === r.id) || {}).color);
      return '<button class="place-row" data-id="' + r.id + '"><img src="' + ic + '" alt=""><div><b>' + esc(r.name) + "</b><span>" + esc(r.sub || "") + "</span></div></button>";
    };
    html += results.slice(0, 40).map(row).join("");
    if (more.length) html += '<h3 class="group-title">Also mentions “' + esc(q.trim()) + '”</h3>' + more.slice(0, 30).map(row).join("");
    box.innerHTML = html;
    box.querySelectorAll(".place-row").forEach((b) => (b.onclick = () => { if (tour) endTour(); $("#searchInput").blur(); openPlace(b.dataset.id); }));
    const sr = $("#showResults");
    if (sr) sr.onclick = () => showOnGlobe(places.map((r) => r.id), types.length === 1 ? CATEGORY_NAMES[types[0]] : "results for “" + q.trim() + "”");
  }
  function showOnGlobe(ids, what) {
    focusIds = new Set(ids);
    $("#focusText").textContent = "Showing " + ids.length + " " + what;
    $("#focusBar").hidden = false;
    $("#searchInput").blur();
    closePanels();
    $("#card").hidden = true; selected = null;
    if (tour) endTour();
    // Fly to a view centered on the results
    const sum = new Cesium.Cartesian3();
    const pts = ids.map((id) => byId[id]).filter((m) => m && !m.space).map((m) => Cesium.Cartesian3.normalize(m.pos, new Cesium.Cartesian3()));
    if (pts.length) {
      pts.forEach((v) => Cesium.Cartesian3.add(sum, v, sum));
      const c = MARS.cartesianToCartographic(Cesium.Cartesian3.multiplyByScalar(Cesium.Cartesian3.normalize(sum, sum), R, sum));
      const center = Cesium.Cartesian3.normalize(sum, new Cesium.Cartesian3());
      const spread = Math.max(...pts.map((v) => Math.acos(Math.min(1, Cesium.Cartesian3.dot(v, center)))));
      const hKm = Math.min(11000, Math.max(400, (R / 1000) * spread * 2.6));
      flyTo(Cesium.Math.toDegrees(c.longitude), Cesium.Math.toDegrees(c.latitude), hKm);
    } else goHome();
    scene.requestRender();
  }
  function clearFocus() {
    focusIds = null;
    $("#focusBar").hidden = true;
    scene.requestRender();
  }
  $("#focusClear").onclick = clearFocus;
  $("#searchInput").addEventListener("input", renderSearch);
  $("#searchInput").addEventListener("keydown", (e) => {
    if (e.key === "Enter") { e.preventDefault(); $("#searchInput").blur(); }
  });
  $("#searchClear").onclick = () => { $("#searchInput").value = ""; renderSearch(); $("#searchInput").focus(); };
  renderSearch();

  /* ------------------------------------------------------------
     Mars right now (status box)
     ------------------------------------------------------------ */
  (function marsStatus() {
    const MC = window.MarsClock;
    if (!MC) { $("#status").hidden = true; return; }
    const fmt = (n) => Math.round(n).toLocaleString("en-US");
    const pad = (n) => String(n).padStart(2, "0");
    function update() {
      const now = new Date();
      const h = MC.mtcHours(now);
      const clock = pad(Math.floor(h)) + ":" + pad(Math.floor((h % 1) * 60));
      $("#stMtc").textContent = clock; $("#stMtc2").textContent = clock + " MTC";
      $("#stMsd").textContent = "Sol " + Math.floor(MC.marsSolDate(now)).toLocaleString("en-US");
      const km = MC.earthMarsKm(now);
      const mkm = km / 1e6, mmi = km / 1.609344 / 1e6;
      $("#stDistShort").textContent = fmt(mmi) + " million mi";
      $("#stDist").textContent = fmt(mmi) + " million miles (" + fmt(mkm) + " million km)";
      const mins = MC.lightMinutes(km);
      $("#stLight").textContent = "About " + Math.round(mins) + " minutes";
      $("#stPerse").textContent = "Sol " + MC.roverSol(now, "2021-02-18T20:55:00Z", 77.45).toLocaleString("en-US");
      $("#stCurio").textContent = "Sol " + MC.roverSol(now, "2012-08-06T05:17:57Z", 137.44).toLocaleString("en-US");
      const ls = MC.solarLongitude(now), s = MC.seasons(ls);
      $("#stSeason").textContent = s.north[0].toUpperCase() + s.north.slice(1) + " in the north";
      $("#stSeasonText").textContent = "It’s " + s.north + " in Mars’ northern half and " + s.south + " in the southern half, in Mars Year " +
        MC.marsYear(now) + ". Mars is tilted like Earth, so it has seasons, but a Mars year lasts 687 Earth days, so each season is about twice as long as ours.";
    }
    update();
    setInterval(update, 5000);
    const setOpen = (open) => {
      $("#statusMore").hidden = !open;
      $("#status").classList.toggle("open", open);
      $("#statusToggle").setAttribute("aria-expanded", String(open));
      $("#statusMoreLabel").textContent = open ? "Less" : "More";
    };
    $("#statusToggle").onclick = () => setOpen($("#statusMore").hidden);
  })();

  // First-visit help
  if (CFG.showHelpOnFirstVisit && !store.get("mars-help-seen")) openPanel("help");

  // Prevent iPad Safari pinch-zooming the whole page
  ["gesturestart", "gesturechange", "gestureend"].forEach((ev) => document.addEventListener(ev, (e) => e.preventDefault(), { passive: false }));
  document.addEventListener("dblclick", (e) => e.preventDefault(), { passive: false });
  window.addEventListener("resize", () => scene.requestRender());

  // Expose for debugging / teacher tweaks in the browser console
  window.marsExplorer = { viewer, openPlace, flyTo, net, byId };
  scene.requestRender();
})();
