/* =====================================================================
   MARS EXPLORER — ANCIENT MARS TIME MACHINE
   ---------------------------------------------------------------------
   The story students step through, oldest first. Each stop has:
     date, short (timeline label), era, title, lead (one big sentence),
     photo: ["NASA_ID", "size", "Caption", isArtwork]   (images.nasa.gov)
     gauges: air / water / warmth / shield  -> [0–4, "word"]
     points: [ [icon, "Mini heading", "One or two sentences"], ... ]
             icons: rock, layers, drop, shield, cloud, crater, wave, river,
                    wind, sun, flood, ice, snow, space, robot, question
     look:   buttons that fly the globe to a spot: [label, lat, lon, km]
     clue:   "How do we know?" box: { photo: [...], text }
     debate: optional "Scientists are still debating" note
   The globe settings (water levels, rivers, floods, clouds, colors) are in "globe".
   Water levels are heights in meters (0 = Mars' average ground level).
   They come from NASA's MOLA elevation map: see the README for details.
   ===================================================================== */
window.ANCIENT = {
  intro: {
    title: "Mars Time Machine",
    photo: ["PIA21255", "orig", "The same spot in Gale Crater shown today and billions of years ago, when a lake filled the crater", true],
    lead: "Mars wasn’t always a cold, dusty desert. Billions of years ago it may have had rivers, lakes, and even an ocean. Let’s travel back in time and watch it change!",
    points: [
      ["question", "How big is a billion?", "A billion is a thousand millions. Mars is about 4.5 billion years old. If Mars’ whole life were squeezed into one 24-hour day, dinosaurs on Earth would show up about an hour before midnight — and humans only in the last 6 seconds!"],
      ["wave", "How to use the time machine", "Drag the timeline at the bottom of the screen, tap a date, or press Next. Watch the globe change as you travel through time."],
      ["robot", "Is this real?", "The water on the globe is placed using NASA’s real height map of Mars, so it fills the low places just like real water would. The amounts come from scientists’ best estimates."]
    ],
    start: "Start at the beginning"
  },

  stops: [
    {
      id: "born", date: "4.5 billion years ago", short: "Mars is born", dateShort: "4.5", era: "Mars’ earliest days",
      title: "A Brand-New Planet",
      lead: "Mars formed out of dust and rocks circling the young Sun. It came together fast — in just a few million years.",
      photo: ["PIA26635", "medium", "Young Mars being hit by a giant space rock", true],
      gauges: { air: [1, "Forming"], water: [1, "Steam"], warmth: [4, "Red hot"], shield: [2, "Turning on"] },
      points: [
        ["crater", "Smash! Crash!", "Space rocks, big and small, kept slamming into baby Mars. The crashes made so much heat that the outside of the planet melted into a glowing ocean of lava."],
        ["layers", "Layers form", "Heavy iron sank to the middle to make a core. Lighter rock floated to the top to make a crust — like oil floating on water."],
        ["drop", "Where did the water come from?", "Water was trapped inside the rocks that built Mars, and more arrived on icy space rocks. Volcanoes later breathed it out as steam."]
      ],
      look: [],
      clue: { photo: null, text: "Scientists study meteorites — rocks that were blasted off Mars and landed on Earth. Special atoms inside them work like tiny clocks and show that Mars formed about 4.5 billion years ago." },
      globe: { water: {}, lava: 1, clouds: 0, land: [0.42, 0.55], sky: "hot", view: [-60, 10, 11000],
        labels: [["A glowing ocean of lava", 10, -60, "lava"]] }
    },
    {
      id: "shield", date: "4.1 billion years ago", short: "A shield and a blanket", dateShort: "4.1", era: "Noachian period",
      title: "A Shield and a Blanket",
      lead: "Mars cooled down and got two things that made water possible: an invisible magnetic shield and a thick blanket of air.",
      photo: ["PIA15953", "orig", "Earth’s magnetic shield compared with Mars today, which has lost its shield", true],
      gauges: { air: [3, "Thick"], water: [2, "Rain & snow"], warmth: [2, "Cool"], shield: [4, "On"] },
      points: [
        ["shield", "An invisible shield", "Melted iron swirling in Mars’ core made a magnetic field — like a giant invisible bubble. It protected the air from the solar wind, a stream of particles blasting out from the Sun. Earth has a shield like this today."],
        ["cloud", "A blanket of air", "Volcanoes breathed out gases like carbon dioxide and water vapor. The air may have been about 100 times thicker than it is today. Thick air works like a blanket: it holds in heat and lets water stay liquid."],
        ["snow", "Clouds, rain, and snow", "Clouds formed, and water fell as rain or snow. It began to collect in the lowest places — like the huge northern plains."],
        ["crater", "A giant crash", "Around this time, a giant space rock blasted out Hellas Basin, one of the biggest craters in the whole solar system. Water started pooling at its bottom."]
      ],
      look: [["Hellas Basin", -40, 66, 3500], ["The northern plains", 60, 100, 6500]],
      clue: { photo: null, text: "Orbiters discovered that some of Mars’ oldest rocks are magnetic, in long stripes. They were magnetized long ago, when the shield was still on — and newer rocks are not." },
      globe: { water: { ocean: -4000, hellas: -6400 }, rivers: 0.5, clouds: 0.55, land: [0.88, 0.85], sky: "wet", view: [80, 5, 12000],
        labels: [["Hellas: a lake begins", -38, 64, "water"], ["Water collects in the low plains", 62, 95, "water"]] }
    },
    {
      id: "wet", date: "3.7 billion years ago", short: "Rivers, lakes & an ocean", dateShort: "3.7", era: "End of the Noachian period",
      title: "Rivers, Lakes, and an Ocean",
      lead: "This was probably Mars’ wettest time. Rivers carved valleys, lakes filled craters, and an ocean may have covered the northern part of the planet.",
      photo: ["PIA24172", "medium", "Jezero Crater as a lake, with one river flowing in and another flowing out", true],
      gauges: { air: [3, "Thick"], water: [4, "Rivers, lakes, ocean"], warmth: [3, "Warmer than today"], shield: [2, "Fading"] },
      points: [
        ["wave", "A northern ocean?", "Many scientists think an ocean filled the low northern plains. NASA scientists estimated it covered about 19% of Mars — a bigger share of the planet than the Atlantic Ocean covers on Earth — and was more than 1.6 km (1 mile) deep in places."],
        ["river", "Rivers carve the land", "Thousands of river valleys branched across the highlands, just like river valleys on Earth. Rivers carried sand and pebbles downhill and built deltas where they flowed into lakes."],
        ["drop", "Lakes in craters", "Rivers poured into craters and filled them like bowls. Jezero and Gale — where the Perseverance and Curiosity rovers explore today — were lakes. In the south, the Eridania sea held about 9 times as much water as all of North America’s Great Lakes put together."]
      ],
      look: [["Northern Ocean", 58, 117, 8000], ["Lake Jezero", 18.4, 77.6, 600], ["Gale Lake", -5.2, 137.6, 700], ["Eridania Sea", -36, 179, 2500], ["Hellas Lake", -41, 68, 3500]],
      globeNote: "On the globe, the ocean is filled to the height of an ancient shoreline that scientists mapped. It covers about 19% of Mars — a close match to NASA’s estimate. The thin blue lines show where rivers would flow downhill across the old highlands.",
      clue: { photo: ["PIA16189", "medium", "Rounded pebbles on Mars compared with pebbles from a stream on Earth"], text: "Curiosity found rounded pebbles in Gale Crater that look just like pebbles from a stream on Earth. Rocks only get smooth and round by tumbling along in flowing water." },
      debate: "Scientists are still debating how warm Mars was. Some think it was warm and rainy for a long time. Others think it was mostly frozen, with warm spells that melted snow and ice. Either way, water flowed on Mars for a long time. Some scientists also question whether a full ocean ever existed.",
      globe: { water: { ocean: -3550, hellas: -5800, jezero: -2440, gale: -3900, eridania: 930 }, rivers: 1, clouds: 0.7, land: [0.85, 0.82], sky: "wet", view: [118, 12, 12500],
        labels: [["Northern Ocean", 58, 117, "water"], ["Northern Ocean", 50, -30, "water"], ["Lake Jezero", 18.4, 77.6, "water"], ["Gale Lake", -5.4, 137.8, "water"], ["Eridania Sea", -36, 179, "water"], ["Hellas Lake", -41, 68, "water"]] }
    },
    {
      id: "shieldoff", date: "3.5 billion years ago", short: "The shield shuts off", dateShort: "3.5", era: "Hesperian period",
      title: "The Shield Shuts Off",
      lead: "Deep inside Mars, the core cooled down and the swirling stopped. Mars’ magnetic shield switched off — and the air began to leak away into space.",
      photo: ["PIA22076", "medium", "A storm of particles from the Sun stripping away Mars’ air", true],
      gauges: { air: [2, "Thinning"], water: [3, "Shrinking"], warmth: [2, "Cooling"], shield: [0, "Off"] },
      points: [
        ["layers", "Why the shield failed", "Mars is smaller than Earth, so its insides cooled faster — the way a cupcake cools faster than a whole cake. When the melted iron in the core stopped swirling, the magnetic shield disappeared."],
        ["sun", "Blown away by the Sun", "Without a shield, the solar wind slammed straight into Mars’ air and stripped it away, bit by bit, into space."],
        ["wind", "Less air, less water", "Thinner air can’t hold in heat or keep water liquid. Some water escaped into space, and the ocean and lakes began to shrink. This took hundreds of millions of years — not overnight."]
      ],
      look: [["The shrinking ocean", 62, 109, 8000]],
      globeNote: "On the globe, the ocean has shrunk to about 14% of Mars.",
      clue: { photo: ["PIA14761", "medium", "NASA’s MAVEN spacecraft at Mars (artist’s idea)"], text: "NASA’s MAVEN spacecraft has been circling Mars since 2014. It measured the solar wind still stripping away Mars’ air today — about 100 grams every second, and much more during solar storms." },
      debate: "Scientists are still working out exactly when the shield shut off — somewhere between about 4.1 and 3.6 billion years ago.",
      globe: { water: { ocean: -3900, hellas: -6400, gale: -4100, eridania: 700 }, rivers: 0.45, clouds: 0.35, land: [0.9, 0.88], sky: "thin", view: [109, 40, 12000],
        labels: [["The ocean shrinks", 62, 109, "water"], ["Hellas Lake", -39, 64, "water"]] }
    },
    {
      id: "floods", date: "3.3 billion years ago", short: "Giant floods", dateShort: "3.3", era: "Hesperian period",
      title: "Giant Floods",
      lead: "Even as Mars dried out, enormous floods burst out of the ground and raced across the planet — the biggest floods scientists know of anywhere.",
      photo: ["PIA00426", "medium", "Real photo: a mosaic of the Valles Marineris canyon and the giant flood channels that drained north into Chryse Planitia", false],
      gauges: { air: [1, "Thin"], water: [3, "Floods"], warmth: [1, "Cold"], shield: [0, "Off"] },
      points: [
        ["flood", "Water bursts out", "Huge amounts of water were trapped underground, some of it under frozen ground. Heat from volcanoes and other forces made it suddenly break loose."],
        ["river", "Floods bigger than any on Earth", "Floods in Kasei Valles and Ares Vallis carried hundreds to thousands of times more water every second than the Amazon, Earth’s biggest river. They carved channels up to hundreds of kilometers wide."],
        ["wave", "Mega-tsunamis!", "Some scientists think giant space rocks crashed into the northern ocean around this time, making tsunami waves over 100 meters tall — taller than the Statue of Liberty."]
      ],
      look: [["Kasei Valles flood", 22, -68, 3000], ["Maja Valles flood", 8, -56, 2500], ["Ares Vallis flood", 4, -20, 1800], ["The northern ocean", 45, -30, 8000]],
      globeNote: "The glowing lines show the paths of the giant floods, flowing downhill into the northern ocean. Floodwater has refilled part of the ocean (about 17% of Mars).",
      clue: { photo: ["PIA13653", "small", "Teardrop-shaped hills in Ares Vallis, carved by rushing floodwater"], text: "Orbiters see teardrop-shaped hills in the flood channels, carved by rushing water — just like islands in Earth’s flood channels. NASA’s Mars Pathfinder landed in 1997 on rocks swept there by an Ares Vallis flood." },
      globe: { water: { ocean: -3760, hellas: -6400, gale: -4300 }, rivers: 0.15, floods: 1, clouds: 0.25, land: [0.92, 0.9], sky: "thin", view: [-45, 22, 10000],
        labels: [["Kasei Valles flood", 29, -70, "flood"], ["Maja Valles flood", 8, -52, "flood"], ["Ares Vallis flood", 10.3, -25, "flood"], ["Northern Ocean", 50, -30, "water"]] }
    },
    {
      id: "freeze", date: "3 billion years ago", short: "The big freeze", dateShort: "3.0", era: "Amazonian period begins",
      title: "The Big Freeze",
      lead: "By about 3 billion years ago, Mars had become cold and dry. The ocean and lakes were gone — but the water didn’t just disappear.",
      photo: ["PIA25915", "medium", "Real photo: ancient six-sided mud cracks found by Curiosity, left behind as wet mud dried out again and again", false],
      gauges: { air: [1, "Very thin"], water: [1, "Frozen"], warmth: [0, "Freezing"], shield: [0, "Off"] },
      points: [
        ["space", "Up into space", "Sunlight split some water into hydrogen and oxygen. The light hydrogen floated away into space."],
        ["rock", "Locked inside rocks", "A lot of water got trapped inside minerals like clay, the way a sponge holds water. A 2021 study suggests this could be most of Mars’ ancient water."],
        ["ice", "Frozen solid", "The last of the ocean froze. Water turned to ice at the poles and under the ground, where much of it still is today."]
      ],
      look: [["The last frozen sea", 44.4, 113.4, 4500]],
      globeNote: "On the globe, the last of the ocean is frozen in Utopia Planitia — near where China’s Zhurong rover found layers that look like buried beaches.",
      clue: { photo: ["PIA22077", "small", "A cliff on Mars made of buried ice (blue), uncovered as the ground wore away"], text: "Orbiters have photographed cliffs made of buried ice, tens of meters thick, hiding just under Mars’ dusty ground." },
      debate: "Scientists are still figuring out how much water escaped to space and how much got trapped in rocks.",
      globe: { water: { ocean: -4500, hellas: -6900 }, ice: true, clouds: 0.04, land: [0.96, 0.95], sky: "mars", view: [113, 40, 11000],
        labels: [["The last frozen sea", 44.4, 113.4, "ice"]] }
    },
    {
      id: "today", date: "Today", short: "Mars today", dateShort: "Now", era: "Amazonian period",
      title: "Mars Today",
      lead: "Today Mars is a frozen desert. Its air is more than 100 times thinner than Earth’s, so liquid water can’t last on the surface — it would boil away or freeze. But clues to its watery past are everywhere.",
      photo: ["PIA00003", "medium", "Real photo: Mars today, made from 102 Viking orbiter pictures", false],
      gauges: { air: [1, "Very thin"], water: [1, "Ice"], warmth: [0, "Very cold"], shield: [0, "Off"] },
      points: [
        ["ice", "The ice is still here", "Mars’ polar ice caps and underground ice hold enough water to cover the whole planet about 20–30 meters deep if it all melted."],
        ["robot", "Robot detectives", "Rovers like Curiosity and Perseverance read the rocks for clues. Perseverance is collecting samples that could show whether tiny living things ever lived in Jezero’s lake."],
        ["question", "Could people use it?", "Someday, astronauts might melt that ice for drinking water and split it into oxygen to breathe and fuel for rockets."]
      ],
      look: [],
      gallery: [
        ["PIA23239", "medium", "Jezero’s dried-up river delta, seen from orbit"],
        ["PIA05587", "orig", "“Blueberries”: little balls formed by water soaking through rock"],
        ["PIA16189", "medium", "Rounded river pebbles found by Curiosity"]
      ],
      clue: null,
      globe: { water: {}, clouds: 0, land: [1, 1], sky: "mars", view: null,
        labels: [["North polar ice cap", 85, 0, "ice"], ["South polar ice cap", -86, -45, "ice"]] }
    }
  ]
};
