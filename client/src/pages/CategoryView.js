import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Jumbotron from '../components/cards/Jumbotron';
import ProductCard from '../components/cards/ProductCard'

const CategoryView = () => {
const[products,setProducts] = useState([]);
const[category,setCategory] = useState({})

const navigate = useNavigate()
const params = useParams();


useEffect(()=>{
  if(params?.slug)
loadProductByCategory()
},[params?.slug]);

const loadProductByCategory = async()=>{
  try {
    const {data} = await axios.get(`/products-by-category/${params.slug}`)
    // console.log(data,'20');
    setCategory(data.category);
    setProducts(data.products)
    
  } catch (err) {
    console.log(err)
    
  }
}

  return (
    <>
    <Jumbotron title={category?.name} subTitle={`${products?.length} products found in ${category?.name}`}/>
    <div className="container-fluid">
     <div className="row">
     {products.map((p)=>(
      <div className='col-md-4' key={p._id}>
        <ProductCard p={p}/>

      </div>
      ))}
     </div>
      

    </div>

    </>
  )
}

export default CategoryView