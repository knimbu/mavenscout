import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/** Captioned image carousel (portfolio items, PRD 7.2). Swipe on touch,
 *  arrows + dots elsewhere — must stay usable at phone width. */
export function Carousel({ images }: { images: { url: string; caption?: string | null }[] }) {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  if (images.length === 0) return null
  const img = images[index]

  const go = (delta: number) => {
    setDirection(delta)
    setIndex((i) => (i + delta + images.length) % images.length)
  }

  return (
    <figure>
      <div className="relative overflow-hidden rounded-xl bg-ink/5">
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={index}
            src={img.url}
            alt={img.caption ?? ''}
            className="aspect-[3/2] w-full object-cover"
            initial={{ x: direction * 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction * -60, opacity: 0 }}
            transition={{ duration: 0.22 }}
            drag={images.length > 1 ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.3}
            onDragEnd={(_, info) => {
              if (info.offset.x < -50) go(1)
              else if (info.offset.x > 50) go(-1)
            }}
            draggable={false}
          />
        </AnimatePresence>
        {images.length > 1 && (
          <>
            <button
              aria-label="Previous image"
              onClick={() => go(-1)}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/85 p-1.5 text-ink-soft shadow hover:text-ink"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              aria-label="Next image"
              onClick={() => go(1)}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/85 p-1.5 text-ink-soft shadow hover:text-ink"
            >
              <ChevronRight size={16} />
            </button>
            <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Image ${i + 1}`}
                  onClick={() => {
                    setDirection(i > index ? 1 : -1)
                    setIndex(i)
                  }}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? 'w-4 bg-white' : 'w-1.5 bg-white/60'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      {img.caption && (
        <figcaption className="mt-1.5 text-xs text-ink-faint">{img.caption}</figcaption>
      )}
    </figure>
  )
}
