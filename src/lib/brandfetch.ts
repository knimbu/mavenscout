// Brandfetch employer-logo lookup (PRD 7.11 — P1). The Brand Search API
// resolves a typed organization name ("World Bank") to domain + logo matches;
// picking one writes the Brandfetch CDN URL into the plain-text logo_url
// field, so nothing about the schema knows or cares about the provider.
//
// Activation: needs a free Brandfetch client id. Set VITE_BRANDFETCH_CLIENT_ID
// in .env (build-time), or — handy for trying it without a rebuild — put it in
// localStorage under 'ms_brandfetch_client_id'. Without one, the lookup UI
// stays hidden and the manual paste-a-URL field (the P0 path) is unaffected.

export interface BrandMatch {
  name: string
  domain: string
  icon: string | null
}

export function brandfetchClientId(): string | null {
  return (
    (import.meta.env.VITE_BRANDFETCH_CLIENT_ID as string | undefined) ||
    localStorage.getItem('ms_brandfetch_client_id') ||
    null
  )
}

export async function searchBrands(name: string): Promise<BrandMatch[]> {
  const clientId = brandfetchClientId()
  if (!clientId || name.trim().length < 2) return []
  const res = await fetch(
    `https://api.brandfetch.io/v2/search/${encodeURIComponent(name.trim())}?c=${clientId}`,
  )
  if (!res.ok) throw new Error(`Brandfetch search failed (${res.status})`)
  const data = (await res.json()) as { name?: string; domain?: string; icon?: string }[]
  return data
    .filter((d) => d.domain)
    .slice(0, 6)
    .map((d) => ({ name: d.name || d.domain!, domain: d.domain!, icon: d.icon ?? null }))
}
