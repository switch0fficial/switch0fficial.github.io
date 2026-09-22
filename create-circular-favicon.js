const fs = require('fs');
const path = require('path');

// Simple SVG-based circular favicon generator
const createCircularFavicon = () => {
    const inputPath = path.join(__dirname, 'assets', 'images', 'pfp.jpg.png');
    const outputPath = path.join(__dirname, 'assets', 'icons', 'favicon-circle.png');
    
    // Create an SVG with circular clipping
    const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
  <defs>
    <clipPath id="circle">
      <circle cx="32" cy="32" r="32"/>
    </clipPath>
  </defs>
  <circle cx="32" cy="32" r="32" fill="transparent"/>
  <image href="${inputPath}" x="0" y="0" width="64" height="64" clip-path="url(#circle)"/>
</svg>`;
    
    fs.writeFileSync(path.join(__dirname, 'assets', 'icons', 'favicon-circle.svg'), svgContent);
    console.log('Created circular SVG favicon');
};

createCircularFavicon();