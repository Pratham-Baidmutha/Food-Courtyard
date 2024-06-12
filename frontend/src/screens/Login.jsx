import React, { useState } from 'react'
import { Link , useNavigate} from 'react-router-dom'

export default function Login() {
  let navigate = useNavigate();
  const [credential, setcredentials] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credential.email, password: credential.password })
    })
    const json = await response.json()
    console.log(json);

    if (!json.success) {
      alert("Enter valid credentials")
    }

    if (json.success) {
      localStorage.setItem("userEmail", credential.email);
      // console.log(localStorage.getItem("userEmail"))
      localStorage.setItem("authToken",json.authToken)
      console.log(localStorage.getItem("authToken"))
      navigate("/")
    }
  }
  const onChange = (event) => {
    setcredentials({ ...credential, [event.target.name]: event.target.value })
  }

  return (
    <div>
      <div className="container p-3" >
        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" name="email" value={credential.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" name="password" value={credential.password} onChange={onChange} id="exampleInputPassword1" />
          </div>

          <button type="submit" className="btn btn-success">Submit</button>
          <Link to="/createuser" className='m-3 btn btn-danger'>I'm a new user</Link>
        </form>
      </div>
    </div>
  )
}
