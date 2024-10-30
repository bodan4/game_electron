const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game variables
let player = { x: 50, y: 500, size: 20, dy: 0, onGround: true };
const gravity = 0.5, jumpStrength = -12, doubleJumpStrength = -15;
let canDoubleJump = false;

// Background stars
const stars = [];
const numStars = 100;
function initializeStars() {
    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5
        });
    }
}

// Draw static background with stars and parallax layers
function drawBackground() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
    });
    ctx.fillStyle = 'rgba(255,0,0,0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height / 3);
    ctx.fillStyle = 'rgba(0,0,255,0.1)';
    ctx.fillRect(0, canvas.height / 3, canvas.width, canvas.height / 3);
}

// Draw player
function drawPlayer() {
    ctx.fillStyle = 'white';
    ctx.fillRect(player.x, player.y, player.size, player.size);
}

// Player jumping
function updatePlayer() {
    player.y += player.dy;
    player.dy += gravity;
    if (player.y + player.size >= canvas.height) {
        player.y = canvas.height - player.size;
        player.dy = 0;
        player.onGround = true;
        canDoubleJump = true;
    }
}

// Keyboard controls for jump
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        if (player.onGround) {
            player.dy = jumpStrength;
            player.onGround = false;
        } else if (canDoubleJump) {
            player.dy = doubleJumpStrength;
            canDoubleJump = false;
        }
    }
});

// Game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    updatePlayer();
    drawPlayer();
    requestAnimationFrame(gameLoop);
}

// Initialize and start game
initializeStars();
gameLoop();
