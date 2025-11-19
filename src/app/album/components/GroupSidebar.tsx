'use client'

import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { AlbumGroup } from '../page'

interface GroupSidebarProps {
  groups: AlbumGroup[]
}

export function GroupSidebar({ groups }: GroupSidebarProps) {
  const [activeGroup, setActiveGroup] = useState<string>('')

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-100px 0px -50% 0px',
      threshold: 0
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveGroup(entry.target.id)
        }
      })
    }, observerOptions)

    groups.forEach((group) => {
      const element = document.getElementById(`group-${group.folder}`)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      groups.forEach((group) => {
        const element = document.getElementById(`group-${group.folder}`)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [groups])

  const scrollToGroup = (folder: string) => {
    const element = document.getElementById(`group-${folder}`)
    if (element) {
      const headerOffset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  if (groups.length === 0) return null

  return (
    <div className={clsx(
      'hidden lg:block fixed right-8 top-1/2 -translate-y-1/2 z-40',
      'max-h-[80vh] overflow-y-auto'
    )}>
      <nav className={clsx(
        'bg-white/90 backdrop-blur-sm rounded-lg shadow-lg',
        'p-4 min-w-[200px]'
      )}>
        <h3 className="font-bold text-sm mb-3 text-gray-700 uppercase tracking-wide">
          Albums
        </h3>
        <ul className="space-y-1">
          {groups.map((group) => {
            const isActive = activeGroup === `group-${group.folder}`
            const displayTitle = group.title || group.folder.replace(/-/g, ' ')
            
            return (
              <li key={group.folder}>
                <button
                  onClick={() => scrollToGroup(group.folder)}
                  className={clsx(
                    'w-full text-left px-3 py-2 rounded-md text-sm transition-colors',
                    'hover:bg-gray-100',
                    isActive
                      ? 'bg-gray-800 text-white hover:bg-gray-700 font-semibold'
                      : 'text-gray-700'
                  )}
                >
                  <div className="truncate">{displayTitle}</div>
                  {group.date && (
                    <div className={clsx(
                      'text-xs mt-0.5 truncate',
                      isActive ? 'text-gray-300' : 'text-gray-500'
                    )}>
                      {new Date(group.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}

