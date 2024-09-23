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
      <div className="p-4 w-full h-screen flex flex-col justify-center items-center">
          <div className={clsx({ ['absolute top-0 left-0 flex justify-center items-center z-50 items h-full w-full py-1  border-b radialBorder bg-black opacity-1 transition-opacity duration-500 pointer-events-none ']: true, [" opacity-0 "]: loading == false })} >
        {/* <img className='w-24 h-24 hover:-rotate-6 animate-pulse' src="/quackerlogo2.png" alt="" /> */}
        <BiSolidLeaf className='text-blue-800 animate-pulse' size={50} />
      </div>
      {/* <img className='w-20 h-20  hover:-rotate-6' src="/quackerlogo2.png" alt="" /> */}
      <BiSolidLeaf className='text-blue-800 mb-4' size={50} />
      <h2 className="text-2xl font-semibold mb-4">New here?</h2>
      <div>
        {/* <label htmlFor="email">Email:</label> */}
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
          className="w-52 text-sm border rounded px-2 py-1 mt-2 mb-2"
                  />
      {errorEmail && <p className="text-red-500 text-xs mb-1">{errorEmail}</p>}

      </div>
      <div className='w-52'>
        {/* <label htmlFor="password">Password:</label> */}
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
          className="w-52 text-sm border rounded px-2 py-1 mt-2 mb-2"
        />
      {errorPassword && <p className="text-red-500 text-xs mb-1">{errorPassword}</p>}

        <input
          type="password"
          id="verifyPassword"
          value={verifyPassword}
          onChange={(e) => setVerifyPassword(e.target.value)}
          placeholder='Verify Password'
          className="w-52 text-sm border rounded px-2 py-1 mt-2 mb-2"
        />

      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      
      <button onClick={handleSubmit} className="w-52 mt-2 relative inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
        <span className="relative px-5 py-2.5 w-52 transition-all ease-in duration-75 bg-white dark:bg-black rounded-md group-hover:bg-opacity-0">
          Create account
        </span>
      </button>

      <p className='text-sm mt-4 text-white/50'>Already have an account? <Link className='font-semibold underline text-white' to={"/login"}>Sign In!</Link></p>
  {/* </div> */}
      </div>
  )
}

export default RegisterPage