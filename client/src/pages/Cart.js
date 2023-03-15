import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";
import Jumbotron from "../components/cards/Jumbotron";
import UserCartSidebar from "../components/cards/UserCartSidebar";
import ProductCartHorizontal from "../components/cards/ProductCartHorizontal";

const Cart = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();

  const navigate = useNavigate();

  return (
    <>
      <Jumbotron
        title={`Hello ${auth?.token && auth?.user?.name}`}
        subTitle={
          cart.length
            ? `you have ${cart?.length} items in cart .${
                auth?.token ? "" : "Please login to checkout"
              }`
            : "Your cart is empty"
        }
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="p-3 mt-2 mb-4 h4 bg-light text-center">
              {cart.length ? (
                "My cart"
              ) : (
                <div className="text-center">
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate("/")}
                  >
                    Continue Shopping
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {cart.length && (
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="row">
                {cart.map((p, index) => (
                  <ProductCartHorizontal key={index}  p={p}/>
                ))}
              </div>
            </div>
            <UserCartSidebar />
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
