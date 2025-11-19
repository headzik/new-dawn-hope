'use client'

import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { AlbumGroup } from '../page'

interface AlbumBottomSheetProps {
  groups: AlbumGroup[]
  currentGroupIndex: number
  isOpen: boolean
  onClose: () => void
  onSelectAlbum: (index: number) => void
}

export function AlbumBottomSheet({
  groups,
  currentGroupIndex,
  isOpen,
  onClose,
  onSelectAlbum
}: AlbumBottomSheetProps) {
  const [dragY, setDragY] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
      setDragY(0)
    }
  }, [isOpen])

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    const touch = e.touches[0]
    const newY = touch.clientY - window.innerHeight * 0.7
    if (newY > 0) {
      setDragY(newY)
    }
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
    if (dragY > 100) {
      onClose()
    } else {
      setDragY(0)
    }
  }

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

  if (!isOpen) return null

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />
      <div
        className={clsx(
          'fixed bottom-0 left-0 right-0 z-50',
          'bg-white rounded-t-2xl shadow-2xl',
          'transition-transform duration-300 ease-out',
          'max-h-[70vh] flex flex-col'
        )}
        style={{
          transform: `translateY(${dragY}px)`
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-12 h-1 bg-gray-300 rounded-full" />
        </div>

        <div className="px-4 py-2 border-b">
          <h3 className="font-bold text-lg">Switch Album</h3>
        </div>

        <div className="overflow-y-auto flex-1">
          <ul className="py-2">
            {groups.map((group, index) => {
              const displayTitle = group.title || group.folder.replace(/-/g, ' ')
              const isActive = index === currentGroupIndex

              return (
                <li key={group.folder}>
                  <button
                    onClick={() => {
                      onSelectAlbum(index)
                      onClose()
                    }}
                    className={clsx(
                      'w-full text-left px-4 py-3 transition-colors',
                      'hover:bg-gray-100',
                      isActive && 'bg-gray-100'
                    )}
                  >
                    <div className={clsx(
                      'font-medium',
                      isActive ? 'text-gray-900' : 'text-gray-700'
                    )}>
                      {displayTitle}
                    </div>
                    {group.date && (
                      <div className={clsx(
                        'text-sm mt-0.5',
                        isActive ? 'text-gray-600' : 'text-gray-500'
                      )}>
                        {formatDate(group.date)} • {group.items.length} {group.items.length === 1 ? 'item' : 'items'}
                      </div>
                    )}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </>
  )
}

