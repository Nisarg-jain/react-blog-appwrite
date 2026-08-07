import React, { useState, useEffect } from 'react'
import appwriteService from '../appwrite/config'
import Container from '../components/container/Container' 
import PostCard from '../components/PostCard' 

export default function AllPost() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents)
      }
      setLoading(false)
    }).catch((error) => {
      console.error("Error fetching posts:", error)
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
      <div className="w-full py-16 text-center">
        <Container>
          <h2 className="text-2xl font-bold text-gray-700">No Posts Available</h2>
          <p className="text-gray-500 mt-2">Login and create your first post to see it here!</p>
        </Container>
      </div>
    )
  }

  return (
    <div className="w-full py-8">
      <Container>
        <h1 className="text-3xl font-bold mb-8 text-gray-900">All Posts</h1>
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