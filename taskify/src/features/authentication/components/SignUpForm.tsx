import React, { useState } from 'react';
import axios from 'axios';

function SignUpForm() {
  const [signUpForm, setSignUpForm] = useState({ email: '', password: '' });

  const submitSignUpForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const requestData = JSON.stringify(signUpForm);

    axios.post('http://127.0.0.1:8000/api/auth/signup/', requestData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        console.log(response.data);
        axios.post('http://127.0.0.1:8000/api/auth/login/', requestData, {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((res) => {
          if (res.data.access) {
            localStorage.setItem("user", JSON.stringify(res.data));
          }
          console.log(res)
        })
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
          onChange={(e) => setSignUpForm({ ...signUpForm, email: e.target.value })}
          required
        ></input>
        <input
          type='password'
          value={signUpForm.password}
          onChange={(e) => setSignUpForm({ ...signUpForm, password: e.target.value })}
          required
        ></input>
        <button>SignUp</button>
      </form>

    </div>
  )
}

export default SignUpForm