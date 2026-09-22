const fs = require('fs');
const path = require('path');

// Create a simple HTML file that will generate the circular favicon
const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <title>Create Circular Favicon</title>
</head>
<body>
    <canvas id="canvas" width="64" height="64"></canvas>
    <script>
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        
        img.onload = function() {
            // Draw circular clip
            ctx.beginPath();
            ctx.arc(32, 32, 32, 0, Math.PI * 2);
            ctx.closePath();
            ctx.clip();
            
            // Draw image
            ctx.drawImage(img, 0, 0, 64, 64);
            
            // Export as PNG
            const dataUrl = canvas.toDataURL('image/png');
            console.log('DATA_URL:' + dataUrl);
        };
        
        img.src = 'assets/images/pfp.jpg.png';
    </script>
</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, 'generate-favicon.html'), htmlContent);
console.log('Created favicon generator HTML file');
console.log('Open generate-favicon.html in your browser to generate the circular favicon');
console.log('Copy the DATA_URL output and replace the favicon in the HTML');