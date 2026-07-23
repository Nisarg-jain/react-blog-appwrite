import React from 'react'
import appwriteService from '../appwrite/config' 
import { Link } from 'react-router-dom' 

function PostCard({ $id, title, content, featuredImage }) {
  return (
    
    <Link 
      to={`/post/${$id}`} 
      className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-300"
    >
      {/* Featured Image */}
      {featuredImage && (
        <img 
          src={appwriteService.getFilePreview(featuredImage)} 
          alt={title} 
          className="mb-4 w-full h-48 object-cover rounded-lg" 
        />
      )}
      
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 line-clamp-3">{content}</p>
    </Link>
  )
}

export default PostCard