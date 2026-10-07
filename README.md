# Mars Explorer

A 3D globe of Mars that you can spin. It's made for 7th-grade science on school iPads.

- **Real NASA pictures that sharpen as you zoom.** From far away you see a full-color map from the Viking orbiters (about 230 m per pixel). As you zoom in, close-up photos from Mars Reconnaissance Orbiter's CTX camera appear (about 5 m per pixel, almost everywhere on Mars). At famous places with HiRISE coverage, you can see details as small as about 25–50 cm.
- **69 pins with info cards.** There are 39 landforms (volcanoes, canyons, river channels, craters, basins, ice), 14 rovers, landers, and a helicopter, 10 orbiters, both moons, and 4 possible future human landing sites. Every landform card has a *Compare it with Earth* section.
- **Photos on the cards.** 63 cards open with a real NASA photo (or a labeled artist's drawing). Tap the photo to see it full size on NASA's website, or tap **See more photos** to browse NASA's image library.
- **Layers.** Turn each kind of landform on or off (volcanoes, canyons, river channels, craters, basins, ice, and more). Turn on just one kind to see every example on Mars.
- **Rover paths.** Zoom in on Perseverance or Curiosity to see their real driving routes, based on NASA's published rover positions. Camera dots open real NASA photos taken at those spots. Star dots explain big discoveries. Spirit and Opportunity have approximate routes through their main stops.
- **5 guided tours.** *Canyons, Channels & Craters*, *Giant Volcanoes*, *Robot Road Trip*, *Ice on Mars*, and *Where Will Humans Land?*
- **Photos / Heights switch** on the bottom bar. It flips between real pictures and a height-color map made from the Mars Global Surveyor laser altimeter.
- **No ads, no logins, no tracking.** It's all plain files you own.

---

## Put it on GitHub Pages (about 10 minutes, no coding)

This folder is small: about 20 files. The big 3D globe engine (CesiumJS) loads from a free public server called a CDN, so you **don't** need to upload a `lib` folder.

1. Sign in at **github.com** (or create a free account).
2. Click **+** (top right) → **New repository**. Name it `mars-explorer`. Choose **Public**, then click **Create repository**.
3. On the next page, click the link that says **uploading an existing file**.
4. Unzip `mars-explorer.zip` on your computer and open the `mars-explorer` folder. Select **everything inside it** (`index.html`, `README.md`, and the `assets`, `css`, and `js` folders) and drag it all onto the GitHub page. Chrome works best for dragging folders.
   - Don't drag the `mars-explorer` folder itself, only what's inside it. `index.html` must end up at the top level of the repository.
5. Wait until every file shows in the list, then click the green **Commit changes** button.
6. Go to **Settings** (tab at the top of the repository) → **Pages** (left menu). Under *Branch*, pick **main** and **/ (root)**, then click **Save**.
7. Wait 1–2 minutes and refresh the Pages screen. A box will show your link, something like `https://YOUR-USERNAME.github.io/mars-explorer/`.

**Check it worked:** open the link. You should see the spinning Mars globe. If you see a page that only shows the README text, `index.html` probably landed inside a subfolder. Upload the files again from *inside* the `mars-explorer` folder.

**Optional, for the future:** if your school ever blocks the CDN sites (`cdn.jsdelivr.net` and `unpkg.com`), the explorer will look for its own copy of CesiumJS in a folder named `lib/cesium`. Ask Claude for the "full version with the lib folder" and upload it with the free **GitHub Desktop** app, which has no file-count limit.

**On the iPads:** Open the link in Safari, tap the **Share** button → **Add to Home Screen**. The explorer then opens full-screen like an app.

---

## Customizing

| What you want to change | Where |
|---|---|
| Card text, facts, Earth comparisons, video links | `js/data/places.js`. Each place is clearly labeled. |
| The big photo on each card | `js/data/photos.js`. Swap in any picture ID from images.nasa.gov. |
| Rover photo and discovery dots | `js/data/places.js`, the section called `ROVER_STOPS` |
| Guided tours (which stops, in what order) | `js/data/places.js`, the section called `MARS_TOURS` |
| Title, starting view, map picture sources | `js/config.js` |
| Colors and fonts | `css/app.css` |

You can edit files right on GitHub: open the file → pencil icon → make your change → **Commit changes**. The site updates in about a minute.

**To add a new place:** copy any existing place block in `places.js`, give it a new `id`, and change its name, latitude/longitude, and text. Latitude is north (+) or south (−). Longitude is east (+) or west (−). The Mars Trek site (trek.nasa.gov/mars) shows coordinates when you hover over the map.

**To use your own favorite video:** replace the `video: S(...)` line with
`video: V("VIDEO_ID", "Video title", "Channel", "2:30")`. The VIDEO_ID is the part after `watch?v=` in a YouTube link.

---

## Things to know

- **Internet needed.** The globe engine loads from `cdn.jsdelivr.net` (backup: `unpkg.com`).
- **Internet needed.** The globe engine loads from `cdn.jsdelivr.net` (backup: `unpkg.com`). Most school networks allow these.
- **Internet needed for the sharp pictures.** The detailed map pictures stream from NASA's Mars Trek service and from Esri's public Mars map service (which hosts the CTX and HiRISE mosaics). If a school filter blocks `trek.nasa.gov` or `astro.arcgis.com`, the explorer still works using the low-detail map saved in `assets/` and shows a notice. Ask your tech team to allow those two sites.
- **YouTube.** Video buttons open YouTube in a new tab. If YouTube is blocked on student iPads, the buttons won't work, but everything else will.
- **Close-up pictures are tinted.** CTX and HiRISE are black-and-white cameras. The explorer tints their pictures to match Mars' colors. The About panel tells students this.
- **Orbiters are drawn far from Mars on purpose.** Real orbits are mostly 250–400 km up, which would be too close to see. Phobos and Deimos are shown at their real distances.
- **Rover data is a 2026 snapshot.** Perseverance's position data goes to sol 1980 and Curiosity's to sol 5021.

### Updating rover paths (optional, once a year)
`js/data/traverses.js` was built from NASA's rover-position files:
- Perseverance: https://mars.nasa.gov/mmgis-maps/M20/Layers/json/M20_waypoints.json
- Curiosity: https://mars.nasa.gov/mmgis-maps/MSL/Layers/json/MSL_waypoints.json

Each point is stored as `[longitude, latitude, sol]`. To update, ask a tech-savvy colleague (or Claude) to rebuild the file from the newest versions of those two links.

---

## Video links: please preview before class

Videos marked *Direct video* go straight to one specific video. The others open a search of an official channel (NASA JPL or the European Space Agency) for that topic, so students see official videos. A few non-NASA missions (China's, India's, and the USSR's) search all of YouTube instead. YouTube search results change over time, so take a quick look first.

| Card | What the button opens | Link |
|---|---|---|
| Olympus Mons | Search of @NASAJPL for "Olympus Mons" | https://www.youtube.com/@NASAJPL/search?query=Olympus%20Mons |
| Ascraeus Mons | Search of @NASAJPL for "Tharsis volcanoes Mars" | https://www.youtube.com/@NASAJPL/search?query=Tharsis%20volcanoes%20Mars |
| Pavonis Mons | Search of @NASAJPL for "Mars lava tubes caves" | https://www.youtube.com/@NASAJPL/search?query=Mars%20lava%20tubes%20caves |
| Arsia Mons | Search of @NASAJPL for "Arsia Mons" | https://www.youtube.com/@NASAJPL/search?query=Arsia%20Mons |
| Alba Mons | Search of @NASAJPL for "Alba Mons" | https://www.youtube.com/@NASAJPL/search?query=Alba%20Mons |
| Elysium Mons | Search of @NASAJPL for "Elysium Mars volcano" | https://www.youtube.com/@NASAJPL/search?query=Elysium%20Mars%20volcano |
| Valles Marineris | Search of @NASAJPL for "Valles Marineris" | https://www.youtube.com/@NASAJPL/search?query=Valles%20Marineris |
| Noctis Labyrinthus | Search of @EuropeanSpaceAgency for "Noctis Labyrinthus" | https://www.youtube.com/@EuropeanSpaceAgency/search?query=Noctis%20Labyrinthus |
| Kasei Valles | Search of @EuropeanSpaceAgency for "Kasei Valles" | https://www.youtube.com/@EuropeanSpaceAgency/search?query=Kasei%20Valles |
| Ares Vallis | Search of @NASAJPL for "Mars Pathfinder Ares Vallis" | https://www.youtube.com/@NASAJPL/search?query=Mars%20Pathfinder%20Ares%20Vallis |
| Nanedi Valles | Search of @NASAJPL for "water on Mars river valleys" | https://www.youtube.com/@NASAJPL/search?query=water%20on%20Mars%20river%20valleys |
| Ma’adim Vallis | Search of @NASAJPL for "Spirit rover Gusev crater" | https://www.youtube.com/@NASAJPL/search?query=Spirit%20rover%20Gusev%20crater |
| Warrego Valles | Search of @NASAJPL for "Mars valley networks rain" | https://www.youtube.com/@NASAJPL/search?query=Mars%20valley%20networks%20rain |
| Mawrth Vallis | Search of @NASAJPL for "Mars clay minerals water" | https://www.youtube.com/@NASAJPL/search?query=Mars%20clay%20minerals%20water |
| Jezero Crater | Search of @NASAJPL for "Jezero crater" | https://www.youtube.com/@NASAJPL/search?query=Jezero%20crater |
| Gale Crater | Search of @NASAJPL for "Gale crater Curiosity" | https://www.youtube.com/@NASAJPL/search?query=Gale%20crater%20Curiosity |
| Mount Sharp (Aeolis Mons) | Search of @NASAJPL for "Curiosity Mount Sharp layers" | https://www.youtube.com/@NASAJPL/search?query=Curiosity%20Mount%20Sharp%20layers |
| Gusev Crater | Search of @NASAJPL for "Spirit rover" | https://www.youtube.com/@NASAJPL/search?query=Spirit%20rover |
| Endeavour Crater | Search of @NASAJPL for "Opportunity rover Endeavour crater" | https://www.youtube.com/@NASAJPL/search?query=Opportunity%20rover%20Endeavour%20crater |
| Victoria Crater | Search of @NASAJPL for "Opportunity Victoria crater" | https://www.youtube.com/@NASAJPL/search?query=Opportunity%20Victoria%20crater |
| Eberswalde Delta | Search of @NASAJPL for "Mars river delta" | https://www.youtube.com/@NASAJPL/search?query=Mars%20river%20delta |
| Huygens Crater | Search of @NASAJPL for "impact craters Mars" | https://www.youtube.com/@NASAJPL/search?query=impact%20craters%20Mars |
| Schiaparelli Crater | Search of @EuropeanSpaceAgency for "Schiaparelli crater Mars" | https://www.youtube.com/@EuropeanSpaceAgency/search?query=Schiaparelli%20crater%20Mars |
| Lyot Crater | Search of @NASAJPL for "Mars craters ice" | https://www.youtube.com/@NASAJPL/search?query=Mars%20craters%20ice |
| Korolev Crater | Search of @EuropeanSpaceAgency for "Korolev crater" | https://www.youtube.com/@EuropeanSpaceAgency/search?query=Korolev%20crater |
| Russell Crater Dunes | Search of @NASAJPL for "Mars sand dunes" | https://www.youtube.com/@NASAJPL/search?query=Mars%20sand%20dunes |
| Hellas Basin | Search of @NASAJPL for "Hellas basin Mars" | https://www.youtube.com/@NASAJPL/search?query=Hellas%20basin%20Mars |
| Argyre Basin | Search of @NASAJPL for "Argyre Mars" | https://www.youtube.com/@NASAJPL/search?query=Argyre%20Mars |
| Utopia Planitia | Search of @NASAJPL for "Utopia Planitia ice" | https://www.youtube.com/@NASAJPL/search?query=Utopia%20Planitia%20ice |
| Isidis Planitia | Search of @NASAJPL for "Isidis Planitia" | https://www.youtube.com/@NASAJPL/search?query=Isidis%20Planitia |
| Chryse Planitia | Search of @NASAJPL for "Viking 1 Chryse Planitia" | https://www.youtube.com/@NASAJPL/search?query=Viking%201%20Chryse%20Planitia |
| Vastitas Borealis (Northern Lowlands) | Search of @NASAJPL for "Mars ocean" | https://www.youtube.com/@NASAJPL/search?query=Mars%20ocean |
| Syrtis Major | Search of @NASAJPL for "Mars from Earth telescope" | https://www.youtube.com/@NASAJPL/search?query=Mars%20from%20Earth%20telescope |
| Cerberus Fossae | Search of @NASAJPL for "marsquakes InSight" | https://www.youtube.com/@NASAJPL/search?query=marsquakes%20InSight |
| Medusae Fossae Formation | Search of @EuropeanSpaceAgency for "Medusae Fossae" | https://www.youtube.com/@EuropeanSpaceAgency/search?query=Medusae%20Fossae |
| The “Face on Mars” (Cydonia) | Search of @NASAJPL for "Face on Mars" | https://www.youtube.com/@NASAJPL/search?query=Face%20on%20Mars |
| North Polar Ice Cap | Search of @NASAJPL for "Mars polar ice cap" | https://www.youtube.com/@NASAJPL/search?query=Mars%20polar%20ice%20cap |
| Chasma Boreale | Search of @EuropeanSpaceAgency for "Chasma Boreale" | https://www.youtube.com/@EuropeanSpaceAgency/search?query=Chasma%20Boreale |
| South Polar Ice Cap | Search of @NASAJPL for "Mars south pole spiders" | https://www.youtube.com/@NASAJPL/search?query=Mars%20south%20pole%20spiders |
| Perseverance Rover | Direct video: Perseverance Rover’s Descent and Touchdown on Mars (3:25) | https://www.youtube.com/watch?v=4czjS9h4Fpg |
| Curiosity Rover | Search of @NASAJPL for "Curiosity rover" | https://www.youtube.com/@NASAJPL/search?query=Curiosity%20rover |
| Opportunity Rover | Search of @NASAJPL for "Opportunity rover" | https://www.youtube.com/@NASAJPL/search?query=Opportunity%20rover |
| Spirit Rover | Search of @NASAJPL for "Spirit rover Mars" | https://www.youtube.com/@NASAJPL/search?query=Spirit%20rover%20Mars |
| Mars Pathfinder & Sojourner | Direct video: Mars in a Minute: How Do You Land on Mars? (about 1 min) | https://www.youtube.com/watch?v=8-X8acD_r38 |
| Zhurong Rover (China) | Search of all of YouTube for "Zhurong rover Mars" | https://www.youtube.com/results?search_query=Zhurong%20rover%20Mars |
| Ingenuity Helicopter | Direct video: First Video of NASA’s Ingenuity Mars Helicopter in Flight (about 1 min) | https://www.youtube.com/watch?v=wMnOo2zcjXA |
| Viking 1 Lander | Search of @NASAJPL for "Viking lander Mars 1976" | https://www.youtube.com/@NASAJPL/search?query=Viking%20lander%20Mars%201976 |
| Viking 2 Lander | Search of @NASAJPL for "Viking 2 lander" | https://www.youtube.com/@NASAJPL/search?query=Viking%202%20lander |
| Mars 3 Lander (USSR) | Search of all of YouTube for "Mars 3 Soviet lander 1971" | https://www.youtube.com/results?search_query=Mars%203%20Soviet%20lander%201971 |
| Phoenix Lander | Search of @NASAJPL for "Phoenix Mars lander ice" | https://www.youtube.com/@NASAJPL/search?query=Phoenix%20Mars%20lander%20ice |
| InSight Lander | Direct video: Mars in a Minute: What’s Inside Mars? (about 1 min) | https://www.youtube.com/watch?v=b2P_CVOd5G0 |
| Beagle 2 Lander (UK) | Search of @EuropeanSpaceAgency for "Beagle 2 found" | https://www.youtube.com/@EuropeanSpaceAgency/search?query=Beagle%202%20found |
| Schiaparelli Lander (ESA) | Search of @EuropeanSpaceAgency for "Schiaparelli lander" | https://www.youtube.com/@EuropeanSpaceAgency/search?query=Schiaparelli%20lander |
| Mariner 9 (orbiter) | Search of @NASAJPL for "Mariner 9" | https://www.youtube.com/@NASAJPL/search?query=Mariner%209 |
| Mars Global Surveyor (orbiter) | Search of @NASAJPL for "Mars Global Surveyor" | https://www.youtube.com/@NASAJPL/search?query=Mars%20Global%20Surveyor |
| 2001 Mars Odyssey (orbiter) | Search of @NASAJPL for "Mars Odyssey" | https://www.youtube.com/@NASAJPL/search?query=Mars%20Odyssey |
| Mars Express (orbiter, ESA) | Search of @EuropeanSpaceAgency for "Mars Express" | https://www.youtube.com/@EuropeanSpaceAgency/search?query=Mars%20Express |
| Mars Reconnaissance Orbiter | Search of @NASAJPL for "HiRISE Mars Reconnaissance Orbiter" | https://www.youtube.com/@NASAJPL/search?query=HiRISE%20Mars%20Reconnaissance%20Orbiter |
| MAVEN (orbiter) | Search of @NASAJPL for "MAVEN Mars atmosphere" | https://www.youtube.com/@NASAJPL/search?query=MAVEN%20Mars%20atmosphere |
| Mangalyaan / Mars Orbiter Mission (India) | Search of all of YouTube for "Mangalyaan Mars Orbiter Mission ISRO" | https://www.youtube.com/results?search_query=Mangalyaan%20Mars%20Orbiter%20Mission%20ISRO |
| ExoMars Trace Gas Orbiter (ESA) | Search of @EuropeanSpaceAgency for "Trace Gas Orbiter" | https://www.youtube.com/@EuropeanSpaceAgency/search?query=Trace%20Gas%20Orbiter |
| Hope Probe (UAE) | Search of @NASAJPL for "Hope probe Emirates Mars Mission" | https://www.youtube.com/@NASAJPL/search?query=Hope%20probe%20Emirates%20Mars%20Mission |
| Tianwen-1 Orbiter (China) | Search of all of YouTube for "Tianwen-1 Mars orbiter" | https://www.youtube.com/results?search_query=Tianwen-1%20Mars%20orbiter |
| Phobos (moon) | Search of @NASAJPL for "Phobos moon Mars" | https://www.youtube.com/@NASAJPL/search?query=Phobos%20moon%20Mars |
| Deimos (moon) | Search of @NASAJPL for "Deimos moon Mars" | https://www.youtube.com/@NASAJPL/search?query=Deimos%20moon%20Mars |
| Arcadia Planitia | Search of @NASAJPL for "humans to Mars landing site" | https://www.youtube.com/@NASAJPL/search?query=humans%20to%20Mars%20landing%20site |
| Phlegra Montes | Search of @NASAJPL for "humans to Mars landing site" | https://www.youtube.com/@NASAJPL/search?query=humans%20to%20Mars%20landing%20site |
| Erebus Montes | Search of @NASAJPL for "humans to Mars landing site" | https://www.youtube.com/@NASAJPL/search?query=humans%20to%20Mars%20landing%20site |
| Meridiani Planum | Search of @NASAJPL for "humans to Mars landing site" | https://www.youtube.com/@NASAJPL/search?query=humans%20to%20Mars%20landing%20site |

---

## Credits
- Color map: NASA/JPL-Caltech/USGS, Viking MDIM 2.1, served by NASA Mars Trek
- Height map: NASA/JPL-Caltech/GSFC, MGS MOLA, served by NASA Mars Trek
- Close-ups: NASA/JPL-Caltech/MSSS CTX, with the Global CTX Mosaic by the Bruce Murray Laboratory for Planetary Visualization at Caltech, hosted by Esri
- Super close-ups: NASA/JPL-Caltech/University of Arizona HiRISE, hosted by Esri
- Low-detail offline map: NASA 3D Resources
- Rover positions: NASA/JPL-Caltech MMGIS "Where is the rover" maps
- Card photos: NASA Image and Video Library (images.nasa.gov); NASA/JPL-Caltech, MSSS, University of Arizona, ESA and other mission partners
- Possible human landing sites: Golombek et al., "SpaceX Starship Landing Sites on Mars" (LPSC 2021); NASA First Landing Site/Exploration Zone Workshop (2015)
- 3D globe engine: CesiumJS, Apache 2.0 license, loaded from the jsDelivr CDN (backup: unpkg)
- Fonts: Big Shoulders Display and Atkinson Hyperlegible, SIL Open Font License (`assets/fonts/`)

This is an independent classroom project. It isn't made by or endorsed by NASA, and it isn't affiliated with any other Mars map website.
