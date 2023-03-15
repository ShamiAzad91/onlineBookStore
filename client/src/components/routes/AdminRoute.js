import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import Loading from "../../pages/user/Loading";
import axios from "axios";

const AdminRoute = () => {
  //context
  const [auth, setAuth] = useAuth();

  //state
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const adminCheck = async () => {
      const { data } = await axios.get('/admin-check');
      if (data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if(auth?.token)
    adminCheck();
  }, [auth?.token]);



  return ok ? <Outlet /> : <Loading path="" />;
};

export default AdminRoute;
