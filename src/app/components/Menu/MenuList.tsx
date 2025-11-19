'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MouseEvent, ReactNode } from "react"


export function MenuListItem({
  className,
  children,
  linkTo,
  isNew,
  isExternal
}: {
  className?: string
  children?: ReactNode
  linkTo: string
  isNew?: boolean
  isExternal?: boolean
}) {
  const pathname = usePathname()
  const isAlbumPage = pathname === '/album'

  const scrollSmoothly = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault()
    
    if (isAlbumPage) {
      window.location.href = `/#${id}`
      return
    }
    
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const content = (
    <>
      {children || linkTo.toUpperCase()}
      {isNew && (
        <span className={clsx(
          'ml-1 px-1.5 py-0.5 text-xs font-bold',
          'bg-red-500 text-white rounded',
          'uppercase'
        )}>
          New
        </span>
      )}
    </>
  )

  if (isExternal) {
    return (
      <Link
        href={linkTo}
        className={clsx('flex items-center', className)}
      >
        {content}
      </Link>
    )
  }

  return (
    <a
      onClick={(event) => scrollSmoothly(event, linkTo)}
      href={`#${linkTo}`}
      className={clsx('flex items-center', className)}
    >
      {content}
    </a>
  )
}

export function MenuList() {

  const list = [
    { linkTo: 'home' },
    { linkTo: 'mission' },
    { linkTo: 'about' },
    { linkTo: 'donate' },
    { linkTo: 'album', isExternal: true, isNew: true },
    { linkTo: 'contact' },
  ]

  return (
    <>
      {list.map((item) => (
        <MenuListItem
          key={item.linkTo}
          linkTo={item.linkTo}
          isExternal={item.isExternal}
          isNew={item.isNew}
        />
      ))}
    </>
  )
}
