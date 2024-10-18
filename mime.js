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

    // Draw hat
    ctx.beginPath();
    ctx.moveTo(70, 70);
    ctx.lineTo(130, 70);
    ctx.lineTo(100, 40);
    ctx.closePath();
    ctx.fillStyle = 'black';
    ctx.fill();

    // Draw smiling eyes
    ctx.beginPath();
    ctx.arc(90, 65, 5, 0.2 * Math.PI, 0.8 * Math.PI);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(110, 65, 5, 0.2 * Math.PI, 0.8 * Math.PI);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw smile
    ctx.beginPath();
    ctx.arc(100, 75, 20, 0.2 * Math.PI, 0.8 * Math.PI);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw waving arm (radial motion)
    ctx.beginPath();
    ctx.moveTo(120, 110);
    const armAngle = Math.sin(waveAngle) * Math.PI / 6; // Slower, radial motion
    const armEndX = 120 + Math.cos(armAngle) * 40;
    const armEndY = 110 - Math.sin(armAngle) * 40;
    ctx.lineTo(armEndX, armEndY);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 10;
    ctx.stroke();
}

// Animation loop
let waveAngle = 0;
function animate() {
    waveAngle += 0.05; // Slower animation speed
    drawMime(waveAngle);
    requestAnimationFrame(animate);
}

// Start animation
animate();
