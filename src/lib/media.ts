import { supabase } from './supabase'
import type { VideoResponse } from '../types/db'

// Resolution helpers for the upload-or-URL model (PRD 7.5/7.6).
// Upload/duration-check logic lands in step 6; these read-side helpers are
// needed as soon as the flip card's Video Intro face renders.

export type PlayableVideo =
  | { kind: 'embed'; src: string }   // YouTube / Loom / Vimeo → iframe
  | { kind: 'file'; src: string }    // direct file or Storage upload → <video>

const EMBED_HOSTS = ['youtube.com', 'youtube-nocookie.com', 'youtu.be', 'loom.com', 'vimeo.com']

function toEmbedUrl(raw: string): string | null {
  try {
    const url = new URL(raw)
    const host = url.hostname.replace(/^www\./, '')
    if (!EMBED_HOSTS.some((h) => host === h || host.endsWith(`.${h}`))) return null
    // Normalize common non-embed YouTube forms.
    if (host === 'youtu.be') return `https://www.youtube.com/embed${url.pathname}`
    if (host.endsWith('youtube.com') && url.pathname === '/watch' && url.searchParams.get('v'))
      return `https://www.youtube.com/embed/${url.searchParams.get('v')}`
    if (host === 'loom.com' && url.pathname.startsWith('/share/'))
      return raw.replace('/share/', '/embed/')
    return raw // already an embed-style URL
  } catch {
    return null
  }
}

export function resolveVideo(video: VideoResponse): PlayableVideo | null {
  if (video.video_path) {
    const { data } = supabase.storage.from('videos').getPublicUrl(video.video_path)
    return { kind: 'file', src: data.publicUrl }
  }
  if (video.video_url) {
    const embed = toEmbedUrl(video.video_url)
    return embed ? { kind: 'embed', src: embed } : { kind: 'file', src: video.video_url }
  }
  return null
}

export function audioPublicUrl(audioPath: string): string {
  return supabase.storage.from('audio-testimonials').getPublicUrl(audioPath).data.publicUrl
}
