# SWITCH - Blood Strike Creator Portfolio

A hand-coded, cinematic cyberpunk gaming portfolio website built with HTML, CSS, vanilla JavaScript, and Three.js. No frameworks, no templates — pure code.

## 🎮 Features

- **Cinematic 3D Background**: Full-screen WebGL scene with particles, wireframe shapes, and neon grid
- **Interactive Kinetic Core**: Three.js gyroscope with drag-to-spin, click shockwave, and scroll acceleration
- **Blood/Void Mode Toggle**: Switch between red (Blood) and violet (Void) color schemes
- **Gaming Aesthetics**: Crosshair cursor, HP bar scroll progress, kill-feed toasts, and glitch effects
- **Responsive Design**: Mobile-first with fluid typography and touch support
- **Performance Optimized**: Throttled animations (30fps), reduced particle count, disabled antialias, removed expensive effects
- **Mobile Optimized**: Custom cursor disabled on mobile, backdrop-filter removed for better performance

## 📁 Project Structure

```
SWITCH/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # All styles with cyberpunk design
├── js/
│   └── main.js         # All JavaScript (Three.js, interactions, config)
├── assets/
│   └── profile.jpg     # Your profile photo (add this)
└── README.md           # This file
```

## 🚀 Quick Start

### 1. Add Your Profile Photo (Optional)

The site works perfectly without a photo - it will show a placeholder saying "Add your photo".

To add your profile photo:

1. Place your photo in the `assets/` folder as `profile.jpg`
2. Edit `index.html` line 101 to change the src from empty to `"assets/profile.jpg"`

Recommended size: 400x400px or square format.

**Tap-to-preview**: Click on your profile photo in the hero section to view it full-screen.

### 2. Customize Content

All editable content is in the `CONFIG` object at the top of `js/main.js`:

```javascript
const CONFIG = {
    // Social Links
    links: {
        whatsapp: 'https://whatsapp.com/channel/...',
        tiktok: 'https://www.tiktok.com/@switch0fficial',
        discord: 'https://discord.gg/...',
        youtube: 'https://www.youtube.com/@...',
        email: 'switchtiktokofficial@gmail.com'
    },
    
    // Edits (TikTok videos)
    edits: [
        { title: 'Epic Montage', type: 'edit', url: 'https://vt.tiktok.com/...', emoji: '🎬' },
        // Add more edits here
    ],
    
    // Websites built
    builds: [
        { 
            name: 'NFK', 
            url: 'https://switch0fficial.github.io/NFK/', 
            tags: ['HTML', 'CSS', 'JS'] 
        },
        // Add more builds here
    ],
    
    // Stats (edit these numbers)
    stats: {
        videos: 150,
        followers: 5000
    }
};
```

### Adding New Edits

To add a new TikTok edit to the gallery:

1. Open `js/main.js`
2. Find the `edits` array in the `CONFIG` object
3. Add a new object with these properties:
   - `title`: The edit name
   - `type`: Either `'edit'` or `'funny'` (for filter tabs)
   - `url`: Your TikTok video link
   - `emoji`: An emoji for the thumbnail

Example:
```javascript
{ title: 'My New Edit', type: 'edit', url: 'https://vt.tiktok.com/ZSgXXXXXX/', emoji: '🔥' }
```

### Adding New Websites

To add a new website to the Builds section:

1. Open `js/main.js`
2. Find the `builds` array in the `CONFIG` object
3. Add a new object with these properties:
   - `name`: Website name
   - `url`: Live link to the site
   - `tags`: Array of tech tags (e.g., `['HTML', 'CSS', 'Three.js']`)

Example:
```javascript
{ 
    name: 'My New Site', 
    url: 'https://switch0fficial.github.io/mysite/', 
    tags: ['HTML', 'CSS', 'JS', 'Three.js'] 
}
```

### Updating Stats

To change the video/follower counters:

1. Open `js/main.js`
2. Find the `stats` object in `CONFIG`
3. Edit the `videos` and `followers` numbers

The counters animate when they scroll into view.

## 🌐 Publishing to GitHub Pages

### Option 1: Via GitHub Website

1. Create a new repository on GitHub named `SWITCH`
2. Upload all files (index.html, css/, js/, assets/)
3. Go to Settings → Pages
4. Select "main" branch as source
5. Your site will be live at `https://yourusername.github.io/SWITCH/`

### Option 2: Via Git Command Line

```bash
# Navigate to SWITCH folder
cd SWITCH

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit"

# Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/SWITCH.git

# Push to GitHub
git branch -M main
git push -u origin main
```

Then enable GitHub Pages in your repository settings.

## 🎨 Customization

### Colors

All colors are CSS variables in `css/style.css`. Edit the `:root` section:

```css
:root {
    --glow-primary: var(--neon-red);  /* Main glow color */
    --glow-secondary: var(--dark-red); /* Secondary glow */
    /* ... other colors */
}
```

### Typography

Fonts are loaded from Google Fonts. To change them:

1. Edit the Google Fonts link in `index.html`
2. Update the CSS variables in `css/style.css`:
   - `--font-logo`: For headings (currently Orbitron)
   - `--font-body`: For body text (currently Rajdhani)

### Three.js Settings

Adjust particle count and camera speed in `js/main.js`:

```javascript
threejs: {
    particleCount: window.innerWidth < 768 ? 200 : 400, // Optimized for performance
    cameraSpeed: 0.0005
}
```

Note: The site is already optimized with:
- Throttled animations (30fps)
- Disabled antialiasing
- Pixel ratio capped at 1
- Reduced particle count
- Simplified geometry
- Removed expensive CSS effects (box-shadow glow, backdrop-filter)

## 🎮 Easter Eggs

- **Konami Code**: Enter ↑↑↓↓←→←→BA on your keyboard to trigger glitch mode
- **Sound Toggle**: Click the speaker icon to enable WebAudio blips (off by default)
- **Mode Toggle**: Click the BLOOD/VOID switch to change the entire site's color scheme

## ♿ Accessibility

- Reduced motion support (respects user preferences)
- Keyboard navigation with visible focus states
- Semantic HTML structure
- Alt text for images
- ARIA labels for interactive elements

## 📱 Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari
- Mobile browsers (iOS Safari, Chrome Mobile)

Three.js requires WebGL support. Falls back to gradient background if unavailable.

## 🔧 Troubleshooting

### Profile photo not showing

- Ensure the file is named exactly `profile.jpg` (case-sensitive)
- Check that it's in the `assets/` folder
- Verify the file path matches: `assets/profile.jpg`

### Three.js not working

- Check browser has WebGL enabled
- Try a different browser
- Check console for errors (F12)
- The site has a gradient fallback if WebGL fails

### Slow performance on mobile

- The particle count is automatically reduced on mobile (200 vs 400)
- Animations are throttled to 30fps
- Antialiasing is disabled
- Pixel ratio is capped at 1
- Custom cursor is disabled on mobile
- Backdrop-filter blur effects are removed for better performance
- If still slow, try reducing particle count further in CONFIG

## 📝 License

This is a personal portfolio. Feel free to use it as inspiration, but please credit SWITCH if you reuse significant portions of the code.

---

Built with ❤️ by SWITCH - Every line hand-coded, no vibe coding.
