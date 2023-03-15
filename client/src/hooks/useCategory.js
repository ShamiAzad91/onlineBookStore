import axios from "axios";
import React, { useState,useEffect } from "react";

export default function UseCategory(){
    const[categories,setCategories] = useState([]);

    useEffect(()=>{
loadCategories();
    },[])


    const loadCategories = async() => {
        try {
            const {data} = await axios.get("/categories")
            setCategories(data)
        } catch (err) {
            console.log(err)
            
        }
    }
 return categories

}