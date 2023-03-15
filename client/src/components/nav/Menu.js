import { Badge } from "antd";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useCart } from "../../context/cart";
import UseCategory from "../../hooks/useCategory";
import Search from "../forms/Search";


const Menu = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const categories = UseCategory();
  const [cart,setCart] = useCart();
  // console.log('miller',categories)
  

  const logout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    navigate("/login");
  };

  return (
    <>
      <ul className="nav d-flex justify-content-between shadow-sm mb-2 sticky-top bg-light">
        <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" to="/">
            HOME
          </NavLink>
        </li>
        
        <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" to="/shop">
            SHOP
          </NavLink>
        </li>
        
        <div className="dropdown">
            <li>
              <a className="nav-link pointer dropdown-toggle" data-bs-toggle="dropdown">
                CATEGORIES
              </a>
              <ul className="dropdown-menu" style={{height:'300px', overflow:'scroll'}}>
                <li>
                  <NavLink className='nav-link' to="/categories">All categories</NavLink>
                </li>
              {categories?.map(c=>(
                <li>
                    <NavLink className="nav-link" to={`/category/${c.slug}`}>
                  {c.name}
                </NavLink>
                </li>
              ))}
            </ul>
            </li>
          
          </div>

              
        <li className="nav-item">
         <Badge count={cart?.length >=1 ? cart.length :0 } offset={[-5,13]} showZero={true}>
         <NavLink className="nav-link" aria-current="page" to="/cart">
            CART
          </NavLink>
         </Badge>
        </li>
        


        <Search/>

       

        {!auth?.user ? (
          <>
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                LOGIN
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/register">
                REGISTER
              </NavLink>
            </li>
          </>
        ) : (
          <div className="dropdown">
            <li>
              <a className="nav-link pointer dropdown-toggle" data-bs-toggle="dropdown">
                {auth?.user?.name?.toUpperCase()}
              </a>
              <ul className="dropdown-menu">
              <li className="nav-item">
                <NavLink className="nav-link" to={`/dashboard/${auth?.user?.role === 1 ? "admin":'user'}`}>
                  Dashboard
                </NavLink>
              </li>
              <li className="nav-item">
                <a onClick={logout} className="nav-link">
                  Logout
                </a>
              </li>
            </ul>
            </li>
          
          </div>
        )}
      </ul>
    </>
  );
};

export default Menu;
