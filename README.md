# Mars Explorer

A 3D globe of Mars that you can spin. It's made for 7th-grade science on school iPads.

- **Real NASA pictures that sharpen as you zoom.** From far away you see a full-color map from the Viking orbiters (about 230 m per pixel). As you zoom in, close-up photos from Mars Reconnaissance Orbiter's CTX camera appear (about 5 m per pixel, almost everywhere on Mars). At famous places with HiRISE coverage, you can see details as small as about 25–50 cm.
- **69 pins with info cards.** There are 39 landforms (volcanoes, canyons, river channels, craters, basins, ice), 14 rovers, landers, and a helicopter, 10 orbiters, both moons, and 4 possible future human landing sites. Every landform card has a *Compare it with Earth* section.
- **Photos on the cards.** 63 cards open with a real NASA photo (or a labeled artist's drawing). Tap the photo to see it full size on NASA's website, or tap **See more photos** to browse NASA's image library.
- **Layers.** Turn each kind of landform on or off (volcanoes, canyons, river channels, craters, basins, ice, and more). Turn on just one kind to see every example on Mars. **Show everything** and **Clear the globe** buttons at the top, plus Show all / Hide all buttons for each section, make it quick to start fresh.
- **Rover paths.** Zoom in on Perseverance or Curiosity to see their real driving routes, based on NASA's published rover positions. Camera dots open real NASA photos taken at those spots. Star dots explain big discoveries. Spirit and Opportunity have approximate routes through their main stops.
- **Search.** Tap **Search** on the bottom bar and type a name ("Olympus"), or a kind of thing ("crater", "river", "volcano", "rover", "moon", "astronaut"). One tap shows all the matching places on the globe. Quick-search buttons mean students barely need to type. (The help screen is now under **Layers → How to explore**, and it still opens automatically the first time.)
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
| Photos and stories in the "Most Beautiful Photos" tour | `js/data/places.js`, the first tour in `MARS_TOURS` (`photos` and `stories`) |
| Typical temperatures on each card (°F), and the hometown used for comparisons | `js/data/temps.js` |
| Title, starting view, map picture sources | `js/config.js` |
| Colors and fonts | `css/app.css` |

You can edit files right on GitHub: open the file → pencil icon → make your change → **Commit changes**. The site updates in about a minute.

**To add a new place:** copy any existing place block in `places.js`, give it a new `id`, and change its name, latitude/longitude, and text. Latitude is north (+) or south (−). Longitude is east (+) or west (−). The Mars Trek site (trek.nasa.gov/mars) shows coordinates when you hover over the map.

**To use your own favorite video:** replace the place's `video: SEARCH` line with
`video: V("VIDEO_ID", "Video title", "Channel")`. The VIDEO_ID is the part after `watch?v=` in a YouTube link.

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

## Ancient Mars time machine

The "Ancient Mars" button under the title opens a timeline of 7 stops, from Mars' birth 4.5 billion years ago to today. Students drag the timeline (or tap Next) and the globe changes: oceans, lakes, rivers, floods, clouds and ice.

- **The water is placed with NASA's MOLA elevation map**, so it fills the low ground the way real water would. The biggest ocean is filled to an ancient shoreline height (3,550 m below Mars' average level). It covers 19.3% of Mars and holds about 19 million km³ of water, close to NASA's 2015 estimate (19% of the surface, about 20 million km³).
- **Lakes:** Hellas (−5,800 m, a proposed ancient shoreline), Jezero, Gale and the Eridania sea, filled as high as today's terrain allows.
- **River lines** show where water would flow downhill across the old cratered highlands. **Flood lines** are traced downhill from the sources of Kasei, Maja and Ares Valles.
- Story text, pictures and settings: `js/data/ancient.js`. Code: `js/ancient.js`, `css/ancient.css`. Data: `assets/ancient/`.
- **To turn it off:** delete the lines in `index.html` that load `css/ancient.css`, `js/data/ancient.js` and `js/ancient.js`. Nothing else changes.

## Video links: please preview before class

The rovers, landers and the most popular places have one hand-picked video ("Watch the video"). Every other place has a "Find videos" button that opens a regular YouTube search for that place, so students can scroll the results. Please watch the hand-picked videos before class, and remember that YouTube search results change over time.

To change a video, edit the place in `js/data/places.js`: `V("VIDEO_ID", "Title", "Channel")` links one video, and `SEARCH` makes a YouTube search for the place's name.

### Hand-picked videos (26)

| Card | Video | Link |
|---|---|---|
| Olympus Mons | The Biggest Volcano in the Solar System (SciShow Space) | https://www.youtube.com/watch?v=Nug6iuKowRk |
| Valles Marineris | Fly over the ‘Grand Canyon’ of Mars in high-resolution orbiter imagery (Space.com) | https://www.youtube.com/watch?v=srQXLrsfVxI |
| Jezero Crater | Mars 2020 Landing Site: Jezero Crater Flyover (NASA JPL) | https://www.youtube.com/watch?v=qnZ_sidmr4Y |
| Gale Crater | NASA’s Curiosity Rover Turns 10: Here’s What It’s Learned (NASA JPL) | https://www.youtube.com/watch?v=LwfJQa7vaGw |
| Mount Sharp (Aeolis Mons) | Curiosity Rover’s Most Challenging Climb Yet (NASA JPL) | https://www.youtube.com/watch?v=xtDpWGF16po |
| Korolev Crater | Flight over the Korolev Crater on Mars (Freie Universität Berlin (Mars Express camera team)) | https://www.youtube.com/watch?v=p8o6IGvGwZE |
| Hellas Basin | Flyover of Hellas Planitia on Mars (Kevin Gill) | https://www.youtube.com/watch?v=fbgFIPO6FJc |
| The “Face on Mars” (Cydonia) | Pareidolia: Why People Keep Seeing Crazy Stuff on Mars (SciShow) | https://www.youtube.com/watch?v=7LWrgH0nORE |
| North Polar Ice Cap | Flight over the North Polar Ice Cap of Mars (Freie Universität Berlin (Mars Express camera team)) | https://www.youtube.com/watch?v=yayI0X-v81I |
| “Spiders” of the South Pole | “Spiders” spotted on Mars? Not exactly (CBS Chicago) | https://www.youtube.com/watch?v=yYK3dNIZC_Y |
| Dust Devil Alley (Amazonis Planitia) | Perseverance Rover Captures Dust Devils Whirling Across Mars (NASA JPL) | https://www.youtube.com/watch?v=YHKIZGKPZm4 |
| Perseverance Rover | Perseverance Rover’s Descent and Touchdown on Mars (NASA) | https://www.youtube.com/watch?v=4czjS9h4Fpg |
| Curiosity Rover | 7 Minutes of Terror: The Challenges of Getting to Mars (NASA JPL) | https://www.youtube.com/watch?v=Ki_Af_o9Q9s |
| Opportunity Rover | Opportunity: NASA Rover Completes Mars Mission (NASA JPL) | https://www.youtube.com/watch?v=1Ll-VHYxWXU |
| Spirit Rover | Spirit’s Triumphs on Mars (NASA JPL) | https://www.youtube.com/watch?v=SwxVgCGmOjQ |
| Mars Pathfinder & Sojourner | Mars Pathfinder – 20th Anniversary Special (NASA JPL) | https://www.youtube.com/watch?v=XvVOgS9jWn0 |
| Zhurong Rover (China) | China’s Zhurong rover sends back new footage from Mars (CGTN) | https://www.youtube.com/watch?v=vQb2K79mC-w |
| Ingenuity Helicopter | How this helicopter survived 1004 days on Mars, then disappeared (Veritasium) | https://www.youtube.com/watch?v=20vUNgRdB4o |
| Viking 1 Lander | First U.S. Mars Landing (NASA) | https://www.youtube.com/watch?v=50-QVbaIdbM |
| Viking 2 Lander | First U.S. Spacecraft on Mars (Smithsonian National Air and Space Museum) | https://www.youtube.com/watch?v=LpU7oaXhPGk |
| Mars 3 Lander (USSR) | The First Time We Landed on Mars (SciShow Space) | https://www.youtube.com/watch?v=7p0uqmbEY9o |
| Phoenix Lander | Phoenix Mars Mission: Onto the Ice (full documentary) (Arizona Public Media) | https://www.youtube.com/watch?v=vK9fQnsN2uc |
| InSight Lander | First Likely Marsquake Heard by NASA’s InSight (NASA JPL) | https://www.youtube.com/watch?v=DLBP-5KoSCc |
| Beagle 2 Lander (UK) | What happened to Beagle 2? (National Space Centre) | https://www.youtube.com/watch?v=lqE44_DvKi0 |
| Schiaparelli Lander (ESA) | How We Know Europe’s Mars Lander Crashed (Seeker) | https://www.youtube.com/watch?v=4WkZ1rzZU8I |
| Phobos (moon) | NASA’s Perseverance Rover Sees Solar Eclipse on Mars (NASA JPL) | https://www.youtube.com/watch?v=aKK7vS2CHC8 |

### YouTube searches (47)

| Card | What the button opens |
|---|---|
| Ascraeus Mons | YouTube search for "Ascraeus Mons Mars" |
| Pavonis Mons | YouTube search for "Pavonis Mons Mars" |
| Arsia Mons | YouTube search for "Arsia Mons Mars" |
| Alba Mons | YouTube search for "Alba Mons Mars" |
| Elysium Mons | YouTube search for "Elysium Mons Mars" |
| Noctis Labyrinthus | YouTube search for "Noctis Labyrinthus Mars" |
| Kasei Valles | YouTube search for "Kasei Valles Mars" |
| Ares Vallis | YouTube search for "Ares Vallis Mars" |
| Nanedi Valles | YouTube search for "Nanedi Valles Mars" |
| Ma’adim Vallis | YouTube search for "Ma’adim Vallis Mars" |
| Warrego Valles | YouTube search for "Warrego Valles Mars" |
| Mawrth Vallis | YouTube search for "Mawrth Vallis Mars" |
| Gusev Crater | YouTube search for "Gusev Crater Mars" |
| Endeavour Crater | YouTube search for "Endeavour Crater Mars" |
| Victoria Crater | YouTube search for "Victoria Crater Mars" |
| Eberswalde Delta | YouTube search for "Eberswalde Delta Mars" |
| Huygens Crater | YouTube search for "Huygens Crater Mars" |
| Schiaparelli Crater | YouTube search for "Schiaparelli Crater Mars" |
| Lyot Crater | YouTube search for "Lyot Crater Mars" |
| Russell Crater Dunes | YouTube search for "Russell Crater Dunes Mars" |
| Argyre Basin | YouTube search for "Argyre Basin Mars" |
| Utopia Planitia | YouTube search for "Utopia Planitia Mars" |
| Isidis Planitia | YouTube search for "Isidis Planitia Mars" |
| Chryse Planitia | YouTube search for "Chryse Planitia Mars" |
| Vastitas Borealis (Northern Lowlands) | YouTube search for "Vastitas Borealis Mars" |
| Syrtis Major | YouTube search for "Syrtis Major Mars" |
| Cerberus Fossae | YouTube search for "Cerberus Fossae Mars" |
| Medusae Fossae Formation | YouTube search for "Medusae Fossae Formation Mars" |
| Chasma Boreale | YouTube search for "Chasma Boreale Mars" |
| South Polar Ice Cap | YouTube search for "South Polar Ice Cap Mars" |
| North Polar Avalanche Cliffs | YouTube search for "North Polar Avalanche Cliffs Mars" |
| Galle Crater (the “Happy Face”) | YouTube search for "Galle Crater Mars" |
| Mariner 9 (orbiter) | YouTube search for "Mariner 9 Mars" |
| Mars Global Surveyor (orbiter) | YouTube search for "Mars Global Surveyor" |
| 2001 Mars Odyssey (orbiter) | YouTube search for "2001 Mars Odyssey" |
| Mars Express (orbiter, ESA) | YouTube search for "Mars Express" |
| Mars Reconnaissance Orbiter | YouTube search for "Mars Reconnaissance Orbiter" |
| MAVEN (orbiter) | YouTube search for "MAVEN Mars" |
| Mangalyaan / Mars Orbiter Mission (India) | YouTube search for "Mangalyaan Mars Orbiter Mission" |
| ExoMars Trace Gas Orbiter (ESA) | YouTube search for "ExoMars Trace Gas Orbiter" |
| Hope Probe (UAE) | YouTube search for "Hope Probe Mars" |
| Tianwen-1 Orbiter (China) | YouTube search for "Tianwen-1 Orbiter Mars" |
| Deimos (moon) | YouTube search for "Deimos Mars" |
| Arcadia Planitia | YouTube search for "Arcadia Planitia Mars" |
| Phlegra Montes | YouTube search for "Phlegra Montes Mars" |
| Erebus Montes | YouTube search for "Erebus Montes Mars" |
| Meridiani Planum | YouTube search for "Meridiani Planum Mars" |

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
