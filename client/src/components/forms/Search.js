import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../context/search";

export default function Search() {
const[keyword,setKeyword] = useState('');
const[results,setResults] = useState([]);
const[values,setValues] = useSearch();
const navigate = useNavigate();

const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
        const {data} = await axios.get(`/products/search/${values.keyword}`);

        // console.log(data);
        setValues({...values,results:data});
        navigate("/search")
        
    } catch (err) {
        console.log(err);
        
    }
}

  return (
    <form className="d-flex" onSubmit={handleSubmit}>
      <input
        type="search"
        className="form-control"
        style={{ borderRadius: "0px" }}
        placeholder="search"
      onChange={(e)=>setValues({...values,keyword:e.target.value})}
      value={values.keyword}

      />
      <button className="btn btn-outline-primary"
      >Search</button>
    </form>
  );
}
