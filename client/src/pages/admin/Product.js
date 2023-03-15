import axios from "axios";
import React, { useState, useEffect } from "react";
import Jumbotron from "../../components/cards/Jumbotron";
import AdminMenu from "../../components/nav/AdminMenu";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const AdminProduct = () => {
  const [auth, setAuth] = useAuth();
  //state
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [shipping, setShipping] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const navigate = useNavigate()

  const loadCategories = async () => {
    try {
      const { data } = await axios.get("/categories");
      setCategories(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async(e)=>{
    e.preventDefault()
    try {
      //
      // console.log(name, description, price, category, quantity, shipping ,photo)
      const productData = new FormData();
      productData.append('photo',photo);
      productData.append('name',name);
      productData.append('description',description);
      productData.append('price',price);
      productData.append('category',category);
      productData.append('shipping',shipping);
      productData.append('quantity',quantity);


      // console.log([...productData]);
      // console.log('kk',category)
      const {data} = await axios.post("/product",productData);

      if(data?.error){
        toast.error(data.error);
      }else{
        toast.success(`"${data.name}" is created `);
        navigate('/dashboard/admin/products');
      }
      
    } catch (err) {
      console.log(err)
      toast.error('Product created failed! Try again')
    }
  }


  return (
    <>
      <Jumbotron
        title={`Hello ${auth?.user?.name}`}
        subTitle="Admin Dashboard"
      />

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="p-3 mt-2 mb-2 bg-light">
              <h4>Create Product</h4>
              {/* {categories.length}    */}

              {photo && (
                <div className="text-center">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="product photo"
                    className="img img-responsive"
                    height="200px"
                  />
                </div>
              )}
              <div className="pt-3">
                <label className="btn btn-outline-secondary col-12 mb-3">
                  {photo ? photo.name : "Upload photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>

              <input
                type="text"
                className="form-control p-2 mb-3"
                placeholder="write a name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <textarea
                type="text"
                className="form-control p-2 mb-3"
                placeholder="write a description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <input
                type="number"
                className="form-control p-2 mb-3"
                placeholder="enter a price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />

              <Select
                // showSearch
                border={false}
                size="large"
                className="form-select mb-3"
                placeholder="choose category"
                onChange={(value) => setCategory(value)}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>

              <Select
                showSearch
                border={false}
                size="large"
                className="form-select mb-3"
                placeholder="choose shipping"
                onChange={(value) => setShipping(value)}
              >
                <Option value='0'>No</Option>
                <Option value='1'>Yes</Option>
              </Select>

    
              <input
                type="number"
                min="1"
                className="form-control p-2 mb-3"
                placeholder="enter a quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <button onClick={handleSubmit} className="btn btn-primary mb-5">Submit</button>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProduct;
