// admin.js - Hanterar adminsidan för att skapa, läsa, uppdatera och ta bort rätter i menyn
// JWT skydd
const token = localStorage.getItem("token");

// Om det inte finns någon token, skicka användaren till loginsidan
if (!token) {
    window.location.href = "../login/login.html";
}

// State
// currentMenu håller den aktuella menyn som hämtas från API:et
let currentMenu = [];
let editId = null;

// startar med att hämta menyn när sidan laddas
getMenu();

// Read (get menu)
async function getMenu() {

    // Skicka en GET-förfrågan till API: et för att hämta menyn, inklusive token i headers för autentisering
    const res = await fetch("http://localhost:3000/api/menu", {
        // Använd GET-metoden för att hämta menyn
        headers: {
            "Authorization": "Bearer " + token
        }
    });

    // Hämta svaret från API:et som JSON och spara det i currentMenu
    currentMenu = await res.json();

    // Rendera menyn på sidan med hjälp av currentMenu
    renderMenu(currentMenu);
}

// Render menu
function renderMenu(items) {

    // Hämta container-elementet där menyn ska visas
    const container = document.getElementById("menu");

    // Rensa container innan rendering för att undvika dubbletter
    container.innerHTML = "";

    // Loopa igenom varje rätt i menyn och skapa HTML-kort för varje rätt
    items.forEach(item => {

        // Lägg till ett kort för varje rätt i container-elementet, inklusive namn, beskrivning, marinad, pris och knappar för att uppdatera eller ta bort rätten
        container.innerHTML += `
            <div class="card">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <p>${item.marinade}</p>
                <p class="price">${item.price} kr</p>
                <button onclick="openEdit(${item.id})">Update</button>
                <button onclick="deleteDish(${item.id})">Delete</button>
            </div>
        `;
    });
}

// Create
async function createDish() {

    // Hämta värdena från create-formuläret
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const marinade = document.getElementById("marinade").value;
    const price = document.getElementById("price").value;
    const errorBox = document.getElementById("createError");

    // Validera att alla obligatoriska fält är ifyllda
    if (!name || !description || !marinade || !price) {
        errorBox.innerText = "Fyll i alla obligatoriska fält.";
        return;
    }

    // Rensa eventuella tidigare felmeddelanden
    errorBox.innerText = "";

    // Skicka en POST-förfrågan till API:et för att skapa en ny rätt
    const res = await fetch("http://localhost:3000/api/menu", {
        // Använd POST-metoden för att skapa en ny rätt
        method: "POST",
        // Skicka med token i headers för autentisering
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        // Skicka de nya rättens värden i body som JSON
        body: JSON.stringify({
            name,
            description,
            marinade,
            price
        })
    });

    // Hämta svaret från API:et som JSON
    const data = await res.json();

    // Om API:et returnerar ett fel, visa meddelandet i errorBox
    if (!res.ok) {
        errorBox.innerText = data.message || "Något gick fel";
        return;
    }

    // clear inputs efter skapande
    document.getElementById("name").value = "";
    document.getElementById("description").value = "";
    document.getElementById("marinade").value = "";
    document.getElementById("price").value = "";

    // Visa en toast-notis när rätten är skapad
    showToast("Dish saved ✔");

    // Uppdatera menyn efter att ha skapat en ny rätt
    getMenu();
}

// Öppna edit
function openEdit(id) {

    // Hitta rätten i currentMenu baserat på ID
    const item = currentMenu.find(d => d.id === id);

    // Spara ID:t i editId för att veta vilken rätt som redigeras
    editId = id;

    // Fyll edit-formuläret med rätten's nuvarande värden
    document.getElementById("editName").value = item.name;
    document.getElementById("editDescription").value = item.description;
    document.getElementById("editMarinade").value = item.marinade;
    document.getElementById("editPrice").value = item.price;
    document.getElementById("editBox").classList.remove("hidden");
}

// Spara edit (put)
async function saveEdit() {
    // Hämta värdena från edit-formuläret
    const name = document.getElementById("editName").value;
    const description = document.getElementById("editDescription").value;
    const marinade = document.getElementById("editMarinade").value;
    const price = document.getElementById("editPrice").value;

    // Skicka en PUT-förfrågan till API:et för att uppdatera rätten
    await fetch(`http://localhost:3000/api/menu/${editId}`, {
        // Använd PUT-metoden för att uppdatera rätten
        method: "PUT",
        // Skicka med token i headers för autentisering
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        // Skicka de uppdaterade värdena i body som JSON
        body: JSON.stringify({
            name,
            description,
            marinade,
            price
        })
    });

    // Stäng edit-boxen efter att ha sparat ändringarna
    closeEdit();

    // Visa en toast-notis när rätten är uppdaterad
    showToast("Dish updated ✨");

    // Uppdatera menyn efter att ha sparat ändringarna
    getMenu();
}

// Stäng edit-boxen
// Tar bort "hidden"-klassen för att dölja edit-boxen
function closeEdit() {
    document.getElementById("editBox").classList.add("hidden");
}

// Delete
// Tar bort en rätt baserat på ID
async function deleteDish(id) {

    // Tar bort rätten från API:et
    await fetch(`http://localhost:3000/api/menu/${id}`, {
        // Använder DELETE-metoden för att ta bort rätten
        method: "DELETE",
        // Skickar med token i headers för autentisering
        headers: {
            "Authorization": "Bearer " + token
        }
    });

    // Visa en toast-notis när rätten är borttagen
    showToast("Dish deleted 🗑️");

    // Uppdatera menyn efter borttagning
    getMenu();
}

// Logout
// Tar bort token och skickar tillbaka till loginsidan
function logout() {
    localStorage.removeItem("token");
    window.location.href = "../admin/login.html";
}

// Toast-funktion för att visa meddelanden
function showToast(message) {

    // Hämta toast-elementet
    const toast = document.getElementById("toast");

    // Sätt meddelandet i toasten
    toast.innerText = message;

    // Visa toasten
    toast.classList.remove("hidden");

    // Dölj toasten efter 2 sekunder
    setTimeout(() => {
        toast.classList.add("hidden");
    }, 2000);
}