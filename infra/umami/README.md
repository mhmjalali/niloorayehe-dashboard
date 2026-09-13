# Self-hosted Umami — traffic analytics for Niloo Rayehe

This runs on your VPS, independent of both `niloorayehe.com` and
`dashboard.niloorayehe.com`. It collects traffic data (visitors, page
views, referrers, devices, popular pages) via a small tracking script on
the main site, and exposes an API the dashboard will later read from.

## 1. Prerequisites

Docker and the Docker Compose plugin installed on the VPS (`docker compose
version` should work).

## 2. Configure secrets

Next to `docker-compose.yml` on the server, create a `.env` file (this file
is never committed — keep it only on the server):

```
POSTGRES_PASSWORD=<a strong random password>
APP_SECRET=<run: openssl rand -hex 32>
TWO_FACTOR_ENCRYPTION_KEY=<run: openssl rand -hex 32>
```

Run `openssl rand -hex 32` twice to get two different values — don't reuse
the same string for both.

## 3. Start it

```
docker compose up -d
```

This brings up Postgres and Umami, and creates the database on first run.

## 4. First login

Visit `http://<server-ip>:3000` (or through the reverse proxy once step 6
is done). Default login is `admin` / `umami` — **change this password
immediately** under Settings → Profile.

## 5. Add the website and get the tracking script

In Umami: Settings → Websites → Add website. Name it "Niloo Rayehe",
domain `niloorayehe.com`. It gives you a script tag like:

```html
<script
  defer
  src="https://stats.niloorayehe.com/script.js"
  data-website-id="<your-website-id>"
></script>
```

Add that to the `<head>` of the main `niloorayehe.com` site (once it
exists). That's the only change needed on the storefront side.

## 6. Put it behind a subdomain with HTTPS

Don't expose port 3000 directly — route a subdomain to it instead, e.g.
`stats.niloorayehe.com`. Simplest option is Caddy (automatic HTTPS):

```
stats.niloorayehe.com {
    reverse_proxy 127.0.0.1:3000
}
```

If you're already using Nginx elsewhere, an Nginx + certbot reverse proxy
works the same way — just proxy to `127.0.0.1:3000`.

## 7. Next step: showing this in the dashboard

Once this is live and you can share the `stats.niloorayehe.com` URL, we'll
add a server-side route in `dashboard.niloorayehe.com` that authenticates
against Umami's API (self-hosted Umami uses a login-token, not a simple
API key) and renders pageviews/visitors/referrers with the dashboard's own
charts — not an embedded Umami UI. That's a separate, small piece of work
once this part is running.
