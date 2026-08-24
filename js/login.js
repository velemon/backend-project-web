// login.js - Denna fil innehåller logiken för att hantera inloggning av administratörer

// Funktion som körs när sidan laddas
async function login() {

    // Hämta användarnamn och lösenord från input-fälten
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Skicka en POST-förfrågan till backend-API:et för att logga in
    const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        // Skicka användarnamn och lösenord i request body
        body: JSON.stringify({
            username,
            password
        })
    });

    // Hämta svaret från API:et
    const data = await res.json();

    // Om inloggningen lyckades, spara token i localStorage och omdirigera till admin-sidan
    if (data.token) {
        localStorage.setItem("token", data.token);
        window.location.href = "admin.html";

        // Om inloggningen misslyckades, visa ett felmeddelande
    } else {
        document.getElementById("error").innerText =
            "Wrong username or password";
    }
}