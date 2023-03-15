import moment from "moment";
import React from "react";
import { Badge } from "antd";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/cart";
import toast from "react-hot-toast";
const ProductCard = ({ p }) => {
  const [cart,setCart] = useCart()

  const navigate = useNavigate();

  return (
    <div className="card mb-3 hoverable">
      <Badge.Ribbon text={`${p?.sold} sold`} color="red">
        <Badge.Ribbon
          text={`${
            p?.quantity >= 1
              ? `${p?.quantity - p?.sold} in Stock`
              : "Out of Stock"
          }`}
          placement="start"
          color="green"
        >
          <img
            className="card-img-top"
            src={`${process.env.REACT_APP_API}/product/photo/${p._id}`}
            alt={p.name}
            style={{ height: "300px", objectFit: "cover" }}
          />
        </Badge.Ribbon>
      </Badge.Ribbon>

      <div className="card-body">
        <h5>{p?.name}</h5>
        <h4 className="fw-bold">
{p?.price?.toLocaleString("en-US",{
    style:"currency",
    currency:"USD"
})}
        </h4>
        <p className="card-text">{p?.description?.substring(0, 60)}</p>
      </div>

      {/* <p>{p.name}</p> */}
      {/* <p>{moment(p.createdAt).fromNow()}</p>
       <p>{p.sold} sold</p> */}

      <div className="d-flex justify-content-between">
        <button
          className="btn btn-primary col card-button"
          style={{ borderBottomLeftRadius: "5px" }}
          onClick={()=>navigate(`/product/${p.slug}`)}
        >
          View Products
        </button>
        <button
          className="btn btn-outline-primary col card-button"
          style={{ borderBottomRightRadius: "5px" }}
          onClick={()=>{
            setCart([...cart,p]);
            localStorage.setItem('cart',JSON.stringify([...cart,p]))
            toast.success('Added to cart')
          }}
          
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
