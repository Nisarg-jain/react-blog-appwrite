import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from './services/authService'
import { login, logout } from "./store/authSlice" // Fixed: Removed the space in the path

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch(); // Convention: lowercase "dispatch"

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          // If a user session exists, log them into Redux
          dispatch(login({ userData })); 
        } else {
          // Otherwise, clear the state
          dispatch(logout());
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // Show a loading screen while checking authentication state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <h1 className="text-2xl font-bold">Loading...</h1>
      </div>
    );
  }

  return (
    <> {/* 💡 Wrap everything in a Fragment to return a single parent element */}
      <div className='min-h-screen flex flex-col justify-between bg-red-100'>
        <header className="bg-blue-500 text-white p-4">
          <h1 className="text-xl font-bold">My Blog</h1>
        </header>
        
        <main className="flex-1 p-4 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold mb-2">Welcome to the Blog Mega Project</h1>
          <p>This is the main content area.</p>
        </main>
        
        <footer className="bg-gray-800 text-white p-4 text-center">
          <p>&copy; 2026 My Blog. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}

export default App;