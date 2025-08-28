import { useOnce } from '@mongez/react-hooks';
import clsx from 'clsx';
import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { createAccount, getTokenFromLocalStorage, refreshAccessToken } from '../db/db';
import { useStoreActions } from '../store/hooks';
import { BiSolidLeaf } from 'react-icons/bi';

const RegisterPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const fromLast = location.state;
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');
    const [loading, setLoading] = useState(true)
  const { setUser } = useStoreActions(actions => actions)


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

      const handleSubmit = async (e:any) => {
        e.preventDefault()
        setLoading(true)
        if(password == "" || verifyPassword == "" || email  == ""){
          setError('Fill all the inputs');
          setLoading(false)
          return
        }
        if (password === verifyPassword) {
          const data = {
            email: email,
            emailVisibility: false,
            password: password,
            passwordConfirm: verifyPassword,
          };

          await createAccount('eco', data).then((res)=>{
            console.log(res);
            return navigate('/')
          }).catch((e)=>{
            console.log(e);
            
            if(!e.error.data.password.message && !e.error.data.email.message){
                setError(e.error.message)
            }
            
            setErrorPassword(e.error.data.password.message || "")
            setErrorEmail(e.error.data.email.message || "")
            setLoading(false)

            return
          })

          // Add your logic to submit the data
        } else {
          setError('Passwords do not match');
          setLoading(false)
          return

        }
      };

      
  
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
  <h2 className="text-2xl font-semibold mb-4">🌟 New here?</h2>

  {/* Email */}
  <input
    type="text"
    id="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    placeholder="📧 Email"
    className="w-64 text-sm border border-gray-700 bg-gray-800 rounded-md px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-green-500"
  />
  {errorEmail && <p className="text-red-400 text-xs mb-2">{errorEmail}</p>}

  {/* Password */}
  <input
    type="password"
    id="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    placeholder="🔒 Password"
    className="w-64 text-sm border border-gray-700 bg-gray-800 rounded-md px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-green-500"
  />
  {errorPassword && <p className="text-red-400 text-xs mb-2">{errorPassword}</p>}

  {/* Verify Password */}
  <input
    type="password"
    id="verifyPassword"
    value={verifyPassword}
    onChange={(e) => setVerifyPassword(e.target.value)}
    placeholder="✅ Verify Password"
    className="w-64 text-sm border border-gray-700 bg-gray-800 rounded-md px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-green-500"
  />

  {/* Error */}
  {error && <p className="text-red-400 text-sm mb-3">{error}</p>}

  {/* Button */}
  <button
    onClick={handleSubmit}
    className="w-64 mt-2 relative inline-flex items-center justify-center px-5 py-2.5 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-green-500 to-blue-600 hover:from-green-400 hover:to-blue-500 transition-all shadow-lg"
  >
    ✨ Create account
  </button>

  {/* Footer */}
  <p className="text-sm mt-5 text-gray-400">
    Already have an account?{" "}
    <Link
      className="font-semibold underline text-green-400 hover:text-green-300"
      to={"/login"}
    >
      Sign in!
    </Link>
  </p>
</div>

  )
}

export default RegisterPage