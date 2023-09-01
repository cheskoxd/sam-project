import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { authenticate, getTokenFromLocalStorage, refreshAccessToken } from '../db/db';
import { useOnce } from '@mongez/react-hooks';
import { useStoreActions, useStoreState } from '../store/hooks';
import clsx from 'clsx';
import { BiSolidLeaf } from 'react-icons/bi';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fromLast = location.state;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(fromLast ? fromLast.message : '');
  // const { user } = useStoreState(state => state)
  const { setUser } = useStoreActions(actions => actions)

  const handleLogin = async () => {
    setLoading(true)

    if (username != '' && password != '' ) {
      let {token, record}  = await authenticate('eco', username, password).catch((e)=>{
        console.log(e);
        
        setError(e.error)
        setLoading(false)

        return
      });
      if (token) {
        setUser(record)
        if (fromLast && fromLast.pathToRedirect) {
          return navigate(fromLast.pathToRedirect)
        }
        return navigate('/')
      }
    //   await logIn(username, password).then(res=>{
    //     if(pb.authStore.isValid){
    //         if(fromLast && fromLast.pathToRedirect) {
    //             return navigate(fromLast.pathToRedirect) 
    //         }
    //         return navigate('/feed')
    //     }               
    // })
    } else {
      setError('Invalid username or password');
      setLoading(false)

    }
  };
 
  useOnce(() => {
    let token = getTokenFromLocalStorage()
    async function getData(){
      if (token) {
        let { record } = await refreshAccessToken(token)
        setUser(record)
        return navigate('/')
      } else {
        setLoading(false)
      }
    }
    getData()
  })

  return (
    <div className="p-4 w-full h-screen flex flex-col justify-center items-center">
      <div className={clsx({ ['absolute top-0 left-0 flex justify-center items-center z-50 items h-full w-full py-1  border-b radialBorder bg-black opacity-1 transition-opacity duration-500 pointer-events-none ']: true, [" opacity-0 "]: loading == false })} >
        {/* <img className='w-24 h-24 hover:-rotate-6 animate-pulse' src="/quackerlogo2.png" alt="" /> */}
        <BiSolidLeaf className='text-green-800 animate-pulse' size={50} />
      </div>
      {/* <img className='w-20 h-20  hover:-rotate-6' src="/quackerlogo2.png" alt="" /> */}
      <BiSolidLeaf className='text-green-800 mb-4' size={50} />
      <h1 className="text-2xl font-semibold mb-4">Welcome back!</h1>
      <div>
        {/* <label htmlFor="username">Username:</label> */}
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='Email'
          className="w-52 text-sm border rounded px-2 py-1 mt-2 mb-2"
        />
      </div>
      <div>
        {/* <label htmlFor="password">Password:</label> */}
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
          className="w-52 text-sm border rounded px-2 py-1 mt-2 mb-2"
        />
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      
      <button onClick={handleLogin} className="w-52 mt-2 relative inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
        <span className="relative px-5 py-2.5 w-52 transition-all ease-in duration-75 bg-white dark:bg-black rounded-md group-hover:bg-opacity-0">
          Login
        </span>
      </button>

      <p className='text-sm mt-4 text-white/50'>Dont have an account? <Link className='font-semibold underline text-white' to={"/register"}>Sign up!</Link></p>
    </div>
  );
};

export default LoginPage;