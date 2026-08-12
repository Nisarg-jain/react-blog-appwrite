import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import appwriteService from '../appwrite/config'
import Container from '../components/container/Container'
import parse from 'html-react-parser'
import { useSelector } from 'react-redux'
import Logo from '../components/Logo'

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

  const getImageSrc = (fileId) => {
    if (!fileId) return ''
    const preview = appwriteService.getFilePreview(fileId)
    return typeof preview === 'string' ? preview : preview?.href || ''
  }

  return post ? (
    <div className="py-12 bg-slate-50 min-h-screen">
      <Container>
        <article className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden p-6 sm:p-10">
          
          {/* Header Bar with Logo */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
            <Link to="/">
              <Logo width="120px" />
            </Link>
            <span className="text-xs font-semibold px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full">
              Published Article
            </span>
          </div>

          {/* Featured Image Container */}
          <div className="relative w-full mb-8 rounded-xl overflow-hidden bg-slate-100 border border-slate-200/80 flex justify-center items-center group">
            {post.featuredImage && (
              <img
                src={getImageSrc(post.featuredImage)}
                alt={post.title}
                className="w-full max-h-[460px] object-contain rounded-xl transition-transform duration-300"
              />
            )}

            {/* Floating Glassmorphic Author Controls */}
            {isAuthor && (
              <div className="absolute top-4 right-4 flex items-center space-x-2 bg-white/90 backdrop-blur-md p-1.5 rounded-xl shadow-lg border border-slate-200/60">
                <Link to={`/edit-post/${post.$id}`}>
                  <button 
                    title="Edit Post"
                    className="flex items-center space-x-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    <span>Edit</span>
                  </button>
                </Link>

                <button 
                  onClick={deletePost}
                  title="Delete Post"
                  className="flex items-center space-x-1.5 px-3.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 hover:text-rose-700 text-sm font-medium rounded-lg transition-all duration-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span>Delete</span>
                </button>
              </div>
            )}
          </div>

          {/* Post Title */}
          <header className="mb-8 border-b border-slate-100 pb-6">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {post.title}
            </h1>
          </header>

          {/* Parsed Content Typography */}
          <div className="prose prose-slate max-w-none text-slate-700 text-lg leading-relaxed space-y-5 [&_h1]:text-3xl [&_h2]:text-2xl [&_h3]:text-xl [&_h1]:font-bold [&_h2]:font-bold [&_h3]:font-bold [&_h1]:text-slate-900 [&_h2]:text-slate-900 [&_h3]:text-slate-900 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-1 [&_p]:leading-relaxed">
            {parse(post.content || '')}
          </div>

        </article>
      </Container>
    </div>
  ) : null
}