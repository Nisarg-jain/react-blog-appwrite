import React, { useEffect, useState } from 'react'
import appwriteService from '../appwrite/config'
import Container from '../components/container/Container'
import PostCard from '../components/PostCard'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function Home() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const authStatus = useSelector((state) => state.auth.status)

  useEffect(() => {
    if (authStatus) {
      setLoading(true)
      appwriteService.getPosts([]).then((posts) => {
        if (posts) {
          setPosts(posts.documents)
        }
        setLoading(false)
      }).catch(() => setLoading(false))
    } else {
      setPosts([])
      setLoading(false)
    }
  }, [authStatus])

  return (
    <div className="w-full py-12 bg-slate-50 min-h-screen">
      <Container>
        {/* --- HERO / LANDING SECTION --- */}
        <section className="text-center max-w-3xl mx-auto py-12 px-4">
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-blue-600 bg-blue-100/80 rounded-full mb-4">
            WELCOME TO BLOGCRAFT
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
            Share Your Thoughts, Stories & Ideas with the World
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            A modern blogging platform built with React, Redux, and Appwrite.
            Create, edit, and publish rich markdown articles effortlessly.
          </p>

          <div className="flex items-center justify-center gap-4">
            {authStatus ? (
              <Link
                to="/add-post"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
              >
                Create New Post
              </Link>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
                >
                  Get Started Free
                </Link>
                <Link
                  to="/login"
                  className="px-6 py-3 bg-white hover:bg-slate-100 text-slate-700 font-medium rounded-xl border border-slate-300 transition-all duration-200"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        </section>

        {/* --- LANDING PAGE FEATURES (6 CARDS GRID) --- */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-12">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4 font-bold text-xl">
              ✍️
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Rich Editor</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Write beautifully styled articles using integrated rich text editing tools.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-4 font-bold text-xl">
              ⚡
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Fast Storage</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Upload featured images and assets directly to Appwrite's cloud storage bucket.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-4 font-bold text-xl">
              🛡️
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Secure Auth</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Full user authentication managing post ownership, edits, and deletions safely.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-4 font-bold text-xl">
              📱
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Responsive Design</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Seamlessly read and publish articles across mobile, tablet, and desktop viewports.
            </p>
          </div>

          {/* Card 5 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-4 font-bold text-xl">
              🔗
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Custom Slugs</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Clean URL routes generated dynamically for every published post.
            </p>
          </div>

          {/* Card 6 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center mb-4 font-bold text-xl">
              🔄
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Redux Toolkit</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Centralized state management ensuring instant user login and post updates.
            </p>
          </div>
        </section>

        {/* --- DYNAMIC SECTION WITH SKELETON LOADER --- */}
        {authStatus ? (
          <section className="mt-16 pt-10 border-t border-slate-200">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-slate-900">Latest Articles</h2>
              <Link to="/all-posts" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                View All Posts &rarr;
              </Link>
            </div>

            {loading ? (
              /* Skeleton Loader Grid */
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className="bg-white rounded-2xl p-4 border border-slate-200/80 animate-pulse">
                    <div className="w-full h-44 bg-slate-200 rounded-xl mb-4"></div>
                    <div className="h-5 bg-slate-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-slate-100 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : posts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {posts.map((post) => (
                  <div key={post.$id}>
                    <PostCard {...post} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-300">
                <p className="text-slate-500 font-medium">No published posts found.</p>
              </div>
            )}
          </section>
        ) : (
          <div className="mt-12 text-center py-12 bg-blue-50/60 rounded-2xl border border-blue-100">
            <h3 className="text-2xl font-bold text-slate-800 mb-2">Ready to Start Reading & Writing?</h3>
            <p className="text-slate-600 mb-6">Sign in or create an account to view posts and share your thoughts.</p>
            <div className="flex justify-center gap-3">
              <Link
                to="/login"
                className="px-5 py-2.5 bg-blue-600 text-white font-medium text-sm rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
              >
                Sign In Now
              </Link>
              <Link
                to="/signup"
                className="px-5 py-2.5 bg-white text-slate-700 border border-slate-300 font-medium text-sm rounded-lg hover:bg-slate-50 transition-colors"
              >
                Create Account
              </Link>
            </div>
          </div>
        )}
      </Container>
    </div>
  )
}

export default Home