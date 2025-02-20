// ===================
//  GLOBAL VARIABLES
// ===================

let characterData = {
    gender: "male",
    hair: 0,
    shirt: 0,
    trousers: 0,
    name: "",
    level: 1,
    xp: 0,
    inventory: [],
    quests: []
};

const hairOptions = ["hair1.png", "hair2.png", "hair3.png"];
const shirtOptions = ["shirt1.png", "shirt2.png", "shirt3.png"];
const trousersOptions = ["trousers1.png", "trousers2.png", "trousers3.png"];

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// ===================
//  SPLASH SCREEN
// ===================
window.onload = () => {
    setTimeout(() => {
        document.getElementById("splashScreen").style.display = "none";
        document.getElementById("mainMenu").style.display = "block";
    }, 3000);
};

// ===================
//  MAIN MENU
// ===================
document.getElementById("newGameBtn").onclick = () => {
    document.getElementById("mainMenu").style.display = "none";
    document.getElementById("characterCreation").style.display = "flex";
};

document.getElementById("settingsBtn").onclick = () => {
    document.getElementById("mainMenu").style.display = "none";
    document.getElementById("settingsScreen").style.display = "flex";
};

document.getElementById("backToMenuBtn").onclick = () => {
    document.getElementById("settingsScreen").style.display = "none";
    document.getElementById("mainMenu").style.display = "block";
};

// ===================
//  CHARACTER CREATION
// ===================
function updateCharacterPreview() {
    document.getElementById("hairPreview").src = `assets/sprites/${hairOptions[characterData.hair]}`;
    document.getElementById("shirtPreview").src = `assets/sprites/${shirtOptions[characterData.shirt]}`;
    document.getElementById("trousersPreview").src = `assets/sprites/${trousersOptions[characterData.trousers]}`;
    document.getElementById("sprite").src =
        `assets/sprites/${characterData.gender}_${hairOptions[characterData.hair]}_${shirtOptions[characterData.shirt]}_${trousersOptions[characterData.trousers]}`;
}

document.getElementsByName("gender").forEach(radio => {
    radio.addEventListener("change", (e) => {
        characterData.gender = e.target.value;
        updateCharacterPreview();
    });
});

function cycleOption(optionType, direction) {
    const optionArray = optionType === "hair" ? hairOptions :
        optionType === "shirt" ? shirtOptions : trousersOptions;
    characterData[optionType] = (characterData[optionType] + direction + optionArray.length) % optionArray.length;
    updateCharacterPreview();
}

["hair", "shirt", "trousers"].forEach(feature => {
    document.getElementById(`${feature}-left`).onclick = () => cycleOption(feature, -1);
    document.getElementById(`${feature}-right`).onclick = () => cycleOption(feature, 1);
});

document.getElementById("startGameBtn").onclick = () => {
    const nameInput = document.getElementById("characterName").value.trim();
    if (!nameInput) return alert("Please enter a character name.");
    characterData.name = nameInput;
    if (confirm("Start the game with this character?")) startGame();
};

// ===================
//  GAME INITIALIZATION
// ===================
function startGame() {
    document.getElementById("characterCreation").style.display = "none";
    canvas.style.display = "block";
    initGameLoop();
}

// ===================
//  GAME LOOP
// ===================
let keysPressed = {};
function initGameLoop() {
    window.addEventListener("keydown", (e) => keysPressed[e.key] = true);
    window.addEventListener("keyup", (e) => keysPressed[e.key] = false);
    requestAnimationFrame(gameLoop);
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handlePlayerMovement();
    requestAnimationFrame(gameLoop);
}

function handlePlayerMovement() {
    if (keysPressed["ArrowUp"] || keysPressed["w"]) console.log("Move Up");
    if (keysPressed["ArrowDown"] || keysPressed["s"]) console.log("Move Down");
    if (keysPressed["ArrowLeft"] || keysPressed["a"]) console.log("Move Left");
    if (keysPressed["ArrowRight"] || keysPressed["d"]) console.log("Move Right");
}

// ===================
//  SAVE/LOAD SYSTEM
// ===================
function saveGame(slot = 1) {
    localStorage.setItem(`EF_save_slot_${slot}`, JSON.stringify(characterData));
    alert("Game saved.");
}

function loadGame(slot = 1) {
    const data = JSON.parse(localStorage.getItem(`EF_save_slot_${slot}`));
    if (data) {
        characterData = data;
        startGame();
        alert("Game loaded.");
    } else {
        alert("No saved data in this slot.");
    }
}

// ===================
//  SECRET ADMIN PANEL
// ===================
document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === "A") toggleAdminPanel();
});

function toggleAdminPanel() {
    const panel = document.getElementById("adminPanel");
    panel.style.display = panel.style.display === "none" ? "block" : "none";
}

document.getElementById("closeAdminPanelBtn").onclick = toggleAdminPanel;

// ===================
//  ADMIN PANEL - EDITORS
// ===================
document.getElementById("mapEditorBtn").onclick = () => openEditor("Map Editor");
document.getElementById("itemEditorBtn").onclick = () => openEditor("Item Editor");
document.getElementById("npcEditorBtn").onclick = () => openEditor("NPC Editor");
document.getElementById("eventEditorBtn").onclick = () => openEditor("Event Editor");
document.getElementById("questEditorBtn").onclick = () => openEditor("Quest Editor");
document.getElementById("teleportBtn").onclick = () => teleportToMap();

function openEditor(editorName) {
    alert(`${editorName} opened.`);
}

function teleportToMap() {
    const mapID = prompt("Enter Map ID to teleport to:");
    if (mapID) console.log(`Teleporting to Map ID: ${mapID}`);
}

// ===================
//  INVENTORY SYSTEM
// ===================
function addItemToInventory(itemID) {
    if (characterData.inventory.length < 28) {
        characterData.inventory.push(itemID);
        console.log(`Item ${itemID} added to inventory.`);
    } else alert("Inventory full.");
}

// ===================
//  QUEST SYSTEM
// ===================
function acceptQuest(questID) {
    if (!characterData.quests.includes(questID)) {
        characterData.quests.push(questID);
        console.log(`Quest ${questID} accepted.`);
    }
}

// ===================
//  LEVELING SYSTEM
// ===================
function gainXP(amount) {
    characterData.xp += amount;
    if (characterData.xp >= characterData.level * 100) {
        characterData.level++;
        characterData.xp = 0;
        console.log(`Level Up! Now Level ${characterData.level}`);
    }
}

// ===================
//  INITIAL PREVIEW
// ===================
updateCharacterPreview();