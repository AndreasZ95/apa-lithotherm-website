'use client'

import { useMemo, useState } from 'react'

type GalleryPhoto = {
  alt: string
  src: string
}

type GalleryCarouselProps = {
  photos: GalleryPhoto[]
  title: string
}

export function GalleryCarousel({ photos, title }: GalleryCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const activePhoto = photos[activeIndex]

  const canNavigate = photos.length > 1
  const counter = useMemo(() => `${activeIndex + 1} / ${photos.length}`, [activeIndex, photos.length])

  if (!activePhoto) {
    return <div className="detail-placeholder">Photo gallery</div>
  }

  return (
    <div className="carousel" aria-label={`${title} photo gallery`}>
      <div className="carousel-stage">
        <img alt={activePhoto.alt} src={activePhoto.src} />
        {canNavigate && (
          <div className="carousel-controls">
            <button
              aria-label="Previous photo"
              onClick={() => setActiveIndex((current) => (current === 0 ? photos.length - 1 : current - 1))}
              type="button"
            >
              ‹
            </button>
            <span>{counter}</span>
            <button
              aria-label="Next photo"
              onClick={() => setActiveIndex((current) => (current === photos.length - 1 ? 0 : current + 1))}
              type="button"
            >
              ›
            </button>
          </div>
        )}
      </div>
      {canNavigate && (
        <div className="carousel-thumbs" aria-label="Gallery thumbnails">
          {photos.map((photo, index) => (
            <button
              aria-label={`Show photo ${index + 1}`}
              className={index === activeIndex ? 'active' : ''}
              key={`${photo.src}-${index}`}
              onClick={() => setActiveIndex(index)}
              type="button"
            >
              <img alt="" src={photo.src} />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
