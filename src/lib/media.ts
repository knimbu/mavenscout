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

// ---- résumés (PDF upload-or-URL, same pattern as videos) -------------------

const RESUME_MAX_BYTES = 10 * 1024 * 1024 // 10 MB

export function resumeDownloadUrl(profile: {
  resume_path: string | null
  resume_url: string | null
}): string | null {
  if (profile.resume_path)
    return supabase.storage.from('resumes').getPublicUrl(profile.resume_path).data.publicUrl
  return profile.resume_url
}

/** Uploads a résumé PDF to the 'resumes' bucket and points the profile at it
 *  (clearing any external resume_url — exactly one of path/url is populated).
 *  Returns the storage path. Throws with a user-facing message on rejection. */
export async function uploadResume(profileId: string, file: File): Promise<string> {
  if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf'))
    throw new Error('Résumés must be PDF files.')
  if (file.size > RESUME_MAX_BYTES) throw new Error('Résumé PDFs are capped at 10 MB.')

  const path = `${profileId}/resume.pdf`
  const { error: upErr } = await supabase.storage
    .from('resumes')
    .upload(path, file, { upsert: true, contentType: 'application/pdf' })
  if (upErr) throw new Error(`Upload failed: ${upErr.message}`)

  const { error: dbErr } = await supabase
    .from('profiles')
    .update({ resume_path: path, resume_url: null })
    .eq('id', profileId)
  if (dbErr) throw new Error(`Couldn't save to profile: ${dbErr.message}`)
  return path
}

/** Points the profile at an external résumé link instead (clears any upload). */
export async function setResumeUrl(profileId: string, url: string): Promise<void> {
  const { error } = await supabase
    .from('profiles')
    .update({ resume_url: url, resume_path: null })
    .eq('id', profileId)
  if (error) throw new Error(`Couldn't save to profile: ${error.message}`)
}

export async function removeResume(profileId: string): Promise<void> {
  const { error } = await supabase
    .from('profiles')
    .update({ resume_path: null, resume_url: null })
    .eq('id', profileId)
  if (error) throw new Error(`Couldn't save to profile: ${error.message}`)
}
