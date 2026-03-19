---
layout: page
title: RUSH Admin
description: A Django admin website for uploading, styling, and describing geographic data in a variety of formats.
img: assets/img/rush_admin_project_thumbnail.png
importance: 1
category: work
---
RUSH Admin is a private web-portal that lets authenticated users upload, style, and describe geographic data in a variety of formats. It is an internal tool used at [NatuR&D](https://naturnd.com/) and [The RUSH Initiative](https://storymaps.arcgis.com/stories/507714d7fb674ed8ac8918e216e609c7) to manage content on [WhatsTheRUSH.earth](https://whatstherush.earth).

<img alt="Login page" src="/assets/img/rush-admin-login-page.png" style="width: 100%; height: auto;"/>
<img alt="Question list" src="/assets/img/rush-admin-question-list.png" style="width: 100%; height: auto;"/>
<img alt="Question tab" src="/assets/img/rush-admin-question-tab.png" style="width: 100%; height: auto;"/>
<img alt="Drinking fountains layer" src="/assets/img/rush-admin-drinking-fountains.png" style="width: 100%; height: auto;"/>


As of March 2026, I've authored 97% of the 40,000 lines of code, and since the project went live in March 2025, users have uploaded over 350 styles, 300 initiatives, and 120 geographic map layers.

### Motivation
Before RUSH Admin, [WhatsTheRUSH.earth](https://whatstherush.earth) was a 100% static website. All the GeoJSON data for the entire website was sent over HTTPS whenever anyone wanted to load the website, and people without programming experience on our team couldn't manage any of the content. RUSH Admin solved both of these issues, and opened up new possibilities for the future.

Having a backend allows us to securly manage remote data sources, cache frequently accessed data, perform spatial queries, and in general gives us the ability to filter and query the data for future extensibility, e.g., expanding to new cities.

### Architecture
The project uses Django's [admin site](https://docs.djangoproject.com/en/6.0/ref/contrib/admin/) as a frontend for user-authentication and data-management, and provides a [Graphql API](https://graphql.org/learn/introduction/) to serve data to [WhatsTheRUSH.earth](https://whatstherush.earth).

Typescript files are transpiled and bundled for the frontend using [Vite](https://github.com/vitejs/vite), and [Leaflet.js](https://leafletjs.com/) is used to render a live map-preview for users while they edit geographic data. [PostgreSQL](https://www.postgresql.org/) stores most of our data, but we also keep some larger media files (like raster data) offsite using [Backblaze](https://www.backblaze.com/)'s B2 buckets.

Everything is hosted behind Nginx on a VPS in Canada, and I have nightly backups scheduled using [Rclone](https://rclone.org/) and a custom-built [backup-manager](https://sammorris.ca/projects/backup-manager/) service.

### Features
Below is a list of some of the features that RUSH Admin currently supports:
- Uploading map data in a variety of formats, including GeoJSON, Geotiff, and OpenGreenMap links.
<img src="/assets/img/rush-admin-map-data-upload.png" style="width: 100%; height: 50%;"/>
- Adding, editing, and deleting content on the website, including editing map icons for point data, and the color, thickness, and opacity of lines and fill for polygon data:

<img src="/assets/img/rush-admin-multiple-styles-view.png" style="width: 50%; height: 50%;"/><img src="/assets/img/rush-admin-multiple-styles.png" style="width: 50%; height: 50%;"/>
- Popup templates using variables from the GeoJSON metadata:

<img src="/assets/img/rush-admin-layer-popup.png" style="width: 50%; height: 50%;"/><img src="/assets/img/rush-admin-layer-editing-popup.png" style="width: 50%; height: 50%;"/>
- Tooltips:

<img src="/assets/img/rush-admin-parks-with-tooltip.png" style="width: 50%; height: 50%;"/><img src="/assets/img/rush-admin-parks-tooltip-editing.png" style="width: 50%; height: 50%;"/>
- Creating and reusing styles with a live style-preview:

<img src="/assets/img/rush-admin-fill-style.png" style="width: 50%; height: 50%;"/><img src="/assets/img/rush-admin-marker-style.png" style="width: 50%; height: 50%;"/>
- A publish / draft system so users can work on content before making it public.
- Drag-and-drop ordering of content.
- And many more features!

### Acknowledgments
I could not have created this site without the rest of the RUSH Initiative team's expertise in geography and mapping. When I started this project, I had no prior GIS knowledge and had to learn the fundamentals through research, trial and error, and many discussions with [Doug Johnson](https://github.com/doug-stormtree), the frontend lead at RUSH.
