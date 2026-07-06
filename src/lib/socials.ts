import {
  Facebook,
  Github,
  GraduationCap,
  Instagram,
  Link2,
  Linkedin,
  Rss,
  Twitter,
  Youtube,
  type LucideIcon,
} from 'lucide-react'

// Social/account link platforms (PRD 7.13). Several platforms have no Lucide
// icon (ResearchGate, ORCID, Google Scholar) — those fall back to a generic
// icon rather than pretending one exists. URL validation per platform lands
// with the onboarding editor (step 4); this is the display side.

export const PLATFORMS = [
  'X/Twitter',
  'LinkedIn',
  'ResearchGate',
  'Google Scholar',
  'GitHub',
  'ORCID',
  'Medium/Blog',
  'YouTube',
  'Instagram',
  'Facebook',
  'Other',
] as const

export function platformIcon(platform: string): LucideIcon {
  switch (platform) {
    case 'X/Twitter':
      return Twitter
    case 'LinkedIn':
      return Linkedin
    case 'GitHub':
      return Github
    case 'YouTube':
      return Youtube
    case 'Instagram':
      return Instagram
    case 'Facebook':
      return Facebook
    case 'Medium/Blog':
      return Rss
    case 'Google Scholar':
      return GraduationCap
    default:
      return Link2 // ResearchGate, ORCID, Other — no Lucide icon exists
  }
}
