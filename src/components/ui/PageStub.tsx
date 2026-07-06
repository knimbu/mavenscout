// Temporary placeholder for routes whose real UI lands in a later build step.
export function PageStub({ title, note }: { title: string; note?: string }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-semibold">{title}</h1>
      <p className="mt-3 text-ink-soft">{note ?? 'Coming in a later build step.'}</p>
    </div>
  )
}
