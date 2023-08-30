import React from 'react';
import './App.css';
import Dashboard from './pages/Dashboard';
import {BiSolidLeaf} from 'react-icons/bi'
import { Adsense } from '@ctrl/react-adsense';

function App() {
  return (
    <div className="App">
      <div className=' flex justify-center items-center w-full h-24'>

      <Adsense
        client="ca-pub-9828783530326542"
        slot="6622535161"
        style={{  "width": "360px", "height": "90px !important" }}
      // format='autorelaxed'
      />
      </div>
      <header className="App-header">
        <h1 className='flex justify-center items-center text-2xl gap-2' >EcoTask App <BiSolidLeaf className='text-green-800' />  </h1>
      </header>
      <main>
        <Dashboard />
      </main>
    </div>
  );
}

export default App;
