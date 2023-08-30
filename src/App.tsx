import React from 'react';
import './App.css';
import Dashboard from './pages/Dashboard';
import {BiSolidLeaf} from 'react-icons/bi'

function App() {
  return (
    <div className="App">
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
