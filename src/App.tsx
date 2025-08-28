import React, { useState } from 'react';
import './App.css';
import Dashboard from './pages/Dashboard';
import {BiSolidLeaf} from 'react-icons/bi'
import { Adsense } from '@ctrl/react-adsense';
import { Alert } from './components/Alert';
import { useStoreActions, useStoreState } from './store/hooks';
// import Ads from './components/Ads';

function App() {
  const { alert, loading } = useStoreState(state => state);
  const { setAlert } = useStoreActions(actions => actions)
  const handleRedirect = () => {
    // You can specify the path relative to the public folder
    window.location.href = '/game.html';
  };
  // const [alert, setAlert] = useState<{msg: string, type: string, value:boolean, open:boolean, ableToClose:boolean, loading:boolean}>({msg: 'Are you sure you want to delete 5 files?', open: false, type: 'success', value: false, ableToClose:false, loading:true})
  
  return ( 
    <div className="App bg-dark2 text-white">
      {alert.open &&  <Alert state={alert} setState={setAlert} />}
      {/* <div className=' flex justify-center items-center w-full h-24'>
      <Adsense
        client="ca-pub-9828783530326542"
        slot="6622535161"
        // style={{  "width": "360px", "height": "90px !important" }}
      // format='autorelaxed'
      style={{ width: "360px", height: "90px" }}
      format=""
      className='bg-white'
      /> 
      </div> */}
      <header className="bg-[#222222] shadow-md">
  <div className="container mx-auto flex justify-between bg-[#222222] items-center py-4 px-6">
    {/* Logo / Title */}
    <h1 className="flex items-center text-2xl font-bold text-white gap-2">
      Stat <BiSolidLeaf className="text-green-400" />
    </h1>

    {/* Navigation */}
    {/* <nav className="hidden md:flex gap-6 text-gray-300 font-medium">
      <a href="#features" className="hover:text-green-400 transition-colors">
        Check your Stats here!
      </a>
    </nav> */}

    {/* CTA Button */}
    <div>
      <button
      className="bg-green-500 text-gray-900 px-4 py-2 rounded-lg border-2 border-transparent 
                 hover:border-green-400 hover:bg-gray-900 hover:text-green-400 transition-colors"
      onClick={handleRedirect}
    >
      Play our Game
    </button>
    <a
      className="bg-sky-500 text-gray-900 ml-4 px-4 py-2 rounded-lg border-2 border-transparent 
                 hover:border-sky-400 hover:bg-gray-900 hover:text-sky-400 transition-colors"
      href='https://mantenetechiva.netlify.app/'
    >
      ManteneteChiva
    </a>
    </div>
  </div>
</header>

      <main className='p-4'>
        <Dashboard />
      </main>
    </div>
  );
}

export default App;
