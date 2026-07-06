import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type {
  AudioTestimonial,
  InterviewQuestion,
  PortfolioItem,
  Profile,
  VideoResponse,
} from '../types/db'

export interface ProfileData {
  profile: Profile
  portfolio: PortfolioItem[]
  videos: VideoResponse[]
  /** Published testimonials only — pending/removed never leave the editor/admin. */
  testimonials: AudioTestimonial[]
  questions: InterviewQuestion[]
}

/** Loads one public profile by handle. Only approved + active profiles
 *  resolve (app-level enforcement of directory visibility — see 000_schema.sql).
 *  Returns `notFound` for unknown handles or unpublished profiles. */
export function useProfile(handle: string | undefined) {
  const [data, setData] = useState<ProfileData | null>(null)
  const [notFound, setNotFound] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!handle) return
    let cancelled = false
    setData(null)
    setNotFound(false)

    async function load() {
      const { data: profile, error: pErr } = await supabase
        .from('profiles')
        .select('*')
        .eq('handle', handle!)
        .eq('approval_status', 'approved')
        .eq('subscription_status', 'active')
        .maybeSingle()
      if (cancelled) return
      if (pErr) return setError(pErr.message)
      if (!profile) return setNotFound(true)

      const [portfolioRes, videosRes, testimonialsRes, questionsRes] = await Promise.all([
        supabase.from('portfolio_items').select('*').eq('profile_id', profile.id).order('sort_order'),
        supabase.from('video_responses').select('*').eq('profile_id', profile.id),
        supabase
          .from('audio_testimonials')
          .select('*')
          .eq('profile_id', profile.id)
          .eq('status', 'published')
          .order('created_at', { ascending: false }),
        supabase.from('interview_questions').select('*').eq('active', true).order('sort_order'),
      ])
      if (cancelled) return
      const firstError =
        portfolioRes.error ?? videosRes.error ?? testimonialsRes.error ?? questionsRes.error
      if (firstError) return setError(firstError.message)

      setData({
        profile: profile as Profile,
        portfolio: portfolioRes.data as PortfolioItem[],
        videos: videosRes.data as VideoResponse[],
        testimonials: testimonialsRes.data as AudioTestimonial[],
        questions: questionsRes.data as InterviewQuestion[],
      })
    }
    load()
    return () => {
      cancelled = true
    }
  }, [handle])

  return { data, notFound, error }
}
