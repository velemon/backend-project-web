// api.js - Denna fil innehåller funktioner för att kommunicera med backend-API:et
const BASE_URL = "http://localhost:3000/api";

// Funktion för att hämta menyn från backend
async function getMenu() {
    // Använd fetch för att hämta data från backend-API:et
    const res = await fetch(`${BASE_URL}/menu`);
    return await res.json();
}