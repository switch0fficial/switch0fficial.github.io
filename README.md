# SWITCH - Cinematic Gaming Creator Website

A premium, cinematic 3D cyberpunk website for gaming content creator SWITCH. Built with vanilla HTML, CSS, and JavaScript, featuring Three.js for interactive 3D backgrounds and GSAP for cinematic animations.

## 🚀 Quick Start

1. **Open the website**
   - Simply open `index.html` in a web browser
   - For best results, use a local development server (see below)

2. **Add your profile picture**
   - Place your profile image in `assets/images/profile.png`
   - The website will automatically detect and use it

3. **Customize content**
   - Edit the `SWITCH_CONFIG` object in `script.js` to change videos, links, and text

## 📁 Project Structure

```
SWITCH/
├── index.html              # Main HTML structure
├── style.css               # All styling and animations
├── script.js               # JavaScript functionality and configuration
├── assets/
│   ├── images/
│   │   └── profile.png     # Your profile picture (add this)
│   ├── videos/             # Video assets (if needed)
│   └── icons/              # Custom icons (if needed)
└── README.md              # This file
```

## 🎨 Customization Guide

### Adding Your Profile Picture

1. Prepare your profile image (recommended: square format, at least 500x500px)
2. Name it `profile.png`
3. Place it in the `assets/images/` folder
4. The website will automatically load it

**Note:** If no image is found, a stylish placeholder will appear.

### Changing TikTok Videos

Edit the `tiktokVideos` array in `script.js` (line 18-42):

```javascript
tiktokVideos: [
    {
        url: "https://vt.tiktok.com/ZSqEA9H8n/",
        title: "Your Video Title",
        description: "Your video description"
    },
    // Add more videos as needed
]
```

### Changing Social Links

Edit the `SWITCH_CONFIG` object in `script.js` (lines 10-16):

```javascript
const SWITCH_CONFIG = {
    creatorName: "SWITCH",
    tiktok: "https://www.tiktok.com/@switch0fficial",
    whatsapp: "https://whatsapp.com/channel/0029VbAf5sq5fM5b2CXTge32",
    email: "switchtiktokofficial@gmail.com",
    // ... other settings
};
```

### Changing Text Content

Most text can be edited directly in `index.html`:

- **Hero section**: Lines 114-120
- **About section**: Lines 177-180
- **Section titles**: Throughout the HTML
- **Contact email**: Line 247

### Changing Colors

Edit CSS variables in `style.css` (lines 10-22):

```css
:root {
    --color-black: #000000;
    --color-dark-navy: #0a0e1a;
    --color-cyan: #00d4ff;
    /* ... more colors */
}
```

### Changing Featured Video

Edit the `featuredVideo` URL in `script.js` (line 44):

```javascript
featuredVideo: "https://vt.tiktok.com/ZSqEA9H8n/",
```

Then update the link in `index.html` (line 223):

```html
<a href="https://vt.tiktok.com/ZSqEA9H8n/" target="_blank" rel="noopener noreferrer">
```

## ⚙️ Performance Settings

Adjust performance in `script.js` (lines 46-48):

```javascript
particleCount: 2000,              // Desktop particles
reducedMotionParticleCount: 500,  // For users with motion sensitivity
mobileParticleCount: 300          // Mobile devices
```

## 🌐 Running a Local Server

While the website works by opening `index.html` directly, using a local server is recommended for the best experience.

### Option 1: Python (if installed)
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

### Option 2: Node.js (if installed)
```bash
# Install http-server globally
npm install -g http-server

# Run server
http-server
```

### Option 3: VS Code Live Server
1. Install the "Live Server" extension
2. Right-click on `index.html`
3. Select "Open with Live Server"

Then open `http://localhost:8000` (or your server's port) in your browser.

## 🎯 Features

### ✅ Implemented Features

- **Interactive 3D Background**: Three.js-powered particle system with geometric objects
- **Cinematic Intro Animation**: Smooth entrance animation with skip option
- **Custom Cursor**: Cyberpunk-styled cursor with hover effects (desktop only)
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Scroll Animations**: GSAP-powered scroll animations
- **3D Card Effects**: Mouse-reactive 3D tilt on cards
- **Glitch Text Effect**: Subtle cyberpunk glitch animation
- **Smooth Navigation**: Sticky nav with smooth scrolling
- **Mobile Menu**: Futuristic hamburger menu for mobile
- **Performance Optimization**: 
  - Reduced particle count on mobile
  - Respects `prefers-reduced-motion` setting
  - Lazy loading for images
- **Accessibility**: Semantic HTML, keyboard navigation, ARIA labels
- **SEO**: Proper meta tags and Open Graph data

### 🎨 Design Elements

- **Cyberpunk Color Scheme**: Black, dark navy, electric blue, cyan accents
- **Glowing Effects**: Neon blue glows and light beams
- **Futuristic UI**: HUD lines, system labels, holographic panels
- **Glass Effects**: Blur and transparency on navigation
- **Animated Borders**: Rotating rings and glowing borders
- **Particle Effects**: Floating particles throughout the interface

## 📱 Mobile Optimization

The website automatically optimizes for mobile:

- Simplified 3D scene with fewer particles
- Disabled custom cursor
- Responsive layout with mobile navigation
- Touch-friendly buttons
- Optimized animations

## 🔧 Troubleshooting

### Profile image not showing
- Ensure the image is named exactly `profile.png`
- Check that it's in the `assets/images/` folder
- Verify the file path is correct

### 3D background not appearing
- Check browser console for errors
- Ensure Three.js CDN is accessible
- Try refreshing the page

### Animations not smooth
- Reduce `particleCount` in `script.js`
- Check if `prefers-reduced-motion` is enabled
- Close other browser tabs to free resources

### Videos not opening
- Verify TikTok URLs are correct
- Check that links have `target="_blank"` and `rel="noopener noreferrer"`
- Ensure pop-up blocker is not blocking the links

## 🌐 Browser Support

- **Desktop**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile**: iOS Safari, Chrome Mobile, Firefox Mobile
- **Minimum**: ES6 JavaScript support required

## 📄 External Libraries

The website uses CDN-hosted libraries:

- **Three.js** (r128): 3D graphics
- **GSAP** (3.12.2): Animations
- **ScrollTrigger** (3.12.2): Scroll-based animations

These are loaded from cdnjs.cloudflare.com in the HTML head.

## 🔒 Security

- All external links use `rel="noopener noreferrer"`
- No backend required - runs entirely client-side
- No sensitive data stored or transmitted
- Email links use `mailto:` protocol

## 📝 License

This website is created for SWITCH. Feel free to customize and use for your own projects.

## 🤝 Support

For issues or questions:
- Email: switchtiktokofficial@gmail.com
- TikTok: https://www.tiktok.com/@switch0fficial
- WhatsApp: https://whatsapp.com/channel/0029VbAf5sq5fM5b2CXTge32

## 🎮 Creator Information

**SWITCH**
- Gaming Content Creator
- Cinematic Gaming Editor
- Blood Strike Creator
- Business: switchtiktokofficial@gmail.com

---

Built with ❤️ using vanilla HTML, CSS, JavaScript, Three.js, and GSAP.
