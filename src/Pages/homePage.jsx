import React, { useEffect, useState } from 'react'
import appwriteService from '../appwrite/config'
import Container from '../components/container/Container' 
import PostCard from '../components/PostCard'

export default function Home() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    appwriteService.getPosts([]).then((response) => {
      if (response) {
        setPosts(response.documents)
      }
      setLoading(false)
    }).catch((error) => {
      console.error("Error fetching home posts:", error)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return (
      <div className="w-full py-8">
        <Container>
          <div className="flex justify-center items-center min-h-[50vh]">
            <p className="text-gray-500 font-medium">Loading posts...</p>
          </div>
        </Container>
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="w-full py-16 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap justify-center">
            <div className="p-2 w-full max-w-xl">
              <h1 className="text-3xl font-bold text-gray-800 hover:text-gray-500 transition-colors duration-200">
                Login to read posts
              </h1>
              <p className="text-gray-500 mt-2 text-sm">
                Sign in to view articles, share your own thoughts, and manage your blog posts.
              </p>
            </div>
          </div>
        </Container>
      </div>
    )
  }

  return (
    <div className="w-full py-8">
      <Container>
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Latest Posts</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <div key={post.$id} className="p-2">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}