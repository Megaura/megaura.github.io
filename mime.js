// Create a canvas element
const canvas = document.createElement('canvas');
canvas.width = 300;
canvas.height = 200;
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');

// Variable to control arm animation
let isArmAnimating = true;

// Function to draw the mime
function drawMime(waveAngle) {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw body
    ctx.fillStyle = 'black';
    ctx.fillRect(130, 100, 40, 80);

    // Draw head
    ctx.beginPath();
    ctx.arc(150, 70, 30, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw smaller sun-like hat (15% smaller)
    ctx.beginPath();
    ctx.arc(150, 45, 12.75, 0, Math.PI * 2); // Reduced radius from 15 to 12.75 (15% smaller)
    ctx.fillStyle = 'yellow';
    ctx.fill();
    ctx.strokeStyle = 'orange';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw sun rays (adjusted for smaller hat)
    for (var i = 0; i < 8; i++) {
        ctx.beginPath();
        var angle = i * Math.PI / 4;
        ctx.moveTo(150 + Math.cos(angle) * 12.75, 45 + Math.sin(angle) * 12.75); // Adjusted starting point
        ctx.lineTo(150 + Math.cos(angle) * 21.25, 45 + Math.sin(angle) * 21.25); // Adjusted ending point (15% smaller)
        ctx.strokeStyle = 'orange';
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    // Draw smiling eyes
    ctx.beginPath();
    ctx.arc(140, 65, 5, 0.2 * Math.PI, 0.8 * Math.PI);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(160, 65, 5, 0.2 * Math.PI, 0.8 * Math.PI);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw smile
    ctx.beginPath();
    ctx.arc(150, 75, 20, 0.2 * Math.PI, 0.8 * Math.PI);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw waving arm (radial motion)
    ctx.beginPath();
    ctx.moveTo(170, 110);
    var armAngle = isArmAnimating ? Math.sin(waveAngle) * Math.PI / 6 : 0; // Stop arm movement if not animating
    var armEndX = 170 + Math.cos(armAngle) * 40;
    var armEndY = 110 - Math.sin(armAngle) * 40;
    ctx.lineTo(armEndX, armEndY);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 10;
    ctx.stroke();
}

// Animation loop
var waveAngle = 0;
function animate() {
    if (isArmAnimating) {
        waveAngle += 0.05; // Slower animation speed
    }
    drawMime(waveAngle);
    requestAnimationFrame(animate);
}

// Start animation
animate();

// Function to clean the table
function cleanTable() {
    var canvas = document.getElementById('mimeCanvas');
    var ctx = canvas.getContext('2d');

    // Stop arm animation
    isArmAnimating = false;

    // Clear the entire canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw a table
    drawTable(ctx);

    // Draw cleaning motion
    var cleanAngle = 0;
    function animateCleaning() {
        ctx.clearRect(50, 0, 200, 100); // Clear above the table
        
        // Draw arm movement
        ctx.beginPath();
        ctx.moveTo(150, 110);
        var cleanX = 150 + Math.cos(cleanAngle) * 80;
        var cleanY = 90 + Math.sin(cleanAngle) * 10;
        ctx.lineTo(cleanX, cleanY);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 5;
        ctx.stroke();

        // Draw cloth
        ctx.beginPath();
        ctx.arc(cleanX, cleanY, 10, 0, 2 * Math.PI);
        ctx.fillStyle = '#cccccc';
        ctx.fill();

        cleanAngle += 0.1;
        if (cleanAngle < Math.PI * 2) {
            requestAnimationFrame(animateCleaning);
        } else {
            // Clear the arm and cloth
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // Redraw the table
            drawTable(ctx);
            // Redraw the mime after cleaning
            drawMime(0);
            // Draw a black arrow pointing at the table
            drawArrowPointingAtTable(ctx);
        }
    }

    animateCleaning();
}

// Function to draw a black arrow pointing at the table
function drawArrowPointingAtTable(ctx) {
    ctx.save();
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(150, 90);  // Start from just above the table
    ctx.lineTo(140, 70);  // Left side of arrowhead
    ctx.lineTo(160, 70);  // Right side of arrowhead
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(150, 70);
    ctx.lineTo(150, 20);  // Arrow shaft, pointing up from just above the table
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.restore();
}

// Function to zoom into the table
function zoomIntoTable() {
    var canvas = document.getElementById('mimeCanvas');
    var ctx = canvas.getContext('2d');

    // Clear the entire canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set up the zoom animation
    var zoomFactor = 1;
    var maxZoom = 2.5;
    var zoomSpeed = 0.02;

    function animateZoom() {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Apply zoom transformation
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.scale(zoomFactor, zoomFactor);
        ctx.translate(-canvas.width / 2, -canvas.height / 2);

        // Draw the zoomed table
        drawTable(ctx);

        ctx.restore();

        // Increase zoom factor
        zoomFactor += zoomSpeed;

        // Continue animation until max zoom is reached
        if (zoomFactor < maxZoom) {
            animationId = requestAnimationFrame(animateZoom);
        } else {
            // Redraw the mime after zooming
            drawMime(0);
            // Add event listener for sun click after zooming is complete
            canvas.addEventListener('click', handleSunClick);
            // Draw a black arrow pointing at the table
            drawArrowPointingAtTable(ctx);
            // Draw an atom below the arrow
            drawAtom(ctx);
        }
    }

    // Start the zoom animation
    animateZoom();
}

// Function to draw an atom
function drawAtom(ctx) {
    const centerX = 150;
    const centerY = 115; // Moved up by 10 pixels
    const radius = 20;

    // Draw nucleus
    ctx.beginPath();
    ctx.arc(centerX, centerY, 5, 0, 2 * Math.PI);
    ctx.fillStyle = 'red';
    ctx.fill();

    // Draw electron orbits
    for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, radius, radius / 2, i * Math.PI / 3, 0, 2 * Math.PI);
        ctx.strokeStyle = 'blue';
        ctx.stroke();
    }

    // Draw electrons
    for (let i = 0; i < 3; i++) {
        const angle = i * 2 * Math.PI / 3;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + (radius / 2) * Math.sin(angle);
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, 2 * Math.PI);
        ctx.fillStyle = 'blue';
        ctx.fill();
    }

    // Add click event listener to the atom
    const canvas = ctx.canvas;
    canvas.addEventListener('click', function(event) {
        const rect = canvas.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const clickY = event.clientY - rect.top;
        
        // Check if the click is within the atom area
        const distance = Math.sqrt(Math.pow(clickX - centerX, 2) + Math.pow(clickY - centerY, 2));
        if (distance <= radius) {
            // Redirect to web2.html
            window.location.href = 'web2.html';
        }
    });
}

// Function to handle table click
function handleTableClick(event) {
    var canvas = document.getElementById('mimeCanvas');
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;

    // Check if the click is within the table area
    if (x >= 50 && x <= 250 && y >= 100 && y <= 150) {
        console.log('Table clicked!');
        // You can add more functionality here, like changing the table color
        // or triggering an animation
    }
}

// Function to draw the table
function drawTable(ctx) {
    ctx.fillStyle = '#8B4513'; // Brown color for the table
    ctx.fillRect(50, 100, 200, 10); // Table top
    ctx.fillRect(60, 110, 10, 40); // Left leg
    ctx.fillRect(230, 110, 10, 40); // Right leg
}

// Set up event listeners
document.addEventListener('DOMContentLoaded', () => {
    var canvas = document.getElementById('mimeCanvas');
    var enterButton = document.getElementById('enterButton');
    var zoomButton = document.getElementById('zoomButton');

    if (canvas) {
        canvas.addEventListener('click', handleTableClickWithZoom);
        canvas.addEventListener('mousemove', (event) => {
            var rect = canvas.getBoundingClientRect();
            var x = event.clientX - rect.left;
            var y = event.clientY - rect.top;
            var isOverTable = (x >= 50 && x <= 250 && y >= 100 && y <= 150);
            var isOverSun = Math.sqrt(Math.pow(x - 150, 2) + Math.pow(y - 45, 2)) <= 12.75;
            canvas.style.cursor = (isOverTable || isOverSun) ? 'pointer' : 'default';
        });
    }

    if (enterButton) {
        enterButton.addEventListener('click', () => {
            isArmAnimating = false; // Stop arm animation
            cleanTable();
            enterButton.remove(); // Remove Enter button when pressed
        });
    }

    if (zoomButton) {
        zoomButton.addEventListener('click', zoomIntoTable);
    }
});

// Function to handle table click with zoom
function handleTableClickWithZoom(event) {
    var canvas = document.getElementById('mimeCanvas');
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;

    // Check if the click is within the table area
    if (x >= 50 && x <= 250 && y >= 100 && y <= 150) {
        console.log('Table clicked!');
        
        // Clear any ongoing animations
        cancelAnimationFrame(animationId);
        
        // Remove existing click event listeners
        canvas.removeEventListener('click', handleTableClickWithZoom);
        canvas.removeEventListener('click', handleSunClick);
        
        // Zoom in on the canvas and table
        zoomIntoTable();
    }
}

// Variable to store animation frame ID
var animationId;

// Function to handle sun click
function handleSunClick(event) {
    var canvas = document.getElementById('mimeCanvas');
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;

    // Check if the click is within the sun area
    var sunCenterX = 150;
    var sunCenterY = 45;
    var sunRadius = 12.75;
    var distance = Math.sqrt(Math.pow(x - sunCenterX, 2) + Math.pow(y - sunCenterY, 2));

    if (distance <= sunRadius) {
        console.log('Sun clicked!');
        // You can add alternative functionality here if needed
    }
}

// Update the event listeners
document.addEventListener('DOMContentLoaded', () => {
    var canvas = document.getElementById('mimeCanvas');
    var enterButton = document.getElementById('enterButton');
    var zoomButton = document.getElementById('zoomButton');

    if (canvas) {
        canvas.addEventListener('click', handleTableClickWithZoom);
        canvas.addEventListener('mousemove', (event) => {
            var rect = canvas.getBoundingClientRect();
            var x = event.clientX - rect.left;
            var y = event.clientY - rect.top;
            var isOverTable = (x >= 50 && x <= 250 && y >= 100 && y <= 150);
            var isOverSun = Math.sqrt(Math.pow(x - 150, 2) + Math.pow(y - 45, 2)) <= 12.75;
            canvas.style.cursor = (isOverTable || isOverSun) ? 'pointer' : 'default';
        });
    }

    // ... (rest of the event listeners remain the same)
});
