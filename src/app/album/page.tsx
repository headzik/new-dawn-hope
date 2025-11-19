'use client'

import clsx from 'clsx'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Menu } from '../components/Menu/Menu'
import { MenuList } from '../components/Menu/MenuList'
import { styles } from '../styles'
import { AlbumBottomSheet } from './components/AlbumBottomSheet'
import { AlbumGrid } from './components/AlbumGrid'
import { AlbumViewer } from './components/AlbumViewer'
import { Gallery } from './components/Gallery'
import { GroupSidebar } from './components/GroupSidebar'
import { MediaModal } from './components/MediaModal'

export interface MediaItem {
  id: string
  type: 'image' | 'video'
  src: string
  thumbnail?: string
}

export interface AlbumGroup {
  folder: string
  title?: string
  date?: string
  description?: string
  items: MediaItem[]
}

const ITEMS_PER_GROUP_LIMIT = 20

export default function AlbumPage() {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null)
  const [groups, setGroups] = useState<AlbumGroup[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set())
  
  const [mobileViewAlbum, setMobileViewAlbum] = useState<AlbumGroup | null>(null)
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0)
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false)

  useEffect(() => {
    async function fetchGroups() {
      try {
        const response = await fetch('/api/album')
        const data = await response.json()
        setGroups(data.groups || [])
      } catch (error) {
        console.error('Error fetching album groups:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchGroups()
  }, [])

  const allMediaItems = groups.flatMap(group => group.items)

  const toggleGroupExpansion = (folder: string) => {
    setExpandedGroups(prev => {
      const next = new Set(prev)
      if (next.has(folder)) {
        next.delete(folder)
      } else {
        next.add(folder)
      }
      return next
    })
  }

  const getVisibleItems = (group: AlbumGroup) => {
    if (expandedGroups.has(group.folder)) {
      return group.items
    }
    return group.items.slice(0, ITEMS_PER_GROUP_LIMIT)
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return null
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    } catch {
      return dateString
    }
  }

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <a href="/">
            <Image
              src="/logo.png"
              alt="Logo"
              width={120}
              height={120}
              priority
            />
          </a>
          <Menu />
        </div>
      </header>

      <section className={clsx(styles.section, 'bg-white mt-20')}>
        <div className="container px-4 sm:px-16 mx-auto">
          <div className="flex flex-col items-center gap-10">
            <div className="flex flex-col items-center text-center gap-3">
              <h1>Photo & Video Album</h1>
              <p className={styles.lightText}>
                Explore our collection of moments and memories
              </p>
            </div>

            {loading ? (
              <p className={styles.lightText}>Loading...</p>
            ) : groups.length === 0 ? (
              <p className={styles.lightText}>No albums found. Add folders to public/album/</p>
            ) : (
              <>
                <AlbumGrid
                  groups={groups}
                  onAlbumClick={(group) => {
                    const index = groups.findIndex(g => g.folder === group.folder)
                    setCurrentGroupIndex(index)
                    setMobileViewAlbum(group)
                  }}
                />

                <div className="hidden lg:block w-full">
                  {groups.map((group) => {
                  const visibleItems = getVisibleItems(group)
                  const hasMore = group.items.length > ITEMS_PER_GROUP_LIMIT
                  const isExpanded = expandedGroups.has(group.folder)

                  return (
                    <div
                      key={group.folder}
                      id={`group-${group.folder}`}
                      className="w-full flex flex-col gap-6 scroll-mt-24"
                    >
                      {(group.title || group.date || group.description) && (
                        <div className="flex flex-col gap-2">
                          {group.title && <h2 className="text-3xl font-bold">{group.title}</h2>}
                          {group.date && (
                            <p className={clsx(styles.lightText, 'text-sm')}>
                              {formatDate(group.date)}
                            </p>
                          )}
                          {group.description && (
                            <p className={clsx(styles.lightText, 'text-lg')}>{group.description}</p>
                          )}
                        </div>
                      )}
                      <Gallery
                        items={visibleItems}
                        onItemClick={setSelectedMedia}
                      />
                      {hasMore && (
                        <div className="flex justify-center">
                          <button
                            onClick={() => toggleGroupExpansion(group.folder)}
                            className={clsx(
                              'px-6 py-2 rounded-md transition-colors',
                              'bg-gray-800 text-white hover:bg-gray-700',
                              'font-medium'
                            )}
                          >
                            {isExpanded ? 'Show Less' : `Show More (${group.items.length - ITEMS_PER_GROUP_LIMIT} more)`}
                          </button>
                        </div>
                      )}
                    </div>
                  )
                  })}
                </div>
              </>
            )}
          </div>
        </div>
        <GroupSidebar groups={groups} />
      </section>

      <footer className={clsx(
        styles.section,
        'bg-white'
      )}>
        <div className="container flex flex-col justify-center items-center gap-10">
          <div className="flex justify-center gap-10 flex-wrap">
            <MenuList />
          </div>
          <p>
            {`Copyright ${new Date().getFullYear()} | All rights reserved`}
          </p>
        </div>
      </footer>

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

      {mobileViewAlbum && (
        <>
          <AlbumViewer
            group={mobileViewAlbum}
            allGroups={groups}
            currentGroupIndex={currentGroupIndex}
            onClose={() => setMobileViewAlbum(null)}
            onNavigateGroup={(direction) => {
              let newIndex = currentGroupIndex
              if (direction === 'prev' && currentGroupIndex > 0) {
                newIndex = currentGroupIndex - 1
              } else if (direction === 'next' && currentGroupIndex < groups.length - 1) {
                newIndex = currentGroupIndex + 1
              }
              setCurrentGroupIndex(newIndex)
              setMobileViewAlbum(groups[newIndex])
            }}
          />

          <div className="fixed bottom-6 right-6 z-50 lg:hidden">
            <button
              onClick={() => setBottomSheetOpen(true)}
              className={clsx(
                'bg-gray-800 text-white rounded-full p-4',
                'shadow-lg hover:bg-gray-700 transition-colors',
                'flex items-center justify-center'
              )}
              aria-label="Switch album"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          <AlbumBottomSheet
            groups={groups}
            currentGroupIndex={currentGroupIndex}
            isOpen={bottomSheetOpen}
            onClose={() => setBottomSheetOpen(false)}
            onSelectAlbum={(index) => {
              setCurrentGroupIndex(index)
              setMobileViewAlbum(groups[index])
            }}
          />
        </>
      )}
    </main>
  )
}
