document.addEventListener("DOMContentLoaded", function() {
    const splashScreen = document.getElementById("splashScreen");
    const mainMenu = document.getElementById("mainMenu");
    const characterCreation = document.getElementById("characterCreation");
    const loadGameScreen = document.getElementById("loadGame");
    const optionsScreen = document.getElementById("optionsScreen");
    const gameCanvas = document.getElementById("gameCanvas");
    const ctx = gameCanvas.getContext("2d");
    const joystick = document.getElementById("joystick");
    const joystickHandle = document.getElementById("joystickHandle");

    let player = { x: 400, y: 300, speed: 3, size: 30 };
    let keys = { up: false, down: false, left: false, right: false };

    // Splash screen transition
    setTimeout(() => {
        splashScreen.classList.add("hidden");
        mainMenu.classList.remove("hidden");
    }, 3000);

    // Menu navigation
    document.getElementById("newGameBtn").addEventListener("click", () => {
        mainMenu.classList.add("hidden");
        characterCreation.classList.remove("hidden");
    });

    document.getElementById("loadGameBtn").addEventListener("click", () => {
        mainMenu.classList.add("hidden");
        loadGameScreen.classList.remove("hidden");
    });

    document.getElementById("optionsBtn").addEventListener("click", () => {
        mainMenu.classList.add("hidden");
        optionsScreen.classList.remove("hidden");
    });

    document.getElementById("exitBtn").addEventListener("click", () => {
        window.close(); // May not work in all browsers
    });

    // Back buttons
    document.getElementById("backToMenuFromCreate").addEventListener("click", () => {
        characterCreation.classList.add("hidden");
        mainMenu.classList.remove("hidden");
    });

    document.getElementById("backToMenuFromLoad").addEventListener("click", () => {
        loadGameScreen.classList.add("hidden");
        mainMenu.classList.remove("hidden");
    });

    document.getElementById("backToMenuFromOptions").addEventListener("click", () => {
        optionsScreen.classList.add("hidden");
        mainMenu.classList.remove("hidden");
    });

    // Start Game from Character Creation
    document.getElementById("createCharacterBtn").addEventListener("click", () => {
        characterCreation.classList.add("hidden");
        startGame();
    });

    function startGame() {
        gameCanvas.classList.remove("hidden");
        joystick.classList.remove("hidden");
        requestAnimationFrame(gameLoop);
    }

    // Key movement support (WASD & Arrow keys)
    window.addEventListener("keydown", (e) => {
        if (["ArrowUp", "w", "W"].includes(e.key)) keys.up = true;
        if (["ArrowDown", "s", "S"].includes(e.key)) keys.down = true;
        if (["ArrowLeft", "a", "A"].includes(e.key)) keys.left = true;
        if (["ArrowRight", "d", "D"].includes(e.key)) keys.right = true;
    });

    window.addEventListener("keyup", (e) => {
        if (["ArrowUp", "w", "W"].includes(e.key)) keys.up = false;
        if (["ArrowDown", "s", "S"].includes(e.key)) keys.down = false;
        if (["ArrowLeft", "a", "A"].includes(e.key)) keys.left = false;
        if (["ArrowRight", "d", "D"].includes(e.key)) keys.right = false;
    });

    // Game loop
    function gameLoop() {
        update();
        render();
        requestAnimationFrame(gameLoop);
    }

    function update() {
        if (keys.up) player.y -= player.speed;
        if (keys.down) player.y += player.speed;
        if (keys.left) player.x -= player.speed;
        if (keys.right) player.x += player.speed;
    }

    function render() {
        ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
        ctx.fillStyle = "blue";
        ctx.fillRect(player.x, player.y, player.size, player.size);
    }

    // Virtual Joystick functionality
    let dragging = false;
    joystickHandle.addEventListener("touchstart", () => (dragging = true));
    window.addEventListener("touchend", () => {
        dragging = false;
        keys = { up: false, down: false, left: false, right: false };
        joystickHandle.style.left = "35px";
        joystickHandle.style.top = "35px";
    });

    window.addEventListener("touchmove", (e) => {
        if (!dragging) return;
        const rect = joystick.getBoundingClientRect();
        const touch = e.touches[0];
        const dx = touch.clientX - (rect.left + rect.width / 2);
        const dy = touch.clientY - (rect.top + rect.height / 2);
        keys.up = dy < -10;
        keys.down = dy > 10;
        keys.left = dx < -10;
        keys.right = dx > 10;

        joystickHandle.style.left = `${35 + Math.min(Math.max(dx, -35), 35)}px`;
        joystickHandle.style.top = `${35 + Math.min(Math.max(dy, -35), 35)}px`;
    });
});