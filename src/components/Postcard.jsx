import React from 'react'
import appwriteService from '../appwrite/config'
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredImage, content, $createdAt }) {
  // Calculate reading time (~200 words/min)
  const calculateReadTime = (htmlContent) => {
    if (!htmlContent) return '1 min read'
    const plainText = htmlContent.replace(/<[^>]+>/g, '')
    const wordCount = plainText.trim().split(/\s+/).filter(Boolean).length
    const minutes = Math.max(1, Math.ceil(wordCount / 200))
    return `${minutes} min read`
  }

  // Format creation date
  const formatDate = (dateString) => {
    if (!dateString) return 'Recently'
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const getImageSrc = (fileId) => {
    if (!fileId) return ''
    const preview = appwriteService.getFilePreview(fileId)
    return typeof preview === 'string' ? preview : preview?.href || ''
  }

  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group flex flex-col h-full">
        {/* Featured Image Thumbnail */}
        <div className="w-full justify-center items-center mb-4 overflow-hidden rounded-xl bg-slate-100 aspect-video flex">
          {featuredImage ? (
            <img
              src={getImageSrc(featuredImage)}
              alt={title}
              className="rounded-xl object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="text-slate-400 text-sm font-medium">No Image</div>
          )}
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">
          {title}
        </h2>

        {/* Metadata Footer */}
        <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
          <span>{formatDate($createdAt)}</span>
          <span>•</span>
          <span>{calculateReadTime(content)}</span>
        </div>
      </div>
    </Link>
  )
}

export default PostCard