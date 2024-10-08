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
      <div className=' flex justify-center items-center w-full h-24'>
      <Adsense
        client="ca-pub-9828783530326542"
        slot="6622535161"
        // style={{  "width": "360px", "height": "90px !important" }}
      // format='autorelaxed'
      style={{ width: "360px", height: "90px" }}
      format=""
      className='bg-white'
      /> 
      {/* <Ads dataAdSlot="6622535161" /> */}
      </div>
      <header className="App-header pt-4">
        <h1 className='flex justify-center items-center text-2xl gap-2' >Granada Green App <BiSolidLeaf className='text-blue-800' />  </h1>
        <button className='bg-blue-800 text-white p-2 rounded-md mt-4 border-white border-2 mb-2' onClick={handleRedirect}>Play our game here!</button>

        
      </header>
      <main>
        <Dashboard />
      </main>
    </div>
  );
}

export default App;
