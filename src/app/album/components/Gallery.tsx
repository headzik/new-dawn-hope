'use client'

import clsx from 'clsx'
import Image from 'next/image'
import { MediaItem } from '../page'
import { VideoThumbnail } from './VideoThumbnail'

interface GalleryProps {
  items: MediaItem[]
  onItemClick: (item: MediaItem) => void
}

export function Gallery({ items, onItemClick }: GalleryProps) {
  return (
    <div className={clsx(
      'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
      'gap-4 w-full'
    )}>
      {items.map((item) => (
        <div
          key={item.id}
          onClick={() => onItemClick(item)}
          className={clsx(
            'relative aspect-square cursor-pointer',
            'overflow-hidden rounded-lg',
            'bg-gray-200 hover:opacity-90',
            'transition-opacity duration-200',
            'group'
          )}
        >
          {item.type === 'image' ? (
            <Image
              src={item.thumbnail || item.src}
              alt="Gallery image"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <div className="relative w-full h-full flex items-center justify-center bg-gray-900">
              {item.src.startsWith('http://') || item.src.startsWith('https://') ? (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900" />
              ) : (
                <VideoThumbnail videoSrc={item.src} className="absolute inset-0" />
              )}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <svg
                  className="w-16 h-16 text-white group-hover:scale-110 transition-transform drop-shadow-lg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

