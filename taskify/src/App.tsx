import React from 'react';
import './App.css';
import { Button } from './components/Elements/Button';

function App() {

  return (
    <div>
      <Button variant="primary" onClick={() => console.log('Clicked')}>Primary</Button>
      <Button variant="danger" onClick={() => console.log('Clicked')}>Primary</Button>

    </div>
  )
}

export default App
