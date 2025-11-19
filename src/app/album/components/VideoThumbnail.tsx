'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import clsx from 'clsx'

interface VideoThumbnailProps {
  videoSrc: string
  className?: string
}

export function VideoThumbnail({ videoSrc, className }: VideoThumbnailProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [thumbnailDataUrl, setThumbnailDataUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const video = videoRef.current
    const canvas = canvasRef.current

    if (!video || !canvas) return

    const handleLoadedMetadata = () => {
      try {
        video.currentTime = 0.1
      } catch (error) {
        console.error('Error setting video time:', error)
        setLoading(false)
      }
    }

    const handleTimeUpdate = () => {
      try {
        if (video.readyState >= 2) {
          canvas.width = video.videoWidth
          canvas.height = video.videoHeight
          const ctx = canvas.getContext('2d')
          if (ctx) {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
            const dataUrl = canvas.toDataURL('image/jpeg', 0.8)
            setThumbnailDataUrl(dataUrl)
            setLoading(false)
            video.removeEventListener('timeupdate', handleTimeUpdate)
          }
        }
      } catch (error) {
        console.error('Error generating video thumbnail:', error)
        setLoading(false)
      }
    }

    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    video.addEventListener('timeupdate', handleTimeUpdate)

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      video.removeEventListener('timeupdate', handleTimeUpdate)
    }
  }, [videoSrc])

  return (
    <>
      <video
        ref={videoRef}
        src={videoSrc}
        className="hidden"
        preload="metadata"
        muted
        playsInline
        crossOrigin="anonymous"
      />
      <canvas ref={canvasRef} className="hidden" />
      {thumbnailDataUrl ? (
        <Image
          src={thumbnailDataUrl}
          alt="Video thumbnail"
          fill
          className={clsx('object-cover', className)}
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      ) : (
        <div className={clsx('absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900', className)} />
      )}
    </>
  )
}

