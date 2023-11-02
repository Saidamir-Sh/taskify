import React, {useState} from 'react';
import axios from 'axios';
import { SignUp } from '../types';

function SignUpForm() {
  const [signUpForm, setSignUpForm] = useState<SignUp>({email: '', password: ''});

  const submitSignUpForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const requestData = JSON.stringify(signUpForm);
  
    axios.post('https://taskifybackend-e8c4a5c6b28b.herokuapp.com/api/auth/signup/', requestData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      console.log(response.data); // Log the response data
      // Do something with the response data, if needed
    })
    .catch((error) => {
      console.error('Error:', error); // Log any errors
      // Handle the error or show an error message to the user
    });
  
    console.log(signUpForm);
  };
  

  return (
    <div>
      <form onSubmit={submitSignUpForm}>
        <input 
          type='email'
          value={signUpForm.email}
          onChange={(e) => setSignUpForm({...signUpForm, email: e.target.value})}
          required
        ></input>
        <input 
          type='password'
          value={signUpForm.password}
          onChange={(e) => setSignUpForm({...signUpForm, password: e.target.value})}
          required
        ></input>
        <button>SignUp</button>
      </form>

    </div>
  )
}

export default SignUpForm