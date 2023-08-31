import React, { useState } from 'react';
import { createRecord } from '../db/db';
import Compressor from 'compressorjs';
import { useStoreActions, useStoreState } from '../store/hooks';

interface DailyTaskProps {
    id: string,
    taskName: string,
    taskDescription: string,
    proofInstructions: string,
    imageDef: any
}

const DailyTask: React.FC<DailyTaskProps> = ({ id,imageDef, taskName, taskDescription, proofInstructions }) => {
  const [completed, setCompleted] = useState(false);

  const { user, alert, imagesSelected } = useStoreState(state => state);
  const { setAlert, setImageSelected } = useStoreActions(actions => actions);

  const handleComplete = () => {
    // Handle task completion (e.g., send image to backend)
    handlePost()
  };

  const handlePost = async () => {
    // Here, you can handle the post logic, e.g., make an API call to post the text
    // if(!user) return
    const formData = new FormData();
    if(imagesSelected && imagesSelected[id] && user) {
      setAlert({...alert, open: true, ableToClose: false, loading: true, msg: "Compressing.."})
      new Compressor(imagesSelected[id], {
        quality: 0.6, // 0.6 can also be used, but its not recommended to go below.
        success: async (compressedResult) => {
          formData.append('proof', compressedResult);
          formData.append('taskId', id);
          formData.append('owner', user.id);
          setAlert({...alert, open: true, ableToClose: false, loading: true,  msg: "Uploading..."})
          await createRecord('uploads',formData, {expand: "author"}).then((record:any)=>{
      
            console.log(record);
            setAlert({...alert,msg: 'Task Completed!',open: true, loading: false, type: 'success', ableToClose: true })
            setCompleted(true);
      
            
          })
        },
      });
    } else {
      // formData.append('author', user.id);
      setAlert({...alert, type: "error", open:true ,msg:"Add picture first"});
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, eid:string) => {
    const selectedImage = event.target.files && event.target.files[0];
    setImageSelected({id:eid ,file:selectedImage});
  };

  return (
    <div className="w-10/12 border text-white bg-dark border-white/20 shadow-white/5 gap-2 p-4 md:w-72 m-2 lg:w-60 overflow-hidden rounded-lg shadow-lg flex item flex-col justify-between">
      <div className='aspect-square h-40 relative overflow-hidden'  style={{"borderRadius":"10px"}}>
        <img className={'object-cover object-center aspect-square w-full h-full'} src={`https://sam-school-app.pockethost.io/api/files/tasks/` + id + "/" + imageDef} alt="" />
      </div>
      
      <h2 className='text-lg font-semibold'>{taskName}</h2>
      {/* <h2 className='text-lg font-semibold'>{id}</h2> */}
      <p className='text-sm'>{taskDescription}</p>
      {/* <p className='text-xs text-white/60'>Instructions: {proofInstructions}</p> */}
      {!completed ? (
        <>
          {/* {!image ? <input type="file" className='' accept="image/*" onChange={handleImageUpload} /> : */}
          {imagesSelected && imagesSelected[id] ? <button className='bg-green-600' onClick={handleComplete}>Complete Task</button> :
          // <button className='bg-green-600' onClick={handleComplete}>Complete Task</button>}
          <div className="flex items-center justify-center w-full">
            <label htmlFor={"dropzone-file"+id} className="flex flex-col items-center justify-center w-full h-14 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-green-600 dark:hover:bg-bray-800  hover:bg-green-500 ">
              <div className="flex flex-col items-center justify-center">
                <svg className="w-4 h-4 text-white/50 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                </svg>
                <p className=" text-xs text-white "><span className="font-semibold">Upload proof to complete</span></p>
                {/* <p className="text-xs text-gray-500/50 ">SVG, PNG, JPG or GIF (MAX. 800x400px)</p> */}
              </div>
              <input id={"dropzone-file"+id} type="file" accept="image/*" onChange={(e) => handleImageUpload(e, id)} className="hidden" />
            </label>
          </div> }
        </>
      ) : (
        <p className='text-xs text-green-400'>Task completed! Thank you.</p>
      )}
    </div>
  );
};

export default DailyTask;
