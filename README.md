# SWITCH - Creator Hub Website

A futuristic, cyberpunk-styled personal brand website for SWITCH, a Nigerian content creator specializing in Blood Strike gameplay edits, funny gaming clips, and editing tutorials.

## Features

- **Pinned 3D Background**: Full-screen WebGL scene with a power symbol emblem, orbiting rings, grid floor, and particles
- **Scroll Storyboard**: The 3D scene responds to scroll with camera movements and emblem animations
- **Cyberpunk UI**: HUD-style glass panels, glowing blue borders, scanlines, and angled corners
- **Responsive Design**: Mobile-first approach, works from 360px phones to 4K screens
- **Performance Optimized**: Lazy-loaded 3D scene, adaptive DPR, reduced motion support
- **SEO Ready**: Meta tags, Open Graph, Twitter cards, and JSON-LD schema
- **Accessible**: Semantic HTML, keyboard navigation, ARIA labels, skip link

## Tech Stack

- **Framework**: Vite + React 18 + TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **3D Graphics**: Three.js, @react-three/fiber, @react-three/drei, @react-three/postprocessing
- **Animations**: Framer Motion, Lenis (smooth scroll)
- **Icons**: React Icons (TikTok, WhatsApp, email)
- **Fonts**: Orbitron (headings), Rajdhani (body), Share Tech Mono (HUD labels)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone or download this repository
2. Navigate to the project directory:
   ```bash
   cd windsurf.web
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Development

Run the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### Production Build

Build for production:
```bash
npm run build
```

The optimized files will be in the `dist/` directory.

Preview the production build:
```bash
npm run preview
```

## Customization

### Profile Photo

Replace the default profile photo:

1. Place your photo at `public/images/profile.jpg`
2. The site will automatically detect and display it
3. If the file is missing, a styled "ADD YOUR PHOTO" placeholder will appear

### Logo

The 3D emblem is a power symbol generated with Three.js primitives. To customize:

1. Edit `src/components/Emblem.tsx`
2. Modify the geometry in the `groupGeometry` useMemo
3. You can change the circle radius, line dimensions, or create a completely different shape

### Links and Social Media

All links are configured in `src/config/site.ts`:

```typescript
export const siteConfig = {
  name: 'SWITCH',
  description: 'Blood Strike edits & funny gaming clips, straight from Nigeria 🇳🇬',
  links: {
    tiktok: 'https://www.tiktok.com/@switch0fficial',
    whatsapp: 'https://whatsapp.com/channel/0029VbAf5sq5fM5b2CXTge32',
    email: 'switchtiktokofficial@gmail.com',
  },
  // ...
}
```

Update these values to match your own links.

### Featured Clips

Edit `src/data/clips.ts` to add your featured edits:

```typescript
export const clips: Clip[] = [
  {
    id: '1',
    title: 'Insane 1v5 Clutch',
    game: 'Blood Strike',
    thumbnail: '/images/clips/clip1.jpg',
    tiktokUrl: 'https://www.tiktok.com/@switch0fficial',
  },
  // Add more clips...
]
```

Place your thumbnail images in `public/images/clips/`.

### Stats

To display follower/view/video counts, update `src/config/site.ts`:

```typescript
stats: {
  followers: '100K',
  views: '1M',
  videos: '50',
},
```

If all values are `null`, the stats section will not appear.

### Colors

The color palette is defined in:
- `tailwind.config.js` - Tailwind theme colors
- `src/index.css` - CSS custom properties

Palette:
- Background: `#02040A`
- Surface: `#070B14`
- Electric Blue: `#1F6BFF`
- Glow Blue: `#4DA3FF`
- White: `#FFFFFF`
- Muted Text: `#A9B8D6`

## Deployment

### Vercel

1. Push your code to GitHub
2. Import the repository in Vercel
3. Vercel will automatically detect the Vite configuration
4. Deploy

### Netlify

1. Push your code to GitHub
2. Import the repository in Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Deploy

### Manual Deployment

1. Build the project:
   ```bash
   npm run build
   ```
2. Upload the contents of the `dist/` directory to your hosting provider
3. Ensure your server supports single-page application routing (fallback to index.html)

## Performance

The site is optimized for mobile users coming from TikTok's in-app browser:

- **Lazy Loading**: The 3D scene is lazy-loaded to reduce initial bundle size
- **Adaptive DPR**: Device pixel ratio is clamped to [1, 1.5] on mobile, [1, 2] on desktop
- **Reduced Motion**: Automatically detects `prefers-reduced-motion` and disables effects
- **FX Toggle**: Users can disable 3D effects via the navbar button
- **Code Splitting**: Three.js and related libraries are in separate chunks

## Accessibility

- Semantic HTML structure
- Skip link for keyboard navigation
- Visible focus states
- ARIA labels on icon buttons
- Alt text for images
- Color contrast meets WCAG AA standards (4.5:1 minimum)
- Reduced motion support

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

3D effects require WebGL support. A fallback CSS grid background is shown when WebGL is unavailable or disabled.

## Troubleshooting

### Build Errors

If you encounter dependency conflicts, try:
```bash
npm install --legacy-peer-deps
```

### 3D Scene Not Loading

- Check browser console for WebGL errors
- Try the FX toggle in the navbar
- Verify your device supports WebGL

### Images Not Showing

- Ensure images are in the `public/` directory
- Check file paths in configuration files
- Verify file names match exactly (case-sensitive)

## License

This project is for personal use. Feel free to customize it for your own brand.

## Credits

Built with:
- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [Three.js](https://threejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
