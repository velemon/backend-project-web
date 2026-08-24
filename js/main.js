// main.js - Denna fil innehåller logiken för att hantera användarinteraktioner och uppdatera gränssnittet

// Importera funktioner från api.js
async function loadMenu() {

    // Hämta menyn från backend-API:et
    const menu = await getMenu();
    const container = document.getElementById("menu");

    // Loopa genom menyn och skapa HTML-element för varje maträtt
    menu.forEach(item => {
        container.innerHTML += `
            <div class="card">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <p class="marinade">${item.marinade}</p>
                <p class="price">${item.price} kr</p>            
            </div>
        `;
    });
}

// Ladda menyn när sidan laddas
loadMenu();