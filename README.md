Cơm Nhà Restaurant Website
A redesigned website for Cơm Nhà, a family-style Vietnamese restaurant in Westminster, WA. The site shows the menu, family sets, catering, reviews and location, and links customers to online ordering for pickup or delivery.
It is a static site built with plain HTML, CSS and JavaScript, so there is no build step and nothing to install. This project was built as part of the ICT303 ICT Practicum unit at Stanley College.
Team
Name	GitHub
Blony (lead)	@ninihub1
Dakshraj	@Djthegreat-droid
Rohit	@rohit-7512
Aman	@Apes45-maker
Running it locally
1. Clone the repo
```
git clone https://github.com/ninihub1/Com-Nha.git
cd Com-Nha
```
2. Start a local server
The shared header and footer, the menu and the reviews are loaded with `fetch()`, which browsers block on `file://` pages. Opening `index.html` by double-clicking it will show a page with no header, footer or menu, so always preview through a local server. Use either option below.
Option A: Live Server (VS Code)
Install the Live Server extension in VS Code.
Open the `Com-Nha` folder in VS Code.
Right-click `index.html` and choose Open with Live Server.
The site opens in your browser and reloads each time you save a file.
Option B: Python
From the repo root, run:
```
python3 -m http.server 8000
```
On Windows, use `python -m http.server 8000` if `python3` is not found.
Then open http://localhost:8000/index.html in your browser. Press `Ctrl + C` in the terminal to stop the server.
Project structure
```
Com-Nha/
├── index.html          Home page
├── pages/
│   └── menu.html       Menu page
├── partials/           Shared header and footer, loaded into every page
├── css/                style.css (whole site) and menu.css (menu page)
├── js/
│   ├── include.js      Loads the header and footer partials
│   ├── config.js       Ordering links (pickup and Uber Eats) in one place
│   ├── menu.js         Builds the menu from data/menu.json
│   ├── reviews.js      Rotating reviews from data/reviews.json
│   ├── nav.js          Mobile hamburger menu
│   ├── order-chooser.js Pickup or delivery choice on the menu page
│   └── main.js         Dish strip and catering enquiry form
├── data/               menu.json and reviews.json
├── assets/             Logo
└── favicon.svg
```
To change where the order buttons go, edit `js/config.js`. To add or change dishes, edit `data/menu.json`.
Contributing
Read CONTRIBUTING.md before starting on an issue. It covers branch naming, the workflow and the pull request checklist.
