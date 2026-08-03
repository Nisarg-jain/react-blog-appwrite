import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth' 
import { login as authLogin } from '../store/authSlice' 

export default function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (data) => {
    setError('')
    setLoading(true)
    try {
      
      const session = await authService.login(data)
      if (session) {
       
        const userData = await authService.getCurrentUser()
        if (userData) {
          dispatch(authLogin(userData))
        }
        navigate('/')
      }
    } catch (err) {
      setError(err.message || 'Invalid email or password. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center w-full min-h-[80vh] px-4">
      <div className="w-full max-w-md bg-white rounded-xl p-8 border border-gray-200 shadow-md">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Sign in to your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Don&apos;t have an account?&nbsp;
            <Link
              to="/signup"
              className="font-medium text-indigo-600 transition-all duration-200 hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>

        {error && (
          <p className="mb-4 text-sm text-center text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition"
              {...register('email', {
                required: 'Email is required',
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    'Please enter a valid email address',
                },
              })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition"
              {...register('password', {
                required: 'Password is required',
              })}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition duration-200 disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}