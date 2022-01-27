import React from 'react';
import './App.css';
import LocWeat from './components/LocWeatFetch';

const App: React.FunctionComponent = () => {
  return(
    <div className='App'>
      <div className='wrapper'>
        <LocWeat />
      </div>
    </div>
  );
}

export default App;
