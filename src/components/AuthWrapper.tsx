import React, { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { getTokenFromLocalStorage } from '../db/db';
// import { pb } from '../db/db'

interface AuthInterface {
    children: ReactNode
}

const AuthWrapper = (props:AuthInterface) => {
    const location = useLocation();
    console.log(location.pathname);
    let token = getTokenFromLocalStorage()
    if(token){
        return <>{props.children}</>
    }

    // pb.authStore.clear()
    return <Navigate to='/login' state={{message:'Please log in first', pathToRedirect: location.pathname}} />
}

export default AuthWrapper