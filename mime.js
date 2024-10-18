// Create a canvas element
const canvas = document.createElement('canvas');
canvas.width = 200;
canvas.height = 200;
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');

// Function to draw the mime
function drawMime(waveAngle) {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw body
    ctx.fillStyle = 'black';
    ctx.fillRect(80, 100, 40, 80);

    // Draw head
    ctx.beginPath();
    ctx.arc(100, 70, 30, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw smile
    ctx.beginPath();
    ctx.arc(100, 75, 20, 0.2 * Math.PI, 0.8 * Math.PI);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw waving arm
    ctx.beginPath();
    ctx.moveTo(120, 110);
    ctx.lineTo(140, 90);
    ctx.lineTo(160, 90 + Math.sin(waveAngle) * 20);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 10;
    ctx.stroke();
}

// Animation loop
let waveAngle = 0;
function animate() {
    waveAngle += 0.1;
    drawMime(waveAngle);
    requestAnimationFrame(animate);
}

// Start animation
animate();
