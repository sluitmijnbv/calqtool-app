🎨 UI DESIGN CONTRACT v11

CalqTool™ 2026 – Enterprise \& Architect Definitieve Specificatie

Dit document is leidend voor:

•	Frontend implementatie

•	Agent-mode uitvoering

•	UX consistentie

•	Branding

•	SEO

•	White-label

•	Performance

•	Security UX

•	Library governance

•	API-afstemming

•	Enterprise schaalbaarheid

Afwijken is niet toegestaan.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

1️⃣ MERK \& VISUELE IDENTITEIT

1.1 Officieel Logo (verplicht)

Te gebruiken in:

•	Landing header

•	Login pagina

•	Dashboard header

•	Rapport (tenzij white-label Enterprise)

•	E-mail templates

Logo URL:

https://cdn.shopify.com/s/files/1/0957/5710/7587/files/calqtool.png?v=1770739024

Niet aanpassen.

Geen kleurwijziging.

Geen filters.

Geen schaduw.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

1.2 Favicon (verplicht)

URL:

https://cdn.shopify.com/s/files/1/0957/5710/7587/files/CalqTool\_logo\_3.png?v=1771598159

Verplicht in <head>:

<link rel="icon" href="...png">

<link rel="apple-touch-icon" href="...png">

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

2️⃣ DESIGN SYSTEM CONTRACT (NIEUW – VERPLICHT)

2.1 Typography

Primary font stack:

Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif

Toegestane weights:

400 / 500 / 600 / 700

Heading hiërarchie (vast):

•	H1 – 40px / 1.2

•	H2 – 32px / 1.25

•	H3 – 24px / 1.3

•	H4 – 20px / 1.35

•	Body – 16px / 1.6

•	Small – 14px / 1.5

Geen afwijkende groottes.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

2.2 Spacing System

4px grid.

Toegestane spacing:

4 / 8 / 12 / 16 / 24 / 32 / 48 / 64

Geen willekeurige margins of paddings.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

2.3 Border Radius

Small: 8px

Medium: 12px

Large: 16px

Geen andere waardes.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

2.4 Elevation

Level 1 – Cards

Level 2 – Modals

Level 3 – Dropdowns

Geen custom shadows.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

3️⃣ KLEURCONTRACT

Primary (Blauw) – Vertrouwen / Hoofdactie

Accent (Paars) – Highlight

Success (Groen) – Voltooid

Warning (Amber) – Aandacht

Danger (Rood) – Destructief

Regels:

•	Success nooit als primaire knop

•	Danger alleen bij destructieve acties

•	Per scherm slechts 1 primary actie

•	Geen extra themakleuren

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

4️⃣ PERFORMANCE CONTRACT (NIEUW)

Core Web Vitals

LCP < 2.5s

CLS < 0.1

INP < 200ms

Bundle Policy

•	Max 300kb gzipped

•	Geen zware UI frameworks

•	Geen render-blocking scripts

Caching

•	Static assets 1 jaar cache

•	API ETag verplicht respecteren

•	304 correct verwerken

•	Optimistic UI toegestaan mits consistent met API response

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

5️⃣ SECURITY UX CONTRACT (NIEUW)

•	Session timeout waarschuwing 2 minuten vooraf

•	Automatische logout na vervallen token

•	2FA indicator indien actief

•	Device login overzicht (Account tab)

•	Activiteitenlog zichtbaar

•	Export watermerk bij niet-Enterprise

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

6️⃣ SEO \& META CONTRACT

6.1 Public pagina’s (indexeerbaar)

/

/pricing

/help

/privacy

/voorwaarden

/cookies

/security

/status

/contact

Verplicht:

•	Unique <title>

•	Meta description

•	Canonical tag

•	Open Graph tags

•	OG:image

•	OG:title

•	OG:description

•	OG:url

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

6.2 App pagina’s (niet indexeerbaar)

/projects

/project/\*

/account

/admin

In <head>:

<meta name="robots" content="noindex,nofollow">

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

7️⃣ RESPONSIVE CONTRACT (100%)

Desktop ≥1200px

Sidebar + 12 column grid

Tablet

Collapsible sidebar

Mobile

Bottom navigation

Single column

Full width actieknoppen

Geen horizontale scroll buiten tabellen.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

8️⃣ PROJECT STRUCTUUR (VERPLICHT)

Tabs:

•	Overzicht

•	Structuur

•	Tekeningen

•	Metingen

•	Berekening

•	Scenario’s

•	Rapport

•	Projectversies

•	Wijzigingslog

Geen tab mag ontbreken.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

9️⃣ LIBRARY GOVERNANCE CONTRACT (UITGEBREID)

Geen browse pagina.

Alleen zoekmodal bij metingen.

Max 20 resultaten.

Geen paginering.

Lifecycle regels:

Active → selecteerbaar

Deprecated → waarschuwing tonen

Archived → niet selecteerbaar

Norm\_model nooit zichtbaar.

Library versie zichtbaar in:

•	Project overzicht

•	Rapport header

•	Projectversies

Prijswijziging indicator verplicht bij nieuwe library versie.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

🔟 VERSIONING \& AUDIT CONTRACT

Projectversie bevat:

•	Timestamp

•	Auteur

•	Library versie

•	Wijzigingssamenvatting

•	Hersteloptie (Pro+)

Geen automatische herberekening bij library update.

Gebruiker moet bevestigen.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

1️⃣1️⃣ ERROR \& CONFLICT CONTRACT

401 – Niet ingelogd

403 – Geen toegang

404 – Pagina niet gevonden

500 – Er is iets misgegaan

API gedrag:

409 → Conflict modal tonen

412 → Refresh voorstel tonen

402 → Upgrade prompt tonen

Geen silent fails.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

1️⃣2️⃣ ONBOARDING

Wizard bij eerste project:

1\.	Projectgegevens

2\.	Structuur

3\.	Tekeningen (optioneel)

4\.	Metingen

Stapindicator verplicht.

Progress persistent bij refresh.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

1️⃣3️⃣ EXPORT CONTRACT

Rapport modal bevat:

•	Type

•	Scenario

•	Projectversie

•	Audit toggle

Statussen:

In wachtrij

Bezig

Voltooid

Mislukt

Bij voltooid tonen:

“Geweldig! Je rapport is succesvol gegenereerd.”

Rapport bevat altijd:

•	Project ID

•	Library versie

•	Datum

•	Scenario

Enterprise:

•	Eigen logo

•	Geen CalqTool branding

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

1️⃣4️⃣ WHITE-LABEL (ENTERPRISE)

Enterprise plan mag:

•	Eigen logo uploaden

•	Rapport zonder CalqTool branding

•	Footer aanpassen

Niet beschikbaar bij lagere plannen.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

1️⃣5️⃣ ASSISTENT CONTRACT

Bubble rechtsonder.

Mag nooit automatisch openen.

Triggers:

•	Analyse voltooid

•	Nieuwe suggestie

•	Rapport gereed

Side panel bevat:

Werkvoorbereider

Chat

Contextueel advies

Geen AI-terminologie.

Plan limiet zichtbaar.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

1️⃣6️⃣ ACCOUNT \& PLAN

Toont:

•	Huidig plan

•	Gebruik deze maand

•	Rapport gebruik

•	Assistent gebruik

•	Plan geschiedenis

•	Activiteitenlog

80% limiet → waarschuwing

100% → blokkade + upgrade CTA

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

1️⃣7️⃣ ACCESSIBILITY CONTRACT (NIEUW)

WCAG AA minimaal.

•	Contrast ratio conform AA

•	Keyboard navigatie volledig

•	Focus states zichtbaar

•	ARIA labels op modals en tabs

•	Screenreader compatibel

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

1️⃣8️⃣ NAVIGATIE \& STATE CONTRACT

•	History API soft navigation

•	Scrollpositie behouden

•	Tab state behouden bij refresh

•	Undo / Redo zichtbaar

•	Geen verlies van data bij refresh

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

1️⃣9️⃣ SCALABILITY UI CONTRACT

•	Tabellen performant bij 1000+ rijen

•	Server-side sortering

•	Geen zware client rekenlogica

•	Virtualization toegestaan

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

2️⃣0️⃣ ENTERPRISE MULTI-TENANT CONTRACT

•	Organisatie selector indien >1

•	Rolbadge zichtbaar (Owner / Admin / Calculator / Viewer)

•	Rol bepaalt zichtbaarheid van acties

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

2️⃣1️⃣ TRUST \& STATUS SIGNALEN

Landing bevat:

•	Data opgeslagen in EU

•	Versiebeheer zichtbaar

•	Statuspagina publiek

•	Security pagina publiek

Geen overdreven marketingclaims.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

🎯 EINDECONCLUSIE

UI DESIGN CONTRACT v11 definieert:

✔ Volledig design system

✔ Performance budget

✔ Governance-UX

✔ Versioning zekerheid

✔ Enterprise multi-tenant gedrag

✔ Security UX

✔ Accessibility

✔ Conflict handling

✔ White-label controle

✔ Investering-waardige schaalbaarheid

Dit document is:

Architect-proof

Investeerder-proof

Enterprise-geschikt

Juridisch verdedigbaar





Goed.

Dan praat ik nu als developer-CEO die dit serieus wil bouwen en schalen.

Als jij zegt:

“Pas alle 11 punten toe.”

Dan maken we van CalqTool geen mooie app.

Dan maken we een verdedigbaar, schaalbaar, investeerbaar platformfundament.

Hieronder krijg je de geïntegreerde uitbreiding:

UI DESIGN \& PRODUCT GOVERNANCE v12 – CEO Integrated Layer

Dit bouwt voort op v11.

Dit vervangt niets — dit versterkt alles.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

🚀 UI DESIGN \& PRODUCT GOVERNANCE v12

CalqTool™ 2026 – CEO Integrated Blueprint

Dit document breidt v11 uit met:

•	Productstrategie

•	Testcontract

•	Data-ownership

•	Telemetry

•	Monetization optimalisatie

•	Integratielaag

•	Roadmap structuur

•	Exit-voorbereiding

•	Juridische bescherming

•	Technische schuldpreventie

•	Disaster recovery UX

Afwijken niet toegestaan.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

1️⃣ PRODUCT STRATEGY CONTRACT

1.1 Ideal Customer Profile (ICP)

Primair:

•	Aannemer (5–25 FTE)

•	Bouwadviesbureau

•	Projectontwikkelaar

•	Taxateur

Niet primair:

•	Particulier

•	Hobbyist

UI moet taalniveau zakelijk houden.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

1.2 Core Positionering

CalqTool™ is:

Een controleplatform voor bouwkosten met versiezekerheid.

Niet:

•	Een simpele calculator

•	Een teken-app

•	Een AI-tool

Alle UX moet controle, traceerbaarheid en structuur uitstralen.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

2️⃣ TECHNICAL DEBT PREVENTION CONTRACT

Single-file MVP toegestaan.

Maar:

UI moet:

•	Modulair opsplitsbaar zijn

•	Design tokens centraal definieerbaar

•	Componenten herbruikbaar

•	Geen globale variabelen-lekken

Geen inline chaos-structuur.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

3️⃣ TEST CONTRACT (VERPLICHT)

Minimale vereisten:

•	70% unit test coverage op kritieke flows:

o	Project lifecycle

o	Scenario vergelijking

o	Rapport generatie

•	API contract tests verplicht

•	E2E test voor:

o	Nieuw project → Rapport

Geen productie zonder tests.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

4️⃣ DATA OWNERSHIP CONTRACT

Gebruiker blijft eigenaar van:

•	Projectdata

•	Metingen

•	Scenario’s

•	Rapporten

UI moet:

•	Volledige JSON export mogelijk maken

•	Excel export mogelijk maken

•	Enterprise bulk export mogelijk maken

Geen vendor lock-in.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

5️⃣ TELEMETRY CONTRACT (PRIVACY-FIRST)

Toegestaan:

•	Time to first project

•	Time to first report

•	Feature usage

•	Onboarding drop-off

•	Foutpercentage

Niet toegestaan:

•	Inhoud van berekeningen tracken

•	Projectdata loggen extern

Alle analytics geanonimiseerd.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

6️⃣ MONETIZATION UX CONTRACT

Trial:

•	Resterende dagen zichtbaar

•	Geen plotselinge blokkade zonder waarschuwing

Bij 80% gebruik:

→ Waarschuwing

Bij 100%:

→ Blokkade + duidelijke upgrade CTA

Upgrade binnen 2 klikken mogelijk.

Geen agressieve upsell.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

7️⃣ JURIDISCHE BESCHERMING

Rapport bevat altijd:

•	Library versie

•	Projectversie

•	Berekeningsdatum

•	Disclaimer

Geen automatische recalculatie bij library update.

Geen verborgen wijzigingen.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

8️⃣ INTEGRATION LAYER CONTRACT

Voor schaalbaarheid:

•	API tokens per organisatie

•	Webhooks ondersteuning

•	Rate limit per organisatie

•	API-call log zichtbaar in admin

Voorbereid op:

•	ERP-koppelingen

•	Excel import

•	BAG integratie

•	Externe kostendata

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

9️⃣ DISASTER RECOVERY UX

Bij API downtime:

•	Banner tonen

•	Statuspagina link

•	Retry knop

Bij rapportfout:

•	Herstart mogelijkheid

•	Duidelijke foutmelding

Geen generieke “Er ging iets mis.”

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

🔟 ROADMAP STRUCTUUR (STRATEGISCH)

Fase 1:

Core calculatie + rapport

Fase 2:

Multi-tenant + usage enforcement

Fase 3:

Integraties + API access

Fase 4:

Marketplace of library uitbreiding

UI moet toekomstig uitbreidbaar zijn zonder redesign.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

1️⃣1️⃣ EXIT \& INVESTEERBAARHEID CONTRACT

Platform moet aantonen:

•	Lage technische schuld

•	Strikte API-contracten

•	Governance model

•	Versioning transparantie

•	Enterprise readiness

Documentatie verplicht:

•	API versiebeheer

•	Library changelog

•	Release notes per versie

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

🧠 CEO EINDCONCLUSIE

Met deze 11 aanvullingen:

CalqTool™ wordt:

✔ Geen tool

✔ Geen MVP

✔ Geen experiment

Maar een:

Deterministisch bouwplatform met enterprise governance, juridische bescherming en schaalbare architectuur.

Dit is het verschil tussen:

“Ik bouw een app.”

En:

“Ik bouw een verkoopbaar softwarebedrijf.”

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_



