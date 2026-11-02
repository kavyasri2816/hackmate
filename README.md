# HackMate — Hackathon & Tech Event Hub

HackMate is a responsive front-end web application that helps students discover hackathons, workshops, and technology meetups, register for events, and manage their saved opportunities.

## Features

- Browse a curated list of technology events
- Search by event name, category, location, or description
- Filter events by Hackathon, Workshop, and Meetup
- Register for an event and remove a registration
- Personal "My Events" dashboard
- Saves registrations in browser LocalStorage
- Responsive layout for desktop, tablet, and mobile

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- Browser LocalStorage

## Run locally

1. Download or clone this repository.
2. Open the project folder.
3. Open `index.html` in your browser.

No installation or API key is required.

## Project Structure

```text
HackMate/
├── index.html
├── style.css
├── script.js
└── README.md
```

## How it works

The event catalogue is stored in `script.js`. JavaScript renders the event cards, filters the list based on the search input and selected category, and updates registrations. LocalStorage keeps a user's registered event IDs in the browser, so the dashboard remains populated after a page refresh on the same browser.

## Future Improvements

- Add user authentication
- Connect a backend API and database
- Allow organizers to create and manage events
- Add event reminders and calendar integration
- Add team formation and participant profiles

## Note

This is a portfolio/demo project. The displayed events are sample data, and registration is stored locally in the browser; it does not submit information to event organizers.

## Author

Kavya Sri  
GitHub: https://github.com/kavyasri2816
