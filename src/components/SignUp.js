import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [credentials, setCredentials] = useState({name: "",email: "", password:"", cpassword: ""});

    let history = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const {name, email, password} = credentials;//since create a new user end point doesnot have cpassword
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
      
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password}),
          });
          const json = await response.json();
          console.log(json);
          localStorage.setItem('token', json.authtoken);
              history("/");

    }

    const onChange = (e)=>{
        //the name that is being changed will be equal to the value written in the respective text field
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
            <div className = "mb-3">
                <label htmlFor="name" className = "form-label">Name</label>
                <input type="text" name='name' className = "form-control" id="name" onChange={onChange} aria-describedby="emailHelp"/>
            </div>
            <div className = "mb-3">
                <label htmlFor="email" className = "form-label">Email address</label>
                <input name="email" type="email" className = "form-control" id="email" aria-describedby="emailHelp"/>
                <div id="emailHelp"onChange={onChange} className = "form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className = "mb-3">
                <label htmlFor="password" className = "form-label">Password</label>
                <input name='password' type="password" className = "form-control" id="password" onChange={onChange}/>
            </div>
            <div className = "mb-3">
                <label htmlFor="cpassword" className = "form-label">Password</label>
                <input name='cpassword' type="password" className = "form-control" id="cpassword" onChange={onChange}/>
            </div>
            <button type="submit" className = "btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default SignUp
