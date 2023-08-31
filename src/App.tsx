import React, { useState } from 'react';
import './App.css';
import Dashboard from './pages/Dashboard';
import {BiSolidLeaf} from 'react-icons/bi'
import { Adsense } from '@ctrl/react-adsense';
import { Alert } from './components/Alert';
import { useStoreActions, useStoreState } from './store/hooks';
import Ads from './components/Ads';

function App() {
  const { alert, loading } = useStoreState(state => state);
  const { setAlert } = useStoreActions(actions => actions)

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
      /> 
      {/* <Ads dataAdSlot="6622535161" /> */}
      </div>
      <header className="App-header pt-4">
        <h1 className='flex justify-center items-center text-2xl gap-2' >EcoTask App <BiSolidLeaf className='text-green-800' />  </h1>
      </header>
      <main>
        <Dashboard />
      </main>
    </div>
  );
}

export default App;
