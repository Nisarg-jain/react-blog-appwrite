import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, RTE, Select } from '../index'
import appwriteService from '../../appwrite/config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || '',
      slug: post?.$id || '',
      content: post?.content || '',
      status: post?.status || 'active',
      category: post?.category || 'Tech',
    },
  })

  const navigate = useNavigate()
  const userData = useSelector((state) => state.auth.userData)

  const submit = async (data) => {
    if (post) {
      const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null

      if (file) {
        appwriteService.deleteFile(post.featuredImage)
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
        authorName: userData?.name || 'Anonymous',
      })

      if (dbPost) {
        toast.success('Post updated successfully!')
        navigate(`/post/${dbPost.$id}`)
      } else {
        toast.error('Failed to update post.')
      }
    } else {
      const file = await appwriteService.uploadFile(data.image[0])

      if (file) {
        const fileId = file.$id
        data.featuredImage = fileId
        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,
          authorName: userData?.name || 'Anonymous',
        })

        if (dbPost) {
          toast.success('Post published successfully!')
          navigate(`/post/${dbPost.$id}`)
        } else {
          toast.error('Failed to create post.')
        }
      } else {
        toast.error('Image upload failed. Please try again.')
      }
    }
  }

  const slugTransform = useCallback((value) => {
    if (value && typeof value === 'string')
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z0-9\s]/g, '-')
        .replace(/\s+/g, '-')

    return ''
  }, [])

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'title') {
        setValue('slug', slugTransform(value.title), { shouldValidate: true })
      }
    })

    return () => subscription.unsubscribe()
  }, [watch, slugTransform, setValue])

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-full lg:w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register('title', { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register('slug', { required: true })}
          onInput={(e) => {
            setValue('slug', slugTransform(e.currentTarget.value), { shouldValidate: true })
          }}
        />
        <RTE label="Content :" name="content" control={control} defaultValue={getValues('content')} />
      </div>

      <div className="w-full lg:w-1/3 px-2 mt-6 lg:mt-0">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register('image', { required: !post })}
        />
        {post && post.featuredImage && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg max-h-48 object-cover w-full"
            />
          </div>
        )}
        <Select
          options={['Tech', 'Lifestyle', 'Coding', 'Design', 'General']}
          label="Category"
          className="mb-4"
          {...register('category', { required: true })}
        />
        <Select
          options={['active', 'inactive']}
          label="Status"
          className="mb-4"
          {...register('status', { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-600 hover:bg-blue-700'}
          className="w-full text-white py-2.5 font-medium rounded-xl transition-all shadow-sm"
        >
          {post ? 'Update Post' : 'Publish Post'}
        </Button>
      </div>
    </form>
  )
}