# Gym Website Template — Image-Ready Version

This version uses researched Wikimedia Commons images directly in the website, so you do not need to find images before opening the demo.

## Important

The website currently loads the demo images from Wikimedia Commons using `Special:FilePath` URLs. That means an internet connection is required for those images.

For a real client website, it is better to download appropriately licensed images and host them locally in `/images/`, or replace them with images supplied by the gym.

See `IMAGE-SOURCES.txt` for the exact source, author and license for the demo images.

## Folder

gym-website/
├── index.html
├── style.css
├── script.js
├── IMAGE-SOURCES.txt
├── README.txt
├── download-images.ps1
└── images/

## Client customization

Edit the CONFIG object near the top of `script.js` for:

- Gym name
- Location
- Phone
- WhatsApp
- Email
- Address
- Opening hours
- Instagram
- Facebook
- YouTube
- Google Maps
- Directions
- Copyright year

Membership prices are in `index.html`.

## Downloading the demo images locally

If you want the images saved inside the `/images/` folder rather than loaded remotely, run:

`download-images.ps1`

on a Windows PC with PowerShell and an internet connection.

After the images are downloaded, change the image paths in `index.html` and `style.css` back to local `images/...` paths if you want a fully self-contained offline version.

## Commercial client use

Do not represent the demo stock-photo people as the gym's actual trainers or members. Replace them with the client's own photos or properly licensed stock photography before delivering the final site.

Also keep the required attribution for each Creative Commons image listed in `IMAGE-SOURCES.txt`.
