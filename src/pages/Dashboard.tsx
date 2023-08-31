import React, { useEffect, useState } from 'react';
import TaskList from '../components/TaskList';
import { authenticate, getRecords, getTokenFromLocalStorage, logOut, refreshAccessToken } from '../db/db';
import { useStoreActions, useStoreState } from '../store/hooks';
import {Adsense} from '@ctrl/react-adsense';

import gifImage from "../assets/rafsdesign-rafs.gif"
import { IUser } from '../store/models';
import { useNavigate } from 'react-router-dom';

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
  const [dailyTasks, setDailyTasks] = useState<List[]>([])
  const [madeTasks, setMadeTasks] = useState<any[]>([])

  const navigate = useNavigate();

//   let dailyTasks:any = []

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

  return (
    <div className="dashboard flex justify-center flex-col text-white">
           
      <h2>Your Daily Tasks</h2>
      <h3>{message}</h3>
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
