import React, { useState, useEffect } from 'react'
import Container from '../components/container/Container'
import PostCard from '../components/PostCard'
import appwriteService from '../appwrite/config'

function AllPosts() {
  const [posts, setPosts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents)
      }
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  // Filter posts dynamically by title or content
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (post.content && post.content.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="w-full py-12 bg-slate-50 min-h-screen">
      <Container>
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4 border-b border-slate-200 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">All Articles</h1>
            <p className="text-slate-600 text-sm mt-1">Browse and search through all published posts.</p>
          </div>

          {/* Search Bar Input */}
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
            />
            <svg
              className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Content Feed */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="bg-white rounded-2xl p-4 border border-slate-200/80 animate-pulse">
                <div className="w-full h-44 bg-slate-200 rounded-xl mb-4"></div>
                <div className="h-5 bg-slate-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-slate-100 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredPosts.map((post) => (
              <div key={post.$id}>
                <PostCard {...post} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300">
            <div className="text-3xl mb-2">🔍</div>
            <h3 className="text-lg font-bold text-slate-800">No articles found</h3>
            <p className="text-slate-500 text-sm mt-1">Try adjusting your search criteria.</p>
          </div>
        )}
      </Container>
    </div>
  )
}

export default AllPosts