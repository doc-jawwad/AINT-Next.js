# DNS audit — aintfoundationcic.co.uk

Captured: 2026-09-11 14:53:59Z

## Important
- Change **only** web records (A / AAAA / CNAME for @ and www) to Vercel.
- **Do not edit MX, SPF, DKIM, or DMARC** during cutover — email may be on Hostinger via IONOS DNS.

## Current records (lookup)

### NS
- hermes.dns-parking.com
- artemis.dns-parking.com
- 
- 
- 
- 

### A (@)
- 91.108.100.21
- 191.101.228.225
- 
- 
- 172.64.52.144
- 172.64.53.131
- 2606:4700:52::ac40:3490
- 2606:4700:5a::ac40:3583

### AAAA
- 2a02:4780:15:67f3:f8d9:7353:a040:58e6
- 2a02:4780:38:a77d:6d8:c52e:c1cb:9f34

### CNAME www
- www.aintfoundationcic.co.uk.cdn.hstgr.net
- artemis.dns-parking.com
- hermes.dns-parking.com
- 
- 
- 
- 

### MX (leave unchanged)
- 10 mx00.ionos.co.uk
- 20 mx01.ionos.co.uk

### TXT (SPF / verification — leave mail-related unchanged)
- v=spf1 include:_spf-eu.ionos.com ~all
- 
- 
- 
- 
- 
- 


## Findings summary
- **Nameservers:** Hostinger (*.dns-parking.com) — manage DNS in **Hostinger**, not IONOS DNS (unless NS are changed later).
- **Website today:** Hostinger (www → cdn.hstgr.net).
- **Email today:** **IONOS** MX (mx00/mx01.ionos.co.uk) + IONOS SPF. Leave these alone when switching web to Vercel.

## Vercel cutover steps
1. Vercel project → Settings → Domains → add `aintfoundationcic.co.uk` and `www.aintfoundationcic.co.uk`.
2. Copy the A/CNAME values Vercel shows.
3. In IONOS DNS: update **only** those web records.
4. Wait for SSL (often minutes; can be up to 48h).
5. Smoke-test: homepage, CarePatron booking, `/contact` form, newsletter, `mailto:info@`.
6. Send a test email **to** `info@aintfoundationcic.co.uk` from an external account to confirm MX still works.

## Resend (after mail is confirmed working)
Verify the domain in Resend using a `send` subdomain or carefully merge SPF — do not remove existing Hostinger/IONOS SPF includes.

