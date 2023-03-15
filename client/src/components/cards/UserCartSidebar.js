import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import { useCart } from '../../context/cart';
import DropIn from "braintree-web-drop-in-react";
import  toast  from 'react-hot-toast';

const UserCartSidebar = () => {
    const [auth,setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken,setClientToken] = useState('');

  const [instance,setInstance] = useState('')
  const [loading,setLoading] = useState(false)


    const navigate = useNavigate();

    useEffect(()=>{
if(auth?.token){
    getClientToken();
}
    },[auth?.token]);


    const handleBuy = async()=>{
        try {
          setLoading(true)
            const {nonce} = await instance.requestPaymentMethod();
            // console.log('nonce=>',nonce)
            const {data} = await axios.post("/braintree/payment",{
                nonce,cart
            })
            console.log('response is =>',data)
          setLoading(false)
            localStorage.removeItem('cart')
            setCart([]);
            navigate("/dashboard/user/orders");
            toast.success('payment successful')
            
        } catch (err) {
          setLoading(false)
          console.log(err)  
        }
    }


    const getClientToken = async()=>{
        try {
            const {data} = await axios.get("/braintree/token");
            setClientToken(data.clientToken)
            
        } catch (err) {
            console.log(err)
            
        }
    }

    const cartTotal = () => {
        let total = 0;
        cart.map((item) => {
          total += item.price;
        });
        return total.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        });
      };

  return (
    <>
     <div className="col-md-4 mb-5">
              <h4>Your cart Summary</h4>
              Total/Address/Payment
              <hr />
              <h6>Total : {cartTotal()}</h6>
              {auth?.user?.address ? (
                <>
                  <div className="mb-3">
                    <hr />
                    <h4> Delivery Address</h4>
                    <h5>{auth?.user?.address}</h5>
                  </div>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    update Address
                  </button>
                </>
              ) : (
                <>
                  <div className="mb-3">
                    {auth?.token ? (
                      <button
                        className="btn btn-outline-warning"
                        onClick={() => navigate("/dashboard/user/profile")}
                      >
                        Add delivary address
                      </button>
                    ) : (
                      <button
                        className="btn btn-outline-danger mt-3"
                        onClick={() =>
                          navigate("/login", {
                            state: "/cart",
                          })
                        }
                      >
                        {" "}
                        login to checkout
                      </button>
                    )}
                  </div>
                </>
              )}

              <div className='mt-5'>

{!clientToken || !cart?.length ? ('') :(
    <>
      <DropIn 
                options={{
                    authorization:clientToken,
                    paypal:{
                        flow:'vault'
                    }
                }}
                onInstance={(instance)=>setInstance(instance)}
                />
                <button 
                className='btn btn-primary col-12 mt-2'
                onClick={handleBuy}
                disabled={!auth?.user?.address || !instance  || loading}
                >{loading? "Processing...":'BUY'}</button>
    </>

)}

              
              </div>
            </div>

    </>
  )
}

export default UserCartSidebar