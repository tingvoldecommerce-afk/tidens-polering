# Tidens Polering – Projekt-kontekst for Claude Code

## Virksomhed

**Tidens Polering** leverer professionel vindues- og facaderengøring til private og erhverv:
- Vinduespudsning
- Fliserens
- Tagrenderens
- Solcellevask

**Serviceområde:** Kongens Lyngby, Gentofte, Virum, Holte, Bagsværd, Lundtofte, Søllerød

**Kontakt:**
- Telefon: +45 26 24 09 33
- Email: Kontakt@tidens-polering.dk
- Adresse: Glaciset 12D, 2800 Kongens Lyngby

## Tech Stack

**Vanilla HTML/CSS/JS – ingen build-step, ingen frameworks.**

- `index.html` – alt indhold, JSON-LD schema, kontaktformular
- `styles.css` – alle CSS-variabler og styling
- `main.js` – frontend JavaScript
- `logo.png` – kundens eget logo

Ingen npm, ingen bundler, ingen transpilering. Rediger filer direkte.

## Brand & Design

**Farver (CSS-variabler):**
```css
--brand: #a1daf8   /* lyseblå – primær brand-farve */
--blue:  #188bf6   /* knap-blå – CTA-knapper */
--navy:  #182A53   /* mørkeblå – overskrifter */
```

**Font:** Inter (Google Fonts, weights 300–800)

**Tone:** Lokal, personlig og jordnær – ikke corporate eller AI-agtig. Kunden er et lille lokalt firma.

## SEO – VIGTIGT

`index.html` indeholder:
- **JSON-LD LocalBusiness schema** – bevar ved alle ændringer
- **Geo-tags** (meta name="geo.*") – bevar ved alle ændringer

Rør ikke ved disse uden eksplicit instruktion.

## Deployment

```
Lokal ændring → git commit → git push → Vercel auto-deployer → tidens-polering.dk
```

- GitHub repo: `tidens-polering` (public)
- Vercel: framework preset "Other", output directory `.` (rod)
- Custom domain: `tidens-polering.dk`

## Lokal Preview

Brug **Live Server** extension i VS Code:
- Højreklik på `index.html` → "Open with Live Server"
- Browser opdaterer automatisk ved filændringer

## Tilladte WebFetch-domæner

- tidens-polering.dk
- dk.trustpilot.com
- www.anmeld-haandvaerker.dk
