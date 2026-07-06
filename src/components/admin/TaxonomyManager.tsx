import { ArrowDown, ArrowUp, Check, Plus, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import type { TaxonomyCategory, TaxonomyItem, TaxonomyRequest } from '../../types/db'

// Taxonomy management (PRD 7.10/7.14): add/rename/reorder categories and
// items, and the request queue — approving a request creates the real row.

export function TaxonomyManager() {
  const [cats, setCats] = useState<TaxonomyCategory[]>([])
  const [items, setItems] = useState<TaxonomyItem[]>([])
  const [requests, setRequests] = useState<TaxonomyRequest[]>([])
  const [newItem, setNewItem] = useState<{ categoryId: string; name: string } | null>(null)

  const load = async () => {
    const [c, i, r] = await Promise.all([
      supabase.from('taxonomy_categories').select('*').order('sort_order'),
      supabase.from('taxonomy_items').select('*').order('sort_order'),
      supabase.from('taxonomy_requests').select('*').eq('status', 'pending').order('created_at'),
    ])
    setCats((c.data as TaxonomyCategory[]) ?? [])
    setItems((i.data as TaxonomyItem[]) ?? [])
    setRequests((r.data as TaxonomyRequest[]) ?? [])
  }
  useEffect(() => {
    load()
  }, [])

  const swapItems = async (a: TaxonomyItem, b: TaxonomyItem) => {
    await Promise.all([
      supabase.from('taxonomy_items').update({ sort_order: b.sort_order }).eq('id', a.id),
      supabase.from('taxonomy_items').update({ sort_order: a.sort_order }).eq('id', b.id),
    ])
    load()
  }

  const approveRequest = async (req: TaxonomyRequest) => {
    // Find (or fall back to) the suggested parent category of the right type.
    const parent =
      cats.find((c) => c.type === req.type && c.name === req.proposed_parent) ??
      cats.find((c) => c.type === req.type)
    if (parent) {
      const siblings = items.filter((i) => i.category_id === parent.id)
      await supabase.from('taxonomy_items').insert({
        category_id: parent.id,
        name: req.proposed_name,
        sort_order: siblings.length + 1,
      })
    }
    await supabase.from('taxonomy_requests').update({ status: 'approved' }).eq('id', req.id)
    load()
  }

  return (
    <div className="space-y-8">
      {/* Request queue first — it's the actionable part */}
      <section>
        <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-ink-faint">
          New-item requests ({requests.length})
        </h3>
        {requests.length === 0 ? (
          <p className="text-sm text-ink-faint">No pending requests.</p>
        ) : (
          <div className="space-y-2">
            {requests.map((r) => (
              <div key={r.id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm">
                <span>
                  <strong>{r.proposed_name}</strong>{' '}
                  <span className="text-xs text-ink-faint">
                    {r.type === 'domain_expertise' ? 'Domain' : 'Skill'}
                    {r.proposed_parent && ` → ${r.proposed_parent}`}
                  </span>
                </span>
                <span className="flex gap-1.5">
                  <button
                    onClick={() => approveRequest(r)}
                    className="flex items-center gap-1 rounded-full bg-brand-500 px-3 py-1 text-xs font-medium text-white hover:bg-brand-600"
                  >
                    <Check size={12} /> Approve & add
                  </button>
                  <button
                    onClick={async () => {
                      await supabase.from('taxonomy_requests').update({ status: 'rejected' }).eq('id', r.id)
                      load()
                    }}
                    className="flex items-center gap-1 rounded-full border border-line px-3 py-1 text-xs font-medium text-ink-soft"
                  >
                    <X size={12} /> Reject
                  </button>
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Category/item tree */}
      {(['domain_expertise', 'technical_skills', 'work_arrangement'] as const).map((type) => (
        <section key={type}>
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-ink-faint">
            {type === 'domain_expertise' ? 'Domain expertise' : type === 'technical_skills' ? 'Technical skills' : 'Work arrangement'}
          </h3>
          <div className="space-y-3">
            {cats
              .filter((c) => c.type === type)
              .map((cat) => {
                const children = items.filter((i) => i.category_id === cat.id)
                return (
                  <div key={cat.id} className="rounded-lg border border-line bg-white p-3">
                    <div className="flex items-center justify-between gap-2">
                      <input
                        defaultValue={cat.name}
                        onBlur={async (e) => {
                          if (e.target.value !== cat.name && e.target.value.trim()) {
                            await supabase.from('taxonomy_categories').update({ name: e.target.value.trim() }).eq('id', cat.id)
                            load()
                          }
                        }}
                        className="w-full rounded-md border border-transparent px-1.5 py-0.5 text-sm font-semibold hover:border-line focus:border-brand-400 focus:outline-none"
                      />
                      <button
                        onClick={() => setNewItem({ categoryId: cat.id, name: '' })}
                        className="flex shrink-0 items-center gap-1 text-xs font-medium text-brand-600 hover:text-brand-700"
                      >
                        <Plus size={12} /> Item
                      </button>
                    </div>
                    <ul className="mt-1.5 space-y-0.5">
                      {children.map((item, idx) => (
                        <li key={item.id} className="group flex items-center gap-1">
                          <input
                            defaultValue={item.name}
                            onBlur={async (e) => {
                              if (e.target.value !== item.name && e.target.value.trim()) {
                                await supabase.from('taxonomy_items').update({ name: e.target.value.trim() }).eq('id', item.id)
                                load()
                              }
                            }}
                            className="w-full rounded-md border border-transparent px-1.5 py-0.5 text-sm text-ink-soft hover:border-line focus:border-brand-400 focus:outline-none"
                          />
                          <span className="flex opacity-0 transition group-hover:opacity-100">
                            <button
                              disabled={idx === 0}
                              onClick={() => swapItems(item, children[idx - 1])}
                              className="p-1 text-ink-faint hover:text-ink disabled:opacity-30"
                              aria-label="Move up"
                            >
                              <ArrowUp size={12} />
                            </button>
                            <button
                              disabled={idx === children.length - 1}
                              onClick={() => swapItems(item, children[idx + 1])}
                              className="p-1 text-ink-faint hover:text-ink disabled:opacity-30"
                              aria-label="Move down"
                            >
                              <ArrowDown size={12} />
                            </button>
                          </span>
                        </li>
                      ))}
                    </ul>
                    {newItem?.categoryId === cat.id && (
                      <form
                        className="mt-2 flex gap-1.5"
                        onSubmit={async (e) => {
                          e.preventDefault()
                          if (!newItem.name.trim()) return
                          await supabase.from('taxonomy_items').insert({
                            category_id: cat.id,
                            name: newItem.name.trim(),
                            sort_order: children.length + 1,
                          })
                          setNewItem(null)
                          load()
                        }}
                      >
                        <input
                          autoFocus
                          value={newItem.name}
                          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                          placeholder="New item name"
                          className="flex-1 rounded-lg border border-line px-2.5 py-1.5 text-sm outline-none focus:border-brand-400"
                        />
                        <button type="submit" className="rounded-full bg-brand-500 px-3.5 py-1.5 text-xs font-medium text-white">
                          Add
                        </button>
                        <button type="button" onClick={() => setNewItem(null)} className="rounded-full border border-line px-3 py-1.5 text-xs text-ink-soft">
                          Cancel
                        </button>
                      </form>
                    )}
                  </div>
                )
              })}
          </div>
        </section>
      ))}
    </div>
  )
}
