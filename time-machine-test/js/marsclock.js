/* =====================================================================
   MARS CLOCK — math for the "Mars right now" box
   ---------------------------------------------------------------------
   Mars time follows NASA GISS "Mars24" (Allison & McEwen, 2000).
   Planet positions use JPL's approximate orbit elements (Standish),
   which are accurate to well under 1% for the distance between
   Earth and Mars. Everything is calculated on the iPad — no internet needed.
   ===================================================================== */
(function () {
  const DEG = Math.PI / 180;
  const TT_MINUS_UTC = 69.184;          // seconds (32.184 s + 37 leap seconds)
  const AU_KM = 149597870.7;
  const C_KM_S = 299792.458;
  const SOL_SECONDS = 88775.244;        // one Mars solar day in Earth seconds

  function julianTT(date) {
    return 2440587.5 + date.getTime() / 86400000 + TT_MINUS_UTC / 86400;
  }
  // Mars Sol Date: days on Mars since Dec 29, 1873
  function marsSolDate(date) {
    return (julianTT(date) - 2405522.0028779) / 1.0274912517;
  }
  // Coordinated Mars Time (hours, 0–24): the time at Mars' prime meridian
  function mtcHours(date) {
    return ((24 * marsSolDate(date)) % 24 + 24) % 24;
  }
  // Solar longitude Ls (degrees): where Mars is in its year (0 = northern spring begins)
  function solarLongitude(date) {
    const dt = julianTT(date) - 2451545.0;
    const M = (19.3871 + 0.52402073 * dt) * DEG;
    const aFMS = 270.3871 + 0.524038496 * dt;
    const P = [[0.0071, 2.2353, 49.409], [0.0057, 2.7543, 168.173], [0.0039, 1.1177, 191.837],
      [0.0037, 15.7866, 21.736], [0.0021, 2.1354, 15.704], [0.0020, 2.4694, 95.528], [0.0018, 32.8493, 49.095]];
    let pbs = 0;
    for (const [A, tau, phi] of P) pbs += A * Math.cos(((0.985626 * dt) / tau + phi) * DEG);
    const eoc = (10.691 + 3.0e-7 * dt) * Math.sin(M) + 0.623 * Math.sin(2 * M) + 0.050 * Math.sin(3 * M) +
      0.005 * Math.sin(4 * M) + 0.0005 * Math.sin(5 * M) + pbs;
    return (((aFMS + eoc) % 360) + 360) % 360;
  }
  // Mars Year number (scientists count Mars Year 1 from April 11, 1955)
  function marsYear(date) {
    const jd = julianTT(date);
    return Math.round((jd - 2435208.5) / 686.9726 - solarLongitude(date) / 360) + 1;
  }

  // Heliocentric ecliptic position (AU) from JPL approximate elements
  function helio(el, T) {
    const a = el[0][0] + el[0][1] * T, e = el[1][0] + el[1][1] * T, I = (el[2][0] + el[2][1] * T) * DEG;
    const L = el[3][0] + el[3][1] * T, w = el[4][0] + el[4][1] * T, O = el[5][0] + el[5][1] * T;
    const omega = (w - O) * DEG, node = O * DEG;
    let M = (((L - w) % 360) + 540) % 360 - 180;
    M *= DEG;
    let E = M + e * Math.sin(M);
    for (let i = 0; i < 8; i++) E = E - (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
    const xp = a * (Math.cos(E) - e), yp = a * Math.sqrt(1 - e * e) * Math.sin(E);
    const cw = Math.cos(omega), sw = Math.sin(omega), cO = Math.cos(node), sO = Math.sin(node), cI = Math.cos(I), sI = Math.sin(I);
    return [
      (cw * cO - sw * sO * cI) * xp + (-sw * cO - cw * sO * cI) * yp,
      (cw * sO + sw * cO * cI) * xp + (-sw * sO + cw * cO * cI) * yp,
      (sw * sI) * xp + (cw * sI) * yp
    ];
  }
  const EARTH = [[1.00000261, 0.00000562], [0.01671123, -0.00004392], [-0.00001531, -0.01294668],
    [100.46457166, 35999.37244981], [102.93768193, 0.32327364], [0, 0]];
  const MARS = [[1.52371034, 0.00001847], [0.09339410, 0.00007882], [1.84969142, -0.00813131],
    [-4.55343205, 19140.30268499], [-23.94362959, 0.44441088], [49.55953891, -0.29257343]];
  function earthMarsKm(date) {
    const T = (julianTT(date) - 2451545.0) / 36525;
    const e = helio(EARTH, T), m = helio(MARS, T);
    return Math.hypot(m[0] - e[0], m[1] - e[1], m[2] - e[2]) * AU_KM;
  }

  // Mission sol for a rover: sols start at local midnight at the landing site; sol 0 = landing day
  function localMSD(date, lonEast) { return marsSolDate(date) + lonEast / 360; }
  function roverSol(date, landingUTC, lonEast) {
    return Math.floor(localMSD(date, lonEast)) - Math.floor(localMSD(new Date(landingUTC), lonEast));
  }

  function seasons(ls) {
    const north = ["spring", "summer", "autumn", "winter"][Math.floor(ls / 90) % 4];
    const south = ["autumn", "winter", "spring", "summer"][Math.floor(ls / 90) % 4];
    return { north, south };
  }

  window.MarsClock = {
    marsSolDate, mtcHours, solarLongitude, marsYear, earthMarsKm, roverSol, seasons,
    lightMinutes: (km) => km / C_KM_S / 60,
    SOL_SECONDS
  };
})();
