<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Eternal Fall</title>
    <style>
        /* ======= CSS ======= */
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background-color: #000;
            color: #fff;
            text-align: center;
        }

        #mainMenu, #characterCreation, canvas {
            display: none;
        }

        #mainMenu.active, #characterCreation.active, canvas.active {
            display: block;
        }

        #characterCreation {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
        }

        .customization-section {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        #characterCreation img {
            border: 1px solid #ccc;
            background-color: #f0f0f0;
        }

        button {
            padding: 10px 20px;
            margin: 10px;
            font-size: 16px;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <!-- ======= MAIN MENU ======= -->
    <div id="mainMenu" class="active">
        <h1>Eternal Fall</h1>
        <button id="newGameBtn">New Game</button>
        <button id="loadGameBtn">Load Game</button>
        <button id="optionsBtn">Options</button>
        <button id="exitGameBtn">Exit Game</button>
    </div>

    <!-- ======= CHARACTER CREATION ======= -->
    <div id="characterCreation">
        <h2>Character Creation</h2>
        <div>
            <label>Character Name:</label>
            <input type="text" id="characterName" placeholder="Enter your name">
        </div>

        <div>
            <label>Gender:</label>
            <label><input type="radio" name="gender" value="male" checked> Male</label>
            <label><input type="radio" name="gender" value="female"> Female</label>
        </div>

        <div class="customization-section">
            <h3>Hair</h3>
            <button id="hair-left">&lt;</button>
            <img id="hairPreview" src="" alt="Hair Style" width="50">
            <button id="hair-right">&gt;</button>
        </div>

        <div class="customization-section">
            <h3>Shirt</h3>
            <button id="shirt-left">&lt;</button>
            <img id="shirtPreview" src="" alt="Shirt Style" width="50">
            <button id="shirt-right">&gt;</button>
        </div>

        <div class="customization-section">
            <h3>Trousers</h3>
            <button id="trousers-left">&lt;</button>
            <img id="trousersPreview" src="" alt="Trousers Style" width="50">
            <button id="trousers-right">&gt;</button>
        </div>

        <div>
            <h3>Character Preview</h3>
            <img id="sprite" src="" alt="Character Preview" width="100">
        </div>

        <button id="startGameBtn">Start Game</button>
    </div>

    <!-- ======= GAME CANVAS ======= -->
    <canvas id="gameCanvas" width="800" height="600" class=""></canvas>

    <!-- ======= SCRIPT ======= -->
    <script>
        // =========================
        // GAME STATE MANAGEMENT
        // =========================
        const mainMenu = document.getElementById("mainMenu");
        const characterCreation = document.getElementById("characterCreation");
        const canvas = document.getElementById("gameCanvas");
        const ctx = canvas.getContext("2d");

        document.getElementById("newGameBtn").onclick = () => {
            mainMenu.classList.remove("active");
            characterCreation.classList.add("active");
        };

        // =========================
        // CHARACTER CREATION SCRIPT
        // =========================
        let characterData = {
            gender: "male",
            hair: 0,
            shirt: 0,
            trousers: 0,
            name: ""
        };

        const hairOptions = ["hair1.png", "hair2.png", "hair3.png"];
        const shirtOptions = ["shirt1.png", "shirt2.png", "shirt3.png"];
        const trousersOptions = ["trousers1.png", "trousers2.png", "trousers3.png"];

        function updateCharacterPreview() {
            const spritePreview = document.getElementById("sprite");
            document.getElementById("hairPreview").src = `assets/sprites/${hairOptions[characterData.hair]}`;
            document.getElementById("shirtPreview").src = `assets/sprites/${shirtOptions[characterData.shirt]}`;
            document.getElementById("trousersPreview").src = `assets/sprites/${trousersOptions[characterData.trousers]}`;
            spritePreview.src = `assets/sprites/${characterData.gender}_${hairOptions[characterData.hair]}_${shirtOptions[characterData.shirt]}_${trousersOptions[characterData.trousers]}`;
        }

        document.getElementsByName("gender").forEach((radio) => {
            radio.addEventListener("change", (e) => {
                characterData.gender = e.target.value;
                updateCharacterPreview();
            });
        });

        function cycleOption(optionType, direction) {
            const optionArray = optionType === "hair" ? hairOptions : optionType === "shirt" ? shirtOptions : trousersOptions;
            characterData[optionType] = (characterData[optionType] + direction + optionArray.length) % optionArray.length;
            updateCharacterPreview();
        }

        document.getElementById("hair-left").onclick = () => cycleOption("hair", -1);
        document.getElementById("hair-right").onclick = () => cycleOption("hair", 1);
        document.getElementById("shirt-left").onclick = () => cycleOption("shirt", -1);
        document.getElementById("shirt-right").onclick = () => cycleOption("shirt", 1);
        document.getElementById("trousers-left").onclick = () => cycleOption("trousers", -1);
        document.getElementById("trousers-right").onclick = () => cycleOption("trousers", 1);

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

            characterCreation.classList.remove("active");
            canvas.classList.add("active");
            console.log("Character Created:", characterData);
            renderGame(); 
        };

        // Initialize preview
        updateCharacterPreview();

        // =========================
        // BASIC GAME LOOP FUNCTION
        // =========================
        function renderGame() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#333";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#fff";
            ctx.font = "24px Arial";
            ctx.fillText(`Welcome, ${characterData.name}!`, 300, 300);
        }
    </script>
</body>
</html>