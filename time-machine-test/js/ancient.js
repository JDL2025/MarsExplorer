/* =====================================================================
   MARS EXPLORER — ANCIENT MARS TIME MACHINE
   ---------------------------------------------------------------------
   A separate mode: it never changes the normal globe. When students
   exit, everything goes back exactly as it was.
   The story text and settings live in js/data/ancient.js.
   The water uses assets/ancient/water.png, made from NASA's MOLA
   elevation map (see the README).
   To remove this feature completely, delete the three lines that load
   ancient.css, data/ancient.js and ancient.js in index.html.
   ===================================================================== */
(function () {
  "use strict";

  function init() {
    const E = window.marsExplorer, A = window.ANCIENT;
    if (!E || !A || !window.Cesium) return;
    const C = window.Cesium;
    const viewer = E.viewer, scene = viewer.scene, layers = viewer.imageryLayers;
    const MARS = scene.globe.ellipsoid;
    const STOPS = A.stops;
    const $ = (s, el) => (el || document).querySelector(s);
    const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

    /* ---------------- Icons ---------------- */
    const ICON = {
      rock: '<path d="M4 15l3-7 6-3 6 4 1 7-5 3H8z"/><path d="M7 8l4 4 2 7M13 5l-2 7 9 1"/>',
      layers: '<path d="M12 4l9 4.5-9 4.5-9-4.5z"/><path d="M3 12.5l9 4.5 9-4.5M3 16.5l9 4.5 9-4.5"/>',
      drop: '<path d="M12 3.5c3.5 4.5 6 7.6 6 10.5a6 6 0 0 1-12 0c0-2.9 2.5-6 6-10.5z"/>',
      shield: '<path d="M12 3l7.5 3v5.5c0 4.6-3.2 8-7.5 9.5-4.3-1.5-7.5-4.9-7.5-9.5V6z"/>',
      cloud: '<path d="M7 18h10.5a4 4 0 0 0 .6-7.95A6 6 0 0 0 6.5 9.6 4.2 4.2 0 0 0 7 18z"/>',
      crater: '<ellipse cx="12" cy="13" rx="8.5" ry="5.5"/><ellipse cx="12" cy="13.6" rx="4.5" ry="2.6"/><path d="M5 6l2 2M17.5 4.5 16 7.5M12 3v3"/>',
      wave: '<path d="M2.5 9c2.4 0 2.4-2 4.75-2S9.6 9 12 9s2.4-2 4.75-2S19.1 9 21.5 9M2.5 14c2.4 0 2.4-2 4.75-2S9.6 14 12 14s2.4-2 4.75-2 2.35 2 4.75 2M2.5 19c2.4 0 2.4-2 4.75-2S9.6 19 12 19s2.4-2 4.75-2 2.35 2 4.75 2"/>',
      river: '<path d="M6 3c0 4 6 4 6 8s-7 4-7 10M14 3c0 3 5 4 5 8s-5 5-5 10"/>',
      wind: '<path d="M3 8h11a3 3 0 1 0-3-3M3 12h16a3 3 0 1 1-3 3M3 16h8"/>',
      sun: '<circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.4M12 19.1v2.4M2.5 12h2.4M19.1 12h2.4M5.3 5.3 7 7M17 17l1.7 1.7M5.3 18.7 7 17M17 7l1.7-1.7"/>',
      flood: '<path d="M3 17c2.2 0 2.2-1.6 4.5-1.6S9.8 17 12 17s2.2-1.6 4.5-1.6S18.8 17 21 17"/><path d="M12 3v9M8.5 8.5 12 12l3.5-3.5"/>',
      ice: '<path d="M12 2.5v19M3.8 7.25l16.4 9.5M3.8 16.75l16.4-9.5"/><path d="M9.5 4 12 6.5 14.5 4M9.5 20l2.5-2.5 2.5 2.5"/>',
      snow: '<path d="M7 14h10a3.5 3.5 0 0 0 .5-6.96A5.2 5.2 0 0 0 7.3 6.6 3.7 3.7 0 0 0 7 14z"/><path d="M8 18v.01M12 19.5v.01M16 18v.01M10 21.5v.01M14 21.5v.01"/>',
      space: '<circle cx="12" cy="12" r="4"/><ellipse cx="12" cy="12" rx="10" ry="3.6" transform="rotate(-20 12 12)"/><path d="M19 4.5v.01M4.5 19v.01"/>',
      robot: '<rect x="5" y="9" width="14" height="6" rx="1.5"/><path d="M9 9V6h6v3M12 6V3.5"/><circle cx="7" cy="18" r="2"/><circle cx="12" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
      question: '<circle cx="12" cy="12" r="9"/><path d="M9.6 9.3a2.5 2.5 0 1 1 3.4 2.3c-.7.3-1 .8-1 1.5v.6M12 16.8v.01"/>',
      thermo: '<path d="M10 14.5V5a2 2 0 1 1 4 0v9.5a4 4 0 1 1-4 0z"/><path d="M12 9v8"/>',
      pin: '<path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.4"/>',
      hourglass: '<path d="M6.5 3h11M6.5 21h11M7.5 3c0 5 4.5 6 4.5 9s-4.5 4-4.5 9M16.5 3c0 5-4.5 6-4.5 9s4.5 4 4.5 9"/><path d="M9.2 18.5h5.6"/>',
      x: '<path d="M6 6l12 12M18 6 6 18"/>',
      info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.01"/>'
    };
    const svg = (name) => '<svg viewBox="0 0 24 24" aria-hidden="true">' + (ICON[name] || ICON.question) + "</svg>";

    /* ---------------- Ancient water data ---------------- */
    let WD = null, waterPromise = null;
    const UNIT = 15;                                       // meters per step in water.png
    const BASIN = { ocean: [1, -3550], hellas: [2, -5800], jezero: [3, -2440], gale: [4, -3900], eridania: [5, 930] };
    function loadWater() {
      if (waterPromise) return waterPromise;
      waterPromise = new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          try {
            const w = img.naturalWidth, h = img.naturalHeight;
            const c = document.createElement("canvas"); c.width = w; c.height = h;
            const g = c.getContext("2d", { willReadFrequently: true });
            g.drawImage(img, 0, 0);
            const px = g.getImageData(0, 0, w, h).data;
            const n = w * h, d = new Uint8Array(n), id = new Uint8Array(n);
            for (let i = 0, j = 0; i < n; i++, j += 4) { d[i] = px[j]; id[i] = (px[j + 1] + 20) / 40 | 0; }
            c.width = c.height = 1;
            WD = { w, h, d, id };
            resolve(WD);
          } catch (e) { reject(e); }
        };
        img.onerror = () => reject(new Error("water map did not load"));
        img.src = "assets/ancient/water.png";
      });
      waterPromise.catch(() => { waterPromise = null; });
      return waterPromise;
    }

    /* ---------------- River and flood paths ---------------- */
    let riverData = null, riverPromise = null, riverLines = null, floodLines = null;
    function loadRivers() {
      if (riverPromise) return riverPromise;
      riverPromise = fetch("assets/ancient/rivers.json").then((r) => { if (!r.ok) throw new Error("rivers"); return r.json(); })
        .then((j) => { riverData = j; return j; });
      riverPromise.catch(() => { riverPromise = null; });
      return riverPromise;
    }
    const RIVER_RGB = C.Color.fromCssColorString("#6cc8f5"), FLOOD_RGB = C.Color.fromCssColorString("#d9f3ff");
    function buildRiverLines() {
      if (riverLines || !riverData) return;
      riverLines = scene.primitives.add(new C.PolylineCollection());
      riverData.rivers.forEach(([logAcc, flat]) => {
        if (logAcc < 2.5) return;           // only the bigger rivers, so the globe doesn't look busy
        const hts = [];
        for (let i = 0; i < flat.length; i += 2) hts.push(flat[i], flat[i + 1], 3000);
        riverLines.add({
          positions: C.Cartesian3.fromDegreesArrayHeights(hts, MARS),
          width: Math.max(1, Math.min(3, 0.7 + (logAcc - 2.5) * 0.95)),
          material: C.Material.fromType("Color", { color: RIVER_RGB.withAlpha(0) })
        });
      });
      floodLines = scene.primitives.add(new C.PolylineCollection());
      Object.values(riverData.floods || {}).forEach((flat) => {
        const hts = [];
        for (let i = 0; i < flat.length; i += 2) hts.push(flat[i], flat[i + 1], 4000);
        floodLines.add({
          positions: C.Cartesian3.fromDegreesArrayHeights(hts, MARS), width: 14,
          material: C.Material.fromType("PolylineGlow", { color: FLOOD_RGB.withAlpha(0), glowPower: 0.22, taperPower: 1 })
        });
      });
    }
    function lineAlpha(coll, base, a) {
      if (!coll) return;
      coll.show = a > 0.005;
      for (let i = 0; i < coll.length; i++) coll.get(i).material.uniforms.color = base.withAlpha(a);
    }

    /* ---------------- Tile helpers ---------------- */
    function baseProvider(tile, maxLevel, credit) {
      const ts = new C.GeographicTilingScheme({ ellipsoid: MARS, numberOfLevelZeroTilesX: 2, numberOfLevelZeroTilesY: 1 });
      return {
        tilingScheme: ts, rectangle: ts.rectangle, tileWidth: tile, tileHeight: tile,
        minimumLevel: 0, maximumLevel: maxLevel, tileDiscardPolicy: undefined, errorEvent: new C.Event(),
        credit: credit ? new C.Credit(credit) : undefined, proxy: undefined, hasAlphaChannel: true,
        ready: true, readyPromise: Promise.resolve(true), __ancient: true,   // marks our layers for clean-up
        getTileCredits() { return undefined; }, pickFeatures() { return undefined; }
      };
    }
    function tileGeom(x, y, level, n) {
      const nx = 2 << level, ny = 1 << level, dlon = 360 / nx, dlat = 180 / ny;
      return { west: -180 + x * dlon, north: 90 - y * dlat, dlon, dlat, n };
    }
    function emptyCanvas(n) { const c = document.createElement("canvas"); c.width = c.height = n; return c; }

    /* Water tile: depth = (basin's highest level − ground) − how far the water has dropped */
    function waterProvider(drop, ice) {
      const p = baseProvider(256, 6, "Ancient water: placed with NASA MOLA elevation data");
      p.requestImage = function (x, y, level) {
        const n = 256, c = emptyCanvas(n);
        try {
          if (!WD) return Promise.resolve(c);
          const t = tileGeom(x, y, level, n), Wd = WD.w, Hd = WD.h, d = WD.d, id = WD.id;
          const g = c.getContext("2d"), im = g.createImageData(n, n), o = im.data;
          let any = false;
          for (let j = 0; j < n; j++) {
            const lat = t.north - (j + 0.5) / n * t.dlat;
            let fy = (90 - lat) / 180 * Hd - 0.5, y0 = Math.floor(fy);
            if (y0 < 0) { y0 = 0; fy = 0; } else if (y0 > Hd - 2) { y0 = Hd - 2; fy = y0; }
            const ty = fy - y0;
            for (let i = 0; i < n; i++) {
              const lon = t.west + (i + 0.5) / n * t.dlon;
              const fx = (lon + 180) / 360 * Wd - 0.5;
              let x0 = Math.floor(fx); const tx = fx - x0; let x1 = x0 + 1;
              if (x0 < 0) x0 += Wd; if (x1 >= Wd) x1 -= Wd;
              const i00 = y0 * Wd + x0, i10 = y0 * Wd + x1, i01 = i00 + Wd, i11 = i10 + Wd;
              const b = id[i00] || id[i10] || id[i01] || id[i11];
              if (!b) continue;
              const s = drop[b];
              if (s === undefined) continue;
              const d00 = d[i00], d10 = d[i10], d01 = d[i01], d11 = d[i11];
              const v = (d00 * (1 - tx) + d10 * tx) * (1 - ty) + (d01 * (1 - tx) + d11 * tx) * ty;
              const dep = v * UNIT - s;
              if (dep <= 0) continue;
              any = true;
              const tt = Math.pow(Math.min(1, dep / 1600), 0.55);
              const fade = Math.max(0, 1 - dep / 900);
              let sh = ((d01 - d00) + (d11 - d10) - (d10 - d00) - (d11 - d01)) * 0.035;
              sh = 1 + Math.max(-0.28, Math.min(0.28, sh)) * (ice ? 1 : fade);
              let r, gg, bb, a;
              if (ice) {
                r = 236 - 44 * tt; gg = 243 - 28 * tt; bb = 250 - 14 * tt;
                a = 0.93;
              } else {
                r = 72 - 62 * tt; gg = 198 - 156 * tt; bb = 206 - 110 * tt;
                if (dep < 28) { const k = (1 - dep / 28) * 0.45; r += (218 - r) * k; gg += (246 - gg) * k; bb += (240 - bb) * k; }
                a = 0.6 + 0.34 * tt;
              }
              a *= Math.min(1, dep / 10);
              const q = (j * n + i) * 4;
              o[q] = Math.min(255, r * sh); o[q + 1] = Math.min(255, gg * sh); o[q + 2] = Math.min(255, bb * sh); o[q + 3] = a * 255;
            }
          }
          if (any) g.putImageData(im, 0, 0);
        } catch (e) { /* draw nothing */ }
        return Promise.resolve(c);
      };
      return p;
    }

    /* Smooth noise on a sphere, so clouds and lava have no seams */
    function hash3(x, y, z) {
      let h = Math.imul(x, 374761393) ^ Math.imul(y, 668265263) ^ Math.imul(z, 1274126177);
      h = Math.imul(h ^ (h >>> 13), 1274126177); h ^= h >>> 16;
      return (h >>> 0) / 4294967296;
    }
    function vnoise(x, y, z) {
      const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
      const xf = x - xi, yf = y - yi, zf = z - zi;
      const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf), w = zf * zf * (3 - 2 * zf);
      const a = hash3(xi, yi, zi), b = hash3(xi + 1, yi, zi), c = hash3(xi, yi + 1, zi), d = hash3(xi + 1, yi + 1, zi);
      const e = hash3(xi, yi, zi + 1), f = hash3(xi + 1, yi, zi + 1), g = hash3(xi, yi + 1, zi + 1), h = hash3(xi + 1, yi + 1, zi + 1);
      const k1 = a + (b - a) * u, k2 = c + (d - c) * u, k3 = e + (f - e) * u, k4 = g + (h - g) * u;
      const m1 = k1 + (k2 - k1) * v, m2 = k3 + (k4 - k3) * v;
      return m1 + (m2 - m1) * w;
    }
    function fbm(x, y, z, oct) {
      let s = 0, a = 0.5, f = 1, norm = 0;
      for (let o = 0; o < oct; o++) { s += a * vnoise(x * f, y * f, z * f); norm += a; f *= 2.03; a *= 0.5; }
      return s / norm;
    }
    const smooth = (e0, e1, x) => { const t = Math.max(0, Math.min(1, (x - e0) / (e1 - e0))); return t * t * (3 - 2 * t); };
    function proceduralProvider(kind) {
      const p = baseProvider(128, kind === "lava" ? 4 : 3, null);
      p.requestImage = function (x, y, level) {
        const n = 128, c = emptyCanvas(n);
        try {
          const t = tileGeom(x, y, level, n), g = c.getContext("2d"), im = g.createImageData(n, n), o = im.data;
          const D = Math.PI / 180;
          for (let j = 0; j < n; j++) {
            const lat = (t.north - (j + 0.5) / n * t.dlat) * D, cl = Math.cos(lat), sl = Math.sin(lat);
            for (let i = 0; i < n; i++) {
              const lon = (t.west + (i + 0.5) / n * t.dlon) * D;
              const px = cl * Math.cos(lon), py = cl * Math.sin(lon), pz = sl;
              const q = (j * n + i) * 4;
              if (kind === "clouds") {
                const warp = fbm(px * 2.1 + 7.3, py * 2.1 + 1.7, pz * 2.1 + 3.1, 3);
                const dens = fbm(px * 3.6 + warp * 1.6, py * 3.6 + warp * 1.6, pz * 5.2 + warp * 1.2, 5);
                const band = 0.06 * Math.cos(lat * 7);
                const a = smooth(0.5, 0.7, dens + band);
                if (a <= 0) continue;
                const bright = 225 + 30 * smooth(0.6, 0.8, dens);
                o[q] = bright; o[q + 1] = bright; o[q + 2] = Math.min(255, bright + 6); o[q + 3] = a * 235;
              } else {
                // dark cooling crust broken by thin glowing cracks, with a few bright hot spots
                const f = fbm(px * 9 + 11, py * 9 + 4, pz * 9 + 9, 5);
                const ridge = 1 - Math.abs(2 * f - 1);
                const crack = smooth(0.86, 0.97, ridge);
                const f2 = fbm(px * 22 + 2, py * 22 + 7, pz * 22 + 5, 3);
                const fine = smooth(0.9, 0.98, 1 - Math.abs(2 * f2 - 1)) * 0.6;
                const hot = smooth(0.66, 0.8, fbm(px * 3 + 3, py * 3 + 8, pz * 3 + 1, 4));
                const k = Math.min(1, crack + fine * (0.4 + hot) + hot * 0.45);
                const crust = 0.75 + 0.25 * fbm(px * 14 + 1, py * 14 + 1, pz * 14 + 1, 3);
                o[q] = 40 * crust + (255 - 40 * crust) * k; o[q + 1] = 14 * crust + (150 - 14 * crust) * k * k; o[q + 2] = 10 * crust + 50 * k * k * k;
                o[q + 3] = (0.72 + 0.26 * k) * 255;
              }
            }
          }
          g.putImageData(im, 0, 0);
        } catch (e) { /* draw nothing */ }
        return Promise.resolve(c);
      };
      return p;
    }

    /* ---------------- Globe state ---------------- */
    const SKY = {
      mars: { hue: -0.47, sat: -0.35, bri: -0.35, light: 8 },
      thin: { hue: -0.32, sat: -0.25, bri: -0.22, light: 10 },
      wet: { hue: -0.04, sat: -0.05, bri: 0.05, light: 15 },
      hot: { hue: -0.56, sat: 0.15, bri: -0.12, light: 11 }
    };
    const sky = scene.skyAtmosphere;
    const imageryList = Object.values(E.imagery || {}).filter(Boolean);
    let saved = null;                      // everything we change, so exit restores it exactly
    let waterLayer = null, cloudLayer = null, lavaLayer = null;
    let ancLabels = null, anim = null;
    const cur = { clouds: 0, lava: 0, rivers: 0, floods: 0, land: [1, 1], sky: SKY.mars };

    function saveState() {
      saved = {
        sky: sky ? { hue: sky.hueShift, sat: sky.saturationShift, bri: sky.brightnessShift, light: sky.atmosphereLightIntensity } : null,
        imagery: imageryList.map((l) => ({ l, brightness: l.brightness, saturation: l.saturation })),
        style: (document.querySelector('[data-style][aria-checked="true"]') || {}).dataset ? document.querySelector('[data-style][aria-checked="true"]').dataset.style : "photo"
      };
      cur.clouds = 0; cur.lava = 0; cur.rivers = 0; cur.floods = 0; cur.land = [1, 1];
      cur.sky = saved.sky ? { hue: saved.sky.hue, sat: saved.sky.sat, bri: saved.sky.bri, light: saved.sky.light } : SKY.mars;
    }
    function restoreState() {
      if (!saved) return;
      if (sky && saved.sky) { sky.hueShift = saved.sky.hue; sky.saturationShift = saved.sky.sat; sky.brightnessShift = saved.sky.bri; sky.atmosphereLightIntensity = saved.sky.light; }
      saved.imagery.forEach((s) => { s.l.brightness = s.brightness; s.l.saturation = s.saturation; });
      saved = null;
    }
    function applyLand(lb, ls) {
      if (!saved) return;
      saved.imagery.forEach((s) => { s.l.brightness = s.brightness * lb; s.l.saturation = s.saturation * ls; });
    }
    function applySky(s) {
      if (!sky) return;
      sky.hueShift = s.hue; sky.saturationShift = s.sat; sky.brightnessShift = s.bri; sky.atmosphereLightIntensity = s.light;
    }
    function ensureLayer(which) {
      if (which === "clouds" && !cloudLayer) { cloudLayer = layers.addImageryProvider(proceduralProvider("clouds")); cloudLayer.alpha = 0; }
      if (which === "lava" && !lavaLayer) { lavaLayer = layers.addImageryProvider(proceduralProvider("lava")); lavaLayer.alpha = 0; }
    }
    function orderLayers() {
      if (lavaLayer) layers.raiseToTop(lavaLayer);
      if (waterLayer) layers.raiseToTop(waterLayer);
      if (cloudLayer) layers.raiseToTop(cloudLayer);
    }
    function dropsFor(water) {
      const drop = [];
      let any = false;
      Object.keys(BASIN).forEach((k) => {
        if (typeof water[k] === "number") { drop[BASIN[k][0]] = BASIN[k][1] - water[k]; any = true; }
      });
      return any ? drop : null;
    }

    const LABEL_STYLE = {
      water: ["#d4f1ff", "#08223f"], ice: ["#ffffff", "#2b4866"], flood: ["#a9dcff", "#08223f"], lava: ["#ffc07a", "#3a1100"]
    };
    function setLabels(list) {
      if (!ancLabels) ancLabels = scene.primitives.add(new C.LabelCollection({ scene }));
      ancLabels.removeAll();
      (list || []).forEach(([text, lat, lon, kind]) => {
        const st = LABEL_STYLE[kind] || LABEL_STYLE.water;
        ancLabels.add({
          position: C.Cartesian3.fromDegrees(lon, lat, 30000, MARS), text,
          font: '800 24px "Big Shoulders Display", "Arial Narrow", sans-serif',
          fillColor: C.Color.fromCssColorString(st[0]).withAlpha(0), outlineColor: C.Color.fromCssColorString(st[1]).withAlpha(0), outlineWidth: 5,
          style: C.LabelStyle.FILL_AND_OUTLINE, horizontalOrigin: C.HorizontalOrigin.CENTER, verticalOrigin: C.VerticalOrigin.CENTER,
          scaleByDistance: new C.NearFarScalar(1.5e6, 1.15, 2.6e7, 0.62)
        });
      });
    }
    function labelAlpha(a) {
      if (!ancLabels) return;
      for (let i = 0; i < ancLabels.length; i++) {
        const l = ancLabels.get(i);
        l.fillColor = l.fillColor.withAlpha(a); l.outlineColor = l.outlineColor.withAlpha(a * 0.9);
      }
    }

    /* Move the globe to a stop's look, with a smooth cross-fade */
    let stageToken = 0;
    async function setGlobe(gcfg) {
      const token = ++stageToken;
      const target = {
        clouds: gcfg.clouds || 0, lava: gcfg.lava || 0, rivers: gcfg.rivers || 0, floods: gcfg.floods || 0,
        land: gcfg.land || [1, 1], sky: SKY[gcfg.sky] || SKY.mars
      };
      const drop = dropsFor(gcfg.water || {});
      let newWater = null;
      if (drop) {
        setLoading(!WD);
        try { await loadWater(); } catch (e) { setLoading(false); showNetHint(); }
        setLoading(false);
        if (token !== stageToken || !isOpen) return;
        if (WD) { newWater = layers.addImageryProvider(waterProvider(drop, !!gcfg.ice)); newWater.alpha = 0; }
      }
      if (target.rivers > 0 || target.floods > 0) {
        try { await loadRivers(); } catch (e) { /* paths are optional */ }
        if (token !== stageToken || !isOpen) return;
        buildRiverLines();
      }
      if (target.clouds > 0) ensureLayer("clouds");
      if (target.lava > 0) ensureLayer("lava");
      const oldWater = waterLayer;
      waterLayer = newWater;
      orderLayers();
      setLabels(gcfg.labels);

      const from = { clouds: cur.clouds, lava: cur.lava, rivers: cur.rivers, floods: cur.floods, land: cur.land.slice(), sky: Object.assign({}, cur.sky) };
      const oldAlpha = oldWater ? oldWater.alpha : 0;
      const t0 = performance.now(), DUR = 1500;
      if (anim) cancelAnimationFrame(anim);
      const step = (now) => {
        if (token !== stageToken) return;
        const k0 = Math.min(1, (now - t0) / DUR), k = k0 * k0 * (3 - 2 * k0);
        const mix = (a, b) => a + (b - a) * k;
        cur.clouds = mix(from.clouds, target.clouds); cur.lava = mix(from.lava, target.lava);
        cur.rivers = mix(from.rivers, target.rivers); cur.floods = mix(from.floods, target.floods);
        lineAlpha(riverLines, RIVER_RGB, cur.rivers * 0.62); lineAlpha(floodLines, FLOOD_RGB, cur.floods);
        cur.land = [mix(from.land[0], target.land[0]), mix(from.land[1], target.land[1])];
        cur.sky = { hue: mix(from.sky.hue, target.sky.hue), sat: mix(from.sky.sat, target.sky.sat), bri: mix(from.sky.bri, target.sky.bri), light: mix(from.sky.light, target.sky.light) };
        if (cloudLayer) cloudLayer.alpha = cur.clouds;
        if (lavaLayer) lavaLayer.alpha = cur.lava;
        if (newWater) newWater.alpha = k;
        if (oldWater) oldWater.alpha = oldAlpha * (1 - k);
        applyLand(cur.land[0], cur.land[1]);
        applySky(cur.sky);
        labelAlpha(k);
        scene.requestRender();
        if (k0 < 1) anim = requestAnimationFrame(step);
        else {
          anim = null;
          if (oldWater) layers.remove(oldWater, true);
        }
      };
      anim = requestAnimationFrame(step);
    }
    function clearGlobe() {
      stageToken++;
      if (anim) { cancelAnimationFrame(anim); anim = null; }
      [waterLayer, cloudLayer, lavaLayer].forEach((l) => { if (l) layers.remove(l, true); });
      // also remove any water layer that was still fading out
      for (let i = layers.length - 1; i >= 0; i--) {
        const l = layers.get(i);
        if (l && l.imageryProvider && l.imageryProvider.__ancient) layers.remove(l, true);
      }
      waterLayer = cloudLayer = lavaLayer = null;
      if (ancLabels) { scene.primitives.remove(ancLabels); ancLabels = null; }
      if (riverLines) { scene.primitives.remove(riverLines); riverLines = null; }
      if (floodLines) { scene.primitives.remove(floodLines); floodLines = null; }
      restoreState();
      scene.requestRender();
    }

    /* ---------------- Cards ---------------- */
    function photoUrl(ph) {
      const id = ph[0], size = ph[1] || "medium", base = "https://images-assets.nasa.gov/image/" + id + "/" + id;
      const fb = ["~small.jpg", "~orig.jpg"].map((x) => base + x).filter((u) => u !== base + "~" + size + ".jpg");
      return { src: base + "~" + size + ".jpg", fb: fb.join("|"), page: "https://images.nasa.gov/details/" + encodeURIComponent(id) };
    }
    function heroFig(ph) {
      if (!ph) return "";
      const u = photoUrl(ph);
      return '<figure class="hero art anc-hero"><a class="hero-img" href="' + u.page + '" target="_blank" rel="noopener" aria-label="Open this picture on NASA’s website">' +
        '<img src="' + u.src + '" data-fallback="' + u.fb + '" alt="' + esc(ph[2]) + '" onload="this.closest(\'figure\').classList.add(\'loaded\')" onerror="marsPhotoFail(this)"></a>' +
        "<figcaption><span>" + (ph[3] ? "<b>Artist’s idea.</b> " : "") + esc(ph[2]) + "</span></figcaption></figure>";
    }
    function thumbFig(ph, cls) {
      if (!ph) return "";
      const u = photoUrl(ph);
      return '<figure class="photo ' + (cls || "anc-thumb") + '"><a href="' + u.page + '" target="_blank" rel="noopener" aria-label="Open this picture on NASA’s website"><img src="' + u.src + '" data-fallback="' + u.fb + '" alt="' + esc(ph[2]) + '" onerror="marsPhotoFail(this)"></a><figcaption>' + esc(ph[2]) + "</figcaption></figure>";
    }
    const GAUGES = [["air", "Air", "wind"], ["water", "Water", "drop"], ["warmth", "Warmth", "thermo"], ["shield", "Shield", "shield"]];
    function gaugesHtml(g) {
      if (!g) return "";
      return '<div class="anc-gauges" aria-label="Mars at this time">' + GAUGES.map(([k, name, ic]) => {
        const v = g[k] || [0, ""];
        let bar = ""; for (let i = 0; i < 4; i++) bar += '<i class="' + (i < v[0] ? "on" : "") + '"></i>';
        return '<div class="anc-g anc-g-' + k + '"><span class="anc-g-ico">' + svg(ic) + '</span><span class="anc-g-name">' + name + '</span><span class="anc-g-bar">' + bar + "</span><b>" + esc(v[1]) + "</b></div>";
      }).join("") + "</div>";
    }
    function pointsHtml(points) {
      return '<div class="anc-points">' + (points || []).map(([ic, h, p]) =>
        '<div class="anc-point"><span class="anc-ico">' + svg(ic) + "</span><div><h3>" + esc(h) + "</h3><p>" + esc(p) + "</p></div></div>").join("") + "</div>";
    }
    function setBadge() {
      $("#cardBadge").innerHTML = '<span class="anc-badge-ico">' + svg("hourglass") + "</span>Time Machine";
    }
    function showCardHtml(html) {
      setBadge();
      $("#cardContent").innerHTML = html;
      $("#tourBar").hidden = true;
      $("#card").hidden = false;
      $("#cardScroll").scrollTop = 0;
      $("#cardContent").querySelectorAll("[data-fly]").forEach((b) => {
        b.onclick = () => { const [lat, lon, km] = b.dataset.fly.split(",").map(Number); E.flyTo(lon, lat, km, { shift: true }); };
      });
      $("#cardContent").querySelectorAll("[data-go]").forEach((b) => {
        b.onclick = () => {
          const g = b.dataset.go;
          if (g === "start") goTo(0);
          else if (g === "next") goTo(Math.min(STOPS.length - 1, idx + 1));
          else if (g === "prev") goTo(Math.max(0, idx - 1));
          else if (g === "exit") closeMode();
        };
      });
    }
    function introCard() {
      const I = A.intro;
      showCardHtml(heroFig(I.photo) +
        '<div class="anc-when"><span class="anc-date">Ancient Mars</span></div>' +
        "<h2>" + esc(I.title) + "</h2>" +
        '<p class="anc-lead">' + esc(I.lead) + "</p>" + pointsHtml(I.points) +
        '<div class="anc-nav one"><button class="tour-btn primary anc-big" data-go="start">' + esc(I.start) + " →</button></div>");
    }
    function stopCard(i) {
      const s = STOPS[i];
      let h = heroFig(s.photo);
      h += '<div class="anc-when"><span class="anc-date">' + esc(s.date) + '</span><span class="anc-era">' + esc(s.era) + "</span></div>";
      h += "<h2>" + esc(s.title) + "</h2>";
      h += '<p class="anc-lead">' + esc(s.lead) + "</p>";
      h += gaugesHtml(s.gauges);
      h += pointsHtml(s.points);
      if ((s.look && s.look.length) || s.globeNote) {
        h += '<div class="anc-look"><h3>' + svg("pin") + "See it on the globe</h3>";
        if (s.look && s.look.length) h += '<div class="anc-chips">' + s.look.map(([label, lat, lon, km]) => '<button class="anc-chip" data-fly="' + lat + "," + lon + "," + km + '">' + esc(label) + "</button>").join("") + "</div>";
        if (s.globeNote) h += '<p class="anc-note">' + esc(s.globeNote) + "</p>";
        h += "</div>";
      }
      if (s.gallery && s.gallery.length) {
        h += '<div class="anc-gallery-wrap"><h3>Clues that Mars was wet</h3><div class="anc-gallery">' + s.gallery.map((g) => thumbFig(g, "anc-gal")).join("") + "</div></div>";
      }
      if (s.clue) {
        h += '<div class="anc-clue">' + (s.clue.photo ? thumbFig(s.clue.photo) : "") + '<div class="anc-clue-text"><h3>' + svg("question") + "How do we know?</h3><p>" + esc(s.clue.text) + "</p></div></div>";
      }
      if (s.debate) h += '<div class="anc-debate"><b>Scientists are still debating!</b> ' + esc(s.debate) + "</div>";
      const last = i === STOPS.length - 1;
      h += '<div class="anc-nav">';
      h += i > 0 ? '<button class="tour-btn" data-go="prev">← ' + esc(STOPS[i - 1].dateShort === "Now" ? "Today" : STOPS[i - 1].date) + "</button>" : '<span></span>';
      h += last ? '<button class="tour-btn primary" data-go="start">Start over</button>' : '<button class="tour-btn primary" data-go="next">Next: ' + esc(STOPS[i + 1].date) + " →</button>";
      h += "</div>";
      if (last) h += '<div class="anc-nav one"><button class="tour-btn" data-go="exit">Leave the time machine</button></div>';
      showCardHtml(h);
    }

    /* ---------------- Timeline bar ---------------- */
    const bar = document.createElement("div");
    bar.className = "anc-bar"; bar.id = "ancBar"; bar.hidden = true;
    bar.setAttribute("role", "group"); bar.setAttribute("aria-label", "Ancient Mars timeline");
    const n = STOPS.length;
    const pos = (i) => (n === 1 ? 0 : (i / (n - 1)) * 100);
    bar.innerHTML =
      '<button class="anc-btn anc-exit" aria-label="Leave the time machine">' + svg("x") + "<span>Exit</span></button>" +
      '<div class="anc-tl"><div class="anc-scale"><span>' + svg("hourglass") + "Billions of years ago</span><span class=\"anc-loading\" hidden>Filling the oceans…</span><span>Today</span></div>" +
      '<div class="anc-track" id="ancTrack"><div class="anc-line"></div><div class="anc-fill"></div>' +
      STOPS.map((s, i) => '<button class="anc-stop" data-i="' + i + '" style="left:' + pos(i) + '%" aria-label="' + esc(s.date + ": " + s.short) + '"><i></i><b>' + esc(s.dateShort) + "</b><span>" + esc(s.short) + "</span></button>").join("") +
      '<div class="anc-thumb" aria-hidden="true"></div></div></div>' +
      '<button class="anc-btn anc-info" aria-label="Show the info card">' + svg("info") + "<span>Info</span></button>";
    document.body.appendChild(bar);
    const track = $("#ancTrack", bar), thumb = $(".anc-thumb", bar), fill = $(".anc-fill", bar);
    function setThumb(pct, animate) {
      thumb.style.transition = fill.style.transition = animate ? "" : "none";
      thumb.style.left = pct + "%"; fill.style.width = pct + "%";
    }
    function markStops(i) {
      bar.querySelectorAll(".anc-stop").forEach((b, k) => { b.classList.toggle("on", k === i); b.classList.toggle("past", k < i); b.setAttribute("aria-current", k === i ? "step" : "false"); });
    }
    let dragging = false;
    function pctFromEvent(e) {
      const r = track.getBoundingClientRect();
      return Math.max(0, Math.min(100, ((e.clientX - r.left) / r.width) * 100));
    }
    track.addEventListener("pointerdown", (e) => {
      dragging = true; track.setPointerCapture(e.pointerId);
      setThumb(pctFromEvent(e), false);
      e.preventDefault();
    });
    track.addEventListener("pointermove", (e) => { if (dragging) setThumb(pctFromEvent(e), false); });
    const endDrag = (e) => {
      if (!dragging) return;
      dragging = false;
      const p = pctFromEvent(e);
      const i = Math.round((p / 100) * (n - 1));
      goTo(i);
    };
    track.addEventListener("pointerup", endDrag);
    track.addEventListener("pointercancel", () => { dragging = false; setThumb(pos(Math.max(0, idx)), true); });
    $(".anc-exit", bar).onclick = () => closeMode();
    $(".anc-info", bar).onclick = () => { if (idx < 0) introCard(); else stopCard(idx); };

    let loadingTimer = null;
    function setLoading(on) {
      clearTimeout(loadingTimer);
      const el = $(".anc-loading", bar);
      if (on) loadingTimer = setTimeout(() => { el.hidden = false; }, 250); else el.hidden = true;
    }
    function showNetHint() {
      const el = $(".anc-loading", bar);
      el.textContent = "Couldn’t load the water map"; el.hidden = false;
      setTimeout(() => { el.hidden = true; el.textContent = "Filling the oceans…"; }, 4000);
    }

    /* ---------------- Entry button ---------------- */
    const entry = document.createElement("button");
    entry.className = "anc-entry"; entry.id = "ancientBtn";
    entry.innerHTML = svg("hourglass") + "<span>Ancient Mars</span>";
    entry.setAttribute("aria-label", "Open the Ancient Mars time machine");
    const hud = document.getElementById("hud");
    if (hud) hud.appendChild(entry); else document.body.appendChild(entry);
    entry.onclick = () => openMode();

    /* ---------------- Open / navigate / close ---------------- */
    let isOpen = false, idx = -1;
    function goTo(i) {
      if (!isOpen) return;
      i = Math.max(0, Math.min(n - 1, i));
      idx = i;
      setThumb(pos(i), true); markStops(i);
      const s = STOPS[i];
      stopCard(i);
      setGlobe(s.globe || {});
      const v = s.globe && s.globe.view;
      if (v) E.flyTo(v[0], v[1], v[2], { shift: true, duration: 2.2 });
      else E.goHome();
    }
    function openMode() {
      if (isOpen) return;
      isOpen = true; idx = -1;
      try { E.closePanels(); } catch (e) { /* ignore */ }
      try { E.closeCard(); } catch (e) { /* ignore */ }
      saveState();
      if (saved.style === "height") { const b = document.querySelector('[data-style="photo"]'); if (b) b.click(); }
      E.setPinsHidden(true);
      document.body.classList.add("ancient-on");
      bar.hidden = false;
      setThumb(100, false); markStops(n - 1);
      introCard();
      E.flyTo(-60, 12, 12500, { shift: true, duration: 1.6 });
      loadWater().catch(() => {});
      loadRivers().catch(() => {});
      // warm up the pictures so cards appear quickly
      [A.intro.photo].concat(STOPS.map((s) => s.photo)).forEach((ph) => { if (ph) { const im = new Image(); im.src = photoUrl(ph).src; } });
      scene.requestRender();
    }
    function closeMode() {
      if (!isOpen) return;
      isOpen = false;
      const style = saved && saved.style;
      clearGlobe();
      try { E.closeCard(); } catch (e) { /* ignore */ }
      bar.hidden = true;
      document.body.classList.remove("ancient-on");
      E.setPinsHidden(false);
      if (style === "height") { const b = document.querySelector('[data-style="height"]'); if (b) b.click(); }
      window.dispatchEvent(new Event("resize"));
      E.goHome();
      scene.requestRender();
    }
    window.marsAncient = { open: openMode, close: closeMode, goTo: (i) => goTo(i), get index() { return idx; }, get isOpen() { return isOpen; } };
  }

  if (window.marsExplorer) init();
  else window.addEventListener("mars-ready", init, { once: true });
})();
