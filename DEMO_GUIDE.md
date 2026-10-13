# Demo Guide: how to view and review this project

Three ways to see FoodShare, from quickest to most complete.

| Option | Needs | Time | Shows |
| --- | --- | --- | --- |
| [A. Read the code on GitHub](#a-read-the-code-on-github) | A browser | 1 min | Code, README, API docs |
| [B. Run it locally](#b-run-it-locally) | Node.js 20+, Git | 5–10 min | The full working app |
| [C. Put it online](#c-put-it-online-optional) | Free Render + MongoDB Atlas accounts | 20–30 min | A link anyone can click |

---

## A. Read the code on GitHub

Repository: https://github.com/Joel-Judson-Paul77/community-food-donation-locator

Where to look:

| Path | What it is |
| --- | --- |
| `README.md` | Features, architecture, API reference, data model |
| `server/src/models/` | Database models: User, Donation, Claim |
| `server/src/controllers/` | Business logic (auth, donations, claims, stats, admin) |
| `server/src/routes/index.js` | Every API endpoint and who may call it |
| `server/tests/api.test.js` | Automated API tests |
| `client/src/pages/` | The React screens |
| `client/src/components/` | Reusable UI (map, cards, navbar…) |

---

## B. Run it locally

### 1. Install

- [Node.js](https://nodejs.org) version 20 or newer (check with `node -v`)
- [Git](https://git-scm.com)

### 2. Get the code and start it

```bash
git clone https://github.com/Joel-Judson-Paul77/community-food-donation-locator.git
cd community-food-donation-locator
npm run install-all
npm run dev
```

Open **http://localhost:5173**.

No database setup is needed. With no `MONGO_URI` set, the server starts a temporary in-memory MongoDB loaded with demo data (Hyderabad listings, users and requests).

> **First start is slow.** It downloads the MongoDB binary once (about 600 MB, then cached). Wait for the terminal to print `API ready on http://localhost:5000/api`.
> Demo data resets every time the server restarts.

### 3. Log in with a demo account

All demo accounts use the password **`Password@123`**.

| Role | Email | What they can do |
| --- | --- | --- |
| Donor | `freshmart@foodshare.test` | Post food, approve/decline requests, mark collected |
| Donor | `annapurna@foodshare.test` | Same, a restaurant |
| Recipient | `ravi@foodshare.test` | Search food, request it, track requests |
| Recipient | `hope@foodshare.test` | Same, a shelter |
| Admin | `admin@foodshare.test` | Manage users, listings and requests |

### 4. Walkthrough (about 5 minutes)

1. **Home page.** Live impact numbers and food that needs picking up soon.
2. **Find food.** Search, filter by category and dietary needs, switch between **List** and **Map**. Allow location access in the browser to sort by nearest and see distances.
3. **Open a listing.** Quantity left, pickup deadline, directions. Notice the donor's phone number is hidden while logged out.
4. **Recipient flow.** Log in as `ravi@foodshare.test`, open any listing, send a request for some quantity.
5. **Donor flow.** Log out, log in as `freshmart@foodshare.test`. **Dashboard → Requests** shows the new request. Click **Approve**. The quantity is reserved and contact details are shared. Then **Awaiting pickup → Mark collected**. The "Items shared" and "People helped" counters go up.
6. **Post food.** As a donor, click **Donate**. Fill in the form, drop a pin on the map (or **Use my location**), publish.
7. **Admin.** Log in as `admin@foodshare.test`. The **Overview** shows platform totals. The **Users**, **Listings** and **Requests** tabs allow search, role changes, blocking and deleting.

### 5. Run the automated tests (optional)

```bash
npm test
```

Expect 6 passing tests covering registration/login, role permissions, geo search, the request → approve → collect flow, and admin access. (The first run also downloads MongoDB.)

### Troubleshooting

| Problem | Fix |
| --- | --- |
| `npm run install-all` errors with permission or "filename too long" | Clone into a short path such as `C:\projects\` |
| Page is blank or shows "Cannot reach the server" | The API is still starting. Wait for the `API ready` message, then refresh |
| Port 5000 or 5173 already in use | Stop the other program, or set `PORT=5001` in `server/.env` |
| Map has no pins | Clear the filters, or widen the distance to **Any distance** |
| Want data to persist between restarts | Create `server/.env` from `server/.env.example` and set `MONGO_URI`, then run `npm run seed` |

---

## C. Put it online (optional)

GitHub stores code but can't run it. To give your mentor a link, deploy to free hosting: **MongoDB Atlas** (database) + **Render** (the app). The repo includes a [`render.yaml`](render.yaml) blueprint, so most settings are filled in for you. In production, one Node service serves both the API and the React site.

### 1. Create the database (MongoDB Atlas, about 5 minutes)

1. Sign up at https://www.mongodb.com/atlas and create a **free (M0)** cluster.
2. **Database Access** → add a database user with a password. Save both.
3. **Network Access** → add IP address `0.0.0.0/0` (allow from anywhere, fine for a demo).
4. **Connect → Drivers** → copy the connection string. It looks like:
   `mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/foodshare`
   Replace `<user>` and `<password>` (no `<` `>` characters left) and make sure `/foodshare` sits before any `?`.

### 2. Deploy the app (Render, about 10 minutes)

1. Sign up at https://render.com with your GitHub account.
2. **New → Blueprint** → select the `community-food-donation-locator` repo → **Apply**.
3. When asked for **`MONGO_URI`**, paste your Atlas connection string.
4. Wait for the first deploy (build takes a few minutes). Render then shows your link, like `https://foodshare-xxxx.onrender.com`.

That's all. The blueprint already sets `NODE_ENV=production`, a generated `JWT_SECRET`, and `SEED_DEMO_DATA=true`, which loads the demo users and listings **the first time the database is empty** (it never touches a database that already has users).

> No Blueprint option? Use **New → Web Service** instead with Build Command `npm run install-all && npm run build`, Start Command `npm start`, and these environment variables: `NODE_ENV=production`, `MONGO_URI`, `JWT_SECRET` (any long random string), `MONGOMS_DISABLE_POSTINSTALL=1`, `SEED_DEMO_DATA=true`.

### 3. Check it works

Open the link, then:
- the home page should show listings and numbers,
- log in with a demo account from section B (for example `ravi@foodshare.test` / `Password@123`).

If the page loads but there is no data, open the service's **Logs** in Render and look for the message about the database.

### 4. Share it

Send your mentor the Render link and the demo logins from section B.

### Before a demo

- **Wake it up.** The free plan sleeps after about 15 minutes idle, and the first visit then takes about a minute. Open the link yourself a few minutes beforehand.
- **Refresh the data.** Demo listings expire after their pickup-by time. To reset to fresh demo data, run this on your computer with `MONGO_URI` set in `server/.env`: `npm run seed` (this **wipes** that database first).
- **Photos don't persist.** Uploaded food photos are stored on the server's disk and vanish on restart. Listings still work and show an icon. For permanent photos, use cloud storage such as Cloudinary or S3.
- **Public passwords.** The demo accounts share a public password, so don't put real data in this deployment.

---

## What to point out to your mentor

- **Full-stack MERN app:** React front end, Express REST API, MongoDB database.
- **Real location search:** MongoDB `2dsphere` geo queries plus an interactive map.
- **Role-based access:** donor, recipient and admin each get their own screens and permissions, enforced on the server.
- **Safe claiming:** approving a request reserves quantity in a single database step, so two people can't claim the same food.
- **Privacy:** contact numbers are only shared once a request is approved.
- **Tested:** automated API tests for the main flows.
