import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import appwriteService from '../appwrite/config'
import Container from '../components/container/Container'
import PostForm from '../components/post-form/PostForm' 

export default function EditPost() {
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const { slug } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((fetchedPost) => {
        if (fetchedPost) {
          setPost(fetchedPost)
        } else {
          navigate('/')
        }
        setLoading(false)
      }).catch((error) => {
        console.error("Error fetching post for edit:", error)
        navigate('/')
      })
    } else {
      navigate('/')
    }
  }, [slug, navigate])

  if (loading) {
    return (
      <div className="w-full py-8">
        <Container>
          <div className="flex justify-center items-center min-h-[50vh]">
            <p className="text-gray-500 font-medium">Loading post details...</p>
          </div>
        </Container>
      </div>
    )
  }

  return post ? (
    <div className="w-full py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null
}