# CoolFix — AC Maintenance Management System

A React + Vite web app for HVAC maintenance operations in Kuwait.

## Included features
- Admin, Customer and Team Leader entry flows
- Complaint registration and ticket tracking
- Admin dashboard, complaints, team management, locations and Excel reports
- Team task workspace, status updates, before/after photo uploads and completion notes
- English / Arabic language toggle, RTL support and light / dark mode
- Supabase connection/setup screen and PostgreSQL schema embedded in the app
- Sandbox demo data and demo logins
- Editable team name / leader name and editable branch name, address, contact and phone
- Admin dashboard alert for complaints awaiting assignment
- Team assignment alerts in the Team Leader workspace; Supabase Realtime refreshes complaint assignments when connected

## Run locally
1. Install Node.js 18 or newer.
2. Open this folder in a terminal.
3. Run `npm install`.
4. Run `npm run dev` and open the local URL printed by Vite.
5. For a production build, run `npm run build`. The website files will be in `dist/`.

## Demo access (sandbox mode)
- Admin username: `admin`
- Admin password: `admin123`
- Team usernames: `team_alpha`, `team_bravo`, `team_charlie`, `team_delta`
- Team password: `team123`

## Supabase setup
Open the Supabase connection button in the app. Add your project URL and anon key, then use the schema tab to copy and run the supplied SQL in Supabase SQL Editor. Create Auth users and matching `profiles` rows for the Admin and Team Leader accounts. Never put a Supabase service-role key in this frontend.

## Important deployment note
Sandbox data is demo data held in browser memory. Connect Supabase and run the provided SQL before using this for live operations. Browser/in-app assignment alerts work in the app; push notifications, WhatsApp, SMS and email delivery require a separate notification provider and server-side setup.
