import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import store from './store/store.js'
import App from './App.jsx'
import './index.css'

import Home from './Pages/homePage.jsx'
import Login from './Pages/login.jsx'
import Signup from './Pages/signup.jsx'
import AllPosts from './Pages/allPost.jsx'
import AddPost from './Pages/addPost.jsx'
import EditPost from './Pages/editPost.jsx'
import Post from './Pages/post.jsx'

import AuthLayout from './components/authLayout.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/login', element: <AuthLayout authentication={false}><Login /></AuthLayout> },
      { path: '/signup', element: <AuthLayout authentication={false}><Signup /></AuthLayout> },
      { path: '/all-posts', element: <AuthLayout authentication><AllPosts /></AuthLayout> },
      { path: '/add-post', element: <AuthLayout authentication><AddPost /></AuthLayout> },
      { path: '/edit-post/:slug', element: <AuthLayout authentication><EditPost /></AuthLayout> },
      { path: '/post/:slug', element: <Post /> },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)