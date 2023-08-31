import React, { useEffect, useState } from 'react'
import { FiAlertOctagon, FiAlertTriangle, FiCheck, FiCheckCircle, FiInfo, FiX } from 'react-icons/fi'
import Particles from 'react-tsparticles'
import { SpinnerRoundFilled } from 'spinners-react'
import { loadFull } from 'tsparticles'
import { confetti } from '../particles/particleData'

export const Alert = (props:any) => {
    const closeAlert = (e:any) =>{
        e.preventDefault()
        props.setState({...props.state, open:false})
    }

    const onConfirmAlert = () =>{
        props.setState({...props.state, value:true, open:false})
        props.confirm(null,true)
  
    }
   
    const particlesInit = async (main:any) => {
        // console.log(main);
        // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(main);
      };

  return (
    <div className='fixed z-50 top-0 left-0 gap-2 backdrop-blur w-screen h-screen flex flex-col justify-center items-center'>
            
        <div className='bg-dark2  p-5 rounded border-2 border-secondary/30 flex flex-col items-center justify-between gap-2 text-center' style={{width: '340px'}}>
        {props.state.loading ? <SpinnerRoundFilled color='#0174FF' /> :
        
        props.state.type == 'success' ? 
        <div className={`p-4 border bg-green-500/60 border-white/40 rounded-full mb-2`}>
            <FiCheckCircle className="text-2xl" />
        </div> :
        props.state.type == 'confirm' ? 
        <div className={`p-4 border bg-yellow-500/60 border-white/40 rounded-full mb-2`}>
            <FiAlertTriangle className="text-2xl" />
        </div> :
 
        props.state.type == 'error' && 
        <div className={`p-4 border bg-red-500/60 border-white/40 rounded-full mb-2`}>
            <FiAlertOctagon className="text-2xl" />
        </div>
  }

        {props.state.msg && <p className='text-sm w-4/5'>{props.state.msg}</p>}
        
            {props.state.type == 'confirm' && props.state.ableToClose ? 
            <div className="w-full flex items-center justify-evenly">
                <button onClick={onConfirmAlert} className='bg-main/70 rounded flex items-center justify-center text-sm gap-2 h-button w-2/5 px-4 mt-2'><FiCheck />Confirm</button>
                <button onClick={closeAlert} className='bg-dark rounded  border border-secondary/50 flex items-center justify-center text-sm gap-2 h-button w-2/5 px-4 mt-2'><FiX/> Cancel</button>
            </div> :
                props.state.ableToClose && <button onClick={closeAlert} className='bg-dark border border-secondary/50 rounded flex items-center justify-center text-sm gap-2 h-button w-auto px-4 mt-2'><FiX/> Close</button>
                
            }
        </div>
        {props.state.type == 'success' && !props.state.loading  && <Particles
        id="tsparticles"
        init={particlesInit}
        // @ts-ignore
        options={confetti}
        />
        }
        
    </div>
  )
}