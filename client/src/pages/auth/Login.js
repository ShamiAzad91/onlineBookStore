import React, { useState } from "react";
import Jumbotron from "../../components/cards/Jumbotron";
import axios from "axios";
import toast from 'react-hot-toast';
import { useAuth } from "../../context/auth";
import {useNavigate,useLocation} from 'react-router-dom'

const Login = () => {
  //state
  const [email, setEmail] = useState("shami@test.com");
  const [password, setPassword] = useState("123456");
  // console.log(process.env.REACT_APP_API)

  //hook
  const [auth,setAuth] = useAuth();

  const navigate = useNavigate();


  const location = useLocation();
  console.log(location,'kkkllllll');


  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      // console.log(name,email,password)
      const {data} = await axios.post(`/login`,{
        email,password
      });

      // console.log(data,'kk');

      if(data?.error){
        toast.error(data.error)
      }else{
        localStorage.setItem('auth',JSON.stringify(data))
        setAuth({...auth,token:data.token,user:data.user})
        toast.success('Login successfully');
        navigate(location.state || `/dashboard/${data?.user?.role === 1 ? 'admin':'user'}`)
      }
      
    } catch (err) {
      console.log(err)
      toast.error('Login failed Try again!')

      
      
    }

  }


  return (
    <div>
      <Jumbotron title="Login" />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
          <form onSubmit={handleSubmit}>
              <input
              type="text"
              className="form-control mb-4 p-2"
              placeholder="enter your name"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
              <input
              type="text"
              className="form-control mb-4 p-2"
              placeholder="enter your name"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
            <button className="btn btn-primary" type="submit">Submit</button>
          </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
