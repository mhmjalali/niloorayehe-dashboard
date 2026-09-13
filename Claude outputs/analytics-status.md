# Niloo Rayehe — Analytics status log

Progress/decision log for the "add analytics" work on `niloorayehe-dashboard`
(`D:\Git\niloorayehe\niloorayehe-dashboard`, reached via the desktop device
bridge). Paste this into a new chat to resume without re-explaining.

## Site topology

Same root domain, two separate apps:
- `niloorayehe.com` — the public storefront (not built yet as of this log).
- `dashboard.niloorayehe.com` — this Next.js admin dashboard.

## Decision: two separate pieces, not one tool

The user wants both traffic stats and business/sales metrics shown inside
the dashboard. These need different sources, so they're being treated as
two independent tracks of work:

1. **Traffic analytics** (visitors, page views, referrers, devices,
   popular pages) — via a dedicated analytics tool.
2. **Business/sales metrics** (revenue, conversion, top products, cart
   abandonment) — has nothing to do with an analytics tool; it's just
   queries against the site's own orders/products database, the same way
   the rest of this dashboard already pulls tables from its backend. **Not
   started yet** — deferred until the traffic-analytics piece is working.

## Why self-hosted Umami, not Google Analytics

Recommendation given: avoid Google Analytics as the primary tool for an
Iranian business. GA4's dashboard/API sit behind Google infrastructure
that's inconsistently reachable from inside Iran — the visitor-side
tracking script would mostly work, but the team's *own* access to pull
that data back out (including this dashboard's server calling GA's API)
is the risk.

The user confirmed they can self-host, so the plan is **Umami**
(open-source, self-hosted, Postgres-backed, small tracking script, REST
API) running on their own VPS — full control, no foreign-service
dependency, data stays theirs. They picked "Umami self-host setup" as the
first thing to build, before the dashboard-side integration.

## What's been built so far

`infra/umami/` in the repo (new top-level folder):

- **`docker-compose.yml`** — Umami (`ghcr.io/umami-software/umami:latest`)
  + Postgres 15, verified against Umami's current official compose file.
  Port bound to `127.0.0.1:3000` only (not exposed publicly — a reverse
  proxy with HTTPS goes in front of it). Secrets (`POSTGRES_PASSWORD`,
  `APP_SECRET`, `TWO_FACTOR_ENCRYPTION_KEY`) are read from a `.env` file
  that is **not committed** (`.gitignore` already has `.env*`).
- **`README.md`** — full deploy walkthrough for the VPS: prerequisites,
  generating secrets (`openssl rand -hex 32`), `docker compose up -d`,
  first-login password change (default `admin`/`umami` — must be changed
  immediately), adding the website in Umami's UI to get the tracking
  script (`<script defer src=".../script.js" data-website-id="...">`),
  putting it behind a subdomain (e.g. `stats.niloorayehe.com`) with Caddy
  or Nginx+certbot, and a note that the dashboard-side API integration is
  a separate next step once this is live.

## Local preview attempt (in progress, unresolved)

User tried running the same compose file locally on their Windows machine
via Docker Desktop, just to see the Umami UI before touching the VPS.
Generated throwaway local secrets for this (not meant to be reused
anywhere real). Note: writing `.env` files remotely is blocked as a
safety guardrail, so the user has to create that file themselves — given
inline in chat, not delivered as a file.

Hit an error on `docker compose up -d`:

```
unable to get image 'ghcr.io/umami-software/umami:latest': request returned
500 Internal Server Error for API route and version
http://%2F%2F.%2Fpipe%2FdockerDesktopLinuxEngine/v1.51/images/.../json,
check if the server supports the requested API version
```

This is a Docker Desktop engine-communication issue, not a problem with
the compose file or ghcr.io reachability (the request never got past
Docker Desktop's own internal API). Troubleshooting steps given, in
order, outcome not yet confirmed:
1. Fully quit and restart Docker Desktop, then retry.
2. `wsl --shutdown` (Windows/WSL2 backend), reopen Docker Desktop, retry.
3. `docker version` — check Client vs Server API version for a mismatch;
   update Docker Desktop if so.
4. Last resort: Docker Desktop → Settings → Troubleshoot → "Reset to
   factory defaults" (wipes local images/containers).

## Not yet done

- [ ] Confirm the local Docker Desktop preview actually comes up (or skip
      straight to the VPS if local isn't worth the fight).
- [ ] Deploy `infra/umami/` on the real VPS per its `README.md`.
- [ ] Add the tracking `<script>` to the main `niloorayehe.com` site (once
      that site exists / has a layout to put it in).
- [ ] Put a subdomain (e.g. `stats.niloorayehe.com`) with HTTPS in front of
      the Umami container instead of the exposed port.
- [ ] Build the dashboard-side integration: a server-side route in
      `dashboard.niloorayehe.com` that authenticates against self-hosted
      Umami's API (login-token based, not a simple API key — self-hosted
      Umami differs from Umami Cloud here) and renders pageviews/visitors/
      referrers with the dashboard's own chart components — explicitly
      *not* an embedded Umami UI, to keep it visually consistent with the
      rest of the dashboard.
- [ ] Separately: the business/sales metrics dashboard page, sourced from
      the site's own orders/products data (no third-party tool). Not
      started — was deferred in favor of the Umami piece.

## Key facts to carry forward

- Umami env vars: `DATABASE_URL` (built from `POSTGRES_PASSWORD` in the
  compose file), `APP_SECRET` (64-char hex), `TWO_FACTOR_ENCRYPTION_KEY`
  (64-char hex, must differ from `APP_SECRET`), `DISABLE_TELEMETRY=1` set
  to opt out of Umami's own telemetry.
- Default first-login credentials: `admin` / `umami` — must be changed
  immediately in Settings → Profile.
- Self-hosted Umami's API uses login-token auth (`POST` to its own
  `/api/auth/login` style endpoint) — different from Umami Cloud's simple
  API-key model. The exact stats endpoints haven't been looked up yet;
  that happens when the dashboard-integration step is actually built.
