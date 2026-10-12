# Deploy Guide — Portfolio on VPS with Docker

Live setup: Ubuntu VPS `169.58.118.15`, code in `/opt/portfolio`, HTTPS at `https://briankimani.duckdns.org` via Caddy.
Repo: `https://github.com/kimani-brian/Nportfolio.git`, branch `main`.

## Architecture

- `Dockerfile` — multi-stage: `node:20-alpine` runs `npm ci && npm run build`, then `nginx:1.27-alpine` serves `build/` on port 80.
- `nginx.conf` — SPA fallback (`try_files $uri /index.html`), gzip, static caching, security headers.
- `docker-compose.yml` + `Caddyfile` — **current mode**: Caddy on `80/443` reverse-proxies `portfolio:80`, auto-gets + renews Let's Encrypt cert for single host `briankimani.duckdns.org` (no `www`).
- `docker-compose.http.yml` — **rollback / IP-only mode**: portfolio only, `80:80`, kept for fallback to `http://169.58.118.15`.
- `.github/workflows/deploy.yml` — on push to `main`, SSHs to VPS and rebuilds via `docker compose up -d --build`.

## 1. VPS prep (Ubuntu 22.04/24.04)

```bash
ssh root@169.58.118.15
apt update && apt upgrade -y
apt install -y ca-certificates curl git ufw
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
echo "deb [signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" > /etc/apt/sources.list.d/docker.list
apt update && apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
docker --version && docker compose version
```

Firewall:

```bash
ufw allow OpenSSH
ufw allow 80,443/tcp
ufw --force enable
ufw status
```

## 2. First deploy (now HTTPS — HTTP mode kept for rollback)

HTTPS (current):

```bash
cd /opt
git clone https://github.com/kimani-brian/Nportfolio.git portfolio
cd portfolio
docker compose up -d --build
docker compose logs -f caddy   # expect "certificate obtained successfully"
curl -I https://briankimani.duckdns.org
```

Visit: `https://briankimani.duckdns.org` (`http://` redirects to `https://`).

Plain-HTTP fallback (IP only):

```bash
docker compose down
docker compose -f docker-compose.http.yml up -d --build
curl -I http://localhost   # expect HTTP/1.1 200 OK
# visit http://169.58.118.15
```

Note: an older manual run used `docker run -p 80:80 portfolio:prod`. That was migrated to
`docker-compose.http.yml`, then to Caddy HTTPS. Remove legacy container with
`docker rm -f portfolio-site || true` if it still exists.

## 3. Auto-redeploy on `git push`

Workflow: `.github/workflows/deploy.yml` runs on push to `main`:

```yaml
git fetch origin main + reset --hard origin/main
docker compose up -d --build
curl -H "Host: briankimani.duckdns.org" http://localhost/
curl https://briankimani.duckdns.org/
```

How it works: push → GitHub Actions (`ubuntu-latest`) → `appleboy/ssh-action` SSHs via
`VPS_HOST` / `VPS_USER` / `VPS_SSH_KEY` → `cd /opt/portfolio` → fetch + hard reset to
`origin/main` → rebuild Caddy + portfolio → prune images → Host-header check + public HTTPS check.

Setup (done once):

```bash
# on laptop
ssh-keygen -t ed25519 -f ~/.ssh/portfolio-deploy -N "" -C "github-actions-portfolio"
ssh-copy-id -i ~/.ssh/portfolio-deploy.pub root@169.58.118.15
ssh -i ~/.ssh/portfolio-deploy root@169.58.118.15 "echo OK"
cat ~/.ssh/portfolio-deploy   # paste into GitHub secret
```

GitHub → repo Settings → Secrets and variables → Actions:

- `VPS_HOST` = `169.58.118.15`
- `VPS_USER` = `root`
- `VPS_SSH_KEY` = full private key above

Test: push to `main` or Actions → Deploy to VPS → Re-run.

## 4. Domain + HTTPS (live: `briankimani.duckdns.org`, single host, no `www`)

1. DNS (done in DuckDNS dashboard):

   ```text
   briankimani.duckdns.org  →  169.58.118.15
   ```

   Verify: `dig +short briankimani.duckdns.org` → `169.58.118.15`.
   Note: `www.briankimani.duckdns.org` also resolves (DuckDNS wildcard) but is **not served**
   — Caddy only has the single-host block below, per your choice.

2. `Caddyfile` (live):

   ```caddy
   briankimani.duckdns.org {
     reverse_proxy portfolio:80
   }
   ```

3. Launch / redeploy HTTPS stack:

   ```bash
   cd /opt/portfolio
   git pull
   docker compose -f docker-compose.http.yml down || true
   docker rm -f portfolio-site || true
   docker compose up -d --build
   docker compose logs -f caddy   # waits ~30s for Let's Encrypt
   ```

   Visit: `https://briankimani.duckdns.org`

    Renewal is automatic via `caddy_data` / `caddy_config` volumes.

## 4b. Second site: Crave & Glaze (`https://craveandglaze.duckdns.org`)

Same VPS, same Caddy front door, separate compose project:

- DNS: `craveandglaze.duckdns.org → 169.58.118.15` (DuckDNS dashboard).
- Code: `https://github.com/kimani-brian/crave-and-glaze-final.git` cloned to `/opt/crave-and-glaze`
  (Go monolith `:8080` + Postgres; `.env` scp'd, `chmod 600`, `DB_PORT=5234`,
  `MPESA_CALLBACK_URL=https://craveandglaze.duckdns.org/api/callback/mpesa`).
- Shared network: external `proxy` (`docker network create proxy` — both deploy
  workflows run this first, so it self-heals). Portfolio's Caddy joins `web` + `proxy`;
  crave `app` joins `default` (db traffic) + `proxy` (Caddy traffic).
- Routing (`Caddyfile`): `craveandglaze.duckdns.org → reverse_proxy crave_glaze_app:8080`.
  Direct fallback still live: `http://169.58.118.15:8080`.
- Deploys are independent per repo; either order is safe (Caddy retries upstreams,
  HTTPS checks warn-not-fail until both sides are up). First cert takes ~30s–2min.
- M-Pesa callbacks now work (public HTTPS satisfies Safaricom).

## 5. Everyday commands

```bash
cd /opt/portfolio
docker compose ps
docker compose logs -f
docker compose logs -f caddy
docker compose up -d --build   # manual redeploy
git pull && docker compose up -d --build
docker image prune -f
ss -tlnp | grep -E '80|443'
dig +short briankimani.duckdns.org
curl -I http://briankimani.duckdns.org    # expect 308 redirect to https
curl -I https://briankimani.duckdns.org   # expect 200
```

Rollback (to IP-only HTTP or previous commit):

```bash
docker compose down
docker compose -f docker-compose.http.yml up -d --build   # http://169.58.118.15
# or
git log --oneline -5
git reset --hard <sha>
docker compose up -d --build
```

## Troubleshooting

- `address already in use` on port 80: `docker ps`, `docker compose down`, `docker rm -f portfolio-site`.
- Blank/old site after push: check Actions log, then `git status` + `docker ps` on VPS.
- Caddy cert fail: DNS not propagated or 80/443 blocked — wait 5 min, `docker compose restart caddy`.
- BuildKit network error in sandboxes (`npm ci` proxy error): retry with `docker build --network=host .`. Normal on VPS.
