import axios from "axios";
import React, { useEffect, useState } from "react";
import Jumbotron from "../components/cards/Jumbotron";
import ProductCard from "../components/cards/ProductCard";
import { Checkbox, Radio } from "antd";
import { prices } from "../prices";

const Shop = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);

  useEffect(() => {
    if (!checked.length || !checked.radio) loadProducts();
  }, []);

  useEffect(() => {
    if (checked.length || radio.length) loadFilteredProducts();
  }, [checked, radio]);

  const loadFilteredProducts = async () => {
    try {
      const { data } = await axios.post("/filtered-products", {
        checked,
        radio,
      });

      console.log("filtered results =>", data);

      setProducts(data);
    } catch (err) {}
  };

  const loadProducts = async () => {
    try {
      const { data } = await axios.get("/products");
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  console.log("27", products);

  const loadCategories = async () => {
    try {
      const { data } = await axios.get("/categories");
      setCategories(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCheck = (value, id) => {
    console.log("41", value, id);
    let all = [...checked];

    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }

    setChecked(all);
  };

  return (
    <>
      <Jumbotron title="Hello world" subTitle="Welcome to React E-commerce" />
      {/* <pre>{JSON.stringify({checked,radio}, null, 4)}</pre> */}
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <h2 className="p-3 mt-2 mb-2 text-center bg-light">
              Filter by categories
            </h2>
            <div className="row p-5">
              {categories?.map((c) => (
                <div className="col-md-4">
                  <Checkbox
                    key={c._id}
                    onChange={(e) => handleCheck(e.target.checked, c._id)}
                  >
                    {c.name}
                  </Checkbox>
                </div>
              ))}
            </div>

            <h2 className="p-3 mt-2 mb-2 text-center bg-light">
              Filter by prices
            </h2>
            <div
              className="row p-5"
            >
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {prices?.map((p) => (
                  <div key={p._id} style={{ marginLeft: "8px" }}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            <div className="p-5 pt-0">
              <button
                className="btn btn-outline-secondary col-12"
                onClick={() => window.location.reload()}
                style={{cursor:'pointer'}}
              >
                reset
              </button>
            </div>
          </div>
          <div className="col-md-9">
            <h2 className="p-3 mt-2 mb-2 text-center bg-light">
              {products?.length} Products
            </h2>
            <div className="row" 
              style={{ height: "80vh", overflow: "scroll" }}
            
            >
              {products?.map((p) => (
                <div className="col-md-4" key={p._id}>
                  <ProductCard p={p} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
