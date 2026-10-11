# Deploy Guide — Portfolio on VPS with Docker

Live setup: Ubuntu VPS `169.58.118.15`, code in `/opt/portfolio`, plain HTTP on port 80.
Repo: `https://github.com/kimani-brian/Nportfolio.git`, branch `main`.

## Architecture

- `Dockerfile` — multi-stage: `node:20-alpine` runs `npm ci && npm run build`, then `nginx:1.27-alpine` serves `build/` on port 80.
- `nginx.conf` — SPA fallback (`try_files $uri /index.html`), gzip, static caching, security headers.
- `docker-compose.http.yml` — **current mode**: portfolio only, `80:80`, no domain needed.
- `docker-compose.yml` + `Caddyfile` — **future domain mode**: Caddy reverse-proxies `portfolio:80` and auto-gets Let's Encrypt certs for `example.com` / `www.example.com`.
- `.github/workflows/deploy.yml` — on push to `main`, SSHs to VPS and rebuilds via `docker-compose.http.yml`.

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

## 2. First deploy (plain HTTP, no domain)

```bash
cd /opt
git clone https://github.com/kimani-brian/Nportfolio.git portfolio
cd portfolio
docker compose -f docker-compose.http.yml up -d --build
curl -I http://localhost   # expect HTTP/1.1 200 OK
```

Visit: `http://169.58.118.15`

Note: an older manual run used `docker run -p 80:80 portfolio:prod`. That was migrated to
`docker-compose.http.yml` with:

```bash
docker rm -f portfolio-site || true
docker compose -f docker-compose.http.yml up -d --build
```

## 3. Auto-redeploy on `git push`

Workflow: `.github/workflows/deploy.yml` runs on push to `main`:

```yaml
git fetch origin main + reset --hard origin/main
docker compose -f docker-compose.http.yml up -d --build
curl http://localhost/
```

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

## 4. Switch to domain + HTTPS (when domain is ready)

1. DNS at registrar:

   ```text
   A  @    169.58.118.15
   A  www  169.58.118.15
   ```

   Verify: `dig +short yourdomain.com`

2. Edit `Caddyfile` (replace `example.com`):

   ```caddy
   yourdomain.com {
     reverse_proxy portfolio:80
   }
   www.yourdomain.com {
     reverse_proxy portfolio:80
   }
   ```

3. Launch HTTPS stack:

   ```bash
   cd /opt/portfolio
   git pull
   docker compose -f docker-compose.http.yml down || true
   docker compose up -d --build
   docker compose logs -f caddy   # waits ~30s for Let's Encrypt
   ```

   Visit: `https://yourdomain.com`

4. Point the deploy workflow at the HTTPS stack by changing
   `docker-compose.http.yml` to `docker compose up -d --build` in
   `.github/workflows/deploy.yml` (or keep HTTP file until switch is verified).

## 5. Everyday commands

```bash
cd /opt/portfolio
docker compose -f docker-compose.http.yml ps
docker compose -f docker-compose.http.yml logs -f
docker compose -f docker-compose.http.yml up -d --build   # manual redeploy
git pull && docker compose -f docker-compose.http.yml up -d --build
docker image prune -f
ss -tlnp | grep -E '80|443'
```

Rollback:

```bash
git log --oneline -5
git reset --hard <sha>
docker compose -f docker-compose.http.yml up -d --build
```

## Troubleshooting

- `address already in use` on port 80: `docker ps`, `docker compose down`, `docker rm -f portfolio-site`.
- Blank/old site after push: check Actions log, then `git status` + `docker ps` on VPS.
- Caddy cert fail: DNS not propagated or 80/443 blocked — wait 5 min, `docker compose restart caddy`.
- BuildKit network error in sandboxes (`npm ci` proxy error): retry with `docker build --network=host .`. Normal on VPS.
