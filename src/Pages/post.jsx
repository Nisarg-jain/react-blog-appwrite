import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import appwriteService from '../appwrite/config'
import Container from '../components/container/Container'
import parse from 'html-react-parser'
import { useSelector } from 'react-redux'

export default function Post() {
  const [post, setPost] = useState(null)
  const { slug } = useParams()
  const navigate = useNavigate()

  const userData = useSelector((state) => state.auth.userData)
  const isAuthor = post && userData ? post.userId === userData.$id : false

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post)
        else navigate('/')
      })
    } else navigate('/')
  }, [slug, navigate])

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage)
        navigate('/')
      }
    })
  }

  // Get exact URL string for image src
  const getImageSrc = (fileId) => {
    if (!fileId) return ''
    const preview = appwriteService.getFilePreview(fileId)
    return typeof preview === 'string' ? preview : preview?.href || ''
  }

  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2 bg-gray-50">
          {post.featuredImage ? (
            <img
              src={getImageSrc(post.featuredImage)}
              alt={post.title}
              className="rounded-xl max-h-96 object-cover"
              onError={(e) => {
                // Prevents infinite loop on broken image load
                e.target.onerror = null;
                console.error("Failed to load featured image from Appwrite.");
              }}
            />
          ) : null}

          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <button className="mr-3 px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition">
                  Edit
                </button>
              </Link>
              <button 
                onClick={deletePost}
                className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          )}
        </div>

        <div className="w-full mb-6">
          <h1 className="text-3xl font-bold text-gray-900">{post.title}</h1>
        </div>

        <div className="prose max-w-none text-gray-800 space-y-4 [&_h1]:text-3xl [&_h2]:text-2xl [&_h3]:text-xl [&_h1]:font-bold [&_h2]:font-bold [&_h3]:font-bold [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6">
          {parse(post.content || '')}
        </div>
      </Container>
    </div>
  ) : null
}