import { useState,useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from './services/authService'
import {} from " ./store/authSlice"



function App() {
 console.log(import.meta.env.VITE_APPWRITE_URL);
 const [isLoading, setIsLoading] = useState(true);
 const Dispatch = useDispatch();
 useeffect(() => {
  authService.getCurrentUser()
  .then((userData) => {
    if (userData){
       Dispatch ()
    }
  })
  .finally()
 }, []);

  return (
    <>
      <h1>github update check commit </h1>
    </>
  )
}

export default App
