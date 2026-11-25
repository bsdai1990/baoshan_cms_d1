# Baoshan CMS - Cloudflare D1 Version

This project is the Cloudflare D1 version of the Baoshan CMS, based on Next.js + OpenNext for Cloudflare + D1.

## Stack

- Next.js 16
- React 19
- Cloudflare Workers / Pages via OpenNext
- Cloudflare D1 database
- HttpOnly session cookie admin authentication

## Local / Cloudflare setup

### 1. Install dependencies

```bash
npm install
```

### 2. Create a D1 database

```bash
npx wrangler login
npx wrangler d1 create baoshan_cms
```

Copy the returned `database_id` into `wrangler.jsonc`:

```jsonc
"database_id": "your-d1-database-id"
```

### 3. Apply migrations

Local D1:

```bash
npm run d1:migrate:local
```

Remote D1:

```bash
npm run d1:migrate:remote
```

### 4. Set session secret for production

```bash
npx wrangler secret put CMS_SESSION_SECRET
```

Use a long random string.

### 5. Preview on Cloudflare runtime

```bash
npm run cf:build
npm run cf:preview
```

### 6. Deploy

```bash
npm run cf:deploy
```

## Default admin account

After running the seed migration:

- Email: `admin@example.com`
- Password: `Admin@123456`

Change this before production use.

## Notes

`npm run dev` starts the regular Next.js dev server and does not provide the Cloudflare D1 binding. For D1 testing, use `npm run cf:preview`.
