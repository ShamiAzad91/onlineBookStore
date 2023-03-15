import React from "react";
import { NavLink } from 'react-router-dom';


const UserMenu = () => {
  return (
    <>
      <div className="p-3 mt-2 mb-2 bg-light">
        <h4>User Links</h4>
        <ul className="list-group list-unstyled">
          <li>
            <NavLink className="list-group-item" to="/dashboard/user/profile">
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink className="list-group-item" to="/dashboard/user/orders">
              Orders
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default UserMenu;
