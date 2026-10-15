export const siteConfig = {
  name: 'SWITCH',
  description: 'Blood Strike edits & funny gaming clips, straight from Nigeria 🇳🇬',
  links: {
    tiktok: 'https://www.tiktok.com/@switch0fficial',
    whatsapp: 'https://whatsapp.com/channel/0029VbAf5sq5fM5b2CXTge32',
    email: 'switchtiktokofficial@gmail.com',
  },
  paths: {
    profile: '/images/profile.png',
    logo: '/assets/switch-logo.svg',
  },
  stats: {
    followers: null,
    views: null,
    videos: null,
  },
} as const

export type SiteConfig = typeof siteConfig
