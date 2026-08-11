import React from 'react'
import Container from '../components/container/Container'
import PostForm from '../components/post-form/PostForm'

function AddPost() {
  return (
    <div className="py-8">
      <Container>
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Create a New Article</h1>
        <PostForm />
      </Container>
    </div>
  )
}

export default AddPost