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
    <div className="w-10/12 md:w-72 lg:w-60 m-2 flex flex-col justify-between rounded-xl border border-gray-700 bg-[#121212] shadow-lg hover:shadow-xl hover:shadow-blue-500/10 transition-shadow duration-300 overflow-hidden">
  
  {/* Task image */}
  <div className="aspect-square h-40 relative overflow-hidden rounded-t-xl">
    <img
      className="object-cover object-center w-full h-full"
      src={`https://sam-school-app.pockethost.io/api/files/tasks/${id}/${imageDef}`}
      alt={taskName}
    />
  </div>

  {/* Content */}
  <div className="flex flex-col items-start justify-start gap-2 p-2">
    <h2 className="text-lg font-semibold text-white text-start gap-2">
      📌 {taskName}
    </h2>
    <p className="text-sm text-gray-300 text-start">{taskDescription}</p>
  </div>

  {/* Actions */}
  <div className="p-4 pt-0">
    {!completed ? (
      <>
        {imagesSelected && imagesSelected[id] ? (
          <button
            onClick={handleComplete}
            className="w-full bg-blue-600 hover:bg-blue-500 transition-colors px-4 py-2 rounded-lg text-sm font-medium text-white shadow-md"
          >
            ✅ Complete Task
          </button>
        ) : (
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor={`dropzone-file${id}`}
              className="flex flex-col items-center justify-center w-full h-12 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              <div className="flex  items-center gap-2">
                <svg
                  className="w-5 h-5 text-blue-400 mb-1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="text-xs text-gray-300">
                  <span className="font-semibold">Upload proof</span>
                </p>
              </div>
              <input
                id={`dropzone-file${id}`}
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, id)}
                className="hidden"
              />
            </label>
          </div>
        )}
      </>
    ) : (
      <p className="text-sm font-medium text-green-400 flex items-center gap-2">
        🎉 Task completed! Thank you.
      </p>
    )}
  </div>
</div>

  );
};

export default DailyTask;
