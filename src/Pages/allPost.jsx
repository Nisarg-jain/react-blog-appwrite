import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import appwriteService from '../appwrite/config' 

export default function AllPosts() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    appwriteService.getPosts([]).then((response) => {
      if (response) {
        setPosts(response.documents)
      }
      setLoading(false)
    })
  }, [])

  if (loading) {
    return (
      <div className="w-full py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8 text-gray-900">All Posts</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="bg-white rounded-xl border border-gray-200 p-4 animate-pulse">
                <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="w-full py-16 text-center">
        <div className="max-w-md mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Posts Found</h2>
          <p className="text-gray-600 mb-6">
            There are no published articles yet. Be the first to create one!
          </p>
          <Link
            to="/add-post"
            className="inline-block px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm rounded-lg transition duration-200"
          >
            Create a Post
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">All Posts</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post.$id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="w-full h-48 bg-gray-100 overflow-hidden">
                  <img
                    src={appwriteService.getFilePreview(post.featuredImage)}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="p-5">
                  <h2 className="text-xl font-bold text-gray-900 line-clamp-2 mb-2">
                    {post.title}
                  </h2>
                </div>
              </div>

              <div className="p-5 pt-0">
                <Link
                  to={`/post/${post.$id}`}
                  className="block w-full text-center py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition duration-200"
                >
                  Read Post
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}