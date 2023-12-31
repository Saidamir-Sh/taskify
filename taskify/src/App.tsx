import React from 'react'
import './App.css'
import SignUpForm from './features/authentication/components/SignUpForm'
import { Button } from './components/Elements/Button'

function App() {

  return (
    <div>
      <SignUpForm />
      <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
        <div className="shrink-0">
        </div>
        <div>
          <div className="text-l font-medium text-black">ChitChat</div>
          <p className="text-slate-500">You have a new message!</p>
        </div>
      </div>
      <Button variant="primary" onClick={() => console.log('Clicked')}>Primary</Button>

    </div>
  )
}

export default App
