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
      return
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
    <div className="p-4 w-full h-screen flex flex-col justify-center items-center bg-gray-950 text-white">
  {/* Loader Overlay */}
  <div
    className={clsx({
      ["absolute top-0 left-0 flex justify-center items-center z-50 h-full w-full bg-black bg-opacity-80 backdrop-blur-md transition-opacity duration-500"]:
        true,
      ["opacity-0 pointer-events-none"]: loading === false,
    })}
  >
    <BiSolidLeaf className="text-green-400 animate-pulse" size={50} />
  </div>

  {/* Logo */}
  <BiSolidLeaf className="text-green-400 mb-6 animate-bounce" size={50} />

  {/* Title */}
  <h1 className="text-2xl font-semibold mb-4">👋 Welcome back!</h1>

  {/* Username */}
  <input
    type="text"
    id="username"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
    placeholder="📧 Email"
    className="w-64 text-sm border border-gray-700 bg-gray-800 rounded-md px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-green-500"
  />

  {/* Password */}
  <input
    type="password"
    id="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    placeholder="🔒 Password"
    className="w-64 text-sm border border-gray-700 bg-gray-800 rounded-md px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-green-500"
  />

  {/* Error */}
  {error && <p className="text-red-400 text-sm mb-3">{error}</p>}

  {/* Button */}
  <button
    onClick={handleLogin}
    className="w-64 mt-2 relative inline-flex items-center justify-center px-5 py-2.5 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-green-500 to-blue-600 hover:from-green-400 hover:to-blue-500 transition-all shadow-lg"
  >
    🌱 Login
  </button>

  {/* Footer */}
  <p className="text-sm mt-5 text-gray-400">
    Don’t have an account?{" "}
    <Link
      className="font-semibold underline text-green-400 hover:text-green-300"
      to={"/register"}
    >
      Sign up!
    </Link>
  </p>
</div>

  );
};

export default LoginPage;