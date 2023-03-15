import axios from "axios";
import React, { useEffect, useState } from "react";
import Jumbotron from "../../components/cards/Jumbotron";
import UserMenu from "../../components/nav/UserMenu";
import { useAuth } from "../../context/auth";
import toast from 'react-hot-toast'

const UserProfile = () => {
  const [auth, setAuth] = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (auth?.user) {
      const { name, email, address } = auth.user;
      setName(name);
      setEmail(email);
      setAddress(address);
    }
  }, [auth?.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("/profile", {
        name,
        password,
        address,
      });

      console.log("profile update", data);

      if(data.error){
     return toast.error(data.error)
      }


      setAuth({...auth, user:data});
      //localstorage
      let ls = localStorage.getItem('auth');
      ls = JSON.parse(ls);
      ls.user = data;
      localStorage.setItem('auth',JSON.stringify(ls));
      toast.success('Profile updated')
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Jumbotron
        title={`Hello ${auth?.user?.name}`}
        subTitle="User Dashboard"
      />

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="p-3 mt-2 mb-2 bg-light">
              <h4>Profile</h4>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  className="form-control m-2 p-2"
                  placeholder="enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoFocus={true}
                />

                <input
                  type="text"
                  className="form-control m-2 p-2"
                  placeholder="enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus={true}
                  disabled={true}
                />

                <input
                  type="text"
                  className="form-control m-2 p-2"
                  placeholder="enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoFocus={true}
                />
                <textarea
                  className="form-control m-2 p-2"

                  placeholder="enter your address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <button className="btn btn-primary m-2 p-2">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
