'use client'

import clsx from 'clsx'
import Image from 'next/image'
import { AlbumGroup, MediaItem } from '../page'
import { VideoThumbnail } from './VideoThumbnail'

interface AlbumGridProps {
  groups: AlbumGroup[]
  onAlbumClick: (group: AlbumGroup) => void
}

function getAlbumCover(group: AlbumGroup): MediaItem | null {
  const firstImage = group.items.find(item => item.type === 'image')
  if (firstImage) return firstImage
  
  const firstVideo = group.items.find(item => item.type === 'video')
  return firstVideo || null
}

export function AlbumGrid({ groups, onAlbumClick }: AlbumGridProps) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return null
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      })
    } catch {
      return dateString
    }
  }

  return (
    <div className={clsx(
      'grid grid-cols-2 sm:grid-cols-3 gap-4 w-full',
      'lg:hidden'
    )}>
      {groups.map((group) => {
        const cover = getAlbumCover(group)
        const displayTitle = group.title || group.folder.replace(/-/g, ' ')
        
        return (
          <button
            key={group.folder}
            onClick={() => onAlbumClick(group)}
            className={clsx(
              'relative aspect-square rounded-lg overflow-hidden',
              'bg-gray-200 cursor-pointer',
              'transform transition-transform hover:scale-105',
              'shadow-md hover:shadow-lg'
            )}
          >
            {cover ? (
              cover.type === 'image' ? (
                <Image
                  src={cover.src}
                  alt={displayTitle}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, 33vw"
                />
              ) : (
                <div className="relative w-full h-full bg-gray-900">
                  {cover.src.startsWith('http://') || cover.src.startsWith('https://') ? (
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900" />
                  ) : (
                    <VideoThumbnail videoSrc={cover.src} className="absolute inset-0" />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <svg
                      className="w-12 h-12 text-white drop-shadow-lg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </div>
                </div>
              )
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400" />
            )}
            
            <div className={clsx(
              'absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent',
              'flex flex-col justify-end p-3'
            )}>
              <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2">
                {displayTitle}
              </h3>
              {group.date && (
                <p className="text-white/80 text-xs">
                  {formatDate(group.date)}
                </p>
              )}
              <p className="text-white/70 text-xs mt-1">
                {group.items.length} {group.items.length === 1 ? 'item' : 'items'}
              </p>
            </div>
          </button>
        )
      })}
    </div>
  )
}

