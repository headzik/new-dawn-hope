'use client'

import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { AlbumGroup, MediaItem } from '../page'
import { Gallery } from './Gallery'
import { MediaModal } from './MediaModal'

interface AlbumViewerProps {
  group: AlbumGroup
  allGroups: AlbumGroup[]
  currentGroupIndex: number
  onClose: () => void
  onNavigateGroup: (direction: 'prev' | 'next') => void
}

const ITEMS_PER_GROUP_LIMIT = 20

export function AlbumViewer({
  group,
  allGroups,
  currentGroupIndex,
  onClose,
  onNavigateGroup
}: AlbumViewerProps) {
  const [expanded, setExpanded] = useState(false)
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null)

  const visibleItems = expanded 
    ? group.items 
    : group.items.slice(0, ITEMS_PER_GROUP_LIMIT)
  
  const hasMore = group.items.length > ITEMS_PER_GROUP_LIMIT
  const allMediaItems = group.items

  const formatDate = (dateString?: string) => {
    if (!dateString) return null
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    } catch {
      return dateString
    }
  }

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && currentGroupIndex > 0) {
        onNavigateGroup('prev')
      }
      if (e.key === 'ArrowRight' && currentGroupIndex < allGroups.length - 1) {
        onNavigateGroup('next')
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [onClose, onNavigateGroup, currentGroupIndex, allGroups.length])

  return (
    <div
      className={clsx(
        'fixed inset-0 z-50 bg-white',
        'overflow-y-auto'
      )}
    >
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b shadow-sm">
        <div className="container px-4 sm:px-16 mx-auto py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              {currentGroupIndex > 0 && (
                <button
                  onClick={() => onNavigateGroup('prev')}
                  className={clsx(
                    'p-2 rounded-full',
                    'bg-gray-200 hover:bg-gray-300 transition-colors',
                    'flex items-center justify-center'
                  )}
                  aria-label="Previous album"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}
              <div className="flex-1 min-w-0">
                {group.title && (
                  <h2 className="text-xl font-bold truncate">{group.title}</h2>
                )}
                {group.date && (
                  <p className="text-gray-500 text-sm">
                    {formatDate(group.date)}
                  </p>
                )}
              </div>
              {currentGroupIndex < allGroups.length - 1 && (
                <button
                  onClick={() => onNavigateGroup('next')}
                  className={clsx(
                    'p-2 rounded-full',
                    'bg-gray-200 hover:bg-gray-300 transition-colors',
                    'flex items-center justify-center'
                  )}
                  aria-label="Next album"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </div>
            <button
              onClick={onClose}
              className={clsx(
                'ml-4 p-2 rounded-full',
                'bg-gray-200 hover:bg-gray-300 transition-colors',
                'flex items-center justify-center'
              )}
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="container px-4 sm:px-16 mx-auto py-6">
        {group.description && (
          <p className="text-gray-600 text-lg mb-6">{group.description}</p>
        )}

        <Gallery
          items={visibleItems}
          onItemClick={setSelectedMedia}
        />

        {hasMore && (
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setExpanded(!expanded)}
              className={clsx(
                'px-6 py-2 rounded-md transition-colors',
                'bg-gray-800 text-white hover:bg-gray-700',
                'font-medium'
              )}
            >
              {expanded ? 'Show Less' : `Show More (${group.items.length - ITEMS_PER_GROUP_LIMIT} more)`}
            </button>
          </div>
        )}
      </div>

      {selectedMedia && (
        <MediaModal
          media={selectedMedia}
          onClose={() => setSelectedMedia(null)}
          onNavigate={(direction) => {
            const currentIndex = allMediaItems.findIndex(item => item.id === selectedMedia.id)
            if (direction === 'prev') {
              const prevIndex = currentIndex > 0 ? currentIndex - 1 : allMediaItems.length - 1
              setSelectedMedia(allMediaItems[prevIndex])
            } else {
              const nextIndex = currentIndex < allMediaItems.length - 1 ? currentIndex + 1 : 0
              setSelectedMedia(allMediaItems[nextIndex])
            }
          }}
        />
      )}
    </div>
  )
}

