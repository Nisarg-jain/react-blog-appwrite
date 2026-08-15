import React, { useState, useEffect } from 'react'
import { Container, PostCard } from '../components'
import appwriteService from '../appwrite/config'

function AllPosts() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
            setLoading(false)
        })
    }, [])

    const filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="w-full py-8 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors">
            <Container>
                {/* Header & Search Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                        All Articles ({loading ? '...' : filteredPosts.length})
                    </h1>
                    <div className="w-full sm:w-72">
                        <input
                            type="text"
                            placeholder="🔍 Search articles..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all shadow-sm"
                        />
                    </div>
                </div>

                {/* Loading Skeleton */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((n) => (
                            <div
                                key={n}
                                className="h-80 rounded-3xl bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 animate-pulse p-4 flex flex-col justify-between"
                            >
                                <div className="h-48 bg-slate-300 dark:bg-slate-800 rounded-2xl" />
                                <div className="space-y-2">
                                    <div className="h-5 bg-slate-300 dark:bg-slate-800 rounded w-3/4" />
                                    <div className="h-4 bg-slate-300 dark:bg-slate-800 rounded w-1/2" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : filteredPosts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredPosts.map((post) => (
                            <div key={post.$id}>
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-16 text-center text-slate-500 dark:text-slate-400">
                        No articles found matching "{searchTerm}"
                    </div>
                )}
            </Container>
        </div>
    )
}

export default AllPosts