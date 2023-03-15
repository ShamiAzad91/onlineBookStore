import React from "react";
import { NavLink } from 'react-router-dom';


const AdminMenu = () => {
  return (
    <>
      <div className="p-3 mt-2 mb-2 bg-light">
        <h4>Admin Links</h4>
        <ul className="list-group list-unstyled">
          <li>
            <NavLink className="list-group-item" to="/dashboard/admin/category">
              Create Category
            </NavLink>
          </li>
          <li>
            <NavLink className="list-group-item" to="/dashboard/admin/product">
              Create Product
            </NavLink>
          </li>

          <li>
            <NavLink className="list-group-item" to="/dashboard/admin/products">
              Products
            </NavLink>
          </li>
          <li>
            <NavLink className="list-group-item" to="/dashboard/admin/orders">
              Manage Orders
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default AdminMenu;
