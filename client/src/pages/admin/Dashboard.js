import React from 'react';
import Jumbotron from '../../components/cards/Jumbotron';
import AdminMenu from '../../components/nav/AdminMenu';
import { useAuth } from '../../context/auth';

const AdminDashboard = () => {

    const [auth,setAuth] = useAuth();

  return (
    <>
    <Jumbotron 
    title={`Hello ${auth?.user?.name}`}
    subTitle='Admin Dashboard'
    />

<div className="container-fluid">
  <div className="row">
    <div className="col-md-3">
    <AdminMenu/>
    </div>
    <div className="col-md-9">
    <div className="p-3 mt-2 mb-2 bg-light"><h4>Admin Information</h4>
    <ul className='list-group'>
      <li className='list-group-item'>{auth?.user?.name}</li>
      <li className='list-group-item'>{auth?.user?.email}</li>
      <li className='list-group-item'>Admin</li>

    </ul>
    </div>

    </div>
  </div>
</div>


    </>
  )
}

export default AdminDashboard