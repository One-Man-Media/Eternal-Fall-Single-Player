// ======================================
// SPLASH SCREEN AND MAIN MENU FUNCTIONS
// ======================================
window.onload = function() {
    setTimeout(() => {
        document.getElementById("splashScreen").style.display = "none";
        document.getElementById("mainMenu").style.display = "block";
    }, 3000); // 3 seconds splash screen
};

// ===================
// GAME FUNCTIONALITY
// ===================
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
let player = { x: 400, y: 300, speed: 3 };

// Player movement
document.addEventListener("keydown", (e) => {
    if (canvas.style.display === "block") {
        if (e.key === "ArrowUp" || e.key === "w") player.y -= player.speed;
        if (e.key === "ArrowDown" || e.key === "s") player.y += player.speed;
        if (e.key === "ArrowLeft" || e.key === "a") player.x -= player.speed;
        if (e.key === "ArrowRight" || e.key === "d") player.x += player.speed;
        renderGame();
    }
});

function renderGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "blue";
    ctx.fillRect(player.x, player.y, 30, 30); // Placeholder player
}

// ===================
// MAIN MENU HANDLING
// ===================
document.getElementById("newGameBtn").onclick = () => {
    document.getElementById("mainMenu").style.display = "none";
    document.getElementById("characterCreation").style.display = "block";
};

// ===================
// CHARACTER CREATION
// ===================

// Character data
let characterData = {
    gender: "male",
    hair: 0,
    shirt: 0,
    trousers: 0,
    name: ""
};

// Arrays for customization options (assuming sprites follow these indexes)
const hairOptions = ["hair1.png", "hair2.png", "hair3.png"];
const shirtOptions = ["shirt1.png", "shirt2.png", "shirt3.png"];
const trousersOptions = ["trousers1.png", "trousers2.png", "trousers3.png"];

// Update character preview based on selections
function updateCharacterPreview() {
    const spritePreview = document.getElementById("sprite");
    spritePreview.src = `assets/sprites/${characterData.gender}_${hairOptions[characterData.hair]}_${shirtOptions[characterData.shirt]}_${trousersOptions[characterData.trousers]}`;
}

// Gender selection
document.getElementsByName("gender").forEach((radio) => {
    radio.addEventListener("change", (e) => {
        characterData.gender = e.target.value;
        updateCharacterPreview();
    });
});

// Arrow controls for customization
function cycleOption(optionType, direction) {
    const optionArray = optionType === "hair" ? hairOptions : optionType === "shirt" ? shirtOptions : trousersOptions;
    characterData[optionType] = (characterData[optionType] + direction + optionArray.length) % optionArray.length;
    updateCharacterPreview();
}

// Arrow button event listeners
document.getElementById("hair-left").onclick = () => cycleOption("hair", -1);
document.getElementById("hair-right").onclick = () => cycleOption("hair", 1);
document.getElementById("shirt-left").onclick = () => cycleOption("shirt", -1);
document.getElementById("shirt-right").onclick = () => cycleOption("shirt", 1);
document.getElementById("trousers-left").onclick = () => cycleOption("trousers", -1);
document.getElementById("trousers-right").onclick = () => cycleOption("trousers", 1);

// Start Game with Validation
document.getElementById("startGameBtn").onclick = () => {
    const nameInput = document.getElementById("characterName").value.trim();
    if (!nameInput) {
        alert("Please enter a character name.");
        return;
    }
    characterData.name = nameInput;

    if (!characterData.gender) {
        alert("Please select a gender.");
        return;
    }

    document.getElementById("characterCreation").style.display = "none";
    canvas.style.display = "block";
    renderGame();
};

// ===================
// LOAD GAME HANDLING
// ===================
document.getElementById("loadGameBtn").onclick = () => {
    document.getElementById("mainMenu").style.display = "none";
    document.getElementById("loadGameScreen").style.display = "block";
};

document.getElementById("backFromLoad").onclick = () => {
    document.getElementById("loadGameScreen").style.display = "none";
    document.getElementById("mainMenu").style.display = "block";
};

// ===================
// OPTIONS HANDLING
// ===================
document.getElementById("optionsBtn").onclick = () => {
    document.getElementById("mainMenu").style.display = "none";
    document.getElementById("optionsScreen").style.display = "block";
};

document.getElementById("backFromOptions").onclick = () => {
    document.getElementById("optionsScreen").style.display = "none";
    document.getElementById("mainMenu").style.display = "block";
};

document.getElementById("exitGameBtn").onclick = () => window.close();

// ===================
// MAP EDITOR SECTION
// ===================
let mapData = [];
function initMap(width, height) {
    mapData = Array.from({ length: height }, () => Array(width).fill(0));
}

function renderMap() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let y = 0; y < mapData.length; y++) {
        for (let x = 0; x < mapData[y].length; x++) {
            ctx.fillStyle = mapData[y][x] === 1 ? "gray" : "green";
            ctx.fillRect(x * 50, y * 50, 50, 50);
        }
    }
}

canvas.addEventListener("click", (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / 50);
    const y = Math.floor((e.clientY - rect.top) / 50);
    mapData[y][x] = 1;
    renderMap();
});

document.getElementById("mapEditorBtn").onclick = () => {
    document.getElementById("mainMenu").style.display = "none";
    document.getElementById("mapEditorPanel").style.display = "block";
    canvas.style.display = "block";
    initMap(16, 12);
    renderMap();
};

document.getElementById("exitMapEditor").onclick = () => {
    document.getElementById("mapEditorPanel").style.display = "none";
    document.getElementById("mainMenu").style.display = "block";
    canvas.style.display = "none";
};