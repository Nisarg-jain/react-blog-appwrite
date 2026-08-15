import React, { useEffect, useState } from 'react'
import appwriteService from '../appwrite/config'
import { Container, PostCard } from '../components'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Home() {
  const [posts, setPosts] = useState([])
  const authStatus = useSelector((state) => state.auth.status)

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents)
      }
    })
  }, [])

  const features = [
    {
      icon: '✍️',
      title: 'Rich Editor',
      description: 'Write beautifully styled articles using integrated rich text editing tools.',
    },
    {
      icon: '⚡',
      title: 'Fast Storage',
      description: "Upload featured images and assets directly to Appwrite's cloud storage bucket.",
    },
    {
      icon: '🛡️',
      title: 'Secure Auth',
      description: 'Full user authentication managing post ownership, edits, and deletions safely.',
    },
    {
      icon: '📱',
      title: 'Responsive Design',
      description: 'Seamlessly read and publish articles across mobile, tablet, and desktop viewports.',
    },
    {
      icon: '🔗',
      title: 'Custom Slugs',
      description: 'Clean URL routes generated dynamically for every published post.',
    },
    {
      icon: '🔄',
      title: 'Redux Toolkit',
      description: 'Centralized state management ensuring instant user login and post updates.',
    },
  ]

  return (
    <div className="w-full py-8 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen transition-colors duration-200">
      <Container>
        {/* Hero Section */}
        <section className="py-16 md:py-24 text-center max-w-4xl mx-auto px-4">
          <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-blue-600 dark:text-blue-400 uppercase bg-blue-50 dark:bg-blue-950/60 rounded-full border border-blue-200 dark:border-blue-800">
            Welcome to BlogCraft
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-6">
            Share Your Thoughts, Stories & Ideas with the World
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            A modern blogging platform built with React, Redux, and Appwrite. Create, edit, and publish rich markdown articles effortlessly.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to={authStatus ? '/add-post' : '/login'}
              className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-md transition-all duration-200"
            >
              {authStatus ? 'Create New Post' : 'Get Started'}
            </Link>
          </div>
        </section>

        {/* Feature Cards Grid */}
        <section className="py-12 border-t border-slate-200 dark:border-slate-800">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm transition-colors duration-200"
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/50 mb-4 text-xl">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Latest Articles Section - Only rendered when logged in */}
        {authStatus && posts.length > 0 && (
          <section className="py-12 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Latest Articles</h2>
              <Link to="/all-posts" className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                View All Posts →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.slice(0, 3).map((post) => (
                <div key={post.$id}>
                  <PostCard {...post} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Prompt when logged out */}
        {!authStatus && (
          <section className="py-12 text-center border-t border-slate-200 dark:border-slate-800">
            <p className="text-slate-500 dark:text-slate-400">
              <Link to="/login" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                Login
              </Link>{' '}
              to explore and read all published posts.
            </p>
          </section>
        )}
      </Container>
    </div>
  )
}

export default Home