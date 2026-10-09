/* =====================================================================
   MARS EXPLORER — PLACES & MISSIONS
   ---------------------------------------------------------------------
   This is the file to edit if you want to change what students read.
   Every pin on the globe comes from this list.

   Each place looks like this:
   {
     id:    "olympus",            // short unique name, no spaces
     name:  "Olympus Mons",       // title on the card
     type:  "volcano",            // see TYPES in app.js (volcano, canyon, channel,
                                  //  crater, basin, ice, region, rover, lander,
                                  //  helicopter, orbiter, moon)
     lat: 18.65, lon: -133.8,     // latitude / longitude (east is +, west is -)
     view: 1800,                  // how high (km) the camera stops when you fly here
     short: "One line summary",
     body: ["Paragraph 1", "Paragraph 2"],
     facts: [["Label","Value"], ...],
     earth: "Compare-to-Earth sentence (landforms)",
     video: V(...) or S(...),     // see helpers below
     link: { label: "...", url: "https://..." }   // optional "learn more"
   }

   VIDEOS
   V(id, title, channel, length)  -> links straight to one YouTube video
   S("search words", "@Channel")  -> opens that official channel's video
                                     search on YouTube (NASA JPL by default)
   To use your own favorite video, replace S(...) with V("VIDEO_ID", "Title",
   "Channel", "2:30"). The VIDEO_ID is the part after "watch?v=" in a link.
   ===================================================================== */

(function () {
  const V = (id, title, by, len) => ({ url: "https://www.youtube.com/watch?v=" + id, title, by, len });
  const S = (q, ch) => ({ search: q, ch: ch === undefined ? "@NASAJPL" : ch });
  const ESA = "@EuropeanSpaceAgency";

  window.MARS_PLACES = [

  /* ================================================================
     VOLCANOES
     ================================================================ */
  {
    id: "olympus", name: "Olympus Mons", type: "volcano",
    lat: 18.65, lon: -133.8, view: 2200, rank: 1,
    short: "The tallest volcano in the solar system.",
    body: [
      "Olympus Mons is a shield volcano. That means it was built by runny lava that flowed out again and again, making a wide, gently sloping mountain shaped like a warrior’s shield lying on the ground.",
      "It rises about 22 km above Mars’ average surface level — roughly two and a half times as tall as Mount Everest. Its sides are so gentle that if you stood on its slope, the top would be hidden beyond the horizon.",
      "Why so big? Earth’s crust is broken into moving plates, so a volcano drifts away from its “hot spot” and stops growing. Mars has no moving plates, so lava kept piling up in the same place for a very long time. Mars’ weaker gravity also lets mountains grow taller."
    ],
    facts: [["Height", "About 22 km (72,000 ft)"], ["Width", "About 600 km (370 mi)"], ["Summit crater (caldera)", "About 80 km across, 3 km deep"], ["Edge cliffs", "Up to 8 km tall"]],
    earth: "Hawaii’s Mauna Loa is the biggest shield volcano on Earth, about 9 km tall from the sea floor. Olympus Mons is more than twice as tall and about as wide as the state of Arizona.",
    video: S("Olympus Mons")
  },
  {
    id: "ascraeus", name: "Ascraeus Mons", type: "volcano",
    lat: 11.92, lon: -104.08, view: 1500, rank: 2,
    short: "The northern giant of the three Tharsis volcanoes.",
    body: [
      "Ascraeus Mons is the northernmost of three huge volcanoes that stand in a line on the Tharsis region, a giant bulge in Mars’ crust built up by volcanic activity.",
      "Its top has a group of overlapping calderas. A caldera is a large pit that forms when the ground sinks after magma drains out from underneath."
    ],
    facts: [["Height", "About 18 km above average surface level"], ["Type", "Shield volcano"], ["Neighbors", "Pavonis Mons and Arsia Mons, in a straight line"]],
    earth: "On Earth, volcanoes in a line often form as a crustal plate slides over a hot spot — that is how the Hawaiian Islands formed. Scientists still debate exactly why the three Tharsis volcanoes line up.",
    video: S("Tharsis volcanoes Mars")
  },
  {
    id: "pavonis", name: "Pavonis Mons", type: "volcano",
    lat: 1.48, lon: -112.96, view: 1500, rank: 2,
    short: "The middle Tharsis volcano, sitting right on the equator.",
    body: [
      "Pavonis Mons sits almost exactly on Mars’ equator, in the middle of the three Tharsis volcanoes.",
      "Orbiters have photographed deep, round pits on the volcanoes of Tharsis. Some may be openings into lava tubes — tunnels left behind when flowing lava drained away. Future explorers might even use caves like these as shelter."
    ],
    facts: [["Height", "About 14 km above average surface level"], ["Type", "Shield volcano"], ["Location", "On the equator"]],
    earth: "Lava tubes are common on Earth too. You can walk through them in Hawaii and at Lava Beds National Monument in California.",
    video: S("Mars lava tubes caves")
  },
  {
    id: "arsia", name: "Arsia Mons", type: "volcano",
    lat: -8.26, lon: -120.09, view: 1500, rank: 2,
    short: "The southern Tharsis volcano, with an enormous summit caldera.",
    body: [
      "Arsia Mons is the southernmost of the three Tharsis volcanoes. Its summit caldera is about 110 km wide — one of the biggest volcanic craters on Mars.",
      "On its western side are strange ridged deposits that scientists think were left by glaciers long ago, when Mars’ tilt was different and ice built up on the volcano."
    ],
    facts: [["Height", "About 17 km above average surface level"], ["Caldera", "About 110 km across"], ["Type", "Shield volcano"]],
    earth: "Arsia Mons’ summit caldera alone is about three-quarters as wide as the entire Big Island of Hawaii (about 150 km).",
    video: S("Arsia Mons")
  },
  {
    id: "alba", name: "Alba Mons", type: "volcano",
    lat: 40.47, lon: -109.6, view: 2600, rank: 2,
    short: "The volcano that covers the most area on Mars.",
    body: [
      "Alba Mons is not very tall, but it is incredibly wide. Its lava flows spread out for more than 1,000 km from the top in some directions.",
      "Because its slopes are so gentle — less than one degree in most places — you would hardly notice you were walking uphill. It is surrounded by long cracks in the ground called fossae, made as the crust stretched."
    ],
    facts: [["Height", "About 6.8 km"], ["Size", "About 2,000 km by 3,000 km"], ["Record", "Largest volcano on Mars by area"]],
    earth: "Alba Mons would cover most of the western United States.",
    video: S("Alba Mons")
  },
  {
    id: "elysium", name: "Elysium Mons", type: "volcano",
    lat: 25.02, lon: 147.21, view: 1800, rank: 2,
    short: "The biggest volcano in Mars’ second volcanic region.",
    body: [
      "Elysium Mons is the largest volcano in the Elysium region, Mars’ second-biggest volcanic area after Tharsis.",
      "Nearby are some of the youngest lava flows on Mars, along with long cracks in the ground (see Cerberus Fossae)."
    ],
    facts: [["Height", "About 12.6 km above the plains around it"], ["Type", "Volcano"], ["Region", "Elysium Planitia"]],
    earth: "Elysium Mons is about 3 times as tall as Mount Rainier in Washington State is above sea level.",
    video: S("Elysium Mars volcano")
  },

  /* ================================================================
     CANYONS
     ================================================================ */
  {
    id: "valles", name: "Valles Marineris", type: "canyon",
    lat: -13.9, lon: -59.2, view: 4500, rank: 1,
    short: "The biggest canyon system in the solar system.",
    body: [
      "Valles Marineris is a system of giant canyons that stretches about 4,000 km across Mars — nearly a quarter of the way around the planet.",
      "Unlike the Grand Canyon, it was not carved mainly by a river. As the Tharsis volcanic region swelled up, the crust stretched and cracked apart. Then landslides, collapses, and possibly water made the canyons wider and deeper.",
      "It is named after the Mariner 9 spacecraft, which discovered it in 1971–1972."
    ],
    facts: [["Length", "About 4,000 km (2,500 mi)"], ["Depth", "Up to about 7 km"], ["Width", "Up to about 200 km"], ["Formed by", "Cracking of the crust, then landslides and erosion"]],
    earth: "Put on Earth, Valles Marineris would stretch from New York City to Los Angeles. The Grand Canyon (about 450 km long and 1.8 km deep) would fit inside one of its side canyons.",
    video: S("Valles Marineris")
  },
  {
    id: "noctis", name: "Noctis Labyrinthus", type: "canyon",
    lat: -6.9, lon: -101.4, view: 1500, rank: 2,
    short: "A “labyrinth of night” — a maze of crisscrossing canyons.",
    body: [
      "At the western end of Valles Marineris, the canyons break into a maze of steep-walled valleys that cross each other in many directions.",
      "Scientists think the crust here was pulled and cracked in several directions at once, as the nearby Tharsis volcanoes pushed the land upward. Blocks of ground dropped down between the cracks."
    ],
    facts: [["Meaning of name", "Labyrinth of the Night"], ["Formed by", "Cracking and sinking of the crust"], ["Connects to", "Valles Marineris"]],
    earth: "Earth has valleys formed by blocks of crust dropping between faults — like Death Valley in California — but nothing that forms a giant maze like this.",
    video: S("Noctis Labyrinthus", ESA)
  },

  /* ================================================================
     RIVER CHANNELS & VALLEYS
     ================================================================ */
  {
    id: "kasei", name: "Kasei Valles", type: "channel",
    lat: 24.6, lon: -65.0, view: 2200, rank: 1,
    short: "One of the largest flood channels on Mars.",
    body: [
      "Kasei Valles is an outflow channel — a huge channel carved by enormous floods, not by a normal river that flows all the time.",
      "Scientists think huge amounts of underground water burst out, possibly melted by volcanic heat from Tharsis. The floods carved streamlined islands and grooves into the land as they rushed north toward the low plains.",
      "Some parts of the channel are 2 to 3 km deep."
    ],
    facts: [["Length", "More than 1,500 km (930 mi)"], ["Depth", "Up to 2–3 km"], ["Type", "Outflow (flood) channel"], ["Drains into", "Chryse Planitia"]],
    earth: "Washington State’s Channeled Scablands were carved by giant Ice Age floods when a glacier dam broke. They have the same streamlined islands seen in Kasei Valles — but Kasei is far bigger.",
    video: S("Kasei Valles", ESA)
  },
  {
    id: "ares", name: "Ares Vallis", type: "channel",
    lat: 10.3, lon: -25.7, view: 1600, rank: 2,
    short: "A giant flood channel — and the landing site of the first Mars rover.",
    body: [
      "Ares Vallis is another huge outflow channel carved by catastrophic floods long ago.",
      "NASA picked the mouth of this channel for the Mars Pathfinder mission in 1997, hoping the floods had washed in many different kinds of rocks from far away. They were right — the landing area was covered with rocks of many shapes and sizes, some stacked and tilted by the flowing water."
    ],
    facts: [["Type", "Outflow (flood) channel"], ["Visited by", "Mars Pathfinder & Sojourner (1997)"], ["Drains into", "Chryse Planitia"]],
    earth: "On Earth, rocks that pile up and lean in the same direction (called imbrication) tell geologists which way a flood flowed. Pathfinder saw rocks like this on Mars.",
    video: S("Mars Pathfinder Ares Vallis")
  },
  {
    id: "nanedi", name: "Nanedi Valles", type: "channel",
    lat: 4.9, lon: -49.0, view: 900, rank: 2,
    short: "A winding valley with a smaller channel running along its floor.",
    body: [
      "Nanedi Valles is a long, winding valley. Its bends, called meanders, look a lot like the curves of rivers on Earth.",
      "In some places you can see a narrow inner channel on the valley floor. That suggests water flowed here for a long time, not just in one sudden flood — an important clue that Mars once had flowing water."
    ],
    facts: [["Length", "About 500 km (315 mi)"], ["Width", "Up to about 4 km"], ["Key clue", "Inner channel = longer-lasting flow"]],
    earth: "Rivers like the San Juan River at Goosenecks State Park in Utah carved deep, winding meanders like these.",
    video: S("water on Mars river valleys")
  },
  {
    id: "maadim", name: "Ma’adim Vallis", type: "channel",
    lat: -20.5, lon: 176.5, view: 1500, rank: 2,
    short: "A long valley that once poured water into Gusev Crater.",
    body: [
      "Ma’adim Vallis is a large valley that ends at the rim of Gusev Crater.",
      "Scientists chose Gusev as the landing site for the Spirit rover partly because they thought water flowing down Ma’adim Vallis may have once filled the crater with a lake."
    ],
    facts: [["Length", "About 700 km"], ["Connects to", "Gusev Crater"], ["Name", "“Ma’adim” is Hebrew for Mars"]],
    earth: "Ma’adim Vallis is about as long as the distance from Chicago to Pittsburgh.",
    video: S("Spirit rover Gusev crater")
  },
  {
    id: "warrego", name: "Warrego Valles", type: "channel",
    lat: -42.0, lon: -93.0, view: 900, rank: 3,
    short: "A branching valley network that looks like a river system from above.",
    body: [
      "From above, Warrego Valles looks like the branches of a tree. Small valleys join to make bigger ones, the same way small streams join to make rivers on Earth.",
      "Valley networks like this are some of the best evidence that early Mars may have had rain or melting snow that ran across the land."
    ],
    facts: [["Type", "Valley network"], ["Pattern", "Branching (dendritic)"], ["Age", "Very old — billions of years"]],
    earth: "The Mississippi River system has thousands of branching streams that feed into it. Warrego Valles has the same branching pattern on a smaller scale.",
    video: S("Mars valley networks rain")
  },
  {
    id: "mawrth", name: "Mawrth Vallis", type: "channel",
    lat: 22.6, lon: -16.5, view: 900, rank: 3,
    short: "An ancient valley full of clay minerals that form in water.",
    body: [
      "Mawrth Vallis is an old flood-carved valley. Its walls show colorful layers that contain clay minerals.",
      "Clays usually form when rock sits in water for a long time. That makes places like this exciting for scientists searching for spots where life could once have survived."
    ],
    facts: [["Type", "Ancient valley"], ["Special minerals", "Clays"], ["Why it matters", "Clays form in water"]],
    earth: "On Earth, clay forms at the bottoms of lakes and in wet soils. Potters use it to make pottery!",
    video: S("Mars clay minerals water")
  },

  /* ================================================================
     CRATERS
     ================================================================ */
  {
    id: "jezero", name: "Jezero Crater", type: "crater",
    lat: 18.38, lon: 77.58, view: 220, rank: 1,
    short: "An ancient lake with a river delta — home of the Perseverance rover.",
    body: [
      "About 3.5 billion years ago, a river flowed into Jezero Crater and filled it with a lake. Where the river entered, it dropped mud and sand that built a fan-shaped delta. You can still see the delta today on the crater’s western side.",
      "Deltas on Earth are great at trapping and preserving signs of life. That is why NASA sent the Perseverance rover here to collect rock samples.",
      "Tip: zoom in close to see Perseverance’s path (the dotted line)."
    ],
    facts: [["Width", "About 45 km (28 mi)"], ["Ancient lake", "Yes — filled by a river"], ["Visited by", "Perseverance & Ingenuity (landed 2021)"]],
    earth: "Jezero is about as wide as the city of Chicago is long. Its delta formed the same way the Mississippi River Delta is forming in Louisiana today.",
    video: S("Jezero crater")
  },
  {
    id: "gale", name: "Gale Crater", type: "crater",
    lat: -5.4, lon: 137.8, view: 450, rank: 1,
    short: "A giant crater with a 5-km-tall mountain in the middle — home of Curiosity.",
    body: [
      "Gale Crater formed when an asteroid hit Mars about 3.5 to 3.8 billion years ago. Later, layers of sediment — mud, sand, and dust — filled the crater. Wind then carved most of it away, leaving a tall mound in the center called Mount Sharp.",
      "The Curiosity rover discovered that Gale once held lakes and streams with water that would have been safe enough to drink. The rover is still climbing Mount Sharp, reading its layers like pages in a history book."
    ],
    facts: [["Width", "About 154 km (96 mi)"], ["Central mountain", "Mount Sharp, about 5.5 km tall"], ["Visited by", "Curiosity (landed 2012)"]],
    earth: "Gale Crater is a little wider than the distance from Chicago to Milwaukee. Mount Sharp is taller than any mountain in the lower 48 U.S. states.",
    video: S("Gale crater Curiosity")
  },
  {
    id: "sharp", name: "Mount Sharp (Aeolis Mons)", type: "region",
    lat: -5.08, lon: 137.85, view: 300, rank: 2,
    short: "A layered mountain inside Gale Crater that Curiosity is climbing.",
    body: [
      "Mount Sharp is made of stacked layers of rock. The lowest layers are the oldest. Higher layers formed later.",
      "As Curiosity climbs, it has found rocks that formed in lakes near the bottom and rocks with salty minerals higher up. This tells scientists that Mars slowly dried out over time."
    ],
    facts: [["Height", "About 5.5 km above the crater floor"], ["Made of", "Layers of sedimentary rock"], ["Official name", "Aeolis Mons"]],
    earth: "The layers of the Grand Canyon also record Earth’s history, with the oldest rocks at the bottom.",
    video: S("Curiosity Mount Sharp layers")
  },
  {
    id: "gusev", name: "Gusev Crater", type: "crater",
    lat: -14.5, lon: 175.4, view: 600, rank: 2,
    short: "A large crater where the Spirit rover explored.",
    body: [
      "Gusev Crater is where the rover Spirit landed in 2004. Scientists hoped it once held a lake fed by Ma’adim Vallis.",
      "Spirit found that the crater floor was mostly covered with volcanic rock. But in the Columbia Hills, it found minerals that formed with hot water — evidence that the area was once warm and wet, like a hot spring."
    ],
    facts: [["Width", "About 166 km"], ["Visited by", "Spirit rover (2004–2010)"], ["Big find", "Signs of ancient hot springs"]],
    earth: "Yellowstone’s hot springs and geysers deposit silica, the same mineral Spirit found in Gusev Crater.",
    video: S("Spirit rover")
  },
  {
    id: "endeavour", name: "Endeavour Crater", type: "crater",
    lat: -2.28, lon: -5.23, view: 120, rank: 2,
    short: "The big crater Opportunity explored for seven years.",
    body: [
      "Endeavour Crater is an old impact crater on the plains of Meridiani Planum. Opportunity spent about three years driving to it, then explored its rim from 2011 until 2018.",
      "On the rim, Opportunity found bright veins of the mineral gypsum filling cracks in the rock. Gypsum forms when water flows through cracks, so it was clear evidence of water underground long ago."
    ],
    facts: [["Width", "About 22 km (14 mi)"], ["Visited by", "Opportunity (2011–2018)"], ["Big find", "Gypsum veins left by water"]],
    earth: "Endeavour Crater is about as wide as Manhattan Island is long.",
    video: S("Opportunity rover Endeavour crater")
  },
  {
    id: "victoria", name: "Victoria Crater", type: "crater",
    lat: -2.05, lon: -5.50, view: 18, rank: 3,
    short: "A scalloped crater whose cliffs show layers of ancient sand dunes.",
    body: [
      "Victoria Crater has a scalloped edge with bays and capes. Opportunity reached it in 2006 and even drove down inside it.",
      "Its cliffs show rock layers that formed from ancient sand dunes. The criss-cross patterns in the layers show how wind moved sand long ago — and how water later soaked through it."
    ],
    facts: [["Width", "About 800 m (half a mile)"], ["Depth", "About 70 m"], ["Visited by", "Opportunity (2006–2008)"]],
    earth: "Victoria is a little smaller than Meteor Crater in Arizona, which is about 1.2 km wide.",
    video: S("Opportunity Victoria crater")
  },
  {
    id: "eberswalde", name: "Eberswalde Delta", type: "channel",
    lat: -24.0, lon: -33.5, view: 300, rank: 2,
    short: "One of the clearest ancient river deltas on Mars.",
    body: [
      "Inside Eberswalde Crater is a fan of curving ridges. These are the hardened remains of river channels that shifted back and forth as they dumped sediment into a lake, building a delta.",
      "Finding a delta proved that water did not just flow once — it flowed long enough to build up layers of mud and sand in a standing lake."
    ],
    facts: [["Type", "River delta"], ["Found in", "Eberswalde Crater"], ["Spotted by", "Mars Global Surveyor (2003)"]],
    earth: "Deltas form wherever a river slows down as it enters a lake or ocean — like the Nile Delta in Egypt or the Mississippi Delta.",
    video: S("Mars river delta")
  },
  {
    id: "huygens", name: "Huygens Crater", type: "crater",
    lat: -14.0, lon: 55.6, view: 1500, rank: 2,
    short: "One of the largest impact craters on Mars.",
    body: [
      "Huygens is a giant, very old crater in the southern highlands. It is so big that it has a second ring inside it, which is common for the largest craters.",
      "Huygens is named after Christiaan Huygens, a Dutch scientist who made one of the first drawings of Mars’ surface in 1659."
    ],
    facts: [["Width", "About 470 km"], ["Type", "Peak-ring impact crater"], ["Named for", "Christiaan Huygens"]],
    earth: "Huygens is almost as wide as Lake Michigan is long.",
    video: S("impact craters Mars")
  },
  {
    id: "schiaparelli", name: "Schiaparelli Crater", type: "crater",
    lat: -2.7, lon: 16.7, view: 1500, rank: 3,
    short: "A huge crater near the equator with layered rocks inside.",
    body: [
      "Schiaparelli is a large impact crater near Mars’ equator. Inside, orbiters have seen layered rock that may have built up in an ancient lake or from dust settling over time.",
      "It is named after Giovanni Schiaparelli, an Italian astronomer who mapped Mars in the 1800s."
    ],
    facts: [["Width", "About 460 km"], ["Named for", "Giovanni Schiaparelli"], ["Fun fact", "It appears in the book and movie The Martian"]],
    earth: "Schiaparelli is wider than the whole state of Ohio.",
    video: S("Schiaparelli crater Mars", ESA)
  },
  {
    id: "lyot", name: "Lyot Crater", type: "crater",
    lat: 50.8, lon: 29.3, view: 1100, rank: 3,
    short: "A large crater in the north with channels running out from it.",
    body: [
      "Lyot is a big impact crater in Mars’ northern plains. Its floor is one of the lowest places in the northern half of Mars.",
      "Small channels around it suggest that the impact may have melted underground ice, letting water flow for a short time."
    ],
    facts: [["Width", "About 220 km"], ["Location", "Northern plains"], ["Clue", "Channels possibly from melted ice"]],
    earth: "When big meteorites hit icy ground on Earth, they can also melt ice and send water flowing.",
    video: S("Mars craters ice")
  },
  {
    id: "korolev", name: "Korolev Crater", type: "ice",
    lat: 73.0, lon: 164.5, view: 600, rank: 1,
    short: "A crater filled with a giant block of water ice all year round.",
    body: [
      "Korolev Crater is filled with a mound of water ice about 1.8 km thick — and it stays frozen all year.",
      "The ice survives because of a natural “cold trap”: air moving over the ice cools and sinks into the crater, making a chilly layer that acts like a shield and keeps the ice from melting or vanishing."
    ],
    facts: [["Width", "About 82 km"], ["Ice thickness", "About 1.8 km"], ["Ice volume", "About 2,200 cubic km"]],
    earth: "Korolev holds about as much water as Great Bear Lake in Canada.",
    video: S("Korolev crater", ESA)
  },
  {
    id: "russell", name: "Russell Crater Dunes", type: "region",
    lat: -54.5, lon: 12.7, view: 500, rank: 3,
    short: "A crater with some of the biggest sand dunes on Mars.",
    body: [
      "Inside Russell Crater is a giant field of sand dunes. The biggest dune is hundreds of meters tall.",
      "In winter, frost covers the dunes. In spring, the frost turns back to gas, and orbiters have watched dark streaks and gullies appear on the dune slopes."
    ],
    facts: [["Crater width", "About 140 km"], ["Dunes", "Some of the largest on Mars"], ["Seasonal change", "Frost and streaks each spring"]],
    earth: "Some of Earth’s tallest sand dunes, in China’s Badain Jaran Desert, are about 500 m tall.",
    video: S("Mars sand dunes")
  },

  /* ================================================================
     BASINS, PLAINS & REGIONS
     ================================================================ */
  {
    id: "hellas", name: "Hellas Basin", type: "basin",
    lat: -42.4, lon: 70.5, view: 4500, rank: 1,
    short: "A giant impact basin — the lowest place on Mars.",
    body: [
      "Hellas is one of the largest impact craters in the solar system. A huge asteroid hit Mars here around 4 billion years ago.",
      "The bottom of Hellas is more than 7 km deep. Because it is so low, the air pressure at the bottom is the highest on Mars — about twice as high as the average."
    ],
    facts: [["Width", "About 2,300 km (1,400 mi)"], ["Depth", "More than 7 km"], ["Record", "Lowest point on Mars"]],
    earth: "Hellas is almost wide enough to stretch from Chicago to Las Vegas.",
    video: S("Hellas basin Mars")
  },
  {
    id: "argyre", name: "Argyre Basin", type: "basin",
    lat: -49.7, lon: -44.0, view: 3500, rank: 2,
    short: "A large, ancient impact basin in the southern highlands.",
    body: [
      "Argyre is a giant impact basin ringed by mountains that were pushed up by the impact.",
      "Several long valleys lead into Argyre, so scientists think it may once have held a lake."
    ],
    facts: [["Width", "About 1,800 km"], ["Type", "Impact basin"], ["Age", "About 4 billion years"]],
    earth: "Argyre is about as wide as the distance from Chicago to Miami.",
    video: S("Argyre Mars")
  },
  {
    id: "utopia", name: "Utopia Planitia", type: "basin",
    lat: 49.7, lon: 118.0, view: 4500, rank: 2,
    short: "A huge plain in a giant buried impact basin — with lots of hidden ice.",
    body: [
      "Utopia Planitia fills an enormous impact basin. It is one of the largest known impact basins in the solar system.",
      "Radar from orbit found a huge amount of water ice buried under the ground here. Two landers — NASA’s Viking 2 (1976) and China’s Zhurong rover (2021) — touched down on these plains."
    ],
    facts: [["Width", "About 3,300 km"], ["Hidden ice", "Yes, buried underground"], ["Visitors", "Viking 2, Zhurong"]],
    earth: "Utopia is wider than the distance from New York to Denver.",
    video: S("Utopia Planitia ice")
  },
  {
    id: "isidis", name: "Isidis Planitia", type: "basin",
    lat: 12.9, lon: 87.0, view: 3000, rank: 3,
    short: "A smooth plain inside an ancient impact basin.",
    body: [
      "Isidis Planitia is a flat plain that formed inside a large, old impact basin.",
      "The British-built Beagle 2 lander touched down here on Christmas Day, 2003. Jezero Crater sits on the edge of this basin."
    ],
    facts: [["Width", "About 1,500 km"], ["Type", "Impact basin"], ["Visitor", "Beagle 2 (2003)"]],
    earth: "Isidis is wider than the distance from Chicago to Dallas.",
    video: S("Isidis Planitia")
  },
  {
    id: "chryse", name: "Chryse Planitia", type: "basin",
    lat: 28.4, lon: -40.3, view: 2500, rank: 3,
    short: "A low plain where many giant flood channels emptied out.",
    body: [
      "Chryse Planitia is a smooth plain at the end of several huge flood channels, including Kasei Valles and Ares Vallis. Floodwaters dropped rocks and sediment here.",
      "Viking 1, the first U.S. spacecraft to land on Mars, touched down here in 1976."
    ],
    facts: [["Type", "Low plain"], ["Name means", "Plain of Gold"], ["Visitors", "Viking 1, Mars Pathfinder (nearby)"]],
    earth: "Just like rivers on Earth drop sediment where they slow down, Mars’ floods dropped rocks when they reached this flat plain.",
    video: S("Viking 1 Chryse Planitia")
  },
  {
    id: "vastitas", name: "Vastitas Borealis (Northern Lowlands)", type: "basin",
    lat: 68.0, lon: -20.0, view: 5000, rank: 2,
    short: "The low, smooth northern plains — maybe once an ocean floor.",
    body: [
      "Mars is lopsided. Most of the northern half is low and smooth, while the southern half is high and covered in craters. Scientists call this the “Martian dichotomy.”",
      "Some scientists think the northern lowlands may have held an ocean billions of years ago. Others are not sure. It is one of the big open questions about Mars."
    ],
    facts: [["Height difference", "About 4–5 km lower than the southern highlands"], ["Surface", "Smooth, fewer craters"], ["Open question", "Was there an ocean?"]],
    earth: "Earth’s ocean floors are also low and smooth compared with continents — one reason scientists wonder about an ancient Martian ocean.",
    video: S("Mars ocean")
  },
  {
    id: "syrtis", name: "Syrtis Major", type: "region",
    lat: 8.4, lon: 69.5, view: 3000, rank: 3,
    short: "A dark volcanic region you can see from Earth with a telescope.",
    body: [
      "Syrtis Major is a large, dark area made of volcanic rock called basalt. It is dark because dust does not cover it as much as other places.",
      "It was the first feature on Mars ever recorded: Christiaan Huygens drew it in 1659 and used it to figure out that a day on Mars is about 24 hours long."
    ],
    facts: [["Made of", "Basalt (dark volcanic rock)"], ["First recorded", "1659 by Christiaan Huygens"], ["Visible from", "Earth, with a telescope"]],
    earth: "Hawaii’s black-sand beaches are made of basalt, the same dark rock as Syrtis Major.",
    video: S("Mars from Earth telescope")
  },
  {
    id: "cerberus", name: "Cerberus Fossae", type: "region",
    lat: 11.28, lon: 166.37, view: 1200, rank: 2,
    short: "Long cracks in the ground where many marsquakes happen.",
    body: [
      "Cerberus Fossae is a set of long, deep cracks in Mars’ crust. Lava and water may have flowed out of them not very long ago (in geologic time).",
      "NASA’s InSight lander, about 1,600 km away, detected many marsquakes that came from this area — proof that Mars is still active inside."
    ],
    facts: [["Type", "Fissures (cracks) in the crust"], ["Activity", "Source of many marsquakes"], ["Age", "Some of the youngest surfaces on Mars"]],
    earth: "In Iceland, lava pours out of long cracks called fissures — similar to how Cerberus Fossae may have formed.",
    video: S("marsquakes InSight")
  },
  {
    id: "medusae", name: "Medusae Fossae Formation", type: "region",
    lat: -3.0, lon: -163.0, view: 2500, rank: 3,
    short: "A huge region of soft, wind-carved rock — and maybe hidden ice.",
    body: [
      "The Medusae Fossae Formation is a giant deposit of soft rock near the equator. Wind has carved it into long ridges and grooves called yardangs.",
      "Scientists think it is made largely of volcanic ash. In 2024, radar from the Mars Express orbiter suggested it may also hide layers of ice deep inside."
    ],
    facts: [["Made of", "Soft rock, likely volcanic ash"], ["Shapes", "Wind-carved ridges (yardangs)"], ["Mystery", "Possible buried ice"]],
    earth: "Wind carves yardangs in Earth’s deserts too — like in Egypt and Iran.",
    video: S("Medusae Fossae", ESA)
  },
  {
    id: "face", name: "The “Face on Mars” (Cydonia)", type: "region",
    lat: 40.75, lon: -9.46, view: 60, rank: 3,
    short: "A hill that looked like a face in a blurry 1976 photo.",
    body: [
      "In 1976, the Viking 1 orbiter took a blurry photo of a hill in the Cydonia region. Shadows made it look like a giant human face, and some people claimed aliens had built it.",
      "Later, much sharper photos from Mars Global Surveyor (1998 and 2001) and other orbiters showed it is a natural mesa — a flat-topped hill shaped by erosion.",
      "Seeing faces in random shapes is called pareidolia. Our brains are very good at spotting faces — even in clouds and electrical outlets!"
    ],
    facts: [["Size", "About 2 km long"], ["What it really is", "A natural mesa (hill)"], ["Lesson", "Better data beats a blurry picture"]],
    earth: "The American Southwest has many mesas — flat-topped hills carved by erosion — such as in Monument Valley.",
    video: S("Face on Mars")
  },

  /* ================================================================
     ICE & POLES
     ================================================================ */
  {
    id: "northcap", name: "North Polar Ice Cap", type: "ice",
    lat: 86.0, lon: 0.0, view: 3200, rank: 1,
    short: "A giant dome of water ice at Mars’ north pole.",
    body: [
      "Mars’ north polar cap is made mostly of frozen water. In winter, a thin coat of frozen carbon dioxide (dry ice) forms on top, then disappears again in summer.",
      "The cap is made of many layers, like a stack of pancakes. Each layer records a little of Mars’ climate history.",
      "Look closely for the dark spiral troughs that swirl around the cap."
    ],
    facts: [["Width", "About 1,000 km in summer"], ["Thickness", "About 2–3 km"], ["Made of", "Mostly water ice"]],
    earth: "Mars’ north cap holds a bit more than half as much ice as Greenland’s ice sheet.",
    video: S("Mars polar ice cap")
  },
  {
    id: "chasmaboreale", name: "Chasma Boreale", type: "canyon",
    lat: 83.6, lon: -46.6, view: 1400, rank: 3,
    short: "A huge canyon cut into the north polar ice cap.",
    body: [
      "Chasma Boreale is a giant valley that cuts about halfway across the north polar cap.",
      "Its walls show the cap’s ice layers, like the side of a layer cake. Scientists think strong winds helped carve it."
    ],
    facts: [["Width", "About 100 km"], ["Depth", "Up to about 2 km"], ["Cut into", "Water ice"]],
    earth: "Chasma Boreale is deeper than the Grand Canyon — and it is made of ice!",
    video: S("Chasma Boreale", ESA)
  },
  {
    id: "southcap", name: "South Polar Ice Cap", type: "ice",
    lat: -87.0, lon: -45.0, view: 2600, rank: 1,
    short: "A polar cap topped with frozen carbon dioxide (dry ice).",
    body: [
      "The south polar cap is mostly water ice, but it has a permanent top layer of frozen carbon dioxide (dry ice) about 8 meters thick.",
      "In spring, sunlight turns some of the dry ice directly into gas. The gas bursts out and makes strange spider-shaped patterns on the ground."
    ],
    facts: [["Permanent cap", "About 400 km wide"], ["Dry ice layer", "About 8 m thick"], ["Fun fact", "Spring “spiders” form from escaping gas"]],
    earth: "On Earth, carbon dioxide never freezes naturally — it is too warm. On Mars, the poles get cold enough (below −125 °C).",
    video: S("Mars south pole spiders")
  },
  {
    id: "spiders", name: "“Spiders” of the South Pole", type: "ice",
    lat: -79.4, lon: 18.8, view: 700, rank: 3,
    short: "Spidery shapes carved by bursting jets of gas every spring.",
    body: [
      "Near Mars’ south pole, the ground is covered with dark, branching shapes that look like giant spiders. Scientists call them araneiforms, which means “spider-shaped.”",
      "In winter, a layer of carbon dioxide ice (dry ice) covers the ground. In spring, sunlight shines through the clear ice and warms the soil underneath. The bottom of the ice turns into gas, and the trapped gas bursts out through cracks like a geyser, carrying dark dust with it.",
      "Year after year, the escaping gas carves branching channels into the ground — the “legs” of the spiders."
    ],
    facts: [["Made by", "Jets of carbon dioxide gas"], ["When", "Every southern spring"], ["Size", "Tens of meters to about 1 km across"]],
    earth: "Nothing like this happens naturally on Earth, because Earth never gets cold enough for dry ice to form. In 2016, about 10,000 volunteers helped NASA pick the best spider spots to photograph — anyone can help with real Mars science.",
    video: S("Mars spiders south pole")
  },
  {
    id: "avalanche", name: "North Polar Avalanche Cliffs", type: "ice",
    lat: 83.74, lon: -124.22, view: 500, rank: 3,
    short: "Steep ice cliffs where an orbiter caught avalanches happening.",
    body: [
      "At the edge of the north polar ice cap, the layered ice ends in cliffs more than 700 meters tall, with slopes steeper than 60 degrees.",
      "On February 19, 2008, Mars Reconnaissance Orbiter’s HiRISE camera happened to photograph at least four avalanches falling down these cliffs at the same moment. The clouds of dust and ice look like puffs of smoke at the bottom of the cliff.",
      "Scientists aren’t sure what sets them off. Ideas include frost disappearing in spring, ice cracking as it warms and cools, or a marsquake."
    ],
    facts: [["Cliff height", "Over 700 m (2,300 ft)"], ["Biggest dust cloud", "About 180 m across"], ["Photographed", "February 19, 2008, in northern spring"]],
    earth: "On Earth, avalanches on steep mountain slopes are often set off by warming in spring — Mars’ polar cliffs may work in a similar way.",
    video: S("Mars avalanche HiRISE")
  },

  /* Landforms added for the photo tour */
  {
    id: "galle", name: "Galle Crater (the “Happy Face”)", type: "crater",
    lat: -51.0, lon: -30.9, view: 1200, rank: 3,
    short: "A big crater that looks like a smiley face from space.",
    body: [
      "Galle Crater is about 230 km wide. A curved line of hills inside it, plus a couple of small spots, make it look like a smiling face when you see it from orbit.",
      "The “smile” is part of a peak ring — a ring of hills pushed up when a giant space rock slammed into the ground, a bit like the splash when you drop a rock into mud.",
      "The crater is named after Johann Galle, the German astronomer who first saw the planet Neptune in 1846. Seeing faces in random shapes is called pareidolia — the same reason people saw a “face” in Cydonia."
    ],
    facts: [["Width", "About 230 km (140 mi)"], ["Location", "On the eastern rim of the Argyre Basin"], ["Named for", "Astronomer Johann Galle"]],
    earth: "Canada’s Manicouagan crater, about 100 km wide, is one of Earth’s largest impact craters you can still see from space. Galle is more than twice as wide.",
    video: S("Mars impact craters")
  },
  {
    id: "dustdevil", name: "Dust Devil Alley (Amazonis Planitia)", type: "region",
    lat: 35.82, lon: -152.52, view: 600, rank: 3,
    short: "Flat plains where whirling dust devils dance across the ground.",
    body: [
      "Amazonis Planitia is a smooth, flat plain in Mars’ northern hemisphere. On sunny spring and summer afternoons, the ground heats up and warm air spirals upward, making whirlwinds called dust devils.",
      "On February 16, 2012, the HiRISE camera on Mars Reconnaissance Orbiter photographed a dust devil here that rose more than 800 meters high while being only about 30 meters wide. Its long, curving shadow made it look like a giant serpent.",
      "Dust devils leave dark, crisscrossing tracks where they sweep away the brighter dust. They have also helped solar-powered rovers by blowing dust off their solar panels."
    ],
    facts: [["Tallest one photographed here", "More than 800 m (half a mile)"], ["Width", "About 30 m"], ["When they form", "Sunny spring and summer afternoons"]],
    earth: "Dust devils on Earth form the same way, over hot deserts like those in Arizona — but most are much smaller than the ones on Mars.",
    video: S("Mars dust devil")
  },

  /* ================================================================
     ROVERS
     ================================================================ */
  {
    id: "perseverance", name: "Perseverance Rover", type: "rover", rover: "perseverance",
    lat: 18.4447, lon: 77.4508, view: 60, rank: 1, color: "#3ee0ff",
    short: "NASA’s rover searching for signs of ancient life in Jezero Crater.",
    body: [
      "Perseverance landed in Jezero Crater on February 18, 2021. Its main job is to search for signs of ancient microbial life and collect rock samples in sealed tubes.",
      "It carried MOXIE, a device that made oxygen from Mars’ carbon dioxide air, and the Ingenuity helicopter.",
      "Zoom in to follow its dotted path. Tap the camera dots for real photos and the star dots for big discoveries."
    ],
    facts: [["Landed", "February 18, 2021"], ["Size", "About the size of a car (1,025 kg)"], ["Power", "Nuclear battery (plutonium)"], ["Distance driven", "About 45 km (28 mi) by 2026"], ["Status", "Active"]],
    earth: "Perseverance is about 3 m long — about as long as a small car.",
    video: V("4czjS9h4Fpg", "Perseverance Rover’s Descent and Touchdown on Mars", "NASA JPL", "3:25"),
    link: { label: "Perseverance mission page (NASA)", url: "https://science.nasa.gov/mission/mars-2020-perseverance/" }
  },
  {
    id: "curiosity", name: "Curiosity Rover", type: "rover", rover: "curiosity",
    lat: -4.5895, lon: 137.4417, view: 90, rank: 1, color: "#ffd23e",
    short: "NASA’s rover that proved ancient Mars could have supported life.",
    body: [
      "Curiosity landed in Gale Crater on August 6, 2012. It was lowered to the ground by a rocket-powered “sky crane.”",
      "Within its first year, it found that an ancient lake in Gale Crater had water and chemistry that tiny microbes could have lived in. Since then it has been climbing Mount Sharp.",
      "Zoom in to follow its dotted path across Gale Crater."
    ],
    facts: [["Landed", "August 6, 2012"], ["Size", "About the size of a car (899 kg)"], ["Power", "Nuclear battery (plutonium)"], ["Distance driven", "About 38 km (24 mi) by 2026"], ["Status", "Active"]],
    earth: "Curiosity weighs about as much as a small car.",
    video: S("Curiosity rover"),
    link: { label: "Curiosity mission page (NASA)", url: "https://science.nasa.gov/mission/msl-curiosity/" }
  },
  {
    id: "opportunity", name: "Opportunity Rover", type: "rover", rover: "opportunity",
    lat: -1.9462, lon: -5.5266, view: 70, rank: 1, color: "#7dff7a",
    short: "The rover planned for 90 days that lasted almost 15 years.",
    body: [
      "Opportunity bounced to a landing inside airbags on January 25, 2004 (UTC), and rolled into a tiny crater. Right away it found tiny round “blueberries” made of the mineral hematite, which forms in water.",
      "It was designed to work for 90 Mars days. Instead, it drove for almost 15 years and more than a marathon’s distance! A planet-wide dust storm covered its solar panels in June 2018, and it never woke up."
    ],
    facts: [["Landed", "January 25, 2004"], ["Planned mission", "90 sols (Mars days)"], ["Distance driven", "45.16 km (28.06 mi)"], ["Last message", "June 10, 2018"], ["Power", "Solar panels"]],
    earth: "Opportunity drove farther than a marathon (42 km). For years it held the record for the longest drive on another world.",
    video: S("Opportunity rover"),
    link: { label: "Spirit & Opportunity mission page (NASA)", url: "https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/" }
  },
  {
    id: "spirit", name: "Spirit Rover", type: "rover", rover: "spirit",
    lat: -14.5718, lon: 175.4785, view: 40, rank: 1, color: "#ff9d3e",
    short: "Opportunity’s twin, which found signs of ancient hot springs.",
    body: [
      "Spirit landed in Gusev Crater on January 4, 2004, three weeks before its twin, Opportunity.",
      "It drove to the Columbia Hills, about 3 km away, and climbed to the top of Husband Hill. After one of its wheels stopped working, it dragged the broken wheel — and that wheel scraped up bright soil made of almost pure silica, a sign of ancient hot springs.",
      "In 2009, Spirit got stuck in soft sand at a spot called “Troy.” It sent its last message on March 22, 2010."
    ],
    facts: [["Landed", "January 4, 2004"], ["Planned mission", "90 sols"], ["Distance driven", "7.73 km (4.8 mi)"], ["Last message", "March 22, 2010"], ["Power", "Solar panels"]],
    earth: "Silica deposits like Spirit’s form around hot springs and geysers in places like Yellowstone.",
    video: S("Spirit rover Mars"),
    link: { label: "Spirit & Opportunity mission page (NASA)", url: "https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/" }
  },
  {
    id: "sojourner", name: "Mars Pathfinder & Sojourner", type: "rover",
    lat: 19.13, lon: -33.22, view: 120, rank: 1,
    short: "The very first rover to drive on Mars (1997).",
    body: [
      "Mars Pathfinder landed on July 4, 1997, bouncing across the ground inside giant airbags. It carried Sojourner, a rover about the size of a microwave oven.",
      "Sojourner was the first wheeled vehicle to explore another planet. It studied rocks near the lander and showed that a small, cheap rover could do real science. The mission lasted about three months."
    ],
    facts: [["Landed", "July 4, 1997"], ["Rover size", "About 65 cm long, 10.6 kg"], ["Location", "Mouth of Ares Vallis"], ["Last contact", "September 27, 1997"]],
    earth: "Sojourner weighed about as much as a large house cat — around 11 kg.",
    video: V("8-X8acD_r38", "Mars in a Minute: How Do You Land on Mars?", "NASA JPL", "about 1 min")
  },
  {
    id: "zhurong", name: "Zhurong Rover (China)", type: "rover",
    lat: 25.066, lon: 109.925, view: 80, rank: 1,
    short: "China’s first Mars rover, which explored Utopia Planitia.",
    body: [
      "China’s Tianwen-1 mission put an orbiter around Mars and landed the Zhurong rover on Utopia Planitia in May 2021. This made China the second country to land and drive a rover on Mars.",
      "Zhurong used ground-penetrating radar to look at layers under the surface. It went into hibernation for the Martian winter in May 2022 and did not wake back up, possibly because dust covered its solar panels."
    ],
    facts: [["Landed", "May 2021"], ["Country", "China (CNSA)"], ["Distance driven", "About 1.9 km"], ["Power", "Solar panels"]],
    earth: "Zhurong is named after a fire god in Chinese mythology. In Chinese, Mars is called the “fire star.”",
    video: S("Zhurong rover Mars", "")
  },

  /* ================================================================
     HELICOPTER
     ================================================================ */
  {
    id: "ingenuity", name: "Ingenuity Helicopter", type: "helicopter",
    lat: 18.4448, lon: 77.4509, view: 8, rank: 1, roverSol: { rover: "perseverance", sol: 58 },
    short: "The first aircraft to fly on another planet.",
    body: [
      "On April 19, 2021, Ingenuity made the first powered, controlled flight on another planet. It rose 3 m, hovered, and landed. Its first flight happened near here.",
      "Flying on Mars is hard because the air is only about 1% as thick as Earth’s. Ingenuity’s blades spun about 2,400 times per minute to get enough lift.",
      "It was supposed to make 5 test flights. It made 72! Its last flight was on January 18, 2024, when a rotor blade was damaged."
    ],
    facts: [["First flight", "April 19, 2021"], ["Weight", "1.8 kg (4 lb)"], ["Flights", "72"], ["Total distance flown", "About 17 km"], ["Highest flight", "24 m"]],
    earth: "A piece of fabric from the Wright brothers’ 1903 airplane is attached to Ingenuity. The airfield for its first flight was named “Wright Brothers Field.”",
    video: V("wMnOo2zcjXA", "First Video of NASA’s Ingenuity Mars Helicopter in Flight", "NASA JPL", "about 1 min"),
    link: { label: "Ingenuity mission page (NASA)", url: "https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/" }
  },

  /* ================================================================
     LANDERS
     ================================================================ */
  {
    id: "viking1", name: "Viking 1 Lander", type: "lander",
    lat: 22.27, lon: -47.95, view: 300, rank: 1,
    short: "The first U.S. spacecraft to land on Mars and send back photos.",
    body: [
      "Viking 1 landed on Chryse Planitia on July 20, 1976. Minutes later, it sent back the first clear photo ever taken on the surface of Mars.",
      "Viking 1 and its twin, Viking 2, tested soil for signs of life. The results were puzzling, and most scientists concluded that no life was found. Viking 1 kept working for more than six years."
    ],
    facts: [["Landed", "July 20, 1976"], ["Country", "USA (NASA)"], ["Worked until", "November 1982"], ["Power", "Nuclear generators"]],
    earth: "Viking 1 landed exactly 7 years after Apollo 11 landed on the Moon (July 20, 1969).",
    video: S("Viking lander Mars 1976")
  },
  {
    id: "viking2", name: "Viking 2 Lander", type: "lander",
    lat: 47.64, lon: 134.29, view: 300, rank: 2,
    short: "Viking 1’s twin, which photographed frost on Mars.",
    body: [
      "Viking 2 landed on Utopia Planitia on September 3, 1976. It photographed a thin layer of frost on the ground during Martian winter.",
      "It worked until April 1980."
    ],
    facts: [["Landed", "September 3, 1976"], ["Country", "USA (NASA)"], ["Worked until", "April 1980"], ["Famous photo", "Frost on the ground"]],
    earth: "Frost on Mars is partly water ice and partly frozen carbon dioxide.",
    video: S("Viking 2 lander")
  },
  {
    id: "mars3", name: "Mars 3 Lander (USSR)", type: "lander",
    lat: -45.0, lon: -158.0, view: 600, rank: 2,
    short: "The first spacecraft to make a soft landing on Mars (1971).",
    body: [
      "The Soviet Union’s Mars 3 lander touched down on December 2, 1971 — the first soft landing on Mars.",
      "It stopped sending signals after only about 20 seconds, possibly because of a giant dust storm raging at the time. Its exact landing spot is still not certain, so this pin is approximate."
    ],
    facts: [["Landed", "December 2, 1971"], ["Country", "Soviet Union (USSR)"], ["Worked for", "About 20 seconds"], ["Location", "Approximate"]],
    earth: "Mars 3 arrived during one of the biggest dust storms ever seen on Mars — it covered almost the whole planet.",
    video: S("Mars 3 Soviet lander 1971", "")
  },
  {
    id: "phoenix", name: "Phoenix Lander", type: "lander",
    lat: 68.22, lon: -125.75, view: 300, rank: 1,
    short: "The lander that dug up and touched water ice near the north pole.",
    body: [
      "Phoenix landed on the icy plains near Mars’ north pole on May 25, 2008. It used a robotic arm to dig trenches in the soil.",
      "It found bright chunks of water ice just a few centimeters under the surface. Days later, the chunks had disappeared — they had turned straight into gas, which proved they were ice. Phoenix also saw snow falling from clouds."
    ],
    facts: [["Landed", "May 25, 2008"], ["Country", "USA (NASA)"], ["Big find", "Water ice just under the soil"], ["Last signal", "November 2008"]],
    earth: "When ice turns directly into gas without melting first, it is called sublimation. Dry ice does this on Earth.",
    video: S("Phoenix Mars lander ice")
  },
  {
    id: "insight", name: "InSight Lander", type: "lander",
    lat: 4.502, lon: 135.623, view: 200, rank: 1,
    short: "The lander that listened to marsquakes to study Mars’ insides.",
    body: [
      "InSight landed on Elysium Planitia on November 26, 2018. It placed a very sensitive seismometer on the ground to feel marsquakes.",
      "It detected 1,319 marsquakes. Scientists used them like a planet-sized X-ray to measure Mars’ crust, mantle, and liquid metal core. Dust slowly covered its solar panels, and the mission ended in December 2022."
    ],
    facts: [["Landed", "November 26, 2018"], ["Marsquakes detected", "1,319"], ["Big find", "Size of Mars’ liquid core"], ["Mission ended", "December 2022"]],
    earth: "Scientists study Earth’s interior the same way — by tracking how earthquake waves travel through the planet.",
    video: V("b2P_CVOd5G0", "Mars in a Minute: What’s Inside Mars?", "NASA JPL", "about 1 min")
  },
  {
    id: "beagle2", name: "Beagle 2 Lander (UK)", type: "lander",
    lat: 11.5265, lon: 90.4295, view: 200, rank: 2,
    short: "A British lander that went silent — then was found 11 years later.",
    body: [
      "Beagle 2 rode to Mars on Europe’s Mars Express orbiter and landed on Isidis Planitia on December 25, 2003. It never sent a signal.",
      "In 2015, NASA’s Mars Reconnaissance Orbiter photographed it on the ground. The pictures showed it had landed safely, but some of its solar panels had not opened, which blocked its antenna."
    ],
    facts: [["Landed", "December 25, 2003"], ["Country", "United Kingdom"], ["Found", "2015, by NASA’s MRO orbiter"]],
    earth: "Beagle 2 was named after HMS Beagle, the ship that carried Charles Darwin around the world.",
    video: S("Beagle 2 found", ESA)
  },
  {
    id: "schiaparelli_edm", name: "Schiaparelli Lander (ESA)", type: "lander",
    lat: -2.05, lon: -6.21, view: 200, rank: 3,
    short: "A European test lander that crashed in 2016.",
    body: [
      "Schiaparelli was a test lander from the European Space Agency’s ExoMars mission. On October 19, 2016, a computer error made it think it had already landed. It released its parachute too early and crashed.",
      "Engineers learned important lessons from the failure. Landing on Mars is very hard — about half of all landing attempts have failed."
    ],
    facts: [["Arrived", "October 19, 2016"], ["Agency", "European Space Agency (ESA)"], ["Result", "Crashed"], ["Location", "Meridiani Planum"]],
    earth: "Engineers test parachutes and landing systems on Earth, but Mars’ thin air makes the real thing very different.",
    video: S("Schiaparelli lander", ESA)
  },

  /* ================================================================
     ORBITERS  (shown in space above Mars — paths are NOT to scale)
     ================================================================ */
  {
    id: "mariner9", name: "Mariner 9 (orbiter)", type: "orbiter",
    lat: 10, lon: -150, alt: 1800, view: 8500, rank: 2,
    short: "The first spacecraft to orbit another planet (1971).",
    body: [
      "Mariner 9 reached Mars on November 14, 1971 — the first spacecraft ever to orbit another planet. A huge dust storm hid the surface when it arrived.",
      "When the dust cleared, it discovered giant volcanoes, the huge canyon later named Valles Marineris after it, and dry riverbeds. It mapped most of the planet before it was switched off in 1972."
    ],
    facts: [["Arrived", "November 14, 1971"], ["Country", "USA (NASA)"], ["Discovered", "Olympus Mons, Valles Marineris, river channels"], ["Status", "Turned off (1972)"]],
    earth: "Before Mariner 9, some people thought Mars looked mostly like our Moon. It turned out to be much more interesting!",
    video: S("Mariner 9")
  },
  {
    id: "mgs", name: "Mars Global Surveyor (orbiter)", type: "orbiter",
    lat: -25, lon: -95, alt: 900, view: 7500, rank: 3,
    short: "The orbiter that made the first detailed height map of Mars.",
    body: [
      "Mars Global Surveyor orbited Mars from 1997 to 2006. Its laser altimeter, MOLA, bounced laser beams off the ground to measure the height of the land.",
      "That data made the first precise 3D map of Mars — the same data used for the colorful elevation map in this explorer. Its camera also spotted fresh gullies and the Eberswalde delta."
    ],
    facts: [["Arrived", "September 1997"], ["Country", "USA (NASA)"], ["Famous for", "MOLA elevation map"], ["Mission ended", "November 2006"]],
    earth: "Satellites use lasers (lidar) to map Earth’s forests and ice sheets in the same way.",
    video: S("Mars Global Surveyor")
  },
  {
    id: "odyssey", name: "2001 Mars Odyssey (orbiter)", type: "orbiter",
    lat: 30, lon: -30, alt: 1100, view: 7500, rank: 2,
    short: "NASA’s longest-working spacecraft at Mars.",
    body: [
      "Mars Odyssey arrived on October 24, 2001, and has worked longer than any other spacecraft at Mars. In 2002 it found that a lot of water ice is hidden just under the surface, especially near the poles.",
      "Its THEMIS camera sees in infrared (heat). Odyssey has also relayed messages between rovers and Earth for decades. By the mid-2020s it was running very low on fuel."
    ],
    facts: [["Arrived", "October 24, 2001"], ["Country", "USA (NASA)"], ["Big find", "Water ice under the surface"], ["Named after", "2001: A Space Odyssey"]],
    earth: "Infrared cameras on Earth can see heat — like firefighters use to find people in smoke.",
    video: S("Mars Odyssey")
  },
  {
    id: "marsexpress", name: "Mars Express (orbiter, ESA)", type: "orbiter",
    lat: -10, lon: 40, alt: 1500, view: 8000, rank: 2,
    short: "Europe’s long-lived orbiter with a 3D color camera and radar.",
    body: [
      "Mars Express, from the European Space Agency, arrived in December 2003. Its HRSC camera takes 3D, color pictures, which are used to make amazing flyover videos.",
      "Its radar instrument can see beneath the surface and has studied buried ice near the poles and in other places."
    ],
    facts: [["Arrived", "December 2003"], ["Agency", "European Space Agency (ESA)"], ["Camera", "HRSC (3D color)"], ["Carried", "Beagle 2 lander"]],
    earth: "Radar is also used on Earth to measure how thick the ice is in Antarctica.",
    video: S("Mars Express", ESA)
  },
  {
    id: "mro", name: "Mars Reconnaissance Orbiter", type: "orbiter",
    lat: 40, lon: 100, alt: 800, view: 7500, rank: 1,
    short: "The orbiter with the sharpest camera ever sent to another planet.",
    body: [
      "MRO arrived in March 2006. Its HiRISE camera can see objects about the size of a kitchen table from orbit. It has photographed rovers, landers, parachutes, and even avalanches happening on Mars.",
      "Its CTX camera photographed almost the entire planet. The sharp close-up pictures you see when you zoom far in on this map come from MRO’s cameras."
    ],
    facts: [["Arrived", "March 2006"], ["Country", "USA (NASA)"], ["Best camera", "HiRISE"], ["Real orbit height", "About 250–320 km"]],
    earth: "HiRISE is like a spy satellite for Mars. From about 300 km up, it can see things about 1 m across.",
    video: S("HiRISE Mars Reconnaissance Orbiter")
  },
  {
    id: "maven", name: "MAVEN (orbiter)", type: "orbiter",
    lat: -35, lon: 160, alt: 1600, view: 8000, rank: 2,
    short: "The orbiter that studied how Mars lost its air.",
    body: [
      "MAVEN arrived on September 21, 2014, to study Mars’ upper atmosphere. It found that the Sun’s solar wind has stripped away much of Mars’ air over billions of years.",
      "Losing its thick atmosphere is a big reason Mars changed from a warmer, wetter planet to the cold desert it is today. In December 2025, MAVEN stopped responding, and NASA engineers have been trying to reconnect with it."
    ],
    facts: [["Arrived", "September 21, 2014"], ["Country", "USA (NASA)"], ["Big find", "Solar wind strips away Mars’ air"], ["Status", "Contact lost December 2025"]],
    earth: "Earth’s magnetic field helps protect our atmosphere from the solar wind. Mars lost most of its magnetic field long ago.",
    video: S("MAVEN Mars atmosphere")
  },
  {
    id: "mom", name: "Mangalyaan / Mars Orbiter Mission (India)", type: "orbiter",
    lat: 20, lon: 60, alt: 2400, view: 9000, rank: 3,
    short: "India’s first Mars mission — a success on the first try.",
    body: [
      "India’s Mars Orbiter Mission, nicknamed Mangalyaan, reached Mars on September 24, 2014. India became the first Asian nation to reach Mars orbit, and the first country to do it on its first try.",
      "It cost about 74 million U.S. dollars — less than many Hollywood movies. It worked for about eight years, until 2022."
    ],
    facts: [["Arrived", "September 24, 2014"], ["Country", "India (ISRO)"], ["Cost", "About $74 million"], ["Worked until", "2022"]],
    earth: "“Mangal” means Mars in Hindi, and “yaan” means craft or vehicle.",
    video: S("Mangalyaan Mars Orbiter Mission ISRO", "")
  },
  {
    id: "tgo", name: "ExoMars Trace Gas Orbiter (ESA)", type: "orbiter",
    lat: -45, lon: -10, alt: 1000, view: 7500, rank: 3,
    short: "An orbiter sniffing Mars’ air for rare gases like methane.",
    body: [
      "The Trace Gas Orbiter arrived on October 19, 2016. It measures tiny amounts of gases in Mars’ atmosphere, including methane. On Earth, much of the methane in the air comes from living things.",
      "It also has a color camera and helps relay messages from rovers on the surface to Earth."
    ],
    facts: [["Arrived", "October 19, 2016"], ["Agencies", "ESA & Roscosmos (Russia)"], ["Job", "Measures rare gases"], ["Also", "Relays rover messages"]],
    earth: "Cows, wetlands, and termites make lots of methane on Earth. Volcanoes and some rocks can make it too.",
    video: S("Trace Gas Orbiter", ESA)
  },
  {
    id: "hope", name: "Hope Probe (UAE)", type: "orbiter",
    lat: 0, lon: -70, alt: 2800, view: 9500, rank: 3,
    short: "The United Arab Emirates’ weather satellite for Mars.",
    body: [
      "The Emirates Mars Mission’s Hope probe arrived on February 9, 2021. It was the first interplanetary mission from an Arab nation.",
      "Hope flies in a very high orbit so it can watch the whole planet at different times of day — like a weather satellite for Mars."
    ],
    facts: [["Arrived", "February 9, 2021"], ["Country", "United Arab Emirates"], ["Job", "Studies Mars weather and atmosphere"]],
    earth: "Weather satellites watching Earth from high above work in a very similar way.",
    video: S("Hope probe Emirates Mars Mission")
  },
  {
    id: "tianwen1", name: "Tianwen-1 Orbiter (China)", type: "orbiter",
    lat: 45, lon: 140, alt: 1300, view: 8000, rank: 3,
    short: "China’s orbiter, which delivered the Zhurong rover.",
    body: [
      "Tianwen-1 arrived at Mars on February 10, 2021. In May 2021, it released a lander carrying the Zhurong rover.",
      "The orbiter has photographed the entire planet and relays data from the surface. “Tianwen” means “Questions to Heaven,” from an ancient Chinese poem."
    ],
    facts: [["Arrived", "February 10, 2021"], ["Country", "China (CNSA)"], ["Carried", "Zhurong rover"]],
    earth: "China became the first country to send an orbiter, lander, and rover to Mars all on its first mission.",
    video: S("Tianwen-1 Mars orbiter", "")
  },

  /* ================================================================
     MOONS  (orbits shown at real scale)
     ================================================================ */
  {
    id: "phobos", name: "Phobos (moon)", type: "moon",
    lat: 0, lon: -100, alt: 5989, view: 14000, rank: 1, moon: true,
    short: "Mars’ bigger moon — slowly spiraling toward the planet.",
    body: [
      "Phobos is a lumpy, potato-shaped moon. It orbits very close to Mars — so close that it goes around three times every Martian day.",
      "Phobos is slowly getting closer to Mars, about 2 meters every 100 years. In tens of millions of years, it will either crash into Mars or break apart and form a ring."
    ],
    facts: [["Size", "About 27 × 22 × 18 km"], ["Distance above Mars", "About 6,000 km"], ["One orbit takes", "7 hours, 39 minutes"], ["Discovered", "1877 by Asaph Hall"]],
    earth: "Our Moon is about 3,475 km wide. Phobos would fit inside a big city like Los Angeles.",
    video: S("Phobos moon Mars")
  },
  {
    id: "deimos", name: "Deimos (moon)", type: "moon",
    lat: 0, lon: 60, alt: 20070, view: 30000, rank: 2, moon: true,
    short: "Mars’ smaller, farther moon.",
    body: [
      "Deimos is Mars’ smaller moon. It is about 12 km across and has a smooth surface covered in dust.",
      "Both of Mars’ moons may be captured asteroids, or they may have formed from rubble thrown up by a giant impact on Mars. Scientists are still debating."
    ],
    facts: [["Size", "About 15 × 12 × 11 km"], ["Distance above Mars", "About 20,000 km"], ["One orbit takes", "About 30 hours"], ["Discovered", "1877 by Asaph Hall"]],
    earth: "In Greek myths, Phobos (fear) and Deimos (dread) were the sons of Ares, the god of war. Mars is the Roman name for Ares.",
    video: S("Deimos moon Mars")
  },

  /* ================================================================
     POSSIBLE FUTURE HUMAN LANDING SITES
     No site has been chosen yet. These are places scientists and
     engineers have studied as candidates.
     ================================================================ */
  {
    id: "arcadia", name: "Arcadia Planitia", type: "future",
    lat: 39.8, lon: -157.9, view: 900, rank: 1,
    short: "Flat northern plains with water ice hidden just under the ground.",
    body: [
      "No one has picked the first landing site for astronauts yet. But scientists from NASA and engineers from the company SpaceX have studied spots here as possible landing sites for SpaceX’s Starship.",
      "Why here? Radar and fresh craters show that lots of water ice is buried just under the surface. Astronauts could dig it up and turn it into drinking water, oxygen to breathe, and rocket fuel for the trip home.",
      "The ground is smooth and flat with few big rocks, which makes landing safer. It is also low — about 4 km below Mars’ average surface level — so there is more air above it to help slow a spaceship down."
    ],
    facts: [["Location", "Northern plains, about 40° north"], ["Height", "About 4 km below average"], ["Key resource", "Buried water ice"], ["Studied for", "SpaceX Starship (with NASA scientists)"]],
    earth: "Ice buried under soil is like the permafrost found in Alaska and northern Canada.",
    video: S("humans to Mars landing site"),
    link: { label: "HiRISE photo of a possible Starship landing site (University of Arizona)", url: "https://hirise.lpl.arizona.edu/ESP_060706_2195" }
  },
  {
    id: "phlegra", name: "Phlegra Montes", type: "future",
    lat: 35.23, lon: 163.95, view: 900, rank: 2,
    short: "Hills wrapped in hidden glaciers — a possible human landing area.",
    body: [
      "Phlegra Montes is a chain of hills on the northern plains. Around the hills are “debris aprons” — glaciers of water ice covered by a protective blanket of dust and rocks.",
      "Scientists working with SpaceX listed sites near Phlegra Montes as possible landing spots. It is a bit closer to the equator than other icy sites, which means it is warmer and gets more sunlight."
    ],
    facts: [["Location", "About 35° north"], ["Height", "About 3 km below average"], ["Key resource", "Ice-rich glaciers under debris"], ["Status", "Candidate only — not chosen"]],
    earth: "Some glaciers in Antarctica are also hidden under rocks and dust, which protects the ice from melting away.",
    video: S("humans to Mars landing site"),
    link: { label: "Scientists’ report on possible Starship landing sites (advanced reading)", url: "https://www.hou.usra.edu/meetings/lpsc2021/pdf/2420.pdf" }
  },
  {
    id: "erebus", name: "Erebus Montes", type: "future",
    lat: 39.89, lon: -167.97, view: 900, rank: 2,
    short: "Low mountains where radar found strong signs of shallow ice.",
    body: [
      "Erebus Montes is a group of small mountains next to Arcadia Planitia. Scientists studying possible SpaceX Starship landing sites found that radar showed especially strong signs of ice close to the surface at one spot here.",
      "Choosing a landing site is a balancing act: the ground must be safe to land on, have water ice nearby, and be low enough for the thin air to help slow a spaceship down."
    ],
    facts: [["Location", "About 40° north"], ["Height", "About 4 km below average"], ["Key resource", "Shallow buried ice"], ["Status", "Candidate only — not chosen"]],
    earth: "On Earth, explorers in Antarctica melt ice and snow for water — future Mars explorers may do the same.",
    video: S("humans to Mars landing site"),
    link: { label: "Scientists’ report on possible Starship landing sites (advanced reading)", url: "https://www.hou.usra.edu/meetings/lpsc2021/pdf/2420.pdf" }
  },
  {
    id: "meridiani", name: "Meridiani Planum", type: "future",
    lat: 0.2, lon: -2.5, view: 1200, rank: 2,
    short: "Flat equator plains that NASA scientists proposed as a place for astronauts to explore.",
    body: [
      "In 2015, NASA held a workshop where scientists proposed more than 40 possible “exploration zones” for the first astronauts. Meridiani Planum was one of them.",
      "It is close to the equator, so it is warmer and sunnier than the north. It is flat, and the Opportunity rover already explored it for years — so scientists know a lot about its rocks, which formed in water long ago."
    ],
    facts: [["Location", "Near the equator"], ["Proposed at", "NASA workshop, 2015"], ["Bonus", "Explored by the Opportunity rover"], ["Status", "Candidate only — not chosen"]],
    earth: "The hematite “blueberries” Opportunity found here are similar to iron-rich stones found in Utah’s deserts.",
    video: S("humans to Mars landing site"),
    link: { label: "Where should humans land on Mars? (The Planetary Society)", url: "https://www.planetary.org/articles/20151027-humans-mars-workshop" }
  }
  ];

  /* ================================================================
     ROVER PATH DOTS
     For Perseverance and Curiosity, dots are placed on the REAL path
     using the sol (Mars day) number. For Spirit and Opportunity, the
     locations are approximate (lat/lon given).
     kind: "photo" (camera) or "find" (star)
     ================================================================ */
  window.ROVER_STOPS = {
    perseverance: [
      { kind: "photo", sol: 13, name: "Landing site: first panorama", date: "February 2021",
        text: "Perseverance touched down here in Jezero Crater. A few days later, its Mastcam-Z cameras took this 360-degree panorama of its new home.",
        pia: "PIA24264", url: "https://photojournal.jpl.nasa.gov/catalog/PIA24264" },
      { kind: "find", sol: 58, name: "First flight on another planet", date: "April 19, 2021 (sol 58)",
        text: "Nearby, the Ingenuity helicopter lifted off and hovered — the first powered, controlled flight on another planet. Perseverance filmed it from a safe distance.",
        pia: "PIA24550", url: "https://www.jpl.nasa.gov/images/pia24550-ingenuitys-first-flight-recorded-by-mastcam-z/" },
      { kind: "find", sol: 60, name: "Making oxygen on Mars", date: "April 20, 2021 (sol 60)",
        text: "MOXIE, a toaster-sized device inside the rover, turned carbon dioxide from Mars’ air into oxygen for the first time. Future astronauts could use this to make air to breathe and fuel for rockets.",
        url: "https://www.jpl.nasa.gov/news/nasas-perseverance-mars-rover-extracts-first-oxygen-from-red-planet/" },
      { kind: "photo", sol: 190, name: "First rock core: “Rochette”", date: "September 2021",
        text: "Perseverance drilled its first rock sample here and sealed it in a tube. It also took a selfie next to the rock. The rock turned out to be volcanic, and had been changed by water.",
        pia: "PIA24836", url: "https://www.jpl.nasa.gov/images/pia24836-perseverances-selfie-at-rochette/" },
      { kind: "find", sol: 503, name: "Organic molecules in ancient lake mud", date: "July 2022",
        text: "On the delta, Perseverance sampled a rock called “Wildcat Ridge.” It formed from mud and sand at the bottom of the ancient lake, and contains organic molecules — carbon-based chemicals. Organic molecules can be made by life, but also without life.",
        pia: "PIA24928", url: "https://www.jpl.nasa.gov/images/pia24928-sample-collection-and-rock-analysis-at-wildcat-ridge/" },
      { kind: "find", sol: 1215, name: "“Leopard spots” — a possible sign of life", date: "July 2024",
        text: "Perseverance found a rock nicknamed “Cheyava Falls” with tiny spots like a leopard’s. In 2025, scientists reported that its chemistry is a “potential biosignature” — a possible sign of ancient microbes. It is NOT proof of life: non-living chemistry might also explain it. The sample, “Sapphire Canyon,” is sealed in a tube.",
        pia: "PIA26368", url: "https://photojournal.jpl.nasa.gov/catalog/PIA26368" },
      { kind: "photo", sol: 1355, name: "On top of the crater rim", date: "December 2024",
        text: "After a long, steep climb, Perseverance reached the top of Jezero Crater’s rim at a spot called “Lookout Hill” and looked back over the crater.",
        pia: "PIA26511", url: "https://www.jpl.nasa.gov/images/pia26511-perseverances-view-from-lookout-hill/" }
    ],
    curiosity: [
      { kind: "photo", sol: 3, name: "Bradbury Landing", date: "August 6, 2012",
        text: "Curiosity was lowered onto this spot by a rocket-powered sky crane. The landing site is named after science-fiction author Ray Bradbury." },
      { kind: "find", sol: 39, name: "An ancient streambed", date: "September 2012",
        text: "Curiosity found rocks packed with rounded pebbles. Pebbles only get this round when water tumbles them along a stream. Scientists estimated the water was about ankle- to hip-deep.",
        pia: "PIA16156", url: "https://www.jpl.nasa.gov/images/pia16156-remnants-of-ancient-streambed-on-mars/" },
      { kind: "find", sol: 182, name: "A lake that could have supported life", date: "2013",
        text: "At Yellowknife Bay, Curiosity drilled into mudstone for the first time. The rock showed an ancient lake with fresh water and the chemical ingredients microbes need. In 2025, scientists also reported the largest organic molecules found on Mars in a sample from this area.",
        pia: "PIA17595", url: "https://www.jpl.nasa.gov/images/pia17595-view-of-yellowknife-bay-formation-with-drilling-sites/" },
      { kind: "photo", sol: 746, name: "Reaching Mount Sharp", date: "September 2014",
        text: "Curiosity reached the base of Mount Sharp at an area called Pahrump Hills and began studying its lowest layers. Nearby it took a self-portrait at the “Mojave” drill site.",
        url: "https://science.nasa.gov/photojournal/curiosity-self-portrait-at-mojave-site-on-mount-sharp/" },
      { kind: "photo", sol: 1065, name: "Low-angle selfie at “Buckskin”", date: "August 2015",
        text: "Curiosity took this selfie with the camera on its robotic arm while drilling a rock called “Buckskin.” The arm does not show up in the final picture because many photos were stitched together.",
        pia: "PIA19807", url: "https://www.jpl.nasa.gov/images/pia19807-curiosity-low-angle-self-portrait-at-buckskin-drilling-site-on-mount-sharp/" },
      { kind: "find", sol: 1831, name: "Vera Rubin Ridge", date: "2017–2018",
        text: "Curiosity climbed a ridge rich in hematite, an iron mineral that often forms with water. The ridge is hard and resisted erosion, so it stands up above the land around it." },
      { kind: "find", sol: 4199, name: "Yellow crystals of pure sulfur", date: "May 2024",
        text: "Curiosity drove over a rock and cracked it open, revealing yellow crystals of pure sulfur — something never seen on Mars before.",
        pia: "PIA26307", url: "https://www.jpl.nasa.gov/images/pia26307-curiosity-captures-close-up-of-sulfur-crystals/" },
      { kind: "photo", sol: 4557, name: "The boxwork region", date: "2025",
        text: "Curiosity explored a maze of low ridges called “boxwork.” The ridges formed when groundwater flowing through cracks left minerals behind, hardening the rock. This shows water was underground here even as the surface dried out.",
        pia: "PIA26559", url: "https://photojournal.jpl.nasa.gov/catalog/PIA26559" }
    ],
    opportunity: [
      { kind: "find", lat: -1.9462, lon: -5.5266, name: "Eagle Crater: “blueberries”", date: "2004",
        text: "Opportunity landed inside a small crater and found tiny round “blueberries” made of hematite. They formed when water soaked through the rock — the first strong proof from a rover that Mars was once wet.",
        pia: "PIA05634", url: "https://photojournal.jpl.nasa.gov/catalog/PIA05634" },
      { kind: "photo", lat: -1.9465, lon: -5.5137, name: "Endurance Crater: Burns Cliff", date: "2004",
        text: "Opportunity drove down into Endurance Crater and studied the layered rocks of Burns Cliff, which showed signs of ancient water. In January 2005, near here, it also found the first meteorite ever identified on another planet (“Heat Shield Rock”).",
        pia: "PIA05869", url: "https://www.jpl.nasa.gov/images/pia05869-burns-cliff-beckons/" },
      { kind: "photo", lat: -2.0435, lon: -5.4975, name: "Victoria Crater: Cape Verde", date: "2006–2008",
        text: "Opportunity spent almost two years exploring Victoria Crater. This panorama shows the cliff called “Cape Verde,” with layers of ancient sand dunes.",
        pia: "PIA09104", url: "https://photojournal.jpl.nasa.gov/catalog/PIA09104" },
      { kind: "find", lat: -2.20, lon: -5.388, name: "Cape York: gypsum vein", date: "2011",
        text: "On the rim of Endeavour Crater, Opportunity found a bright vein of gypsum named “Homestake.” Gypsum forms when water flows through cracks in rock." },
      { kind: "photo", lat: -2.335, lon: -5.348, name: "Perseverance Valley: the final stop", date: "June 2018",
        text: "Opportunity was exploring a valley on Endeavour’s rim when a planet-wide dust storm blocked the Sun. Its last message to Earth was on June 10, 2018. This map shows its whole journey.",
        pia: "PIA23178", url: "https://www.jpl.nasa.gov/images/pia23178-opportunitys-final-traverse-map/" }
    ],
    spirit: [
      { kind: "photo", lat: -14.5718, lon: 175.4785, name: "Landing site", date: "January 4, 2004",
        text: "Spirit landed here on a plain covered with volcanic rock. The landing site was named Columbia Memorial Station to honor the astronauts of Space Shuttle Columbia." },
      { kind: "find", lat: -14.586, lon: 175.516, name: "Husband Hill summit (approx.)", date: "August 2005",
        text: "Spirit climbed to the top of Husband Hill, about 100 m above the plains. From the top it could see far across Gusev Crater." },
      { kind: "find", lat: -14.60, lon: 175.526, name: "Home Plate: silica (approx.)", date: "2007",
        text: "Dragging a broken wheel, Spirit scraped up bright soil that was about 90% silica. On Earth, deposits like this form at hot springs and steam vents — places where microbes often live.",
        pia: "PIA09403", url: "https://photojournal.jpl.nasa.gov/catalog/PIA09403" },
      { kind: "photo", lat: -14.6015, lon: 175.524, name: "“Troy”: stuck in the sand", date: "2009–2010",
        text: "In 2009, Spirit’s wheels broke through a crust into soft sand and it got stuck. It worked as a stationary science station until its last message on March 22, 2010." }
    ]
  };

  /* Approximate routes for the older rovers (straight lines between main stops).
     The real paths wiggled around sand dunes and craters. */
  window.APPROX_ROUTES = {
    opportunity: [[-5.5266, -1.9462], [-5.5137, -1.9465], [-5.4975, -2.0435], [-5.388, -2.20], [-5.398, -2.30], [-5.348, -2.335]],
    spirit: [[175.4785, -14.5718], [175.4808, -14.5700], [175.5050, -14.5800], [175.516, -14.586], [175.526, -14.60], [175.524, -14.6015]]
  };

  /* ================================================================
     GUIDED TOURS — lists of place ids, shown in order
     ================================================================ */
  window.MARS_TOURS = [
    /* Photo tour: each stop shows its own special photo and a short story.
       photos: placeId -> ["NASA_ID", "size", "Caption"]  (same format as js/data/photos.js)
       stories: placeId -> why this photo is special */
    { id: "photos", name: "Mars’ Most Beautiful Photos", icon: "📸",
      blurb: "Some of the most admired pictures ever taken by rovers and orbiters. Tap any photo to see it full size.",
      stops: ["valles", "gale", "sharp", "dustdevil", "avalanche", "russell", "galle", "spiders", "southcap", "victoria", "opportunity", "phobos"],
      photos: {
        gale:        ["PIA19400", "orig", "Sunset in Gale Crater, photographed by Curiosity (April 15, 2015)"],
        sharp:       ["PIA21042", "orig", "Tilted buttes and layered rock at Murray Buttes, photographed by Curiosity (2016)"],
        southcap:    ["PIA22895", "medium", "“Swiss cheese” pits in the dry ice of the south polar cap, photographed by HiRISE"],
        victoria:    ["PIA08813", "medium", "Victoria Crater from above, photographed by HiRISE in 2006, soon after Opportunity arrived at its rim"],
        opportunity: ["PIA22074", "medium", "Opportunity’s own wheel tracks winding down Perseverance Valley, on the rim of Endeavour Crater (2017)"],
        phobos:      ["PIA10368", "medium", "Phobos in color, photographed by HiRISE from 6,800 km away (2008)"]
      },
      stories: {
        valles: "One of the most famous portraits of Mars ever made. Scientists stitched together 102 photos from the Viking 1 orbiter to show Valles Marineris slashing across the planet like a giant scar.",
        gale: "On Mars, sunsets are blue! Fine dust in the air lets blue light pass straight through toward your eyes near the Sun, while other colors get scattered away. On Earth it’s the opposite — our sunsets glow orange and red.",
        sharp: "Curiosity took this picture of the Murray Buttes as it said goodbye to them in 2016. These flat-topped hills are made of sandstone that was once sand dunes — the slanted lines are the dunes’ old slopes, frozen in rock.",
        dustdevil: "This is one of the most famous orbiter photos ever taken. The dust devil is only about 30 m wide, but it towers more than 800 m high — the late-afternoon Sun stretches its shadow across the plain like a serpent.",
        avalanche: "Pure luck! HiRISE photographs only a tiny part of Mars at a time, yet in 2008 it caught at least four avalanches falling down these 700-meter ice cliffs at the very same moment.",
        russell: "Each spring, the frost on these giant dunes turns back into gas, leaving dark streaks and spots. The result looks more like an abstract painting than a planet.",
        galle: "Mars is smiling at you! This 230 km crater has hills and spots in just the right places to look like a happy face. Here, frost on its slopes makes the smile stand out in early spring.",
        spiders: "These “spiders” are carved by jets of gas bursting out from under the ice each spring. About 10,000 volunteers helped NASA choose spots like this one to photograph.",
        southcap: "The south polar cap is covered with dry ice full of round pits, so it looks like Swiss cheese. The pits slowly grow bigger as the dry ice turns into gas.",
        victoria: "HiRISE took this picture in 2006, while Opportunity was parked on the rim — the camera is sharp enough that scientists could spot the rover in the full-size version. The scalloped edge of bays and cliffs formed as the rim slowly crumbled and wind wore it away, and sand dunes fill the crater floor.",
        opportunity: "Look for the rover’s own wheel tracks running between the bright patches of rock. This was one of Opportunity’s last big panoramas. Less than a year later, a planet-wide dust storm blocked the sunlight its solar panels needed, and the rover fell silent in June 2018, after more than 14 years of exploring.",
        phobos: "A close-up of Mars’ biggest moon, in color. The giant crater near the lower right is Stickney Crater, about 9 km wide. The long grooves and chains of small craters may have been made by debris blasted off Mars when space rocks hit it."
      }
    },
    { id: "water", name: "Canyons, Channels & Craters", icon: "💧",
      blurb: "Compare Mars’ landforms with Earth’s and look for clues of ancient water.",
      stops: ["valles", "noctis", "kasei", "ares", "nanedi", "warrego", "maadim", "eberswalde", "jezero", "gale", "hellas", "victoria", "korolev"] },
    { id: "volcanoes", name: "Giant Volcanoes", icon: "🌋",
      blurb: "Visit the biggest volcanoes in the solar system.",
      stops: ["olympus", "ascraeus", "pavonis", "arsia", "alba", "elysium", "syrtis", "cerberus"] },
    { id: "robots", name: "Robot Road Trip", icon: "🤖",
      blurb: "Every Mars landing site and rover, in the order they arrived.",
      stops: ["mars3", "viking1", "viking2", "sojourner", "beagle2", "spirit", "opportunity", "phoenix", "curiosity", "schiaparelli_edm", "insight", "perseverance", "ingenuity", "zhurong"] },
    { id: "ice", name: "Ice on Mars", icon: "❄️",
      blurb: "Where is Mars’ water hiding today?",
      stops: ["northcap", "chasmaboreale", "korolev", "phoenix", "utopia", "southcap", "medusae"] },
    { id: "humans", name: "Where Will Humans Land?", icon: "🧑‍🚀",
      blurb: "Visit places scientists have studied for the first astronauts on Mars.",
      stops: ["arcadia", "erebus", "phlegra", "meridiani"] }

  ];
})();
