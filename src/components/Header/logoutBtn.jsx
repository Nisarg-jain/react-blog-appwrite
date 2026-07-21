import React from 'react'
import {Dispatch} from 'react-redux'
import {logout} from '../../store/slices/authSlice'


function logoutBtn() {
    const dispatch = useDispatch();
    const handleLogout = () => {
       authSearvice.logout().then(() => {
        dispatch(logout());
       });
    }

  return (
    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleLogout}>
      Logout
    </button>
  )
}

export default logoutBtn