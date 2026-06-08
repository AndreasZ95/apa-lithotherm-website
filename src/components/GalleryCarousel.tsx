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
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const activePhoto = photos[activeIndex]

  const canNavigate = photos.length > 1
  const counter = useMemo(() => `${activeIndex + 1} / ${photos.length}`, [activeIndex, photos.length])
  const showPrevious = () => setActiveIndex((current) => (current === 0 ? photos.length - 1 : current - 1))
  const showNext = () => setActiveIndex((current) => (current === photos.length - 1 ? 0 : current + 1))

  if (!activePhoto) {
    return <div className="detail-placeholder">Photo gallery</div>
  }

  return (
    <>
      <div className="carousel" aria-label={`${title} photo gallery`}>
      <div className="carousel-stage">
        <button
          aria-label="Open photo gallery"
          className="carousel-open-button"
          onClick={() => setIsLightboxOpen(true)}
          type="button"
        >
          <img alt={activePhoto.alt} src={activePhoto.src} />
        </button>
        {canNavigate && (
          <div className="carousel-controls">
            <button
              aria-label="Previous photo"
              onClick={showPrevious}
              type="button"
            >
              ‹
            </button>
            <span>{counter}</span>
            <button
              aria-label="Next photo"
              onClick={showNext}
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
      {isLightboxOpen && (
        <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label={`${title} full screen gallery`}>
          <button
            aria-label="Close gallery"
            className="gallery-lightbox-close"
            onClick={() => setIsLightboxOpen(false)}
            type="button"
          >
            ×
          </button>
          {canNavigate && (
            <button aria-label="Previous photo" className="gallery-lightbox-nav previous" onClick={showPrevious} type="button">
              ‹
            </button>
          )}
          <img alt={activePhoto.alt} src={activePhoto.src} />
          {canNavigate && (
            <button aria-label="Next photo" className="gallery-lightbox-nav next" onClick={showNext} type="button">
              ›
            </button>
          )}
          <div className="gallery-lightbox-counter">{counter}</div>
        </div>
      )}
    </>
  )
}
