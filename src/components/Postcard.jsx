import React from 'react'
import appwriteService from '../appwrite/config'
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredImage, $createdAt }) {
  const formattedDate = $createdAt
    ? new Date($createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Aug 12, 2026'

  return (
    <Link to={`/post/${$id}`} className="group block h-full">
      <div className="w-full h-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-500/40 dark:hover:border-blue-500/40 flex flex-col justify-between">
        
        {/* Post Image Container */}
        <div>
          <div className="w-full h-52 overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800 mb-4">
            <img
              src={appwriteService.getFilePreview(featuredImage)}
              alt={title}
              onError={(e) => {
                e.target.src = 'https://placehold.co/600x400/1e293b/ffffff?text=BlogCraft'
              }}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-slate-900 dark:text-white transition-colors mb-3">
            {title}
          </h2>
        </div>

        {/* Card Footer / Date */}
        <div className="flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800/60">
          <span>{formattedDate}</span>
          <span>•</span>
          <span>1 min read</span>
        </div>
      </div>
    </Link>
  )
}

export default PostCard