import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Jumbotron from "../../components/cards/Jumbotron";
import ProductCartHorizontal from "../../components/cards/ProductCartHorizontal";
import UserMenu from "../../components/nav/UserMenu";
import { useAuth } from "../../context/auth";

const UserOrders = () => {
  const [auth, setAuth] = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/orders");
      setOrders(data);
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
              <h4>Orders</h4>
              {orders.map((o, i) => {
                return (
                  <div
                    key={o._id}
                    className="border shadow bg-light rounded-4 mb-5"
                  >
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Status</th>
                          <th scope="col">Buyer</th>
                          <th scope="col">Ordered</th>
                          <th scope="col">Payment</th>
                          <th scope="col">Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{i + 1}</td>
                          <td>{o?.status}</td>
                          <td>{o?.buyer?.name}</td>
                          <td>{moment(o?.createdAt).fromNow()}</td>
                          <td>{o?.payment?.success ? "Success" : "failed"}</td>
                          <td>{o?.products?.length}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="container">
                      <div className="row m-2">
                      {o?.products?.map((p,i)=>(
                        <ProductCartHorizontal key={i} p={p} remove={false} />
                      ))}
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserOrders;
