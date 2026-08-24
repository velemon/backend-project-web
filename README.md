# Frontend – Seoul Crunch

Detta repository innehåller frontend-delen för **Seoul Crunch**, ett fiktivt företag som säljer Korean Fried Chicken med olika marinader.

Frontend-webbplatsen är en separat del av projektet och använder REST API:et från backend som datakälla. Menyn hämtas dynamiskt från API:et och visas på den publika webbplatsen.

Frontend innehåller även ett separat administrationsgränssnitt där personal kan logga in och administrera menyn.

---

## Teknik

- HTML
- CSS
- JavaScript
- Fetch API
- REST API
- JWT
- Git

---

## Backend/API

Frontend kommunicerar med REST-webbtjänsten som körs lokalt på:

```text
http://localhost:3000

Menydata hämtas från:

http://localhost:3000/api/menu

Inloggning för administrationsgränssnittet sker via:

http://localhost:3000/api/auth/login

Backend måste vara igång för att frontendens dynamiska meny och administration ska fungera.

## Publik webbplats

Den publika webbplatsen presenterar Seoul Crunch och innehåller bland annat:

* Navigation
* Presentation av företaget
* Dynamisk meny
* Priser
* Öppettider
* Fiktiv adress och telefonnummer
* Responsiv design

Menyinformationen skrivs inte direkt i HTML-koden utan hämtas från REST API:et.

## Dynamisk meny

Frontend använder JavaScript och Fetch API för att hämta menydata från backend.

Exempel:

fetch("http://localhost:3000/api/menu")

API:ets JSON-svar används sedan för att skapa menyinnehållet dynamiskt på sidan. Det innebär att ändringar som görs av administratören i databasen kan visas på den publika webbplatsen utan att HTML-koden behöver ändras manuellt.

## Administrationsgränssnitt

Administrationsdelen används av personalen för att hantera restaurangens meny.

Administratören kan:

* Logga in
* Visa maträtter
* Skapa nya maträtter
* Uppdatera maträtter
* Radera maträtter
* Logga ut

Administrativa ändringar skickas till REST API:et med Fetch API.

## JWT

Vid inloggning skickas användarnamn och lösenord till backend:

POST /api/auth/login

Vid korrekt inloggning returnerar REST API:et en JWT-token. Token sparas i frontend och skickas sedan med vid skyddade API-anrop:

Authorization: Bearer DIN_TOKEN

Det gör att endast inloggade administratörer kan skapa, ändra och radera maträtter.

## Responsiv design

Webbplatsen är byggd med responsiv CSS så att den fungerar på olika skärmstorlekar, exempelvis:

* Mobil
* Surfplatta
* Laptop
* Stationär dator

Designen använder en modern cyberpunk-inspirerad grafisk profil som riktar sig mot en yngre målgrupp som är intresserad av asiatisk mat och kultur.

## Installation

Klona projektet och gå till frontend-mappen:

cd frontend

Installera projektets npm-paket:

npm install

Starta sedan frontend-projektet enligt projektets konfiguration.

Backend måste samtidigt vara igång:

http://localhost:3000