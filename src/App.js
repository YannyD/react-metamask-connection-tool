import './App.css';
import { lazy, Suspense } from 'react';
import { ethers } from "ethers";

const StatusBar = lazy(()=>import("./Components/StatusBar"));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
      <StatusBar/>
      </Suspense>
    </div>
  )
}

export default App;
