/* =====================================================================
   MARS EXPLORER — CARD PHOTOS
   ---------------------------------------------------------------------
   The big photo at the top of each info card comes from the
   NASA Image and Video Library (images.nasa.gov).

   Each line looks like:
     placeId: ["NASA_ID", "size", "Caption", "search words for See more photos", isArtwork]

   - NASA_ID: the ID shown on images.nasa.gov (for example PIA00300).
   - size: which copy to load: "medium" (best), "small", or "orig".
   - isArtwork: true if the picture is an artist's drawing, not a photo.

   To change a photo: find a picture on images.nasa.gov, open it, and copy
   the ID from the web address (images.nasa.gov/details/PIA12345).
   If a photo ever fails to load, the card simply hides it.
   ===================================================================== */
window.MARS_PHOTOS = {
  /* Volcanoes */
  olympus:      ["PIA00300", "medium", "Olympus Mons, pieced together from Viking orbiter photos", "Olympus Mons"],
  ascraeus:     ["PIA10883", "medium", "Part of Ascraeus Mons, seen from orbit", "Ascraeus Mons"],
  pavonis:      ["PIA10292", "medium", "Part of Pavonis Mons, seen from orbit", "Pavonis Mons"],
  arsia:        ["PIA03948", "medium", "A mosaic of Arsia Mons", "Arsia Mons"],
  alba:         ["PIA12423", "medium", "Lava flows on Alba Mons, seen by Mars Odyssey", "Alba Mons"],
  elysium:      ["PIA01457", "small",  "The Elysium Mons volcanic region", "Elysium Mons"],

  /* Canyons */
  valles:       ["PIA00003", "medium", "Valles Marineris stretching across Mars (made from 102 Viking orbiter photos)", "Valles Marineris"],
  noctis:       ["PIA03213", "medium", "Part of Noctis Labyrinthus, seen from orbit", "Noctis Labyrinthus"],
  chasmaboreale:["PIA09407", "medium", "Part of Chasma Boreale, seen from orbit", "Chasma Boreale"],

  /* River channels & valleys */
  kasei:        ["PIA10802", "medium", "Part of Kasei Valles, seen from orbit", "Kasei Valles"],
  ares:         ["PIA06830", "medium", "Part of Ares Vallis, seen from orbit", "Ares Vallis"],
  nanedi:       ["PIA09635", "medium", "The winding meanders of Nanedi Valles", "Nanedi Valles"],
  warrego:      ["PIA06899", "medium", "Part of the Warrego Valles valley network", "Warrego Valles"],
  mawrth:       ["PIA21029", "medium", "The colorful clay-rich layers of Mawrth Vallis (enhanced color)", "Mawrth Vallis"],
  eberswalde:   ["PIA09375", "medium", "The ancient river delta in Eberswalde Crater", "Eberswalde delta"],

  /* Craters */
  jezero:       ["PIA24096", "medium", "Jezero Crater and its river delta, seen by Europe’s Mars Express orbiter", "Jezero Crater"],
  gale:         ["PIA15292", "medium", "Mount Sharp rising from the floor of Gale Crater", "Gale Crater"],
  sharp:        ["PIA16099", "medium", "Layers of Mount Sharp, photographed by Curiosity’s Mastcam", "Mount Sharp Curiosity"],
  gusev:        ["PIA04274", "medium", "Gusev Crater, seen from orbit", "Gusev Crater"],
  endeavour:    ["PIA16923", "small",  "Opportunity’s shadow and the view across Endeavour Crater", "Endeavour Crater Opportunity"],
  victoria:     ["PIA08812", "small",  "Opportunity at the edge of Victoria Crater, photographed from orbit", "Victoria Crater"],
  huygens:      ["PIA19488", "small",  "Part of Huygens Crater (false color)", "Huygens crater Mars"],
  schiaparelli: ["PIA01157", "medium", "The rim and inside of Schiaparelli Crater", "Schiaparelli crater"],
  lyot:         ["PIA03209", "medium", "Lyot Crater, seen from orbit", "Lyot crater"],
  korolev:      ["PIA05608", "orig",   "Korolev Crater in infrared, seen by Mars Odyssey", "Korolev crater"],

  /* Basins, plains & regions */
  hellas:       ["PIA21570", "medium", "A view inside the deep Hellas Basin", "Hellas basin Mars"],
  argyre:       ["PIA08049", "medium", "Part of the rim of the Argyre Basin", "Argyre basin"],
  utopia:       ["PIA21136", "orig",   "Scalloped ground in Utopia Planitia that led scientists to buried ice (heights exaggerated)", "Utopia Planitia"],
  isidis:       ["PIA04538", "medium", "Isidis Planitia, seen from orbit", "Isidis Planitia"],
  chryse:       ["PIA21162", "small",  "Chryse Planitia (false color), seen by Mars Odyssey", "Chryse Planitia"],
  vastitas:     ["PIA09610", "medium", "Wind and frost features in Vastitas Borealis", "Vastitas Borealis"],
  syrtis:       ["PIA20984", "small",  "Syrtis Major Planum (false color)", "Syrtis Major"],
  cerberus:     ["PIA11323", "medium", "Cracks of Cerberus Fossae, seen from orbit", "Cerberus Fossae"],
  medusae:      ["PIA21111", "medium", "Wind-carved rock in the Medusae Fossae region", "Medusae Fossae"],
  face:         ["PIA01141", "orig",   "The blurry 1976 Viking orbiter photo that made this hill look like a face", "Cydonia"],
  galle:        ["PIA02325", "orig", "Galle Crater’s “happy face,” with frost on its slopes in early spring", "Galle crater"],
  dustdevil:    ["PIA15116", "medium", "The “serpent” dust devil and its long shadow, seen from orbit (2012)", "Mars dust devil"],
  russell:      ["PIA09351", "medium", "Frost disappearing from the Russell Crater dunes in spring", "Russell crater dunes"],

  /* Ice */
  northcap:     ["PIA00197", "medium", "Mars’ north polar ice cap and its spiral troughs, seen by a Viking orbiter", "Mars north polar cap"],
  southcap:     ["PIA08540", "medium", "The edge of the south polar ice cap", "Mars south polar cap"],
  spiders:      ["PIA21126", "orig", "Spider-shaped channels near the south pole, photographed by HiRISE", "Mars spiders south pole"],
  avalanche:    ["PIA10245", "medium", "At least four avalanches falling down the north polar cliffs at the same moment (2008)", "Mars avalanche"],

  /* Rovers & helicopter */
  perseverance: ["PIA26344", "medium", "Perseverance’s selfie next to the “Cheyava Falls” rock (July 2024)", "Perseverance rover"],
  curiosity:    ["PIA19808", "medium", "Curiosity’s low-angle selfie at the “Buckskin” drill site (2015)", "Curiosity rover"],
  opportunity:  ["PIA18079", "medium", "Opportunity’s self-portrait after the wind cleaned its solar panels (2014)", "Opportunity rover"],
  spirit:       ["PIA16442", "medium", "Spirit’s self-portrait, made from its McMurdo panorama", "Spirit rover"],
  sojourner:    ["PIA04318", "orig",   "Sojourner near the “Rock Garden” (1997)", "Sojourner rover"],
  zhurong:      ["PIA24914", "medium", "China’s Zhurong rover on Utopia Planitia, seen from orbit", "Zhurong"],
  ingenuity:    ["PIA24542", "medium", "Perseverance’s selfie with Ingenuity, about 4 m away (April 2021)", "Ingenuity helicopter"],

  /* Landers */
  viking1:      ["PIA03166", "medium", "Afternoon on Chryse Planitia, photographed by the Viking 1 lander", "Viking lander"],
  viking2:      ["PIA00573", "orig",   "Frost on the ground at the Viking 2 landing site", "Viking Lander 2"],
  mars3:        ["PIA16920", "medium", "Possible pieces of the Mars 3 lander, spotted from orbit by HiRISE", "Mars 3 lander"],
  phoenix:      ["PIA09943", "medium", "Artist’s drawing of Phoenix landing on Mars", "Phoenix Mars lander", true],
  insight:      ["PIA22876", "medium", "InSight’s first selfie on Mars (2018)", "InSight lander"],
  beagle2:      ["PIA19106", "medium", "Pieces of Beagle 2 on Mars, photographed from orbit (labeled)", "Beagle 2"],
  schiaparelli_edm: ["PIA21131", "medium", "The Schiaparelli crash site, photographed from orbit", "Schiaparelli lander"],

  /* Orbiters */
  mariner9:     ["PIA03100", "medium", "A Mariner 9 photo of Mars during the giant 1971 dust storm", "Mariner 9"],
  mgs:          ["PIA17486", "medium", "Artist’s drawing of Mars Global Surveyor", "Mars Global Surveyor", true],
  odyssey:      ["PIA04818", "medium", "Artist’s drawing of Mars Odyssey above Mars", "Mars Odyssey", true],
  marsexpress:  ["PIA04802", "medium", "Artist’s drawing of Mars Express in orbit", "Mars Express", true],
  mro:          ["PIA04918", "medium", "Artist’s drawing of Mars Reconnaissance Orbiter over the south pole", "Mars Reconnaissance Orbiter", true],
  maven:        ["PIA14761", "medium", "Artist’s drawing of MAVEN at Mars", "MAVEN Mars", true],

  /* Moons */
  phobos:       ["GSFC_20171208_Archive_e000505", "medium", "Phobos and its long grooves", "Phobos"],
  deimos:       ["PIA11826", "small",  "Deimos, photographed by Mars Reconnaissance Orbiter’s HiRISE camera", "Deimos"],

  /* Possible human landing sites */
  arcadia:      ["PIA22377", "medium", "Rounded hills on the plains of Arcadia Planitia", "Arcadia Planitia"],
  phlegra:      ["PIA08743", "medium", "Hills of Phlegra Montes with aprons of debris around them", "Phlegra Montes"],
  meridiani:    ["PIA05144", "medium", "Meridiani Planum in color", "Meridiani Planum"]
};

/* "See more photos" for cards without a main photo */
window.MARS_PHOTO_SEARCH = {
  maadim: "Gusev crater",
  tgo: "Trace Gas Orbiter",
  erebus: "Arcadia Planitia"
};
