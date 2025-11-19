'use client'

import { useEffect } from 'react'
import clsx from 'clsx'
import Image from 'next/image'
import { MediaItem } from '../page'

interface MediaModalProps {
  media: MediaItem
  onClose: () => void
  onNavigate: (direction: 'prev' | 'next') => void
}

export function MediaModal({ media, onClose, onNavigate }: MediaModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onNavigate('prev')
      if (e.key === 'ArrowRight') onNavigate('next')
    }

    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [onClose, onNavigate])

  return (
    <div
      className={clsx(
        'fixed inset-0 z-50',
        'bg-black/90 backdrop-blur-sm',
        'flex items-center justify-center',
        'p-4'
      )}
      onClick={onClose}
    >
      <div
        className={clsx(
          'relative w-full h-full max-w-7xl max-h-[90vh]',
          'flex items-center justify-center'
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className={clsx(
            'absolute top-4 right-4 z-10',
            'text-white bg-black/50 rounded-full p-2',
            'hover:bg-black/70 transition-colors',
            'flex items-center justify-center'
          )}
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation()
            onNavigate('prev')
          }}
          className={clsx(
            'absolute left-4 z-10',
            'text-white bg-black/50 rounded-full p-3',
            'hover:bg-black/70 transition-colors',
            'hidden sm:flex items-center justify-center'
          )}
          aria-label="Previous"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation()
            onNavigate('next')
          }}
          className={clsx(
            'absolute right-4 z-10',
            'text-white bg-black/50 rounded-full p-3',
            'hover:bg-black/70 transition-colors',
            'hidden sm:flex items-center justify-center'
          )}
          aria-label="Next"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div className={clsx(
          'w-full h-full',
          'flex flex-col items-center justify-center',
          'relative'
        )}>
          {media.type === 'image' ? (
            <div className="relative w-full h-full max-h-[90vh]">
              <Image
                src={media.src}
                alt="Gallery image"
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
          ) : media.src.startsWith('http://') || media.src.startsWith('https://') ? (
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                src={media.src}
                title="Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          ) : (
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <video
                src={media.src}
                controls
                className="absolute inset-0 w-full h-full"
                style={{ objectFit: 'contain' }}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          )}
        </div>

        <div className={clsx(
          'absolute bottom-4 left-1/2 transform -translate-x-1/2',
          'sm:hidden flex gap-4'
        )}>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onNavigate('prev')
            }}
            className={clsx(
              'text-white bg-black/50 rounded-full p-3',
              'hover:bg-black/70 transition-colors'
            )}
            aria-label="Previous"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onNavigate('next')
            }}
            className={clsx(
              'text-white bg-black/50 rounded-full p-3',
              'hover:bg-black/70 transition-colors'
            )}
            aria-label="Next"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

