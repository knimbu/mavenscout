import { DEMO_HIRING_MANAGER_ID } from './session'
import { supabase } from './supabase'
import type { VideoResponseRequest } from '../types/db'

// Async video response requests (PRD 7.17 — P1): a manager sends an opening's
// JD to up to 3 candidates and asks for a ≤5-minute "why this role" video.
// The email notification to the candidate is STUBBED (consistent with all
// outbound email this build) — the request record surfaces directly in the
// candidate's logged-in view instead.

export const MAX_OUTSTANDING_PER_OPENING = 3

export type RequestWithProfile = VideoResponseRequest & {
  profiles: { name: string; handle: string; photo_url: string | null } | null
}

export type RequestWithJD = VideoResponseRequest & {
  job_descriptions: { raw_text: string; hiring_organization: string | null } | null
  openings: { name: string } | null
}

export async function listRequestsForOpening(openingId: string): Promise<RequestWithProfile[]> {
  const { data } = await supabase
    .from('video_response_requests')
    .select('*, profiles(name,handle,photo_url)')
    .eq('opening_id', openingId)
    .order('created_at', { ascending: false })
  return (data as RequestWithProfile[]) ?? []
}

export async function outstandingCount(openingId: string): Promise<number> {
  const { count } = await supabase
    .from('video_response_requests')
    .select('id', { count: 'exact', head: true })
    .eq('opening_id', openingId)
    .eq('status', 'sent')
  return count ?? 0
}

/** Creates requests for the given candidates, carrying the opening's saved
 *  JD when one exists. Enforces the 3-outstanding cap in app logic. */
export async function createRequests(
  openingId: string,
  profileIds: string[],
  jobDescriptionId: string | null,
): Promise<void> {
  const current = await outstandingCount(openingId)
  if (current + profileIds.length > MAX_OUTSTANDING_PER_OPENING)
    throw new Error(
      `Max ${MAX_OUTSTANDING_PER_OPENING} outstanding requests per opening (${current} already out).`,
    )
  const { error } = await supabase.from('video_response_requests').insert(
    profileIds.map((profile_id) => ({
      opening_id: openingId,
      profile_id,
      job_description_id: jobDescriptionId,
      requested_by: DEMO_HIRING_MANAGER_ID,
    })),
  )
  if (error) throw new Error(error.message)
}

export async function listRequestsForProfile(profileId: string): Promise<RequestWithJD[]> {
  const { data } = await supabase
    .from('video_response_requests')
    .select('*, job_descriptions(raw_text,hiring_organization), openings(name)')
    .eq('profile_id', profileId)
    .order('created_at', { ascending: false })
  return (data as RequestWithJD[]) ?? []
}

export async function submitResponse(
  requestId: string,
  source: { video_path?: string; video_url?: string; duration_seconds?: number },
): Promise<void> {
  const { error } = await supabase
    .from('video_response_requests')
    .update({
      video_path: source.video_path ?? null,
      video_url: source.video_url ?? null,
      duration_seconds: source.duration_seconds ?? null,
      status: 'submitted',
      submitted_at: new Date().toISOString(),
    })
    .eq('id', requestId)
  if (error) throw new Error(error.message)
}

export async function declineRequest(requestId: string): Promise<void> {
  await supabase.from('video_response_requests').update({ status: 'declined' }).eq('id', requestId)
}
