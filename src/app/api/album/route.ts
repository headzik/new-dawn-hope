import fs from 'fs'
import { NextResponse } from 'next/server'
import path from 'path'

export interface AlbumGroup {
  folder: string
  title?: string
  date?: string
  description?: string
  items: MediaItem[]
}

export interface MediaItem {
  id: string
  type: 'image' | 'video'
  src: string
  thumbnail?: string
}

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg']
const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.ogg', '.mov', '.avi']

function isImageFile(filename: string): boolean {
  const ext = path.extname(filename).toLowerCase()
  return IMAGE_EXTENSIONS.includes(ext)
}

function isVideoFile(filename: string): boolean {
  const ext = path.extname(filename).toLowerCase()
  return VIDEO_EXTENSIONS.includes(ext)
}

function parseMetadata(folderPath: string): { title?: string; date?: string; description?: string; videos?: string[] } {
  const metadataPath = path.join(folderPath, 'metadata.json')

  if (fs.existsSync(metadataPath)) {
    try {
      const content = fs.readFileSync(metadataPath, 'utf-8')
      return JSON.parse(content)
    } catch (error) {
      console.error(`Error parsing metadata.json in ${folderPath}:`, error)
    }
  }

  return {}
}

export async function GET() {
  try {
    const publicPath = path.join(process.cwd(), 'public')
    const albumPath = path.join(publicPath, 'album')

    if (!fs.existsSync(albumPath)) {
      return NextResponse.json({ groups: [] })
    }

    const groups: AlbumGroup[] = []
    const folders = fs.readdirSync(albumPath, { withFileTypes: true })

    for (const folder of folders) {
      if (!folder.isDirectory()) continue

      const folderPath = path.join(albumPath, folder.name)
      const files = fs.readdirSync(folderPath)

      const items: MediaItem[] = []

      for (const file of files) {
        if (file === 'metadata.json') continue

        const filePath = path.join(folderPath, file)
        const stat = fs.statSync(filePath)

        if (stat.isFile()) {
          const relativePath = `/album/${folder.name}/${file}`

          if (isImageFile(file)) {
            items.push({
              id: `${folder.name}-${file}`,
              type: 'image',
              src: relativePath
            })
          } else if (isVideoFile(file)) {
            items.push({
              id: `${folder.name}-${file}`,
              type: 'video',
              src: relativePath
            })
          }
        }
      }

      const metadata = parseMetadata(folderPath)

      if (metadata.videos && Array.isArray(metadata.videos)) {
        metadata.videos.forEach((videoUrl, index) => {
          items.push({
            id: `${folder.name}-youtube-${index}`,
            type: 'video',
            src: videoUrl
          })
        })
      }

      if (items.length > 0) {
        groups.push({
          folder: folder.name,
          title: metadata.title,
          date: metadata.date,
          description: metadata.description,
          items: items.sort((a, b) => a.id.localeCompare(b.id))
        })
      }
    }

    groups.sort((a, b) => {
      const dateA = a.date ? new Date(a.date).getTime() : 0
      const dateB = b.date ? new Date(b.date).getTime() : 0
      return dateB - dateA
    })

    return NextResponse.json({ groups })
  } catch (error) {
    console.error('Error reading album directory:', error)
    return NextResponse.json(
      { error: 'Failed to read album directory', groups: [] },
      { status: 500 }
    )
  }
}

