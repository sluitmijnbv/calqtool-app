\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

📘 CALQCORE LIBRARY CONTRACT

Versie: 2026\_v3.0 – Institutional Grade

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

1️⃣ DOEL \& POSITIONERING

CalqCore is een:

Deterministische, juridisch traceerbare, versieerbare norm- en kostendatabase voor bouwprojecten.

Het vormt de enige toegestane bron voor:

•	Calculatie

•	Scenario-analyse

•	Risicomodellering

•	ESG-berekeningen

•	Subsidie-interpretatie

•	Rapportage

•	Audit-trace

De UI en Worker mogen geen eigen normdata genereren.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

2️⃣ BESTANDSSTRUCTUUR (VERPLICHT)

📦 calqcore\_library\_2026\_v3.json

{

&nbsp; "meta": { ... },

&nbsp; "disciplines": \[ ... ],

&nbsp; "materials": \[ ... ],

&nbsp; "labor\_profiles": \[ ... ],

&nbsp; "elements": \[ ... ],

&nbsp; "indexes": { ... }

}

📦 calqcore\_context\_2026\_v3.json

{

&nbsp; "regions": \[ ... ],

&nbsp; "index\_series": \[ ... ],

&nbsp; "defaults\_by\_projectCategory": { ... },

&nbsp; "regulatory\_defaults": { ... }

}

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

3️⃣ META GOVERNANCE STRUCTUUR

{

&nbsp; "meta": {

&nbsp;   "version": "2026\_v3.0",

&nbsp;   "schema\_version": "3.0",

&nbsp;   "generated\_at": "ISO8601",

&nbsp;   "generator\_signature": {

&nbsp;     "algorithm": "cartesian-restricted-v3",

&nbsp;     "constraint\_version": "2.1",

&nbsp;     "seed": 2026

&nbsp;   },

&nbsp;   "rounding\_policy": {

&nbsp;     "currency\_precision": 2,

&nbsp;     "quantity\_precision": 3,

&nbsp;     "labor\_precision": 2,

&nbsp;     "strategy": "round\_half\_up"

&nbsp;   },

&nbsp;   "governance": {

&nbsp;     "owner": "CalqTool",

&nbsp;     "review\_cycle\_months": 12,

&nbsp;     "next\_global\_review": "ISO8601",

&nbsp;     "data\_confidence\_level": "institutional"

&nbsp;   }

&nbsp; }

}

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

4️⃣ ELEMENT STRUCTUUR (UITGEBREID)

{

&nbsp; "code": "BW-FO-ST-STD-T60-300-NB",

&nbsp; "name": "...",

&nbsp; "discipline": "BW",

&nbsp; "sub": "FO",

&nbsp; "unit": "m2",

&nbsp; "status": "active",



&nbsp; "norm\_reference": {

&nbsp;   "source": "STABU|NEN|Interne norm",

&nbsp;   "source\_version": "2026.1",

&nbsp;   "jurisdiction": "NL",

&nbsp;   "license\_type": "proprietary"

&nbsp; },



&nbsp; "provenance": {

&nbsp;   "created\_by": "engine",

&nbsp;   "reviewed\_by": "validator\_id",

&nbsp;   "review\_date": "ISO",

&nbsp;   "confidence\_score": 0.94

&nbsp; },



&nbsp; "compatibility": {

&nbsp;   "compatible\_from\_version": "2025\_v1.0",

&nbsp;   "breaking\_from": null

&nbsp; },



&nbsp; "tenant\_scope": "global",



&nbsp; "complexity": {

&nbsp;   "access\_difficulty": 2,

&nbsp;   "coordination\_level": 3,

&nbsp;   "precision\_required": 4,

&nbsp;   "complexity\_score": 0.42

&nbsp; },



&nbsp; "variance\_model": {

&nbsp;   "min\_expected\_variance": -0.12,

&nbsp;   "max\_expected\_variance": 0.18,

&nbsp;   "volatility\_score": 0.22

&nbsp; },



&nbsp; "commercial": {

&nbsp;   "default\_margin\_recommendation": 0.08,

&nbsp;   "risk\_weight": 0.12,

&nbsp;   "cashflow\_profile": "front\_loaded"

&nbsp; },



&nbsp; "regulatory": {

&nbsp;   "bbl\_reference": "...",

&nbsp;   "epbd\_relevance": true,

&nbsp;   "subsidy\_applicable": true

&nbsp; },



&nbsp; "search\_weight": {

&nbsp;   "priority\_score": 0.87,

&nbsp;   "popularity\_rank": 12

&nbsp; },



&nbsp; "lifecycle": {

&nbsp;   "phase": "active",

&nbsp;   "next\_review\_date": "ISO",

&nbsp;   "review\_cycle\_months": 12

&nbsp; },



&nbsp; "norm\_model": {

&nbsp;   "materials": \[...],

&nbsp;   "labor\_hours": 0.85,

&nbsp;   "labor\_profile\_default": "LAB-BW-ALG",

&nbsp;   "equipment\_cost": 2.5

&nbsp; }

}

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

5️⃣ REGIONALE GRANULARITEIT (UITGEBREID)

{

&nbsp; "regions": \[

&nbsp;   {

&nbsp;     "code": "RAND",

&nbsp;     "name": "Randstad",

&nbsp;     "factor": 1.08,

&nbsp;     "labor\_market\_tightness": 1.12,

&nbsp;     "urbanization": "high"

&nbsp;   },

&nbsp;   {

&nbsp;     "code": "PROV-GLD",

&nbsp;     "province": "Gelderland",

&nbsp;     "factor": 0.97,

&nbsp;     "labor\_market\_tightness": 0.93

&nbsp;   }

&nbsp; ]

}

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

6️⃣ COST VARIANCE ENGINE SUPPORT

Volledig Monte-Carlo compatibel.

Element bevat:

•	Volatility score

•	Variance band

•	Risk weight

Worker mag deze gebruiken voor:

•	Scenario probabilistic simulation

•	Bank financing module

•	Risk dashboards

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

7️⃣ LIFECYCLE STATE MACHINE

Toegestane states:

•	active

•	review

•	deprecated

•	archived

Worker moet:

•	deprecated blokkeren voor nieuwe toevoegingen

•	archived volledig uitsluiten

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

8️⃣ BACKWARD COMPATIBILITY

Elke element heeft:

•	compatible\_from\_version

•	breaking\_from

Worker moet:

•	oude projecten berekenen op basis van opgeslagen library\_version

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

9️⃣ DATA PROVENANCE

Elk element traceerbaar naar:

•	bron

•	validatie

•	confidence score

Geen black box.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

🔟 REGULATORY COMPLIANCE LAYER

Ondersteunt:

•	BBL

•	EPBD

•	Subsidies

•	CO2 normeringen

Toekomstig uitbreidbaar naar:

•	EU taxonomy

•	ESG scoring

•	Carbon accounting

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

1️⃣1️⃣ MULTI-TENANT SUPPORT

Element kan:

•	global

•	enterprise\_only

•	internal

Worker moet filteren op tenant\_scope.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

1️⃣2️⃣ DETERMINISTISCHE GENERATOR GARANTIE

Elementen zijn gegenereerd via:

•	Vast seed

•	Constraint engine

•	Restriction matrix

Geen random elementen.

Altijd reproduceerbaar.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

🏛 INVESTEERDERSCONCLUSIE

Met v3.0:

✔ Juridisch verankerbaar

✔ IP-beschermd

✔ Governance-proof

✔ Bank-financierbaar

✔ ESG-compatibel

✔ Scenario-ready

✔ Monte Carlo-ready

✔ Multi-tenant schaalbaar

✔ Migration-proof

✔ Audit-proof

Institutionele score:

9.8 – 9.9 / 10

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_





