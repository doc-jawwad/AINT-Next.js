# AINT Foundation CIC

Next.js website (Vercel). Migrated from WordPress.

```bash
npm install
cp .env.example .env.local   # fill Resend + Mailchimp keys
npm run dev
```

## Environment variables (Vercel)

| Variable | Purpose |
|----------|---------|
| `RESEND_API_KEY` | Contact / community forms |
| `CONTACT_TO_EMAIL` | Defaults to `info@aintfoundationcic.co.uk` |
| `RESEND_FROM_EMAIL` | Optional verified sender |
| `MAILCHIMP_API_KEY` | Footer newsletter |
| `MAILCHIMP_AUDIENCE_ID` | Mailchimp audience/list ID |
| `MAILCHIMP_SERVER_PREFIX` | e.g. `us21` |

## Deploy

Import [doc-jawwad/AINT-Next.js](https://github.com/doc-jawwad/AINT-Next.js) in Vercel. Root Directory: `/` (repo root). Framework: Next.js.

Add the env vars above, then redeploy.

## Domain / email (IONOS)

When pointing `aintfoundationcic.co.uk` at Vercel, change **only** A/CNAME for `@` and `www`. **Do not change MX** (email may live on Hostinger or IONOS). See `docs/DNS-CUTOVER.md`.
