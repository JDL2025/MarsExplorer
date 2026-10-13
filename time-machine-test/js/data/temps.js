/* =====================================================================
   MARS EXPLORER — TYPICAL TEMPERATURES (°F)
   ---------------------------------------------------------------------
   Shown on each info card under "Typical temperatures at this location".

   Each line looks like:
     placeId: { hi: 20, lo: -110, how: "measured" or "estimate", src: "where the numbers come from" }

   - hi = warm part of the day (early afternoon), lo = coldest part of the night (just before sunrise).
   - These are AIR temperatures about 1–2 m above the ground, like a weather report on Earth.
     The ground itself can be warmer in the afternoon.
   - "measured" numbers come from weather instruments that landed there.
     "estimate" numbers are rounded to the nearest 10°F and are based on the place's
     latitude and height, compared with places where landers measured temperatures.
     High places (like volcano tops) are colder because the air is even thinner there.
   - Optional: hiLabel / loLabel change the two labels (used for the poles: "Summer" / "Winter").

   Sources for measured values:
     Curiosity (Gale Crater): REMS weather station averages, 2012–2015 (Centro de Astrobiología / NASA)
     Perseverance (Jezero): NASA's first MEDA weather report, April 2021 (early spring)
     InSight: NASA daily weather report, February 2019
     Viking 1: lander measurements, summer 1976
     Viking 2: NASA photo PIA00530 (winter night low)
     Phoenix: lander weather mast, summer 2008
     Phobos: Mars Global Surveyor heat camera, 1998 (NASA PIA01332)
   ===================================================================== */
window.MARS_TEMPS = {
  /* Volcanoes — numbers are for the summit */
  olympus:      { hi: -40, lo: -190, how: "estimate", src: "Estimate for the summit, 22 km up. The air there is so thin that it is much colder than the lowlands." },
  ascraeus:     { hi: -30, lo: -180, how: "estimate", src: "Estimate for the summit. High places on Mars are much colder than low ones." },
  pavonis:      { hi: -20, lo: -170, how: "estimate", src: "Estimate for the summit. High places on Mars are much colder than low ones." },
  arsia:        { hi: -30, lo: -180, how: "estimate", src: "Estimate for the summit. High places on Mars are much colder than low ones." },
  alba:         { hi: -30, lo: -160, how: "estimate", src: "Estimate for the summit." },
  elysium:      { hi: -20, lo: -170, how: "estimate", src: "Estimate for the summit." },

  /* Canyons */
  valles:       { hi: 10,  lo: -110, how: "estimate", src: "Estimate for the canyon floor, near the equator." },
  noctis:       { hi: -10, lo: -140, how: "estimate", src: "Estimate. This area sits high on the Tharsis bulge, so it is colder than the canyon floors farther east." },
  chasmaboreale:{ hi: -80, lo: -190, how: "estimate", hiLabel: "Summer day", loLabel: "Winter", src: "Estimate from orbiter measurements of the north polar region. In winter the air gets cold enough to freeze into dry ice." },

  /* River channels & valleys */
  kasei:        { hi: 10,  lo: -120, how: "estimate", src: "Estimate based on latitude and height." },
  ares:         { hi: 10,  lo: -110, how: "estimate", src: "Estimate based on Viking 1, which measured temperatures about 850 km away at a similar latitude." },
  nanedi:       { hi: 10,  lo: -120, how: "estimate", src: "Estimate based on latitude and height." },
  maadim:       { hi: 0,   lo: -120, how: "estimate", src: "Estimate based on latitude and height." },
  warrego:      { hi: -20, lo: -150, how: "estimate", src: "Estimate. This valley network is far south and high up, so it is colder than the equator." },
  mawrth:       { hi: 10,  lo: -120, how: "estimate", src: "Estimate based on latitude and height." },
  eberswalde:   { hi: 0,   lo: -120, how: "estimate", src: "Estimate based on latitude and height." },

  /* Craters */
  jezero:       { hi: -8,  lo: -117, how: "measured", src: "Measured by Perseverance’s weather station (early spring, 2021)." },
  gale:         { hi: 22,  lo: -109, how: "measured", src: "Measured by Curiosity’s weather station (average of 2012–2015). Summer afternoons sometimes reach above 32°F." },
  sharp:        { hi: 22,  lo: -109, how: "measured", src: "Measured by Curiosity’s weather station at the base of the mountain (average of 2012–2015)." },
  gusev:        { hi: 10,  lo: -120, how: "estimate", src: "Estimate based on latitude and height." },
  endeavour:    { hi: 10,  lo: -120, how: "estimate", src: "Estimate based on latitude and height." },
  victoria:     { hi: 10,  lo: -120, how: "estimate", src: "Estimate based on latitude and height." },
  huygens:      { hi: 0,   lo: -130, how: "estimate", src: "Estimate based on latitude and height." },
  schiaparelli: { hi: 0,   lo: -120, how: "estimate", src: "Estimate based on latitude and height." },
  lyot:         { hi: -10, lo: -130, how: "estimate", src: "Estimate. Lyot’s floor is very deep, which makes it a bit warmer than the plains around it." },
  korolev:      { hi: -80, lo: -190, how: "estimate", hiLabel: "Summer day", loLabel: "Winter", src: "Estimate. The ice inside Korolev stays frozen all year." },
  russell:      { hi: -20, lo: -150, how: "estimate", src: "Estimate. In winter, dry-ice frost covers these dunes." },

  galle:        { hi: -20, lo: -150, how: "estimate", src: "Estimate based on latitude and height. Frost covers its slopes in early spring." },
  dustdevil:    { hi: -10, lo: -130, how: "estimate", src: "Estimate based on latitude and height. On spring and summer afternoons the ground gets much warmer than the air — that’s what makes dust devils." },

  /* Basins, plains & regions */
  hellas:       { hi: 0,   lo: -120, how: "estimate", src: "Estimate for the basin floor. It is so deep that the air is thicker, which makes it a little warmer than places at the same latitude." },
  argyre:       { hi: -10, lo: -130, how: "estimate", src: "Estimate based on latitude and height." },
  utopia:       { hi: -10, lo: -171, how: "measured", src: "Night low measured by the Viking 2 lander in winter. The afternoon high is an estimate." },
  isidis:       { hi: 10,  lo: -110, how: "estimate", src: "Estimate based on latitude and height." },
  chryse:       { hi: 7,   lo: -107, how: "measured", src: "Measured by the Viking 1 lander (summer, 1976)." },
  vastitas:     { hi: -4,  lo: -112, how: "measured", src: "Measured by the Phoenix lander in summer, far to the north. In winter it gets cold enough for dry ice to form." },
  syrtis:       { hi: 0,   lo: -130, how: "estimate", src: "Estimate based on latitude and height." },
  cerberus:     { hi: 0,   lo: -130, how: "estimate", src: "Estimate based on the InSight lander’s measurements, about 1,600 km away." },
  medusae:      { hi: 10,  lo: -120, how: "estimate", src: "Estimate based on latitude and height." },
  face:         { hi: -10, lo: -130, how: "estimate", src: "Estimate based on latitude and height." },

  /* Ice */
  northcap:     { hi: -90, lo: -190, how: "estimate", hiLabel: "Summer day", loLabel: "Winter", src: "Based on orbiter measurements. In winter it gets so cold that carbon dioxide freezes out of the air as dry ice." },
  spiders:      { hi: -60, lo: -190, how: "estimate", hiLabel: "Summer day", loLabel: "Winter", src: "Estimate. Every winter this ground is buried under dry ice, which forms at about −190°F." },
  avalanche:    { hi: -90, lo: -190, how: "estimate", hiLabel: "Summer day", loLabel: "Winter", src: "Based on orbiter measurements of the north polar cap." },
  southcap:     { hi: -190, lo: -200, how: "estimate", hiLabel: "Summer day", loLabel: "Winter", src: "Based on orbiter measurements. A layer of dry ice covers this cap all year, keeping it frozen solid even in summer." },

  /* Rovers & helicopter */
  perseverance: { hi: -8,  lo: -117, how: "measured", src: "Measured by Perseverance’s weather station (early spring, 2021)." },
  curiosity:    { hi: 22,  lo: -109, how: "measured", src: "Measured by Curiosity’s weather station (average of 2012–2015). Summer afternoons sometimes reach above 32°F." },
  opportunity:  { hi: 10,  lo: -120, how: "estimate", src: "Estimate. Opportunity did not carry a weather station." },
  spirit:       { hi: 10,  lo: -120, how: "estimate", src: "Estimate. Spirit did not carry a weather station." },
  sojourner:    { hi: 10,  lo: -110, how: "estimate", src: "Estimate based on Viking 1, which measured temperatures about 850 km away at a similar latitude." },
  zhurong:      { hi: 10,  lo: -120, how: "estimate", src: "Estimate based on latitude and height." },
  ingenuity:    { hi: -8,  lo: -117, how: "measured", src: "Measured by Perseverance’s weather station (early spring, 2021). Ingenuity needed heaters to survive the nights." },

  /* Landers */
  viking1:      { hi: 7,   lo: -107, how: "measured", src: "Measured by Viking 1’s weather station (summer, 1976)." },
  viking2:      { hi: -10, lo: -171, how: "measured", src: "Night low measured by Viking 2 in winter, when frost formed on the ground. The afternoon high is an estimate." },
  mars3:        { hi: -20, lo: -140, how: "estimate", src: "Estimate based on latitude and height." },
  phoenix:      { hi: -4,  lo: -112, how: "measured", src: "Measured by Phoenix’s weather station (summer, 2008). Winter got so cold that Phoenix froze and stopped working." },
  insight:      { hi: 2,   lo: -138, how: "measured", src: "Measured by InSight’s weather sensors (a typical day in February 2019)." },
  beagle2:      { hi: 10,  lo: -110, how: "estimate", src: "Estimate based on latitude and height." },
  schiaparelli_edm: { hi: 10, lo: -120, how: "estimate", src: "Estimate based on latitude and height." },

  /* Moons */
  phobos:       { hi: 25,  lo: -170, how: "measured", hiLabel: "Sunny side", loLabel: "Dark side", src: "Measured by Mars Global Surveyor’s heat camera (1998). Phobos has no air at all to hold heat." },
  deimos:       { hi: 20,  lo: -170, how: "estimate", hiLabel: "Sunny side", loLabel: "Dark side", src: "Estimate, similar to Phobos. Deimos has no air to hold heat." },

  /* Possible human landing sites */
  arcadia:      { hi: -10, lo: -130, how: "estimate", src: "Estimate based on latitude and height." },
  phlegra:      { hi: -10, lo: -130, how: "estimate", src: "Estimate based on latitude and height." },
  erebus:       { hi: -10, lo: -130, how: "estimate", src: "Estimate based on latitude and height." },
  meridiani:    { hi: 10,  lo: -120, how: "estimate", src: "Estimate based on latitude and height." }
};

/* Your hometown, used for a comparison line on each card (change it if you move!) */
window.MARS_TEMPS_HOME = { city: "Chicago", recordLow: -27 };

/* Orbiters circle the whole planet, so their cards show this instead */
window.MARS_TEMPS_ORBIT = { hi: 30, lo: -195, src: "This spacecraft circles the whole planet, so it passes over many temperatures. Mars’ air ranges from about 30°F on a summer afternoon near the equator to about −195°F at the winter poles." };
