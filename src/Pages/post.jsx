import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const [copied, setCopied] = useState(false);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen transition-colors">
            <Container>
                <div className="w-full max-w-4xl mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl transition-colors">
                    
                    {/* Header bar / Metadata & Share */}
                    <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100 dark:border-slate-800">
                        <Link to="/" className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                            ← Back to Articles
                        </Link>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={handleShare}
                                className="px-3 py-1.5 text-xs font-semibold rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
                            >
                                {copied ? "✅ Copied!" : "🔗 Share"}
                            </button>
                            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                                Published
                            </span>
                        </div>
                    </div>

                    {/* Featured Image & Action Buttons */}
                    <div className="w-full relative mb-8 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            onError={(e) => {
                                e.target.src = "https://placehold.co/800x450/1e293b/ffffff?text=BlogCraft";
                            }}
                            className="w-full max-h-[460px] object-contain mx-auto"
                        />

                        {isAuthor && (
                            <div className="absolute right-4 top-4 flex items-center gap-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-md">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button bgColor="bg-blue-600 hover:bg-blue-700" className="px-3 py-1.5 text-xs font-semibold">
                                        ✏️ Edit
                                    </Button>
                                </Link>
                                <Button bgColor="bg-red-600 hover:bg-red-700" onClick={deletePost} className="px-3 py-1.5 text-xs font-semibold">
                                    🗑️ Delete
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Post Title */}
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
                        {post.title}
                    </h1>

                    {/* Post Content */}
                    <div className="text-slate-700 dark:text-slate-300 leading-relaxed space-y-4 text-base sm:text-lg">
                        {parse(post.content)}
                    </div>
                </div>
            </Container>
        </div>
    ) : null;
}