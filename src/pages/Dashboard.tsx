import React, { useEffect, useState } from 'react';
import TaskList from '../components/TaskList';
import { authenticate, getRecords, getTokenFromLocalStorage, logOut, refreshAccessToken } from '../db/db';
import { useStoreActions, useStoreState } from '../store/hooks';
import {Adsense} from '@ctrl/react-adsense';

import gifImage from "../assets/rafsdesign-rafs.gif"
import { IUser } from '../store/models';
import { useNavigate } from 'react-router-dom';
import { FiX } from 'react-icons/fi';
import { BiSolidLeaf } from 'react-icons/bi';
import clsx from 'clsx';

interface List {
    id: string,
    taskName: string,
    image: string,
    taskDescription: string,
    proofInstructions: string,
}

const Dashboard: React.FC = () => {
  const { user, loading } = useStoreState(state => state);
  const { setUser, setLoading } = useStoreActions(actions => actions)

  const [token, setToken] = useState<null | string>()
  const [message, setMessage] = useState("")
  const [modal, setModal] = useState(false)
  const [dailyTasks, setDailyTasks] = useState<List[]>([])
  const [madeTasks, setMadeTasks] = useState<any[]>([])
  const [stats, setStats] = useState({completed: 0, top: 1, waitingForApproval: 0})


//   let dailyTasks:any = []
    const navigate = useNavigate()
    async function openModal(){
      setModal(true)

      let stonks:any = {}
      if(!user) return 
      let t
      let top:any = await getRecords("te", {perPage: 50, skipTotal:false}).then((top:any)=>{
        t = findIndexById(top, user.id)
        
        stonks.top = `${t+1} out of ${top.totalItems}`

        console.log(top);
      })
      let tasks:any = await getRecords("uploads", { filter: `owner = '${user.id}'`, skipTotal:false, perPage:20 })
      stonks.completed = tasks.totalItems
      let data = countValidTasks(tasks)
      console.log(data);
      
      console.log(tasks);
      stonks.completed = data.valid
      
      stonks.waitingForApproval = data.invalid
      setStats(stonks)

    }

    function findIndexById(data:any, targetId:string) {
      for (let i = 0; i < data.items.length; i++) {
          if (data.items[i].owner === targetId) {
              return i;
          }
      }
      return -1; // If the ID is not found
  }

    function countValidTasks(data:any) {
      let validCount = 0;
      let invalidCount = 0;
  
      data.items.forEach((item:any) => {
          if (item.isValid) {
              validCount++;
          } else {
              invalidCount++;
          }
      });
  
      return {
          valid: validCount,
          invalid: invalidCount
      };
  }
  

    async function getData(token: string) {
        let { record } = await refreshAccessToken(token)
        setUser(record)
        let tasks:any = await getRecords("tasks", { sort: "@random" })
        
        let uploads:any = await getRecords("uploads", { filter: `owner = "${record.id}"`, expand: "taskId" })
        console.log(tasks);
        console.log(uploads);
        const filteredItems = tasks.items.filter((item:any) => {
          return !uploads.items.some((upload:any) => upload.taskId === item.id);
        });
        
        const filteredData1 = { ...tasks, items: filteredItems };
        
        console.log(filteredData1);
        setMadeTasks(uploads.items)
        setDailyTasks(filteredData1.items);
        setLoading(false)
    }

    function setData(){
      let {token} = getTokenFromLocalStorage()
    console.log(token);

    
    if(token){
      setToken(token)
        getData(token)

    } else {
        setMessage("Log in first!")
        setLoading(false)
    }
    }

  // useEffect(()=>{
  //   setData()
  // },[])

  useEffect(()=>{
    setLoading(true)
    let {token, record} = getTokenFromLocalStorage()
    if(!token || !record){
      logOut()
      navigate('/login')
    }

    if(record.id){
          setUser(record as IUser)
          // setUserId(duck.id)
          setToken(token)
          getData(token)
          return 
    }
  }, [])

  function logOf(){
    logOut()
    navigate('/login')
  }

  return (
    <div className="dashboard flex justify-center flex-col text-white">
      {/* <div className='absolute top-0 right-0 w-5 h-5'>
        <span>{3}</span>
        <p>Towp</p>
      </div> */}
        <div className={clsx({ ['absolute top-0 left-0 flex justify-center items-center z-50 items h-full w-full py-1  border-b radialBorder bg-black opacity-1 transition-opacity duration-500 pointer-events-none ']: true, [" opacity-0 "]: loading == false })} >
          <BiSolidLeaf className='text-green-800 animate-pulse' size={50} />
        </div>
      {modal && <div className='w-full z-50 h-full bg-dark2 fixed top-0 left-0 flex justify-center flex-col items-center'>
          <div onClick={()=> setModal(false)} className='absolute top-5 left-5 w-6 h-6'>
            <FiX size={30} />
          </div>
          <h2 className='text-2xl'>Hey {user?.username}</h2>
          <p className='text-sm opacity-75 mb-6'>Here are your stats</p>
          
            <div className='flex justify-center items-center gap-2 flex-col'>
              <span className='text-md flex flex-row justify-center items-center gap-2'>Tasks completed <span className='text-3xl'>{stats.completed}</span></span>
              
              <span className='text-md flex flex-row justify-center items-center gap-2'>Tasks waiting for approval <span className='text-3xl'>{stats.waitingForApproval}</span></span>
              
              <div className='text-2xl'>You are on top {stats.top}</div>
            </div>

            <div onClick={logOf} className='text-sm underline underline-offset-2 mt-12'>Log out</div>
          
        </div>}
      <h3 className='underline underline-offset-2' onClick={openModal}>Hey {user && user?.username}!</h3>
      <h2>Here are your daily tasks!</h2>
      {loading ? <div className='flex w-full justify-center flex-col gap-4 items-center mt-12'>
          <img src={gifImage} alt="GIF Example" className=' w-32 pr-9' />
          <p className='text-sm'>Loading</p>
        </div> :<div className='w-full flex justify-center items-center'><TaskList tasks={dailyTasks} /></div>
      }
        {madeTasks.length !== 0 && <h3 className='text-md mt-4 opacity-50'>Completed tasks</h3>}
      <div className=' w-full mt-2 task-list flex justify-center  flex-wrap -mx-1 lg:-mx-4'>
        {madeTasks.length != 0 && madeTasks.map((it: any) => {
          return <div className='w-11/12 rounded-lg overflow-hidden md:w-72 m-2 lg:w-60  mx-2'>
            <div className='aspect-square relative'>
              <img className={'object-cover object-center w-full h-full'} src={`https://sam-school-app.pockethost.io/api/files/uploads/` + it.id + "/" + it.proof} alt="" />
              <div className='absolute p-4 top-0 flex justify-start items-start flex-col left-0 w-full h-full bg-grad'>
                <p>{it.expand.taskId.taskName}</p>
                {it.isValid ? <span className='text-xs text-green-500'>Approved</span> :
                <span className='text-xs text-red-500'>Waiting for Proof Approval</span> }
              </div>
            </div>
          </div>
        })}
      </div>
      
      
    </div>
  );
};

export default Dashboard;
